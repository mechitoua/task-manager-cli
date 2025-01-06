import { generateTaskFromInput, getTasks, Task } from '../utils.ts'

export async function addTask() {
  const task = await generateTaskFromInput()
  const tasks = await getTasks()
  if (Array.isArray(tasks)) {
    const newTask: Task = {
      ...task,
      id: tasks.length + 1
    }
    tasks.push(newTask)
    await Deno.writeTextFile('./tasks.json', JSON.stringify({ tasks }))
    console.log('Task added successfully')
  } else {
    console.error('Parsed tasks is not an array:', tasks)
  }
}
