const db = require("../models"); 
const Project = db.project
const Officer = db.officer
const Area = db.area
// Create a new project
exports.createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAllProjectDetail = async (req, res) => {
    try {
        const projects = await Project.findAll({
            include: [
            {
                model: Officer,
                attributes: ["firstName","lastName","phone"]
            },
            {
                model: Area,
                attributes: ["area","province","region"]
            }
        ]});
        res.status(200).json(projects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get a project by ID
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update a project
exports.updateProject = async (req, res) => {
    try {
        const [updated] = await Project.update(req.body, {
            where: { projectId: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ message: "Project not found" });
        }
        const updatedProject = await Project.findByPk(req.params.id);
        res.status(200).json(updatedProject);
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete a project
exports.deleteProject = async (req, res) => {
    try {
        const deleted = await Project.destroy({
            where: { projectId: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(204).json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
