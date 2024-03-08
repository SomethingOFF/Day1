const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDB = require("./config/database");
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(
    `Server is down due to the uncaught exeception we are sorry about that`
  );
  process.exit(1);
});

dotenv.config({ path: "./backend/config/config.env" });
connectDB();
cloudinary.v2.config({
  cloud_name: process.env.APP_CLOUD_NAME,
  api_key: process.env.APP_PUBLIC_KEY,
  api_secret: process.env.APP_SECRET_KEY,
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is connected with the http://localhost:${process.env.PORT}`
  );
});

process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err}`);
  console.log(`Server is down due to the unhandled rejection we are sorry`);
  server.close(() => {
    process.exit(1);
  });
});
