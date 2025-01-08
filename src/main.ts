import { addTask } from './services/addTask.ts'
import { changeTaskStatus } from './services/changeTaskStatus.ts'
import { deleteTask } from './services/deleteTask.ts'
import { listTasks } from './services/listTasks.ts'
import { updateTask } from './services/updateTask.ts'
import { TaskStatus } from './utils.ts'

function isValidTaskStatus(status: string | undefined | null): status is TaskStatus | null {
if (status === undefined || status === null) return true
return ['done', 'todo', 'in-progress'].includes(status)
}
// check if 'tasks.json' exists if not create it when the app starts
try {
  await Deno.stat('./tasks.json')
} catch {
  await Deno.writeTextFile('./tasks.json', JSON.stringify({ tasks: [] }))
}

const printUsage = () => {
  console.log(`
Usage:
task-cli add "task description"
task-cli update <id> "new description"
task-cli delete <id>
task-cli mark-in-progress <id>
task-cli mark-done <id>
task-cli list                     # list all tasks
task-cli list <done|todo|in-progress>
`)
}

const args = Deno.args

if (args.length === 0) {
  printUsage()
  Deno.exit(1)
}

const command = args[0]

try {
  switch (command) {
    case 'add': {
      if (args.length !== 2) {
        throw new Error('Usage: task-cli add "task description"')
      }
      await addTask(args[1])
      break
    }
    case 'update': {
      if (args.length !== 3) {
        throw new Error('Usage: task-cli update <id> "new description"')
      }
      const id = parseInt(args[1])
      await updateTask(id, args[2])
      break
    }
    case 'delete': {
      if (args.length !== 2) {
        throw new Error('Usage: task-cli delete <id>')
      }
      const id = parseInt(args[1])
      await deleteTask(id)
      break
    }
    case 'mark-in-progress': {
      if (args.length !== 2) {
        throw new Error('Usage: task-cli mark-in-progress <id>')
      }
      const id = parseInt(args[1])
      await changeTaskStatus(id, 'in-progress')
      break
    }
    case 'mark-done': {
      if (args.length !== 2) {
        throw new Error('Usage: task-cli mark-done <id>')
      }
      const id = parseInt(args[1])
      await changeTaskStatus(id, 'done')
      break
    }
    case 'list': {
    const status = args[1] || null
    if (!isValidTaskStatus(status)) {
        throw new Error('Invalid status. Use: done, todo, in-progress, or omit for all tasks')
    }
    await listTasks(status)
    break
    }
    default: {
      printUsage()
      Deno.exit(1)
    }
  }
} catch (error) {
  console.error('Error:', (error as Error).message)
  Deno.exit(1)
}
