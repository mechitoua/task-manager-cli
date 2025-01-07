export interface Task {
  id: number;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export enum TaskStatus {
  IN_PROGRESS = 'in progress',
  DONE = 'done',
  TODO = 'todo',
}

export async function readFile(fileName: string) {
  try {
    const data = await Deno.readTextFile(fileName);
    return data;
  } catch {
    console.log('No file found at ./tasks.json');
  }
}

export async function getTasks() {
  const data = await readFile('./tasks.json');
  if (data === undefined) {
    throw new Error('Failed to read tasks.json');
  }
  // extract each task and push it to an array
  const tasks: Task[] = JSON.parse(data).tasks;
  return tasks;
}

export async function generateTaskFromInput(): Promise<Task> {
  const description = await getTaskDescriptionFromUser();
  const status = await getTaskStatusFromUser();
  const createdAt = new Date().toLocaleString();
  const updatedAt = new Date().toLocaleString();
  // make sure the id of the task start from one
  return { id: 1, description, status, createdAt, updatedAt };
}

export async function readInput(): Promise<number | null> {
  const buf = new Uint8Array(1024);
  const n = await Deno.stdin.read(buf);
  if (n === null) return null; // Handle end of input

  const input = new TextDecoder().decode(buf.subarray(0, n)).trim();
  const choice = parseInt(input);
  return isNaN(choice) ? null : choice;
}

export function displayMenu() {
  console.log(`
--------------------Task Manager CLI -------------------
1. List all tasks
2. Add a task
3. Update a task
4. Delete a task
5. Mark a task as 'in progress' or 'done'
6. Exit
---------------------------------------------------------
Choose a Task to perform (number):
  `);
}

export async function getTaskDescriptionFromUser(): Promise<string> {
  const desc = await promptUser('Enter task description: ');
  if (!desc) {
    throw new Error('Task description cannot be empty');
  }
  return desc;
}

export async function getTaskStatusFromUser(): Promise<TaskStatus> {
  const status = await promptUser(
    'Enter task status (todo/in progress/done): '
  );
  if (status === null) {
    throw new Error('Task status cannot be null');
  }
  const validStatus = Object.values(TaskStatus).find((s) => s === status);
  if (!validStatus) {
    throw new Error(
      'Invalid task status, must be one of: ' +
        Object.values(TaskStatus).join(', ')
    );
  }
  return validStatus as TaskStatus;
}

export async function promptUser(prompt: string): Promise<string | null> {
  const buf = new Uint8Array(1024);
  console.log(prompt);
  const n = await Deno.stdin.read(buf);
  if (n === null) return null; // Handle end of input
  const input = new TextDecoder().decode(buf.subarray(0, n)).trim();
  return input;
}
