export type TaskCategory = 'penting' | 'biasa';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string; // format: YYYY-MM-DD
  category: TaskCategory;
  isCompleted: boolean;
  completedDate: string | null; // format: YYYY-MM-DD
  createdAt: string; // format: YYYY-MM-DD
}

export interface UserCredentials {
  username: string;
  password: string;
}
