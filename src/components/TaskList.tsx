import { useState } from "react";
// import axios from "axios";
import Task from "./Task";
import { addTask, ITask } from "../redux/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

const TaskList = () => {
  const { tasks, status } = useSelector((state: RootState) => state.todos);
  const [newTask, setNewTask] = useState<Omit<ITask, "updatedAt" | "id">>({
    title: "",
    isCompleted: false,
  });

  const dispatch: AppDispatch = useDispatch();

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      dispatch(
        addTask({ ...newTask, updatedAt: new Date(), id: tasks.length })
      );
      setNewTask({
        title: "",
        isCompleted: false,
      });
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Task Manager App</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          value={newTask.title}
          onChange={(e) =>
            setNewTask({ title: e.target.value, isCompleted: false })
          }
          className="form-control"
          placeholder="New Task"
        />
        <button onClick={handleAddTask} className="btn btn-primary">
          Add Task
        </button>
      </div>
      <div>
        {status === "loading" && (
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        {status === "success" &&
          tasks.map((task, index) => (
            <Task key={index} task={task} index={index} />
          ))}
        {status === "error" && (
          <>Error!</>
        )}
      </div>
    </div>
  );
};

export default TaskList;
