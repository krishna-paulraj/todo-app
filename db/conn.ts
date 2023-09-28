import mongoose from "mongoose";

export const conn = async () => {
  try {
    await mongoose.connect(process.env.DB_URI!);
    const conn = mongoose.connection;

    conn.on("connected", () => {
      console.log("Database Connected");
    });

    conn.on("error", (err) => {
      console.log("Database Connection have some errors ", err);
      process.exit();
    });
  } catch (error) {
    return console.log(error);
  }
};
