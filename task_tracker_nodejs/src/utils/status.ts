import { path } from "./add";
import * as fs from "fs";

type task = {
	id: number;
	description: string;
	status: string;
	created_at: string;
	updated_at: string;
};

const changeStatus = (status: string, id: number): string => {
	try {
		const data = JSON.parse(fs.readFileSync(path, "utf-8"));
		const index = data.findIndex((obj: task) => obj.id === id);
		if (index === -1) return "Task not found";
		data[index].status = status;
		fs.writeFileSync(path, JSON.stringify(data));
		return "Status changed successfully";
	} catch (error) {
		return "Add a task";
	}
};

export default changeStatus;
