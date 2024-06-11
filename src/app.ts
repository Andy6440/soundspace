import express , {Application} from "express";

// Create a new express application instance
const app: Application = express();
const port : string | number  = process.env.PORT || 3000;

// middleware 
app.use(express.json()); // for parsing application/json

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});