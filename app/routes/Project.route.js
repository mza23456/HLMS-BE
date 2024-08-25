module.exports =(app) => {
    const router = require('express').Router()
    const projectController = require("../controllers/project.controller")

    router.post('/addProjects', projectController.createProject);
    router.get('/', projectController.getAllProjects);
    router.get('/ProjectInfo', projectController.getAllProjectDetail);
    router.get('/projects/:id', projectController.getProjectById);
    router.put('/projects/:id', projectController.updateProject);
    router.delete('/projects/:id', projectController.deleteProject);

    app.use("/Project",router)
}