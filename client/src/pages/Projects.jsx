import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import API from "../services/api";

import CreateProjectModal from "../components/CreateProjectModal";

import AddMemberModal from "../components/AddMemberModal";

import EditProjectModal from "../components/EditProjectModal";

import { toast } from "react-toastify";

const Projects = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);

  const [showMemberModal, setShowMemberModal] = useState(false);

  const [editModal, setEditModal] = useState(false);

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects = async () => {

    try {

      setLoading(true);

      const { data } = await API.get("/projects");

      setProjects(data);

    } catch (error) {

      toast.error("Failed to fetch projects");

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  const deleteProject = async (projectId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(`/projects/${projectId}`);

      toast.success("Project deleted");

      fetchProjects();

    } catch (error) {

      toast.error(
        error.response?.data?.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-4 md:p-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

          <h1 className="text-3xl font-bold">
            Projects
          </h1>

          {
            user?.role === "Admin" && (
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
              >
                + Create Project
              </button>
            )
          }

        </div>

        {/* Loading */}
        {
          loading ? (

            <div className="flex justify-center items-center h-40">

              <p className="text-xl font-semibold text-gray-500">
                Loading projects...
              </p>

            </div>

          ) : projects.length === 0 ? (

            <div className="bg-white rounded-2xl shadow p-10 text-center">

              <h2 className="text-2xl font-bold text-gray-700">
                No Projects Found
              </h2>

              <p className="text-gray-500 mt-2">
                Create your first project to get started.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {projects.map((project) => (

                <div
                  key={project._id}
                  className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
                >

                  {/* Top */}
                  <div className="flex justify-between items-start">

                    <h2 className="text-2xl font-bold text-blue-600">
                      {project.title}
                    </h2>

                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {project.members.length} Members
                    </span>

                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mt-4 min-h-15">
                    {project.description}
                  </p>

                  {/* Members */}
                  <div className="mt-5">

                    <h3 className="font-semibold mb-2">
                      Team Members
                    </h3>

                    <div className="flex flex-wrap gap-2">

                      {
                        project.members.length > 0 ? (

                          project.members.map((member) => (

                            <span
                              key={member._id}
                              className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                            >
                              {member.name}
                            </span>
                          ))

                        ) : (

                          <p className="text-sm text-gray-400">
                            No members added
                          </p>
                        )
                      }

                    </div>

                  </div>

                  {/* Admin Buttons */}
                  {
                    user?.role === "Admin" && (

                      <div className="mt-6 flex flex-wrap gap-3">

                        {/* Add Member */}
                        <button
                          onClick={() => {
                            setSelectedProject(project);
                            setShowMemberModal(true);
                          }}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
                        >
                          Add Member
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => {
                            setSelectedProject(project);
                            setEditModal(true);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                        >
                          Edit
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() =>
                            deleteProject(project._id)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
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

      {/* Create Project Modal */}
      {
        showModal && (
          <CreateProjectModal
            closeModal={() => setShowModal(false)}
            fetchProjects={fetchProjects}
          />
        )
      }

      {/* Add Member Modal */}
      {
        showMemberModal && selectedProject && (
          <AddMemberModal
            projectId={selectedProject._id}
            closeModal={() =>
              setShowMemberModal(false)
            }
            fetchProjects={fetchProjects}
          />
        )
      }

      {/* Edit Project Modal */}
      {
        editModal && selectedProject && (
          <EditProjectModal
            project={selectedProject}
            closeModal={() =>
              setEditModal(false)
            }
            fetchProjects={fetchProjects}
          />
        )
      }

    </div>
  );
};

export default Projects;