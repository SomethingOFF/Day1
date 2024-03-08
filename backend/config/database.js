const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.URI, { family: 4 })
    .then((data) => {
      console.log(
        `Server is connected with the database ${data.connection.host}`
      );
    })
    .catch((error) => {
      console.log(`Error : ${error}`);
    });
};

module.exports = connectDB