import { addTask } from './services/addTask.ts'
import { deleteTask } from './services/deleteTask.ts'
import { listTasks } from './services/listTasks.ts'
import { updateTask } from './services/updateTask.ts'
import { displayMenu, readInput } from './utils.ts'
// check if 'tasks.json' exists if not create it when the app starts
try {
  await Deno.stat('./tasks.json')
} catch {
  await Deno.writeTextFile('./tasks.json', JSON.stringify({ tasks: [] }))
}

displayMenu()
let option: number | null = await readInput()

while (option !== 6) {
  switch (option) {
    case 1: {
      await listTasks()
      break
    }
    case 2: {
      await addTask()
      break
    }
    case 3: {
      await updateTask()
      break
    }
    case 4: {
      await deleteTask()
      break
    }
    case 5: {
      console.log('Mark a task as "in progress" or "done"')
      break
    }
    case 6: {
      console.log('Goodbye, Hope to see you again')
      Deno.exit()
      break
    }
    default: {
      console.log('Invalid option, try again')
    }
  }
  // Get new option from user
  displayMenu()
  option = await readInput() // Ensure you're getting new input
}
