import express , {Application} from "express";
import authRoutes from './routes/auth.routes'
import errorHandler from "./middlewares/error.middleware";
import cookieParser from 'cookie-parser';

// Create a new express application instance
const app: Application = express();

const port : string | number  = process.env.PORT || 8888;


// middleware 

app.use(express.json()); // for parsing application/json
app.use(cookieParser());

app.use('/', authRoutes);
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});