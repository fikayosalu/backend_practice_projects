import * as fs from "fs";
import * as superagent from "superagent";

// Call back hell

fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
	console.log(`Breed: ${data}`);

	superagent
		.get(`https://dog.ceo/api/breed/${data}/images/random`)
		.end((err, res) => {
			if (err) return console.log(err.message);

			console.log(res.body.message);

			fs.writeFile("dog-img.txt", res.body.message, (err) => {
				console.log("Random image saved to file");
			});
		});
});

// Fixing call back hell using promises
