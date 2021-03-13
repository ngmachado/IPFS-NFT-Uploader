const axios = require("axios");
const fs = require("fs");
const formData = require("form-data");

class IPFS {

  constructor() {
    this.pinFileToIPFS = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  }


  async upload(path) {

    try {
      let data = new formData();
      data.append("file", fs.createReadStream(`${path}`));
      const res = await axios.post(this.pinFileToIPFS, data, {
        maxContentLength: "Infinity", 
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          pinata_api_key: process.env.PINATA_API_KEY, 
          pinata_secret_api_key: process.env.PINATA_SECRET_KEY,
        },
      });

      return res.data;
    } catch(error) {
      console.error(error);
      throw error;
    }

  }

}

module.exports = IPFS;
