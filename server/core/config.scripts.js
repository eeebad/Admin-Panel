const fs = require("fs");
const srcDB = "./core/boilerplate/db.js";
const destDB = "./src/config/";
const srcvar = "./core/boilerplate/var.js";
const destvar = "./src/config/";

//db connection
fs.readFile(srcDB, (err, data) => {
  if (err) throw err;

  // Write the test controller file to the destination directory with the new file name
  if (!fs.existsSync(destDB)) fs.mkdirSync(destDB, { recursive: true });
  fs.writeFile(destDB + "db.js", data, (err) => {
    if (err) throw err;
    console.log(`db.js created in config`);
  });
});

//to create var.js to get variables from env file
fs.readFile(srcvar, (err, data) => {
  if (err) throw err;

  // Write the test controller file to the destination directory with the new file name
  if (!fs.existsSync(destvar)) fs.mkdirSync(destvar, { recursive: true });
  fs.writeFile(destvar + "var.js", data, (err) => {
    if (err) throw err;
    console.log(`var.js created in config`);
  });
});
