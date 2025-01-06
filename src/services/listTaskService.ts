import { parseJsonFile } from '../utils.ts'

export async function listTasks() {
  const parsedData = await parseJsonFile('./tasks.json') // Assuming this returns the full object
  const parsedTasks = parsedData.tasks

  if (Array.isArray(parsedTasks)) {
    console.log('====================================')
    console.log('              Task List             ')
    console.log('====================================')
    parsedTasks.forEach((task) => {
      console.log(`Id: ${task.id}`)
      console.log(`Description: ${task.description}`)
      console.log(`Status: ${task.status}`)
      console.log(`Created At: ${task.createdAt}`)
      console.log(`Updated At: ${task.updatedAt}`)
      console.log('------------------------------------')
    })
  } else {
    console.error('Parsed tasks is not an array:', parsedTasks)
  }
}
