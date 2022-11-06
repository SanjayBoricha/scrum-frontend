export interface User {
  id: number
  name: string
  email: string
  password: string
  created_at: string
  updated_at: string
}

enum TaskType {
  task = 'task',
  bug = 'bug',
  feature = 'feature',
}

enum TaskPriority {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

enum TaskStatus {
  todo = 'todo',
  in_progress = 'in_progress',
  done = 'done',
}

export interface Task {
  id: number
  title: string
  description: string
  task_type: TaskType
  priority: TaskPriority
  status: TaskStatus
  due_date: string
  board_id: number
  assignee_id: number
  created_by: number
  created_at: string
  updated_at: string
  assignee?: User
}

export interface Board {
  id: number
  name: string
  user_id: number
  project_id: number
  created_at: string
  updated_at: string
  user?: User
}

export interface Project {
  id: number
  name: string
  user_id: number
  created_at: string
  updated_at: string
  boards_count?: number
  boards?: Board[]
  user?: User
}
