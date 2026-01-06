/**
 * This module contains helper functions used in the
 * application
 */

import crypto from "crypto";

export const isPalindrome = (str: string) => {
	/* This function accepts a string and 
  returns a boolean depending on if the string is a palindrome  */
	const lowerStr = str.toLowerCase(); // converts string argument to lower case
	let reverseStr = "";
	for (let i = lowerStr.length - 1; i >= 0; i--) {
		reverseStr += lowerStr[i]; // reverses the string
	}

	return reverseStr === lowerStr;
};

export const wordCount = (str: string) => {
	/* Returns the number of words separated by whitespace */
	const arrOfString = str.trim().split(" ");
	return arrOfString.length;
};

export const hash = (str: string) => {
	/* Returns a sha-256 hash representation of the string */
	return crypto.createHash("sha256").update(str).digest("hex");
};

export const characterFrequencyMap = (str: string) => {
	/* Object mapping of each character to its occurrence count */
	const frequency: { [key: string]: number } = {};
	for (let char of str.trim()) {
		if (char in frequency && frequency[char] !== undefined) {
			frequency[char] += 1;
		} else {
			frequency[char] = 1;
		}
	}

	return frequency;
};

export const uniqueCharacter = (str: string) => {
	/* Returns the count of distinct characters in the string */
	const uniqueChars = new Set(str);
	return uniqueChars.size;
};

console.log(uniqueCharacter("string to analyze"));
