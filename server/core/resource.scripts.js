const fs = require("fs");

// Source file path
const srcFileController = "./core/boilerplate/test.controller.js";
const srcFileRoute = "./core/boilerplate/test.routes.js";
const srcutilsApiError = "./core/boilerplate/APIError.js";
const srcutilsdebug = "./core/boilerplate/debug.js";
const IndexFile = "./src/routes/index.js";
const srcFileModel = "./core/boilerplate/test.model.js";

// Destination directory
const destDirController = "./src/controllers/admin/";
const destDirRoute = "./src/routes/admin/";
const destutilsApiError = "./src/utils/";
const destutilsDebug = "./src/utils/";

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

// Read the test route file

fs.readFile(srcFileRoute, (err, data) => {
  if (err) throw err;
  let str = data.toString();
  let modifiedData = str.replace(/test/g, `${name}`);
  let newdata = modifiedData.replace(/auth/g, `${name}`);
  ``;
  // Write the test route file to the destination directory with the new file name
  if (!fs.existsSync(destDirRoute))
    fs.mkdirSync(destDirRoute, { recursive: true });

  fs.writeFile(destDirRoute + newFileNameRoute, newdata, (err) => {
    if (err) throw err;
    console.log(`${name} Routes created!`);

    //routes added in index file
    if (!fs.existsSync(IndexFile)) {
      fs.mkdirSync("./src/routes/admin", { recursive: true });
      var newRoute = `\nvar ${name}Routes = require('./${name}.route')\n//boilerplate\nrouter.use('/${name}',${name}Routes)`;
      fs.writeFile("./src/routes/admin/" + "index.js", newRoute, (err) => {
        if (err) throw err;
        console.log("New index.js file added !");
      });
    } else {
      console.log(`else if`);

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
