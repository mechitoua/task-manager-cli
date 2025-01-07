import { getTasks } from '../utils.ts'

export async function listTasks() {
  const tasks = await getTasks()
  // check if the tasks array is empty and if it is, log a message
  if (tasks.length === 0) {
    console.log('No tasks found, try adding some tasks')
  }
  // if the tasks array is not empty, log each task
  if (Array.isArray(tasks)) {
    console.log('====================================')
    console.log('              Task List             ')
    console.log('====================================')
    tasks.forEach((task) => {
      console.log(`Id: ${task.id}`)
      console.log(`Description: ${task.description}`)
      console.log(`Status: ${task.status}`)
      console.log(`Created At: ${task.createdAt}`)
      console.log(`Updated At: ${task.updatedAt}`)
      console.log('------------------------------------')
    })
  } else {
    console.error('Parsed tasks is not an array:', tasks)
  }
}
