import { useState } from 'react';
import useTodoStore from '../stores/todoStore';
import { TodoState } from '../types/todos.types';
import ActivityTodoComponent from '../components/activityCount.components';
import NullComponent from '../components/404.components';

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

    setEditId(null);
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
          TodoListify — Bikin semua kegiatan tertata.
        </p>
        <p className="text-sm font-semibold text-[#938eae] sm:text-lg md:text-xl">
          List sekarang, selesai nanti.
        </p>
        <div className="mt-5 mb-3 flex w-full flex-col-reverse gap-3 sm:flex-row">
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
        <div className="w-full rounded-lg bg-[#ACA7C9] p-5">
          <p className="text-lg font-bold text-purple-50 sm:text-xl md:text-2xl">Daftar Kegiatan</p>
          <div className="mt-5 mb-3 flex flex-wrap gap-2 sm:gap-3">
            <button
              className={`rounded px-2 py-1 text-xs font-semibold text-white sm:px-5 sm:text-sm ${page == 1 ? 'cursor-default bg-gray-700' : 'cursor-pointer bg-gray-900 hover:bg-gray-700'}`}
              onClick={() => setPage(1)}
            >
              Semua Kegiatan
            </button>
            <button
              className={`rounded px-2 py-1 text-xs font-semibold text-white sm:px-5 sm:text-sm ${page == 2 ? 'cursor-default bg-gray-700' : 'cursor-pointer bg-gray-900 hover:bg-gray-700'}`}
              onClick={() => setPage(2)}
            >
              Kegiatan Selesai
            </button>
            <button
              className={`rounded px-2 py-1 text-xs font-semibold text-white sm:px-5 sm:text-sm ${page == 3 ? 'cursor-default bg-gray-700' : 'cursor-pointer bg-gray-900 hover:bg-gray-700'}`}
              onClick={() => setPage(3)}
            >
              Kegiatan Belum Selesai
            </button>
          </div>
          {todos.length === 0 ? (
            <div className="my-10">
              <NullComponent />
            </div>
          ) : page === 1 ? (
            <div className="mt-5 flex w-full flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              {todos.map((todo) => (
                <div
                  className={`h-fit w-full rounded p-5 sm:w-[48%] ${todo.status === true ? 'bg-green-500' : 'bg-red-500'}`}
                  key={todo.id}
                >
                  <p className="text-lg font-bold text-white sm:text-xl">{todo.title}</p>
                  <div className="my-2 w-full rounded bg-white p-2">
                    <p className="text-xs sm:text-sm">{todo.description}</p>
                  </div>
                  <div className="mt-3 flex w-full justify-end gap-3">
                    <button
                      className="cursor-pointer rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white hover:bg-red-400 sm:text-sm"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      Hapus
                    </button>
                    {todo.status !== true ? (
                      <>
                        <button
                          className="cursor-pointer rounded bg-yellow-500 px-2 py-1 text-xs font-semibold text-gray-950 hover:bg-yellow-400 sm:text-sm"
                          onClick={() => handleUpdate(todo.id, todo.title, todo.description)}
                        >
                          Perbarui
                        </button>
                        <button
                          className="cursor-pointer rounded bg-green-700 px-2 py-1 text-xs font-semibold text-white hover:bg-green-600 sm:text-sm"
                          onClick={() => updateStatusTodo(todo.id)}
                        >
                          Selesai
                        </button>
                      </>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : page === 2 ? (
            <div>
              {todos.filter((todo) => todo.status === true).length === 0 ? (
                <div className="my-10">
                  <NullComponent />
                </div>
              ) : (
                <div className="mt-5 flex w-full flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                  {todos
                    .filter((todo) => todo.status === true)
                    .map((todo) => (
                      <div
                        className={`h-fit w-full rounded p-5 sm:w-[48%] ${todo.status === true ? 'bg-green-500' : 'bg-red-500'}`}
                        key={todo.id}
                      >
                        <p className="text-lg font-bold text-white sm:text-xl">{todo.title}</p>
                        <div className="my-2 w-full rounded bg-white p-2">
                          <p className="text-xs sm:text-sm">{todo.description}</p>
                        </div>
                        <div className="mt-3 flex w-full justify-end gap-3">
                          <button
                            className="cursor-pointer rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white hover:bg-red-400 sm:text-sm"
                            onClick={() => deleteTodo(todo.id)}
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ) : page === 3 ? (
            <div>
              {todos.filter((todo) => todo.status === false).length === 0 ? (
                <div className="my-10">
                  <NullComponent />
                </div>
              ) : (
                <div className="mt-5 flex w-full flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                  {todos
                    .filter((todo) => todo.status === false)
                    .map((todo) => (
                      <div
                        className={`h-fit w-full rounded p-5 sm:w-[48%] ${todo.status === true ? 'bg-green-500' : 'bg-red-500'}`}
                        key={todo.id}
                      >
                        <p className="text-lg font-bold text-white sm:text-xl">{todo.title}</p>
                        <div className="my-2 w-full rounded bg-white p-2">
                          <p className="text-xs sm:text-sm">{todo.description}</p>
                        </div>
                        <div className="mt-3 flex w-full justify-end gap-3">
                          <button
                            className="cursor-pointer rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white hover:bg-red-400 sm:text-sm"
                            onClick={() => deleteTodo(todo.id)}
                          >
                            Hapus
                          </button>
                          {todo.status !== true ? (
                            <>
                              <button
                                className="cursor-pointer rounded bg-yellow-500 px-2 py-1 text-xs font-semibold text-gray-950 hover:bg-yellow-400 sm:text-sm"
                                onClick={() => handleUpdate(todo.id, todo.title, todo.description)}
                              >
                                Perbarui
                              </button>
                              <button
                                className="cursor-pointer rounded bg-green-700 px-2 py-1 text-xs font-semibold text-white hover:bg-green-600 sm:text-sm"
                                onClick={() => updateStatusTodo(todo.id)}
                              >
                                Selesai
                              </button>
                            </>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
