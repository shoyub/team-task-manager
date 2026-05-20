import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";

const Dashboard = () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [stats, setStats] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchStats();

  }, []);

  const fetchStats = async () => {

    try {

      setLoading(true);

      const { data } = await API.get(
        "/tasks/dashboard/stats"
      );

      setStats(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Total Tasks",
      value: stats.totalTasks || 0,
      color: "bg-blue-500",
    },
    {
      title: "Completed",
      value: stats.completedTasks || 0,
      color: "bg-green-500",
    },
    {
      title: "Pending",
      value: stats.pendingTasks || 0,
      color: "bg-yellow-500",
    },
    {
      title: "In Progress",
      value: stats.inProgressTasks || 0,
      color: "bg-purple-500",
    },
    {
      title: "Overdue",
      value: stats.overdueTasks || 0,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-4 md:p-8">

        {/* Welcome */}
        <div className="bg-white rounded-2xl shadow p-8 mb-8">

          <h1 className="text-4xl font-bold text-blue-600">
            Welcome, {user?.name}
          </h1>

          <p className="text-gray-500 mt-2">
            Manage projects, assign tasks and
            track team productivity.
          </p>

        </div>

        {/* Loading */}
        {
          loading ? (

            <div className="flex justify-center items-center h-40">

              <p className="text-xl font-semibold text-gray-500">
                Loading dashboard...
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">

              {
                cards.map((card, index) => (

                  <div
                    key={index}
                    className={`${card.color} text-white rounded-2xl shadow p-6`}
                  >

                    <h2 className="text-lg">
                      {card.title}
                    </h2>

                    <h1 className="text-4xl font-bold mt-4">
                      {card.value}
                    </h1>

                  </div>
                ))
              }

            </div>
          )
        }

      </div>

    </div>
  );
};

export default Dashboard;