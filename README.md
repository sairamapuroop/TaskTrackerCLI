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

3. To run CLI commands globally, please link the project

   npm link

## Usage 

- Add a TASK

  task-cli add "New Task Created"

- List all tasks

  task-cli list

- List tasks based on their progress

  task-cli list "in-progress/to-do/completed"

- Update a task 

  task-cli update <task-id> <task-status> 

  for eg, 
  task-cli update 1 "completed"

- Delete a task

  task-cli delete <task-id>


