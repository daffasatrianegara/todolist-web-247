import { useState } from 'react';
import useTodoStore from '../stores/todoStore';
import { TodoState } from '../types/todos.types';

function App() {
  const { todos, addTodo, updateTodo, updateStatusTodo, deleteTodo } = useTodoStore();
  const [page, setPage] = useState<1 | 2 | 3>(1);
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

  return (
    <div className="min-h-screen w-full bg-[#F4F4F4]">
      <div className="p-7 sm:p-10 md:p-12">
        <p className="text-xl font-bold sm:text-2xl md:text-3xl">
          TodoListify — Bikin semua tugas tertata.
        </p>
        <p className="text-sm font-semibold text-[#938eae] sm:text-lg md:text-xl">
          List sekarang, selesai nanti.
        </p>
        <div className="my-5 flex w-full flex-col-reverse gap-3 sm:flex-row">
          <div className="w-full rounded-lg bg-white p-3 sm:w-1/2">
            <label htmlFor="">Judul Kegiatan</label>
            <input
              type="text"
              value={todo.title}
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            />
            <label htmlFor="">Deskripsi Kegiatan</label>
            <input
              type="text"
              value={todo.description}
              onChange={(e) => setTodo({ ...todo, description: e.target.value })}
            />
          </div>
          <div className="w-full rounded-lg bg-[#252525] sm:w-1/2">
            <p>test</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
