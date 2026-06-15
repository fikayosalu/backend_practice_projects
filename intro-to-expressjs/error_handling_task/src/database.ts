// Simulates database delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function findUser(id: string) {
	await delay(500); // simulate db lookup
	const users: Record<string, { name: string; balance: number }> = {
		user1: { name: "Tolu", balance: 5000 },
		user2: { name: "Ade", balance: 5000 },
		user3: { name: "Sayo", balance: 5000 },
	};

	const user = users[id];
	if (!user) throw new Error("User not found");
	return { id, ...user };
}

export async function updateBalance(id: string, newBalance: number) {
	await delay(300); // simulate db write

	if (Math.random() < 0.1) {
		throw new Error("Database write failed"); // simulate random db failure
	}

	return { id, balance: newBalance };
}
