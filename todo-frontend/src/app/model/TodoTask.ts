export interface TodoTask {
  id: number;
  owner: string;
  title: string;
  description: string;
  created: Date;
  updated: Date;
  categoryId: number;
  status: TaskStatus;
}

export enum TaskStatus {
  InProgress,
  Done,
}
