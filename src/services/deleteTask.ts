import { getTasks } from '../utils.ts'

export async function deleteTask(taskId: number): Promise<void> {
  if (!taskId || isNaN(taskId)) {
    throw new Error('Invalid task ID. Please provide a valid number.')
  }

  const tasks = await getTasks()

  if (!Array.isArray(tasks)) {
    throw new Error('Failed to load tasks.')
  }

  const index = tasks.findIndex((task) => task.id === taskId)

  if (index === -1) {
    throw new Error(`Task with ID ${taskId} not found.`)
  }

  try {
    tasks.splice(index, 1)
    await Deno.writeTextFile('./tasks.json', JSON.stringify({ tasks }, null, 2))
    console.log(`Task ${taskId} deleted successfully.`)
  } catch (error) {
    throw new Error(`Failed to delete task: ${(error as Error).message}`)
  }
}
