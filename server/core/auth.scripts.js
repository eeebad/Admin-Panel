const fs = require("fs");
if (process.argv[2] === "login") {
  const srcPassportStrategy = "./core/boilerplate/test.passport.auth.js";
  const destDirPassport = "./src/strategies/";
  const newFileNamePassport = `passport.auth.js`;

  //setting passport strategy for login and creating JWT token

  fs.readFile(srcPassportStrategy, (err, data) => {
    if (err) throw err;

    // Write the test controller file to the destination directory with the new file name
    if(process.argv[3]==="a"){
      fs.appendFile(destDirPassport + newFileNamePassport, data, (err) => {
        if (err) throw err;
        console.log("Login with passport created");
      });
    }else{
      fs.writeFile(destDirPassport + newFileNamePassport, data, (err) => {
        if (err) throw err;
        console.log("Login with passport appeneded");
      });
    }
  });
}
else if(process.argv[2] === "facebook"){
  
  const srcPassportStrategy = "./core/boilerplate/test.passport.login.facebook.js";
  const destDirPassport = "./src/strategies/";
  const newFileNamePassport = `passport.auth.js`;
  fs.readFile(srcPassportStrategy, (err, data) => {
    if (err) throw err;

    // Write the test controller file to the destination directory with the new file name
    if(process.argv[3]==="a"){
      fs.appendFile(destDirPassport + newFileNamePassport, data, (err) => {
        if (err) throw err;
        console.log("Login with facebook using passport created");
      });
    }else{
      fs.writeFile(destDirPassport + newFileNamePassport, data, (err) => {
        if (err) throw err;
        console.log("Login with facebook using passport appeneded");
      });
    }
    
  });

}
else if(process.argv[2] === "google"){
  const srcPassportStrategy = "./core/boilerplate/test.passport.login.google.js";
  const destDirPassport = "./src/strategies/";
  const newFileNamePassport = `passport.auth.js`;
  fs.readFile(srcPassportStrategy, (err, data) => {
    if (err) throw err;

    // Write the test controller file to the destination directory with the new file name
    if(process.argv[3]==="a"){
      fs.appendFile(destDirPassport + newFileNamePassport, data, (err) => {
        if (err) throw err;
        console.log("Login with google using passport created");
      });
    }else{
      fs.writeFile(destDirPassport + newFileNamePassport, data, (err) => {
        if (err) throw err;
        console.log("Login with google using passport appeneded");
      });
    }
  });
  
}