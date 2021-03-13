require("dotenv").config();
const fs = require("fs");
const path = require('path');
const Uploader = require("./fileuploader.js");

class App {

  constructor() {
    this.ipfs = new Uploader();
    this.workDir = "./files/";
    this.workDirOutputIPFS = this.workDir + "outputIPFS/";
    this.workDirOutputMetadata = this.workDir + "outputMetadata/";
  }


  async uploadFiles() {
    try {
      //get files from dir excluding hidden files
      const files = this.getFilesFromDir(this.workDir);
      //Upload files to ipfs and save output to file
      const result = await this.uploadAndSave(this.workDir, files);

    } catch(error) {
      console.error(error);
      process.exit(1);
    }
  }

  async generateMetadata() {

    const files = this.getFilesFromDir(this.workDirOutputIPFS);
    for(let file of files) {
      const data = JSON.parse(fs.readFileSync(this.workDirOutputIPFS + file, "utf8"));
      var obj = {};
      obj.name = "Change Name";
      obj.serie = "#x/y";
      obj.displayName = "Change Name #x/y";
      obj.description ="description";
      obj.image = "https://ipfs.io/ipfs/" + data.IpfsHash;
      obj.ipfsHash = data.IpfsHash;
      obj.external_url = "url to see the image";
      obj.autor = "Autor name / nick";
      obj.autorEOA = "Ethereum EOA address";
      obj.autorHashSignature = "Autor sign ipfsHash";
      obj.chainId = "1";
      obj.ERC721Address = "";
      const filename = "_" + data.filename.replace(/\.[^/.]+$/, "") + ".json";
      fs.writeFileSync(this.workDirOutputMetadata + filename, JSON.stringify(obj));
    }
    console.log("Please add information to each metadata file then run with --mode=1");
  }

  async uploadMetadata() {
      //get files from dir excluding hidden files
      const files = this.getFilesFromDir(this.workDirOutputMetadata);
      //Upload files to ipfs and save output to file
      const result = await this.uploadAndSave(this.workDirOutputMetadata, files);
  }

  async start() {
  }

  getFilesFromDir(wDir) {
    let filespath = new Array();
    fs.readdirSync(wDir).forEach(file => {
      if (!fs.lstatSync(path.resolve(wDir, file)).isDirectory()) {
        if(! /^\..*/.test(file)) {
          filespath.push(file);
        }
      }
    });

    return filespath;
  }

  async uploadAndSave(workDir, files) {
    let result = new Array();
    for(let file of files) {
      let res = await this.ipfs.upload(workDir + file);
      res.filename = file;
      console.log(res);
      file = file.replace(/\.[^/.]+$/, "") + ".json";
      fs.writeFileSync(this.workDirOutputIPFS + file, JSON.stringify(res));
      result.push(res);
    }

    return result;
  }
}

module.exports = App;
