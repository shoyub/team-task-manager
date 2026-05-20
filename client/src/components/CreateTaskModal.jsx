import { useEffect, useState } from "react";

import API from "../services/api";

import { toast } from "react-toastify";

const CreateTaskModal = ({
  closeModal,
  fetchTasks,
}) => {

  const [projects, setProjects] = useState([]);

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    assignedTo: "",
    project: "",
  });

  useEffect(() => {

    fetchProjects();

    fetchUsers();

  }, []);

  const fetchProjects = async () => {

    const { data } = await API.get("/projects");

    setProjects(data);
  };

  const fetchUsers = async () => {

    const { data } = await API.get("/projects");

    let members = [];

    data.forEach((project) => {
      members.push(...project.members);
    });

    setUsers(members);
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await API.post(
        "/tasks",
        formData
      );

      toast.success("Task created");

      fetchTasks();

      closeModal();

    } catch (error) {

      toast.error(
        error.response?.data?.message
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white p-8 rounded-2xl w-112.5">

        <h2 className="text-2xl font-bold mb-5">
          Create Task
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Task Title"
            className="w-full border p-3 mb-4 rounded-lg"
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Task Description"
            className="w-full border p-3 mb-4 rounded-lg"
            rows="3"
            onChange={handleChange}
          />

          <input
            type="date"
            name="dueDate"
            className="w-full border p-3 mb-4 rounded-lg"
            onChange={handleChange}
          />

          <select
            name="assignedTo"
            className="w-full border p-3 mb-4 rounded-lg"
            onChange={handleChange}
          >

            <option value="">
              Select Member
            </option>

            {
              users.map((user) => (

                <option
                  key={user._id}
                  value={user._id}
                >
                  {user.name}
                </option>
              ))
            }

          </select>

          <select
            name="project"
            className="w-full border p-3 mb-4 rounded-lg"
            onChange={handleChange}
          >

            <option value="">
              Select Project
            </option>

            {
              projects.map((project) => (

                <option
                  key={project._id}
                  value={project._id}
                >
                  {project.title}
                </option>
              ))
            }

          </select>

          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-300 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              {
                loading
                  ? "Creating..."
                  : "Create"
              }
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CreateTaskModal;