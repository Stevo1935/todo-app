export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface TodoFormValues {
  title: string;
  completed?: boolean;
}
