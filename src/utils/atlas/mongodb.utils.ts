import mongoose, { ConnectOptions } from "mongoose";

class DBService {
  private static instance: DBService; // Private static property to hold the instance
  private clientOptions: ConnectOptions = { serverApi: { version: "1", strict: true, deprecationErrors: true } };
  private dbuser: string;
  private dbpass: string;
  private dbname: string;
  private uri: string;
  constructor() {
    this.dbuser = process.env.MONGO_USER || "admin"
    this.dbpass = process.env.MONGO_PASS || "admin"
    this.dbname = process.env.MONGO_DB || "soundSpace"
    this.uri = `mongodb+srv://${this.dbuser}:${this.dbpass}@${this.dbname}.cgttsp6.mongodb.net/?retryWrites=true&w=majority&appName=soundSpace`

  }
  public static getInstance(): DBService {
    if (!DBService.instance) {
      DBService.instance = new DBService();
    }
    return DBService.instance;
  }
  async connection() {
    try {
      // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
      await mongoose.connect(this.uri, this.clientOptions);
      await mongoose.connection.db.admin().command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await mongoose.disconnect();
    }
  }

}
export const dbService = DBService.getInstance();