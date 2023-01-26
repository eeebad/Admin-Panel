const fs = require("fs");

const srcutilsApiError = "./core/boilerplate/APIError.js";
const srcutilsdebug = "./core/boilerplate/debug.js";

const destutilsApiError = "./src/utils/";
const destutilsDebug = "./src/utils/";

//utils folder for debug
fs.readFile(srcutilsdebug, (err, data) => {
  if (err) throw err;

  // Write the test controller file to the destination directory with the new file name
  if (!fs.existsSync(destutilsDebug))
    fs.mkdirSync(destutilsDebug, { recursive: true });
  fs.writeFile(destutilsDebug + "debug.js", data, (err) => {
    if (err) throw err;
    console.log(`debug.js created in utils`);
  });
});

//utils folder for Error handling
fs.readFile(srcutilsApiError, (err, data) => {
  if (err) throw err;

  // Write the test controller file to the destination directory with the new file name
  if (!fs.existsSync(destutilsApiError))
    fs.mkdirSync(destutilsApiError, { recursive: true });
  fs.writeFile(destutilsApiError + "APIError.js", data, (err) => {
    if (err) throw err;
    console.log(`APIError.js created in untils`);
  });
});
