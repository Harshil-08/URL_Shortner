import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import router from './routes/urlRoutes.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

try {
	mongoose.connect(process.env.DB_URL);
  console.log('MongoDB connected');
} catch (err) {
  console.error('MongoDB connection error:', err);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
