import axios from "axios";
import { useForm } from "react-hook-form";

export default function CreateTask({
  projectId,
  members,
  onCreated,
  onCancel,
}) {
  const { register, handleSubmit, reset } = useForm();

  async function createTaskHandle(value) {
    try {
      const token = localStorage.getItem("token");

      const { status } = await axios.post(
        `http://localhost:3000/projects/${projectId}/tasks`,
        value,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (status === 201) {
        reset();
        onCreated();
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(createTaskHandle)}
      className="mt-6 space-y-5 rounded-2xl border border-slate-800 bg-[#11172a] p-6"
    >
      <div>
        <h3 className="text-xl font-bold">Create New Task</h3>

        <p className="mt-1 text-sm text-slate-400">
          Add the task information and assign it to a project member.
        </p>
      </div>

      {/* Title */}
      <div>
        <label
          htmlFor="taskTitle"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Task title
        </label>

        <input
          id="taskTitle"
          type="text"
          {...register("title")}
          required
          placeholder="Enter task title"
          className="w-full rounded-xl border border-slate-700 bg-[#0c1228] px-4 py-3 text-white outline-none focus:border-violet-500"
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="taskDescription"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Description
        </label>

        <textarea
          id="taskDescription"
          rows="4"
          {...register("description")}
          required
          placeholder="Describe the task..."
          className="w-full resize-none rounded-xl border border-slate-700 bg-[#0c1228] px-4 py-3 text-white outline-none focus:border-violet-500"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {/* Priority */}
        <div>
          <label
            htmlFor="taskPriority"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Priority
          </label>

          <select
            id="taskPriority"
            {...register("priority")}
            required
            defaultValue=""
            className="w-full rounded-xl border border-slate-700 bg-[#0c1228] px-4 py-3 text-white outline-none focus:border-violet-500"
          >
            <option value="" disabled>
              Select priority
            </option>

            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label
            htmlFor="taskDueDate"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Due date
          </label>

          <input
            id="taskDueDate"
            type="date"
            {...register("dueDate")}
            required
            className="w-full rounded-xl border border-slate-700 bg-[#0c1228] px-4 py-3 text-white outline-none focus:border-violet-500"
          />
        </div>

        {/* Assignee */}
        <div>
          <label
            htmlFor="taskAssignee"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Assignee
          </label>

          <select
            id="taskAssignee"
            {...register("assignee")}
            required
            defaultValue=""
            className="w-full rounded-xl border border-slate-700 bg-[#0c1228] px-4 py-3 text-white outline-none focus:border-violet-500"
          >
            <option value="" disabled>
              Select member
            </option>

            {members.map((member) => (
              <option key={member._id} value={member._id}>
                {member.firstName} {member.lastName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Buttons */}
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
          Create Task
        </button>
      </div>
    </form>
  );
}
