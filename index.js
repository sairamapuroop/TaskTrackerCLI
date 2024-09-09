#!/usr/bin/env node

import { writeFile, readFile, access } from "node:fs/promises";
import { constants } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import Fuse from "fuse.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "tasks.json");

async function fileExists(filename) {
  try {
    const filePath = path.join(__dirname, filename);
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

const exists = await fileExists("tasks.json");

async function loadTasks() {
  if (!exists) {
    await writeFile(filePath, JSON.stringify([]));
  }

  const data = await readFile(filePath, { encoding: "utf8" });
  return JSON.parse(data);
}

const saveTasks = async (tasks) => {
  await writeFile(filePath, JSON.stringify(tasks, null, 2));
};

const addTask = async (description) => {
  const tasks = await loadTasks();
  console.log(tasks);
  const newTask = {
    id: tasks.length + 1,
    description,
    status: "to-do",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  tasks.push(newTask);
  await saveTasks(tasks);
  console.log("Task added:", description);
};

const listTasks = async (progress) => {
  const tasks = await loadTasks();

  const newTasks = tasks.filter((task) => {
    return task.status === progress;
  });

  newTasks.forEach((task) => {
    console.log(
      `${task.id}. ${task.description} [${task.status}] ${task.createdAt} ${task.updatedAt}`
    );
  });
};

const updateTask = async (id, status) => {
  const tasks = await loadTasks();
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
  if (taskIndex !== -1) {
    tasks[taskIndex].status = status;
    tasks[taskIndex].updatedAt = new Date();
    await saveTasks(tasks);
    console.log(`Task (TaskID: ${id}) updated to "${status}"`);
  } else {
    console.log("Task not found");
  }
};

const deleteTask = async (id) => {
  const tasks = await loadTasks();
  const updatedTasks = tasks.filter((task) => task.id !== parseInt(id));
  if (tasks.length !== updatedTasks.length) {
    await saveTasks(updatedTasks);
    console.log(`Task (TaskID: ${id}) deleted`);
  } else {
    console.log("Task not found");
  }
};

//search tasks by keywords - implementation
let results = [];

const search = async (task) => {
  if (task === undefined || task === null || task === "") {
    console.log("Try to search for a task");
    return;
  }

  const tasks = await loadTasks();

  if (tasks.length === 0) {
    console.log("No tasks found.");
    return;
  }

  const fuse = new Fuse(tasks, {
    keys: ["description"],
    threshold: 0.3,
  });
  results = fuse.search(task).map((result) => result.item);

  if (results.length > 0) {
    results.forEach((result) => {
      console.log(
        `Task (TaskID: ${result.id}) ${result.description} [${result.status}] ${result.createdAt} ${result.updatedAt}`
      );
    });
  } else {
    console.log("no matching tasks found");
  }
};

const command = process.argv[2];
const args = process.argv.slice(3);

switch (command) {
  case "add":
    addTask(args[0]);
    break;
  case "list":
    listTasks(args[0]);
    break;
  case "update":
    updateTask(args[0], args[1]);
    break;
  case "delete":
    deleteTask(args[0]);
    break;
  case "search":
    search(args[0]);
    break;
  default:
    console.log(`to add a task :                   task-cli add "new task" `);
    console.log(
      `to update a task :                task-cli update <task-id> "new task-2" `
    );
    console.log(`to delete a task :                task-cli delete <task-id> `);
    console.log(`to search a task :                task-cli search <task-description>`);
    
}
