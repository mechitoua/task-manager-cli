import { getTasks } from '../utils.ts'

export async function updateTask(taskId: number, description: string): Promise<void> {
try {
    const validatedDescription = validateTaskDescription(description)
    const tasks = await getTasks()
    
    const index = tasks.findIndex((task) => task.id === taskId)
    if (index === -1) {
    throw new Error(`Task with ID ${taskId} not found`)
    }
    
    // Preserve existing status and update only description and timestamp
    const existingTask = tasks[index]
    tasks[index] = {
    ...existingTask,
    description: validatedDescription,
    updatedAt: new Date().toISOString()
    }

    await Deno.writeTextFile('./tasks.json', JSON.stringify({ tasks }, null, 2))
    console.log('Task updated successfully')
} catch (error) {
const message = error instanceof Error ? error.message : 'An unknown error occurred'
throw new Error(`Failed to update task: ${message}`)
}
}
