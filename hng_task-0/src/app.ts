import axios from "axios";
import express, { Request, Response } from "express";

export const app = express();

app.get("/me", async (req: Request, res: Response) => {
	let funFact: string;
	try {
		funFact = (await axios.get("https://catfact.ninja/fact", { timeout: 5000 }))
			.data.fact;
	} catch (error) {
		funFact = "Check back for some fun facts";
	}

	res.status(200).json({
		status: "success",
		user: {
			email: "fikayosalu@gmail.com",
			name: "Oluwafikunayomi Emmanuel Salu",
			stack: "Node.js/Express",
		},
		timestamp: new Date().toISOString(),
		fact: funFact,
	});
});
