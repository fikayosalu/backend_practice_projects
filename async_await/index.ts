import * as fs from "fs";
import * as superagent from "superagent";

// Call back hell

// fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
// 	console.log(`Breed: ${data}`);

// 	superagent
// 		.get(`https://dog.ceo/api/breed/${data}/images/random`)
// 		.end((err, res) => {
// 			if (err) return console.log(err.message);

// 			console.log(res.body.message);

// 			fs.writeFile("dog-img.txt", res.body.message, (err) => {
// 				console.log("Random image saved to file");
// 			});
// 		});
// });

// Fixing call back hell using promises
// fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
// 	console.log(`Breed: ${data}`);

// 	superagent
// 		.get(`https://dog.ceo/api/breed/${data}/images/random`)
// 		.then((res) => {
// 			console.log(res.body.message);
// 			fs.writeFile("dog-img.txt", res.body.message, (err) => {
// 				console.log("Random image saved to file");
// 			});
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// });

const readFilePro = (file: string) => {
	return new Promise<string>((resolve, reject) => {
		fs.readFile(file, "utf-8", (err, data) => {
			if (err) reject(" I could not find the file");
			resolve(data);
		});
	});
};

const writeFilePro = (file: string, data: string) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(file, data, (err) => {
			if (err) reject("I could not write into the file");
			resolve(data);
		});
	});
};

readFilePro(`${__dirname}/dog.txt`)
	.then((data) => {
		console.log(`Breed: ${data}`);
		return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
	})
	.then((res) => {
		console.log(res.body.message);
		writeFilePro("dog-img.txt", res.body.message);
	})
	.then(() => {
		console.log("I just wrote to the file");
	})
	.catch((err) => {
		console.log(err);
	});
