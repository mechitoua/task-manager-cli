import { getTasks, Task, TaskStatus, validateTaskDescription } from '../utils.ts'

export async function addTask(description: string): Promise<number> {
try {
    const validatedDescription = validateTaskDescription(description)
    const tasks = await getTasks()
    
    const newTask: Task = {
    id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    description: validatedDescription,
    status: TaskStatus.TODO,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
    }

    tasks.push(newTask)
    await Deno.writeTextFile(
    './tasks.json',
    JSON.stringify({ tasks }, null, 2)
    )
    return newTask.id
} catch (error) {
    if (error instanceof Error) {
    throw new Error(`Failed to add task: ${error.message}`)
    }
    throw new Error('An unexpected error occurred while adding the task')
}
}
