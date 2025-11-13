import { path } from "./add";
import * as fs from "fs";

type task = {
	id: number;
	description: string;
	status: string;
	created_at: string;
	updated_at: string;
};

const delete_task = (id: number) => {
	try {
		fs.readFile(path, "utf-8", (err, data) => {
			if (err) {
				throw new Error("Create a task first, the is currently no task");
			} else {
				const list = JSON.parse(data);
				const new_list = list.filter((obj: task) => {
					return obj.id !== id;
				});
				fs.writeFile(path, `${JSON.stringify(new_list)}`, (err) => {});
			}
		});
	} catch (error) {
		const e = error as Error;
		console.log(e.message);
	}
};

export default delete_task;
