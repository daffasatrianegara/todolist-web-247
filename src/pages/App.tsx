import { useState } from 'react';
import useTodoStore from '../stores/todoStore';
import { TodoState } from '../types/todos.types';
import ActivityTodoComponent from '../components/activityCount.components';

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
    <div className="min-h-screen w-full bg-[#D7DDE2]">
      <div className="p-7 sm:p-10 md:p-12">
        <p className="text-xl font-bold text-[#252525] sm:text-2xl md:text-3xl">
          TodoListify — Bikin semua tugas tertata.
        </p>
        <p className="text-sm font-semibold text-[#938eae] sm:text-lg md:text-xl">
          List sekarang, selesai nanti.
        </p>
        <div className="my-5 flex w-full flex-col-reverse gap-3 sm:flex-row">
          <div className="w-full rounded-lg bg-[#F6F6F6] p-5 text-[#252525] sm:w-1/2">
            <p className="text-lg font-bold sm:text-xl md:text-2xl">
              {editId === null ? 'Tambah' : 'Perbarui'} Kegiatan
            </p>
            <div className="flex w-full flex-col">
              <label className="text-md my-1 font-semibold sm:text-lg md:text-xl" htmlFor="">
                Judul Kegiatan
              </label>
              <input
                className="h-8 rounded border-1 border-gray-500 ps-2"
                type="text"
                value={todo.title}
                onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                placeholder="Masukkan judul kegiatan anda..."
              />
              <label className="text-md mt-3 mb-1 font-semibold sm:text-lg md:text-xl" htmlFor="">
                Deskripsi Kegiatan
              </label>
              <textarea
                className="h-20 rounded border-1 border-gray-500 ps-2"
                value={todo.description}
                onChange={(e) => setTodo({ ...todo, description: e.target.value })}
                placeholder="Masukkan judul kegiatan anda..."
              />
              <div className="mt-5 flex w-full gap-3">
                <button
                  className="cursor-pointer rounded bg-red-600 px-5 py-1 font-semibold text-white hover:bg-red-500"
                  onClick={() => {
                    setTodo({ title: '', description: '' });
                    setEditId(null);
                  }}
                >
                  Hapus
                </button>
                <button
                  className="cursor-pointer rounded bg-green-600 px-5 py-1 font-semibold text-white hover:bg-green-500"
                  onClick={handleSubmit}
                >
                  {editId === null ? 'Tambah' : 'Perbarui'} Kegiatan
                </button>
              </div>
            </div>
          </div>
          <div className="w-full rounded-lg bg-[#252525] p-5 sm:w-1/2">
            <ActivityTodoComponent todos={todos} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
