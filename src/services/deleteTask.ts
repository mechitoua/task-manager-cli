import { getTasks, promptUser } from '../utils.ts'

export async function deleteTask() {
  const tasks = await getTasks()
  if (Array.isArray(tasks)) {
    const id = await promptUser('Enter the id of the task to delete: ')
    if (id === null) {
      console.error('Task ID cannot be null')
      return
    }
    const index = tasks.findIndex((task) => task.id === parseInt(id))
    if (index !== -1) {
      tasks.splice(index, 1)
      await Deno.writeTextFile('./tasks.json', JSON.stringify({ tasks }))
      console.log('Task deleted successfully')
    } else {
      console.log('Task with the specified id not found')
    }
  }
}
