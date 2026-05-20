import { useEffect, useState } from "react";

import API from "../services/api";

import { toast } from "react-toastify";

const AddMemberModal = ({
  projectId,
  closeModal,
  fetchProjects,
}) => {

  const [users, setUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers = async () => {

    try {

      const { data } = await API.get("/users");

      // Only members
      const filteredUsers = data.filter(
        (user) => user.role === "Member"
      );

      setUsers(filteredUsers);

    } catch (error) {

      console.log(error);
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await API.put(
        `/projects/${projectId}/add-member`,
        {
          userId: selectedUser,
        }
      );

      toast.success("Member added");

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
          Add Member
        </h2>

        <form onSubmit={handleSubmit}>

          <select
            className="w-full border p-3 rounded-lg mb-5"
            onChange={(e) =>
              setSelectedUser(e.target.value)
            }
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
                  ? "Adding..."
                  : "Add"
              }
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddMemberModal;