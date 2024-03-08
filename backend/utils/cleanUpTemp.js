const fs = require("fs");
function cleanTempFolder() {
  fs.readdir("./backend/uploads", (err, files) => {
    if (err) {
      console.log(`Error reading temp folder`, err);
      return;
    }
    if (files.length === 0) {
      console.log("temp folder is already empty");
      return;
    }
    files.forEach((file) => {
      fs.unlinkSync(`./backend/uploads/${file}`);
      console.log(`Deleted file: ${file}`);
    });
    console.log("uplods temp folder is deleted /cleaned up successfully");
  });
}

module.exports = cleanTempFolder
