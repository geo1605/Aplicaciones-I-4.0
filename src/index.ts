import morgan from 'morgan';
import express from 'express';
import authRoutes from './routes/auth.routes';
import connectDB from './config/db.ts';


const app= express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/auth', authRoutes);


connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => { 
      console.log(`Server is running on port ${PORT}`);
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error("Error connecting to the database:", err);
  });