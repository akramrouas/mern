import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Charger les variables d'environnement

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI); 
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Arrêter le processus si la connexion échoue
  }
};

export default connectDB;
