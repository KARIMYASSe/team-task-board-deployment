import axios from "axios";
import { useEffect, useState } from "react";
import CreateTask from "../CreateTask/CreateTask";
import TaskCard from "../TaskCard/TaskCard";
import TaskFilters from "../../components/tasks/TaskFilters";

export default function Tasks({ projectId, members = [], canManageProject }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    assignee: "",
  });

  useEffect(() => {
    getTasks();
  }, [projectId, filters.status, filters.priority, filters.assignee]);

  async function getTasks() {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `http://localhost:3000/projects/${projectId}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },

          params: {
            status: filters.status || undefined,
            priority: filters.priority || undefined,
            assignee: filters.assignee || undefined,
          },
        },
      );

      console.log("Tasks:", data);

      setTasks(data);
    } catch (error) {
      console.log(error.response?.data || error.message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }

  async function taskCreatedHandle() {
    await getTasks();
    setShowCreateTask(false);
  }

  return (
    <section className="mt-8 rounded-3xl border border-slate-800 bg-[#0c1228] p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">Project Tasks</h2>

          <p className="mt-1 text-sm text-slate-400">
            Manage all tasks belonging to this project.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateTask(true)}
          className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold transition hover:bg-violet-500"
        >
          + Create Task
        </button>
      </div>

      {showCreateTask && (
        <CreateTask
          projectId={projectId}
          members={members}
          onCreated={taskCreatedHandle}
          onCancel={() => setShowCreateTask(false)}
        />
      )}

      <TaskFilters
        filters={filters}
        setFilters={setFilters}
        members={members}
      />

      {loading ? (
        <div className="mt-6 rounded-2xl border border-slate-800 p-10 text-center">
          <p className="text-slate-400">Loading tasks...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-700 p-10 text-center">
          <p className="text-4xl">✅</p>

          <p className="mt-4 font-semibold">No tasks yet</p>

          <p className="mt-2 text-sm text-slate-500">
            Create the first task for this project.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              projectId={projectId}
              members={members}
              canManageProject={canManageProject}
              onUpdated={getTasks}
              onDeleted={getTasks}
            />
          ))}
        </div>
      )}
    </section>
  );
}
