import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../context/AuthContext";
import EditTask from "../EditTask/EditTask";
import UpdateTaskStatus from "../../components/tasks/UpdateTaskStatus";

export default function TaskCard({
  task,
  projectId,
  members = [],
  onUpdated,
  onDeleted,
  canManageProject,
}) {
  const { user } = useContext(UserContext);

  const [isEditing, setIsEditing] = useState(false);

  const statusClasses = {
    "To Do": "bg-slate-500/15 text-slate-300",
    "In Progress": "bg-blue-500/15 text-blue-300",
    Done: "bg-green-500/15 text-green-300",
  };

  const priorityClasses = {
    Low: "bg-green-500/15 text-green-300",
    Medium: "bg-yellow-500/15 text-yellow-300",
    High: "bg-red-500/15 text-red-300",
  };

  const assignee = typeof task.assignee === "object" ? task.assignee : null;

  const assigneeName = assignee
    ? `${assignee.firstName || ""} ${assignee.lastName || ""}`.trim()
    : "Assigned member";

  const assigneeId =
    typeof task.assignee === "object" ? task.assignee._id : task.assignee;

  const creatorId =
    typeof task.creator === "object" ? task.creator._id : task.creator;

  const currentUserId = user?._id || user?.id;

  const isCreator =
    creatorId && currentUserId && String(creatorId) === String(currentUserId);

  const isAssignee =
    assigneeId && currentUserId && String(assigneeId) === String(currentUserId);

  const canEditTask = canManageProject || isCreator;

  const canDeleteTask = canManageProject || isCreator;

  async function deleteTaskHandle() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const { status } = await axios.delete(
        `http://localhost:3000/projects/${projectId}/tasks/${task._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (status === 200 || status === 204) {
        await onDeleted();
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  }

  return (
    <article className="rounded-2xl border border-slate-800 bg-[#11172a] p-5 transition hover:-translate-y-1 hover:border-violet-500/40">
      {/* Status and Priority */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            statusClasses[task.status] || "bg-slate-500/15 text-slate-300"
          }`}
        >
          {task.status}
        </span>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            priorityClasses[task.priority] || "bg-slate-500/15 text-slate-300"
          }`}
        >
          {task.priority}
        </span>
      </div>

      {/* Task Information */}
      <h3 className="mt-5 text-lg font-bold text-white">{task.title}</h3>

      <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">
        {task.description || "No task description"}
      </p>

      {/* Due Date */}
      <div className="mt-5 border-t border-slate-800 pt-4">
        <p className="text-xs text-slate-500">Due date</p>

        <p className="mt-1 text-sm font-medium text-slate-300">
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString()
            : "No due date"}
        </p>
      </div>

      {/* Assignee */}
      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600/20 text-sm font-bold uppercase text-violet-300">
          {assignee?.firstName?.charAt(0) || "M"}
        </div>

        <div className="min-w-0">
          <p className="text-xs text-slate-500">Assigned to</p>

          <p className="truncate text-sm font-medium text-slate-300">
            {assigneeName}
          </p>
        </div>
      </div>

      {/* Edit and Delete Actions */}
      {(canEditTask || canDeleteTask) && (
        <div className="mt-5 flex gap-3 border-t border-slate-800 pt-4">
          {canEditTask && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex-1 rounded-xl border border-violet-500 px-4 py-2.5 text-sm font-semibold text-violet-300 transition hover:bg-violet-600 hover:text-white"
            >
              Edit Task
            </button>
          )}

          {canDeleteTask && (
            <button
              type="button"
              onClick={deleteTaskHandle}
              className="flex-1 rounded-xl border border-red-500/40 px-4 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
            >
              Delete Task
            </button>
          )}
        </div>
      )}

      {/* Assignee can update status only */}
      {isAssignee && !canEditTask && (
        <UpdateTaskStatus
          task={task}
          projectId={projectId}
          onUpdated={onUpdated}
        />
      )}

      {/* Full Edit Form */}
      {canEditTask && isEditing && (
        <EditTask
          task={task}
          projectId={projectId}
          members={members}
          onUpdated={onUpdated}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </article>
  );
}
