export interface Task {
  id: number
  description: string
  status: TaskStatus
  createdAt: string
  updatedAt: string
}

export interface TaskUpdate {
  description?: string
  status?: TaskStatus
}

export enum TaskStatus {
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
  TODO = 'todo'
}

export async function readFile(fileName: string): Promise<string> {
  try {
    const data = await Deno.readTextFile(fileName)
    return data
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      throw new Error(`File not found: ${fileName}`)
    }
    throw new Error(`Failed to read file: ${(error as Error).message}`)
  }
}

export async function getTasks(): Promise<Task[]> {
  try {
    const data = await readFile('./tasks.json')
    const parsed = JSON.parse(data)
    if (!Array.isArray(parsed.tasks)) {
      throw new Error('Invalid tasks.json format: tasks must be an array')
    }
    return parsed.tasks
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Invalid JSON format in tasks.json')
    }
    throw error
  }
}

export function isValidTaskStatus(status: string | null): status is TaskStatus {
if (status === null) {
return false
}
return Object.values(TaskStatus).includes(status as TaskStatus)
}

export function validateTaskId(id: unknown): number {
  if (typeof id !== 'number' || isNaN(id) || id < 1) {
    throw new Error('Task ID must be a positive number')
  }
  return id
}

export function validateTaskDescription(description: unknown): string {
if (typeof description !== 'string') {
    throw new Error('Task description must be a string')
}

const trimmed = description.trim()
if (trimmed.length === 0) {
    throw new Error('Task description cannot be empty')
}

if (trimmed.length < 3) {
    throw new Error('Task description must be at least 3 characters long')
}

if (trimmed.length > 500) {
    throw new Error('Task description cannot exceed 500 characters')
}

return trimmed
}

export function createTask(description: string, id: number): Task {
  const now = new Date()
  return {
    id,
    description: validateTaskDescription(description),
    status: TaskStatus.TODO,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  }
}

export async function writeFile(fileName: string, data: string): Promise<void> {
  try {
    await Deno.writeTextFile(fileName, data)
  } catch (error) {
    throw new Error(`Failed to write to file: ${(error as Error).message}`)
  }
}
