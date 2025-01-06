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
      console.log('Add a task')
      break
    }
    case 3: {
      console.log('Update a task')
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
