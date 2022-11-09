import mongoose from "mongoose";

export default class {
  constructor() {
    this.connect();
  }

  async connect() {
    try {
      await mongoose.connect(process.env.MONGO_URL);

      console.log("Mongoose has Connected");
    } catch (err) {
      console.log("Mongoose failed to connect");
      console.log(err);
    }
  }
}
