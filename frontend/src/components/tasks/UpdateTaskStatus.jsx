import axios from "axios";
import { useEffect, useState } from "react";

export default function UpdateTaskStatus({ task, projectId, onUpdated }) {
  const [statusValue, setStatusValue] = useState(task.status);

  useEffect(() => {
    setStatusValue(task.status);
  }, [task.status]);

  async function updateStatusHandle(event) {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const { status } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/projects/${projectId}/tasks/${task._id}`,
        {
          status: statusValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (status === 200) {
        await onUpdated();
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  }

  return (
    <form
      onSubmit={updateStatusHandle}
      className="mt-5 border-t border-slate-800 pt-4"
    >
      <label
        htmlFor={`task-status-${task._id}`}
        className="mb-2 block text-sm font-medium text-slate-300"
      >
        Update task status
      </label>

      <div className="flex gap-3">
        <select
          id={`task-status-${task._id}`}
          value={statusValue}
          onChange={(event) => setStatusValue(event.target.value)}
          className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-[#0c1228] px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Update
        </button>
      </div>
    </form>
  );
}
