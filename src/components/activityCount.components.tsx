import { useEffect, useState } from 'react';
import { TodoProps } from '../types/todos.types';

const ActivityTodoComponent: React.FC<TodoProps> = ({ todos }) => {
  const [finishedTodo, setFinishedTodo] = useState<number>(0);
  const [unfinishedTodo, setUnfinishedTodo] = useState<number>(0);

  useEffect(() => {
    const done = todos.filter((todo) => todo.status).length;
    const notDone = todos.filter((todo) => !todo.status).length;

    setFinishedTodo(done);
    setUnfinishedTodo(notDone);
  }, [todos]);
  return (
    <div className="w-full">
      <p className="text-lg font-bold text-[#938eae] sm:text-xl md:text-2xl">
        Catatan Kegiatan Anda
      </p>
      <p className="text-md font-semibold text-white sm:text-lg md:text-xl">
        Pantau semua tugas yang sudah dan belum diselesaikan.
      </p>
      <div className="mt-5 flex h-[100%] w-full items-center justify-center gap-3 sm:mt-7">
        <div className="w-1/2 rounded bg-green-400 px-3 py-5">
          <p className="text-center text-base font-semibold sm:text-lg">
            Kegiatan yang sudah selesai
          </p>
          <p className="my-1 text-center text-2xl font-bold sm:my-3 sm:text-5xl">{finishedTodo}</p>
          <p className="text-center text-xl font-bold sm:text-2xl">Kegiatan</p>
        </div>
        <div className="w-1/2 rounded bg-red-400 px-3 py-5">
          <p className="text-base font-semibold sm:text-lg">Kegiatan yang belum selesai:</p>
          <p className="my-1 text-center text-2xl font-bold sm:my-3 sm:text-5xl">
            {unfinishedTodo}
          </p>
          <p className="text-center text-xl font-bold sm:text-2xl">Kegiatan</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityTodoComponent;
