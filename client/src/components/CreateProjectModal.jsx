import { useState } from "react";

import API from "../services/api";

import { toast } from "react-toastify";

const CreateProjectModal = ({
  closeModal,
  fetchProjects,
}) => {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

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
        "/projects",
        formData
      );

      toast.success("Project created");

      fetchProjects();

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

      <div className="bg-white p-8 rounded-2xl w-100">

        <h2 className="text-2xl font-bold mb-5">
          Create Project
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Project Title"
            className="w-full border p-3 mb-4 rounded-lg"
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            className="w-full border p-3 mb-4 rounded-lg"
            rows="4"
            onChange={handleChange}
          />

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
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
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

export default CreateProjectModal;