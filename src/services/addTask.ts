import { getTasks, Task, TaskStatus } from '../utils.ts'

export async function addTask(description: string): Promise<number> {
  const tasks = await getTasks()
  if (!Array.isArray(tasks)) {
    throw new Error('Failed to load tasks')
  }

  const newTask: Task = {
    id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    description,
    status: TaskStatus.TODO,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  tasks.push(newTask)
  await Deno.writeTextFile('./tasks.json', JSON.stringify({ tasks }))
  return newTask.id
}
