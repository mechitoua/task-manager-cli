import { generateTaskFromInput, getTasks, promptUser } from '../utils.ts'

export async function updateTask() {
  const tasks = await getTasks()
  if (Array.isArray(tasks)) {
    const taskId = await promptUser('Enter the id of the task to update: ')
    if (taskId === null) {
      console.error('Task ID cannot be null')
      return
    }
    const index = tasks.findIndex((task) => task.id === parseInt(taskId))
    if (index !== -1) {
      const updatedTask = await generateTaskFromInput()
      tasks[index] = updatedTask
      await Deno.writeTextFile('./tasks.json', JSON.stringify({ tasks }))
      console.log('Task updated successfully')
    } else {
      console.log('Task with the specified id not found')
    }
  }
}
