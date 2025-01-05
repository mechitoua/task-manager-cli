import { displayMenu, listTasks, readInput } from './services.ts'

displayMenu()
let option: number | null = await readInput()

while (option !== 6) {
  switch (option) {
    case 1: {
      await listTasks() // Display tasks
      break
    }
    // Other cases...
    case 6: {
      console.log('Goodbye, Hope to see you again')
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
