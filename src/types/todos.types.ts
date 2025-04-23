export type Todos = {
  id: number;
  title: string;
  description: string;
  status: boolean;
};

export type TodoStore = {
  todos: Todos[];
  addTodo: (title: string, description: string) => void;
  updateTodo: (id: number, title: string, description: string) => void;
  updateStatusTodo: (id: number, status: boolean) => void;
  deleteTodo: (id: number) => void;
};
