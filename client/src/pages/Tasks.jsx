import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import API from "../services/api";

import CreateTaskModal from "../components/CreateTaskModal";

import EditTaskModal from "../components/EditTaskModal";

import { toast } from "react-toastify";

const Tasks = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);

  const [editModal, setEditModal] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks = async () => {

    try {

      setLoading(true);

      const { data } = await API.get("/tasks");

      setTasks(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  const updateStatus = async (
    taskId,
    status
  ) => {

    try {

      await API.put(
        `/tasks/${taskId}/status`,
        { status }
      );

      toast.success("Status updated");

      fetchTasks();

    } catch (error) {

      toast.error(
        error.response?.data?.message
      );
    }
  };

  const deleteTask = async (taskId) => {

    const confirmDelete = window.confirm(
      "Delete this task?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(`/tasks/${taskId}`);

      toast.success("Task deleted");

      fetchTasks();

    } catch (error) {

      toast.error(
        error.response?.data?.message
      );
    }
  };

  // Filter logic
  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter(
          (task) => task.status === filter
        );

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-4 md:p-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

          <h1 className="text-3xl font-bold">
            Tasks
          </h1>

          <div className="flex gap-3 flex-wrap">

            {/* Filter */}
            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
              className="border px-4 py-2 rounded-lg"
            >

              <option value="All">
                All
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Completed">
                Completed
              </option>

            </select>

            {/* Admin Create */}
            {
              user?.role === "Admin" && (
                <button
                  onClick={() =>
                    setShowModal(true)
                  }
                  className="bg-green-600 text-white px-5 py-3 rounded-lg"
                >
                  + Create Task
                </button>
              )
            }

          </div>

        </div>

        {/* Loading */}
        {
          loading ? (

            <div className="flex justify-center items-center h-40">

              <p className="text-xl font-semibold text-gray-500">
                Loading tasks...
              </p>

            </div>

          ) : filteredTasks.length === 0 ? (

            <div className="bg-white rounded-2xl shadow p-10 text-center">

              <h2 className="text-2xl font-bold text-gray-700">
                No Tasks Found
              </h2>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {filteredTasks.map((task) => (

                <div
                  key={task._id}
                  className="bg-white p-6 rounded-2xl shadow"
                >

                  {/* Title */}
                  <div className="flex justify-between items-start">

                    <h2 className="text-2xl font-bold">
                      {task.title}
                    </h2>

                    {/* Status Badge */}
                    <span
                      className={`px-3 py-1 rounded-full text-sm text-white
                      ${
                        task.status === "Completed"
                          ? "bg-green-500"
                          : task.status === "In Progress"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {task.status}
                    </span>

                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mt-3">
                    {task.description}
                  </p>

                  {/* Info */}
                  <div className="mt-5 space-y-2">

                    <p>
                      Assigned To:
                      <span className="font-semibold ml-2">
                        {task.assignedTo?.name}
                      </span>
                    </p>

                    <p>
                      Project:
                      <span className="font-semibold ml-2">
                        {task.project?.title}
                      </span>
                    </p>

                    <p>
                      Due:
                      <span className="font-semibold ml-2">
                        {
                          new Date(
                            task.dueDate
                          ).toLocaleDateString()
                        }
                      </span>
                    </p>

                  </div>

                  {/* Overdue */}
                  {
                    new Date(task.dueDate) < new Date() &&
                    task.status !== "Completed" && (

                      <p className="text-red-500 font-bold mt-4">
                        Overdue
                      </p>
                    )
                  }

                  {/* Status Buttons */}
                  <div className="mt-5 flex flex-wrap gap-2">

                    <button
                      onClick={() =>
                        updateStatus(
                          task._id,
                          "Pending"
                        )
                      }
                      className="bg-yellow-500 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      Pending
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          task._id,
                          "In Progress"
                        )
                      }
                      className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      In Progress
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          task._id,
                          "Completed"
                        )
                      }
                      className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      Completed
                    </button>

                  </div>

                  {/* Admin Buttons */}
                  {
                    user?.role === "Admin" && (

                      <div className="mt-5 flex gap-3">

                        <button
                          onClick={() => {
                            setSelectedTask(task);
                            setEditModal(true);
                          }}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteTask(task._id)
                          }
                          className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>

                      </div>
                    )
                  }

                </div>
              ))}

            </div>
          )
        }

      </div>

      {/* Create Modal */}
      {
        showModal && (
          <CreateTaskModal
            closeModal={() =>
              setShowModal(false)
            }
            fetchTasks={fetchTasks}
          />
        )
      }

      {/* Edit Modal */}
      {
        editModal && selectedTask && (
          <EditTaskModal
            task={selectedTask}
            closeModal={() =>
              setEditModal(false)
            }
            fetchTasks={fetchTasks}
          />
        )
      }

    </div>
  );
};

export default Tasks;