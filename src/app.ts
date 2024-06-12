import express , {Application} from "express";
import authRoutes from './routes/auth.routes'
// Create a new express application instance
const app: Application = express();

const port : string | number  = process.env.PORT || 8888;

// middleware 
app.use(express.json()); // for parsing application/json

app.use('/', authRoutes);


// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});