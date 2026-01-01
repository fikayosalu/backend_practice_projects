/**
 * This module contains helper functions used in the
 * application
 */

import crypto from "crypto";

const isPalindrome = (str: string) => {
	/* This function accepts a string and 
  returns a boolean depending on if the string is a palindrome  */
	const lowerStr = str.toLowerCase(); // converts string argument to lower case
	let reverseStr = "";
	for (let i = lowerStr.length - 1; i >= 0; i--) {
		reverseStr += lowerStr[i]; // reverses the string
	}

	return reverseStr === lowerStr;
};

const wordCount = (str: string) => {
	/* Returns the number of words separated by whitespace */
	const arrOfString = str.trim().split(" ");
	return arrOfString.length;
};

const hash = (str: string) => {
	/* Returns a sha-256 hash representation of the string */
	return crypto.createHash("sha256").update(str).digest("hex");
};

console.log(hash("My name is"));
