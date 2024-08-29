# TaskTrackerCLI
creating and managing tasks through cli

# Task Tracker CLI

Task Tracker CLI is a simple command-line interface (CLI) application built with Node.js to help you manage your tasks and to-do list. It allows you to perform CRUD operations on tasks, mark tasks as in-progress or done, and list all your tasks. All tasks are stored in a JSON file.

## Features

- **Add Tasks**: Add new tasks to your to-do list.
- **List Tasks**: List all tasks with their status.
- **Update Tasks**: Update the status of a task to "in-progress" or "done".
- **Delete Tasks**: Remove tasks from the list.
- **Persistent Storage**: Tasks are stored in a JSON file and persist across sessions.

## Prerequisites

- [Node.js](https://nodejs.org/) (v12.0.0 or later)

## Installation

1. **Clone the Repository**:

   git clone https://github.com/sairamapuroop/TaskTrackerCLI.git

2. Navigate to the project directory

   cd task-tracker-cli 

## Usage 

- Add a TASK

  node index.js add "New Task Created"

- List all tasks

  node index.js list

- Update a task 

  node index.js update <task-id> <task-status> 

  for eg, 
  node index.js update 1 "completed"

- Delete a task

  node index.js delete <task-id>


