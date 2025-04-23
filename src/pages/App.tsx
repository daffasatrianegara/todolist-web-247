import { useState } from 'react';
import useTodoStore from '../store/todoStore';
import { TodoState } from '../types/todos.types';

function App() {
  const { todos, addTodo, updateTodo, updateStatusTodo, deleteTodo } = useTodoStore();
  const [page, setPage] = useState<number>(1);
  const [editId, setEditId] = useState<number | null>(null);
  const [todo, setTodo] = useState<TodoState>({
    title: '',
    description: '',
  });

  const handleSubmit = () => {
    if (editId) {
      updateTodo(editId, todo.title, todo.description);
    } else {
      addTodo(todo.title, todo.description);
    }

    setTodo({
      title: '',
      description: '',
    });
  };

  const handleUpdate = (id: number, title: string, description: string) => {
    setEditId(id);
    setTodo({
      title,
      description,
    });
  };

  return <div></div>;
}

export default App;
