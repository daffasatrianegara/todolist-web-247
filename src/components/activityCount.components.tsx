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
    </div>
  );
};

export default ActivityTodoComponent;
