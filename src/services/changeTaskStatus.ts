import { getTasks, TaskStatus } from '../utils.ts';

const VALID_STATUSES = ['done', 'todo', 'in-progress'] as const;

export async function changeTaskStatus(
  taskId: number,
  newStatus: string
): Promise<void> {
  if (!VALID_STATUSES.includes(newStatus as TaskStatus)) {
    throw new Error(
      `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`
    );
  }

  const tasks = await getTasks();
  if (!Array.isArray(tasks)) {
    throw new Error('Failed to load tasks: Tasks data is not an array');
  }

  const index = tasks.findIndex((task) => task.id === taskId);
  if (index === -1) {
    throw new Error(`Task with ID ${taskId} not found`);
  }

  if (isTaskStatusValid(newStatus) && tasks[index].status !== newStatus) {
    tasks[index].status = newStatus;
    tasks[index].updatedAt = new Date().toLocaleString();
  }

  await Deno.writeTextFile('./tasks.json', JSON.stringify({ tasks }, null, 2));
  console.log(`Task ${taskId} status updated to '${newStatus}'`);
}

function isTaskStatusValid(status: string): status is TaskStatus {
  return ['done', 'todo', 'in-progress'].includes(status);
}
