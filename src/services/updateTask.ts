import { getTasks } from '../utils.ts'

export async function updateTask(taskId: number, description: string): Promise<void> {
  try {
    const tasks = await getTasks()
    if (!Array.isArray(tasks)) {
      throw new Error('Failed to load tasks')
    }

    const index = tasks.findIndex((task) => task.id === taskId)
    if (index === -1) {
      throw new Error(`Task with ID ${taskId} not found`)
    }

    // Preserve existing status and update only description and timestamp
    const existingTask = tasks[index]
    tasks[index] = {
      ...existingTask,
      description,
      updatedAt: new Date().toISOString()
    }

    await Deno.writeTextFile('./tasks.json', JSON.stringify({ tasks }, null, 2))
    console.log('Task updated successfully')
  } catch (error) {
    console.error(`Failed to update task: ${(error as Error).message}`)
    throw error
  }
}
