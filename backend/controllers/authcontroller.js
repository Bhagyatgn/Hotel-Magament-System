const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {createUser,findUserByEmail}=require('../models/userModel');

exports.register=async(req,res)=>{
    const{name,email,password}=req.body;
    try{
        findUserByEmail(email,async(err,results) => {
            if(err) return res.status(500).json({error:err});
            if (results && results.length) return res.status(400).json({
            error:"Email already registered"});
        
            const hashedPassword=await bcrypt.hash(password,10);
            createUser(name,email,hashedPassword,'user',(err,results)=>{
              if(err) return res.status(500).json({error:err});
              res.status(201).json({message:"User registered successfully"});
        });
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.login=(req,res)=>{
    const{email,password}=req.body;
    
    if(!email || !password) {
        return res.status(400).json({error:"Email and password required"});
    }
    
    findUserByEmail(email,async(err,results) => {
            if(err) {
                console.error('DB Error:', err);
                return res.status(500).json({error:"Database error"});
            }
            if (!results || !results.length) {
                return res.status(404).json({error:"User not found"});
            }
        
        const user=results[0];
        
        try {
            const isPasswordValid=await bcrypt.compare(password,user.password);
            if(!isPasswordValid){
                return res.status(401).json({error:"Invalid password"});
            }
            
            const token=jwt.sign(
                {id:user.id,role:user.role},
                process.env.JWT_SECRET || 'mySuperSecretKey123',
                {expiresIn:'1d'}
            );
            
            return res.json({
                token:token,
                user:{
                    id:user.id,
                    name:user.name,
                    email:user.email,
                    role:user.role
                }
            });
        } catch(error) {
            console.error('Auth Error:', error);
            return res.status(500).json({error:"Authentication failed"});
        }
    });
};
