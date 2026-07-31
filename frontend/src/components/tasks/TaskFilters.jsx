export default function TaskFilters({ filters, setFilters, members = [] }) {
  function changeFilterHandle(event) {
    const { name, value } = event.target;

    setFilters((previousFilters) => ({
      ...previousFilters,
      [name]: value,
    }));
  }

  function clearFiltersHandle() {
    setFilters({
      status: "",
      priority: "",
      assignee: "",
    });
  }

  return (
    <div className="mt-6 rounded-2xl border border-slate-800 bg-[#11172a] p-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-semibold text-white">Filter Tasks</h3>

          <p className="mt-1 text-sm text-slate-500">
            Filter tasks by status, priority, or assignee.
          </p>
        </div>

        <button
          type="button"
          onClick={clearFiltersHandle}
          className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-800"
        >
          Clear Filters
        </button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {/* Status */}
        <div>
          <label
            htmlFor="statusFilter"
            className="mb-2 block text-sm text-slate-400"
          >
            Status
          </label>

          <select
            id="statusFilter"
            name="status"
            value={filters.status}
            onChange={changeFilterHandle}
            className="w-full rounded-xl border border-slate-700 bg-[#0c1228] px-4 py-3 text-white outline-none focus:border-violet-500"
          >
            <option value="">All statuses</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label
            htmlFor="priorityFilter"
            className="mb-2 block text-sm text-slate-400"
          >
            Priority
          </label>

          <select
            id="priorityFilter"
            name="priority"
            value={filters.priority}
            onChange={changeFilterHandle}
            className="w-full rounded-xl border border-slate-700 bg-[#0c1228] px-4 py-3 text-white outline-none focus:border-violet-500"
          >
            <option value="">All priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Assignee */}
        <div>
          <label
            htmlFor="assigneeFilter"
            className="mb-2 block text-sm text-slate-400"
          >
            Assignee
          </label>

          <select
            id="assigneeFilter"
            name="assignee"
            value={filters.assignee}
            onChange={changeFilterHandle}
            className="w-full rounded-xl border border-slate-700 bg-[#0c1228] px-4 py-3 text-white outline-none focus:border-violet-500"
          >
            <option value="">All assignees</option>

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
    </div>
  );
}
