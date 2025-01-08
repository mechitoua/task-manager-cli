import { colors } from 'https://deno.land/x/cliffy@v1.0.0-rc.3/ansi/colors.ts'
import { getTasks, TaskStatus } from '../utils.ts'

function formatDate(dateStr: string): string {
try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) {
    return colors.red('Invalid date')
    }
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
} catch {
    return colors.red('Invalid date')
}
}
export async function listTasks(status: TaskStatus) {
  try {
    const tasks = await getTasks()
    if (!Array.isArray(tasks)) {
      throw new Error('Failed to load tasks: Invalid data format')
    }

    const filteredTasks =
      status === null ? tasks : tasks.filter((task) => task.status === status)

    if (filteredTasks.length === 0) {
      console.log(
        colors.yellow(
          status === null
            ? 'No tasks found. Try adding some tasks!'
            : `No tasks found with status: ${status}`
        )
      )
      return
    }

    // Print header
    console.log(colors.bold('\n Tasks List' + (status !== null ? ` (${status})` : '')))
    console.log(colors.dim('─'.repeat(80)))
    console.log(
      colors.bold(
        `${' ID '.padEnd(6)} | ${'Description'.padEnd(30)} | ${'Status'.padEnd(
          12
        )} | ${'Created'.padEnd(24)}`
      )
    )
    console.log(colors.dim('─'.repeat(80)))

    // Print tasks
    filteredTasks.forEach((task) => {
      const statusColor =
        task.status === 'done'
          ? colors.green
          : task.status === 'in-progress'
          ? colors.yellow
          : colors.red

      console.log(
        ` ${colors.bold(String(task.id).padEnd(4))} | ` +
          `${task.description.padEnd(30)} | ` +
          `${statusColor(task.status.padEnd(12))} | ` +
        `${colors.dim(formatDate(task.createdAt))}`
      )
    })
    console.log(colors.dim('─'.repeat(80)) + '\n')
  } catch (error) {
    console.error(colors.red('Error listing tasks:'), (error as Error).message)
    throw error
  }
}
