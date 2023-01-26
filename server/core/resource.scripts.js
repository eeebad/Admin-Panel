const fs = require("fs");

// Source file path
const srcFileController = "./core/boilerplate/test.controller.js";
const srcFileRoute = "./core/boilerplate/test.routes.js";
const IndexFile = "./src/routes/admin/index.js";
const srcFileModel = "./core/boilerplate/test.model.js";
// require("../src/routes/admin/index");

// Destination directory
const destDirController = "./src/controllers/admin/";
const destDirRoute = "./src/routes/admin/";
const destDirModel = "./src/models/";

const name = process.argv[2];

const newFileNameController = `${name}.controller.js`;
const newFileNameRoute = `${name}.route.js`;
const newFileNameModel = `${name}.model.js`;

// Read the test controller file
fs.readFile(srcFileController, (err, data) => {
  if (err) throw err;
  let str = data.toString();
  let modifiedData = str.replace(/test/g, `${name}`);
  // Write the test controller file to the destination directory with the new file name
  if (!fs.existsSync(destDirController))
    fs.mkdirSync(destDirController, { recursive: true });
  fs.writeFile(
    destDirController + newFileNameController,
    modifiedData,
    (err) => {
      if (err) throw err;
      console.log(`${name} Controller  created!`);
    }
  );
});

// Read the test route file

fs.readFile(srcFileRoute, (err, data) => {
  if (err) throw err;
  let str = data.toString();
  let modifiedData = str.replace(/test/g, `${name}`);
  let newdata = modifiedData.replace(/auth/g, `${name}`);

  // Write the test route file to the destination directory with the new file name
  if (!fs.existsSync(destDirRoute))
    fs.mkdirSync(destDirRoute, { recursive: true });

  fs.writeFile(destDirRoute + newFileNameRoute, newdata, (err) => {
    if (err) throw err;
    console.log(`${name} Routes created!`);

    //routes added in index file
    if (!fs.existsSync(IndexFile)) {
      fs.mkdirSync("./src/routes/admin", { recursive: true });
      var newRoute = `\nconst express = require("express")\nconst router = express.Router()\nvar ${name}Routes =require('./${name}.route')\n
      //boilerplate\nrouter.use('/${name}',${name}Routes)\nmodule.exports = router`;

      fs.writeFile("./src/routes/admin/" + "index.js", newRoute, (err) => {
        if (err) throw err;
        console.log("New index.js file added !");
      });
    } else {
      fs.readFile(IndexFile, (err, data1) => {
        if (err) throw err;
        let str = data1.toString();
        var newRoute = `var ${name}Routes = require('./${name}.route')\n//boilerplate\nrouter.use('/${name}',${name}Routes)`;
        let modifiedData = str.replace(/\/\/boilerplate/g, newRoute);
        // Write the test route file to the destination directory with the new file name
        fs.writeFile(IndexFile, modifiedData, (err) => {
          if (err) throw err;
          console.log("route added to index.js in routes folder !");
        });
      });
    }
  });
});

// Read the test model file
fs.readFile(srcFileModel, (err, data) => {
  if (err) throw err;
  let str = data.toString();
  let modifiedData = str.replace(/test/g, `${name}`);
  // Write the test model file to the destination directory with the new file name
  if (!fs.existsSync(destDirModel))
    fs.mkdirSync(destDirModel, { recursive: true });
  fs.writeFile(destDirModel + newFileNameModel, modifiedData, (err) => {
    if (err) throw err;
    console.log(`${name} Model created!`);
  });
});
