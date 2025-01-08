![](./public/task-manager.png)

# CLI Task Manager

A simple command-line interface (CLI) application for managing tasks. It allows
you to add, delete, update, and list tasks, as well as mark a task as "in
progress" or "done". Tasks are stored in a JSON file for persistence.

## Functionality

- Add a new task with a description and status
- Delete an existing task by ID
- Update an existing task by ID
- List all tasks
- Mark a task as "in progress" or "done"
- Tasks are stored in a JSON file for persistence

## Use Cases

- Use it to keep track of your personal tasks and to-do lists
- Use it to manage tasks for a team project or a group assignment
- Use it to organize your daily tasks and prioritize them based on their status

## Installation

- Clone the repository
- Install Deno if you haven't already (https://deno.land/)
- Run `deno install -A -f --unstable -n task-manager main.ts` to install the CLI
  globally
- Run `task-manager` to start using the CLI

## Usage

- Run `task-manager` to start the CLI
- Follow the prompts to perform the desired task (add, delete, update, list,
  mark as "in progress" or "done")
- Tasks are stored in a JSON file (tasks.json) for persistence

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please
open an issue. If you would like to contribute code, please open a pull request.

## License

This project is licensed under the MIT License.

---
