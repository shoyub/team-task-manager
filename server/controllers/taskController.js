import Task from "../models/Task.js";



// Create Task
export const createTask = async (req, res) => {
  try {

    const {
      title,
      description,
      dueDate,
      assignedTo,
      project,
    } = req.body;


    // Validation
    if (!title || !assignedTo || !project) {
      return res.status(400).json({
        message: "Title, assigned user and project are required",
      });
    }


    const task = await Task.create({
      title,
      description,
      dueDate,
      assignedTo,
      project,
    });

    res.status(201).json(task);

  } catch (error) {

    res.status(500);

    throw new Error(error.message);
  }
};



export const updateTask = async (req, res) => {
  try {

    const { taskId } = req.params;

    const {
      title,
      description,
      dueDate,
      assignedTo,
      status,
    } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.assignedTo = assignedTo || task.assignedTo;
    task.status = status || task.status;

    await task.save();

    res.status(200).json(task);

  } catch (error) {

    res.status(500);

    throw new Error(error.message);
  }
};

export const deleteTask = async (req, res) => {
  try {

    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted successfully",
    });

  } catch (error) {

    res.status(500);

    throw new Error(error.message);
  }
};

// Get All Tasks
export const getTasks = async (req, res) => {
  try {

    let tasks;

    // Admin sees all tasks
    if (req.user.role === "Admin") {

      tasks = await Task.find()
        .populate("assignedTo", "name email role")
        .populate("project", "title");

    } else {

      // Member sees only assigned tasks
      tasks = await Task.find({
        assignedTo: req.user.id,
      })
        .populate("assignedTo", "name email role")
        .populate("project", "title");
    }

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500);

    throw new Error(error.message);
  }
};



// Update Task Status
export const updateTaskStatus = async (req, res) => {
  try {

    const { taskId } = req.params;

    const { status } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }


    // Admin can update any task
    if (req.user.role === "Admin") {

      task.status = status;

      await task.save();

      return res.status(200).json(task);
    }


    // Member can update only assigned task
    if (
      req.user.role === "Member" &&
      task.assignedTo.toString() === req.user.id
    ) {

      task.status = status;

      await task.save();

      return res.status(200).json(task);
    }


    // Unauthorized
    return res.status(403).json({
      message: "You are not allowed to update this task",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// Dashboard Stats
export const dashboardStats = async (req, res) => {
  try {

    const totalTasks = await Task.countDocuments();

    const completedTasks = await Task.countDocuments({
      status: "Completed",
    });

    const pendingTasks = await Task.countDocuments({
      status: "Pending",
    });

    const inProgressTasks = await Task.countDocuments({
      status: "In Progress",
    });

    const overdueTasks = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: "Completed" },
    });

    res.status(200).json({
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      overdueTasks,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};