import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EditTask({
  task,
  projectId,
  members = [],
  onUpdated,
  onCancel,
}) {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const assigneeId =
      typeof task.assignee === "object" ? task.assignee._id : task.assignee;

    reset({
      title: task.title || "",
      description: task.description || "",
      status: task.status || "To Do",
      priority: task.priority || "Medium",
      dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
      assignee: assigneeId || "",
    });
  }, [task, reset]);

  async function updateTaskHandle(value) {
    try {
      const token = localStorage.getItem("token");

      const { status } = await axios.patch(
        `http://localhost:3000/projects/${projectId}/tasks/${task._id}`,
        value,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (status === 200) {
        await onUpdated();
        onCancel();
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(updateTaskHandle)}
      className="mt-5 space-y-5 rounded-2xl border border-slate-700 bg-[#0c1228] p-5"
    >
      <div>
        <h3 className="text-lg font-bold text-white">Edit Task</h3>

        <p className="mt-1 text-sm text-slate-400">
          Update the task information.
        </p>
      </div>

      <div>
        <label
          htmlFor={`title-${task._id}`}
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Task title
        </label>

        <input
          id={`title-${task._id}`}
          type="text"
          {...register("title")}
          required
          className="w-full rounded-xl border border-slate-700 bg-[#11172a] px-4 py-3 text-white outline-none focus:border-violet-500"
        />
      </div>

      <div>
        <label
          htmlFor={`description-${task._id}`}
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Description
        </label>

        <textarea
          id={`description-${task._id}`}
          rows="4"
          {...register("description")}
          required
          className="w-full resize-none rounded-xl border border-slate-700 bg-[#11172a] px-4 py-3 text-white outline-none focus:border-violet-500"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor={`status-${task._id}`}
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Status
          </label>

          <select
            id={`status-${task._id}`}
            {...register("status")}
            className="w-full rounded-xl border border-slate-700 bg-[#11172a] px-4 py-3 text-white outline-none focus:border-violet-500"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div>
          <label
            htmlFor={`priority-${task._id}`}
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Priority
          </label>

          <select
            id={`priority-${task._id}`}
            {...register("priority")}
            className="w-full rounded-xl border border-slate-700 bg-[#11172a] px-4 py-3 text-white outline-none focus:border-violet-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label
            htmlFor={`dueDate-${task._id}`}
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Due date
          </label>

          <input
            id={`dueDate-${task._id}`}
            type="date"
            {...register("dueDate")}
            required
            className="w-full rounded-xl border border-slate-700 bg-[#11172a] px-4 py-3 text-white outline-none focus:border-violet-500"
          />
        </div>

        <div>
          <label
            htmlFor={`assignee-${task._id}`}
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Assignee
          </label>

          <select
            id={`assignee-${task._id}`}
            {...register("assignee")}
            required
            className="w-full rounded-xl border border-slate-700 bg-[#11172a] px-4 py-3 text-white outline-none focus:border-violet-500"
          >
            {members.map((member) => {
              const memberId = typeof member === "object" ? member._id : member;

              const memberName =
                typeof member === "object"
                  ? `${member.firstName || ""} ${member.lastName || ""}`.trim()
                  : "Project member";

              return (
                <option key={memberId} value={memberId}>
                  {memberName}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-slate-800 pt-5">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-slate-800"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
