import mongoose from "mongoose";

const connectionDb = async () => {
  mongoose
    .connect(
      "mongodb+srv://momaherfrontend:Mohammed189199@cluster0.mbdwkdz.mongodb.net/app1"
    )
    .then((res) => console.log("res"))
    .catch((err) => console.log(err));
};
export default connectionDb;
