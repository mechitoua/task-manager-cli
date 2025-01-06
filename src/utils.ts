export interface Task {
  id: number
  description: string
  status: TaskStatus
  createdAt: Date
  updatedAt: Date
}

export enum TaskStatus {
  IN_PROGRESS = 'in progress',
  DONE = 'done',
  TODO = 'todo'
}

export async function parseJsonFile(fileName: string) {
  return JSON.parse((await readFile(fileName)) as string)
}

export async function readFile(fileName: string) {
  try {
    const data = await Deno.readTextFile(fileName)
    return data
  } catch {
    console.log('No file found at ./tasks.json')
  }
}

export async function readInput(): Promise<number | null> {
  const buf = new Uint8Array(1024)
  const n = await Deno.stdin.read(buf)
  if (n === null) return null // Handle end of input

  const input = new TextDecoder().decode(buf.subarray(0, n)).trim()
  const choice = parseInt(input)
  return isNaN(choice) ? null : choice
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
  `)
}
