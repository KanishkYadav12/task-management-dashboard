import { useTasks } from "../../hooks/useTasks";
import TaskItem from "./TaskItem";
import { Inbox, Search, CheckCircle2, Clock } from "lucide-react";

const TaskList = () => {
  const { tasks, filter, searchQuery } = useTasks();

  if (tasks.length === 0) {
    const configs = {
      search: {
        icon: Search,
        title: "No tasks found",
        description: "Try adjusting your search terms",
      },
      completed: {
        icon: CheckCircle2,
        title: "No completed tasks yet",
        description: "Completed tasks will appear here",
      },
      pending: {
        icon: Clock,
        title: "All caught up!",
        description: "You have no pending tasks",
      },
      default: {
        icon: Inbox,
        title: "No tasks yet",
        description: "Create your first task to get started",
      },
    };

    const state = searchQuery
      ? "search"
      : filter === "completed"
      ? "completed"
      : filter === "pending"
      ? "pending"
      : "default";

    const { icon: Icon, title, description } = configs[state];

    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex items-center justify-center w-16 h-16 mb-4 bg-slate-100 dark:bg-slate-900 rounded-2xl">
          <Icon
            className="w-8 h-8 text-slate-400 dark:text-slate-500"
            strokeWidth={2}
          />
        </div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
          {title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className="animate-fadeIn"
          style={{ animationDelay: `${index * 40}ms` }}
        >
          <TaskItem task={task} />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
