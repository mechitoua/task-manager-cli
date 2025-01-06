import { addTask } from './services/addTaskService.ts'
import { listTasks } from './services/listTaskService.ts'
import { displayMenu, readInput } from './utils.ts'

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
      readInput()
      break
    }
    case 4: {
      console.log('Delete a task')
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
