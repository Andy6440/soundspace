import express , {Application} from "express";
import authRoutes from './routes/auth.routes'
import errorHandler from "./middlewares/error.middleware";
import cookieParser from 'cookie-parser';
import {connectDB,ping} from "./utils/atlas/mongodb.utils";
import { swaggerDocs, swaggerSetup } from "./config/swagger";
import userRoutes from "./routes/user.routes";
const app: Application = express();
const port : string | number  = process.env.PORT || 8888;

app.use(express.json()); // for parsing application/json
app.use(cookieParser());

// Conectar a la base de datos
connectDB().then(() => {

  // Iniciar el servidor solo después de que la conexión a la base de datos esté establecida
  const startServer = () => {
    try {
      
      app.use('/', authRoutes);
      app.use('/users', userRoutes);
      app.use(errorHandler);
      
      app.use('/api-docs', swaggerDocs,swaggerSetup)
      // Start the server
      app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
        console.log('ping',ping());
      });
      
    } catch (error) {
      console.error("Failed to start the server", error);
      process.exit(1); // Salir de la aplicación si no se puede iniciar el servidor
    }
  };

  startServer();
}).catch((error) => {
  console.error("Failed to connect to the database", error);
  process.exit(1);
});