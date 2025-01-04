# Task Tracker CLI Application Requirements

## Overview

Develop a command line application (CLI) that manages tasks. The application should accept user actions and inputs as arguments, and store tasks in a JSON file.

## Functional Requirements

- Add, update, and delete tasks
- Mark tasks as 'in progress' or 'done'
- List all tasks
- List tasks based on their status (done, todo, in progress)

## Technical Requirements

- Use any programming language
- Accept user inputs as positional arguments in the command line
- Store tasks in a JSON file in the current directory
- Create the JSON file if it does not exist
- Use the native file system module of the programming language to interact with the JSON file
- Do not use external libraries or frameworks
- Handle errors and edge cases gracefully

## Task Properties

Each task should have the following properties:

- `id`: Unique identifier
- `description`: Short task description
- `status`: Task status (todo, in progress, done)
- `createdAt`: Date and time of creation
- `updatedAt`: Date and time of last update

## Usage Examples

- Add a new task: `task-cli add "Buy groceries"`
- Update a task: `task-cli update 1 "Buy groceries and cook dinner"`
- Delete a task: `task-cli delete 1`
- Mark a task as in progress: `task-cli mark-in-progress 1`
- Mark a task as done: `task-cli mark-done 1`
- List all tasks: `task-cli list`
- List tasks by status: `task-cli list done`, `task-cli list todo`, `task-cli list in-progress`

---