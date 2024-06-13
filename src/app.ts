import express , {Application} from "express";
import authRoutes from './routes/auth.routes'
import errorHandler from "./middlewares/error.middleware";
import cookieParser from 'cookie-parser';
import { dbService } from "./utils/atlas/mongodb.utils";
// import { MongoClient } from "mongodb";
// import { main } from "./utils/atlas/mongodb.utils";
// Create a new express application instance
const app: Application = express();

const port : string | number  = process.env.PORT || 8888;
dbService.connection()
// Establecer la conexión a la base de datos al iniciar la aplicación

// middleware 
// main();
app.use(express.json()); // for parsing application/json
app.use(cookieParser());

app.use('/', authRoutes);
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});