/*
 * Project: COMP1320 Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 * 
 * Created Date: 
 * Author: 
 * 
 */

const unzipper = require('unzipper'),
  fs = require("fs"),
  PNG = require('pngjs').PNG,
  path = require('path');


/**
 * Description: decompress file from given pathIn, write to given pathOut 
 *  
 * @param {string} pathIn 
 * @param {string} pathOut 
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
	return new Promise((resolve) => {
		fs.createReadStream(pathIn)
			.pipe(unzipper.Extract({ path: pathOut }).on("close", () => {
				console.log("Extraction operation complete");
				resolve();
			}));
	});
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path 
 * 
 * @param {string} path 
 * @return {promise}
 */
const readDir = path => {
	return new Promise((resolve, reject) => {
		fs.readdir(path, "utf8", (err, fileNames) => {
			if (err) reject(err);
			else resolve(fileNames)
		});
	});
}

/**
 * Description: Read in png file by given pathIn, 
 * convert to grayscale and write to given pathOut
 * 
 * @param {string} filePath 
 * @param {string} pathProcessed 
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
	
	return new Promise((resolve) => {

		fs.createReadStream(pathIn)
				.pipe(
					new PNG({
						colorType: 0,
					})
				)
				.on("parsed", function ()  {
					this.pack().pipe(fs.createWriteStream(pathOut+"/" + path.basename(pathIn)));
					resolve();
				});
	});
}

module.exports = {
  unzip,
  readDir,
  grayScale
};