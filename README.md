# IPFS-NFT-Uploader

## Sugar app to help upload multi files to IPFS

You need [Pinata](https://pinata.cloud/) account.


## Installation

Download this project and run

```bash
git clone https://github.com/ngmachado/IPFS-NFT-Uploader
cd IPFS-NFT-Uploader
npm install
```

## How to use

### Set .env file and edit with API and Secret keys [Pinata](https://pinata.cloud/)

```bash
cp env-template .env
```

### Add your images to folder ``` files/ ``` after that run:
```bash
node main
```

### Each file uploaded generate a metadata file that you need to complete. Go to ```files/outputMetadata/``` and edit each file with the correct information.

```bash
node main --mode=1
```


