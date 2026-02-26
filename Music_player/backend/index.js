import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

import authRoutes from './routes/User/User.routes.js';
import audioRoutes from './routes/Audio/Audio.routes.js';

const app = express();

// Enable CORS (allow frontend origin)
app.use(cors({
  origin: 'http://localhost:5173', // replace with your frontend URL
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/audio', audioRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
