const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');
const { validateEmail, validatePassword } = require('../utils/validateInput');

const JWT_SECRET = process.env.JWT_SECRET || 'mySuperSecretKey123';

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (!email || !email.trim()) {
    return res.status(400).json({ error: 'Email is required' });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address' });
  }
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  try {
    findUserByEmail(email.trim().toLowerCase(), async (err, results) => {
      if (err) {
        console.error('Register DB error:', err.message);
        return res.status(500).json({ error: 'Database error. Please try again.' });
      }
      if (results && results.length) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        createUser(name.trim(), email.trim().toLowerCase(), hashedPassword, 'user', (createErr) => {
          if (createErr) {
            console.error('Create user error:', createErr.message);
            if (createErr.code === 'ER_DUP_ENTRY') {
              return res.status(400).json({ error: 'Email already registered' });
            }
            return res.status(500).json({ error: 'Could not create account. Please try again.' });
          }
          res.status(201).json({ message: 'User registered successfully' });
        });
      } catch (hashErr) {
        console.error('Hash error:', hashErr.message);
        return res.status(500).json({ error: 'Internal server error' });
      }
    });
  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  findUserByEmail(email.trim().toLowerCase(), async (err, results) => {
    if (err) {
      console.error('DB Error:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }
    if (!results || !results.length) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = results[0];

    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

      return res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error('Auth Error:', error.message);
      return res.status(500).json({ error: 'Authentication failed' });
    }
  });
};
