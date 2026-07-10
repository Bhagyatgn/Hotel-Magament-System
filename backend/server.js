const express=require('express');
const cors=require('cors');
require('dotenv').config();

const app=express();
app.use(cors());
app.use(express.json());

const authRoutes=require('./routes/authRoutes');
const roomsRoutes=require('./routes/roomRoutes');
const hotelRoutes=require('./routes/hotelRoutes');
const bookingRoutes=require('./routes/bookingRoutes');
const offerRoutes=require('./routes/offerRoutes');
const userRoutes = require('./routes/useRoutes');
const { verifyUser } = require('./middlewares/authMiddleware');
const ensureSchema = require('./utils/ensureSchema');

app.get('/', (req, res) => {
    res.send('Hotel Management API is running');
});

app.use('/api/auth',authRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/hotels',hotelRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/users', verifyUser, userRoutes);

const PORT=process.env.PORT||5000;
ensureSchema()
    .then(() => {
        app.listen(PORT, "0.0.0.0", () => {
                console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Schema initialization failed:', error);
        process.exit(1);
    });
