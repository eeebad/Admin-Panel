const fs = require("fs");
const destDirUploadFile = `./src/config/`;
const srcDirUploadFile = `./core/boilerplate/test.multer.js`;
const newFileNamePassport = `${process.argv[2]}.js`
// Read the test controller file
fs.readFile(srcDirUploadFile, (err, data) => {
  if (err) throw err;

  // Write the test controller file to the destination directory with the new file name
  fs.writeFile(destDirUploadFile + newFileNamePassport, data, (err) => {
    if (err) throw err;
    console.log("Multer File created!");
  });
});
