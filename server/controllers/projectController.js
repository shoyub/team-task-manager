import Project from "../models/Project.js";
import User from "../models/User.js";


// Create Project
export const createProject = async (req, res) => {
  try {
    const { title, description, members } = req.body;

    const project = await Project.create({
      title,
      description,
      members,
      createdBy: req.user.id,
    });

    res.status(201).json(project);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const updateProject = async (req, res) => {
  try {

    const { projectId } = req.params;

    const { title, description } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    project.title = title || project.title;
    project.description = description || project.description;

    await project.save();

    res.status(200).json(project);

  } catch (error) {

    res.status(500);

    throw new Error(error.message);
  }
};


// Get All Projects
export const getProjects = async (req, res) => {
  try {

    const projects = await Project.find()
      .populate("createdBy", "name email")
      .populate("members", "name email role");

    res.status(200).json(projects);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




// Add Member To Project
export const addMember = async (req, res) => {
  try {

    const { projectId } = req.params;

    const { userId } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const userExists = await User.findById(userId);

    if (!userExists) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (project.members.includes(userId)) {
      return res.status(400).json({
        message: "User already added",
      });
    }

    project.members.push(userId);

    await project.save();

    res.status(200).json({
      message: "Member added successfully",
      project,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const deleteProject = async (req, res) => {
  try {

    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    await project.deleteOne();

    res.status(200).json({
      message: "Project deleted successfully",
    });

  } catch (error) {

    res.status(500);

    throw new Error(error.message);
  }
};