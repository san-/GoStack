const { json } = require('express');
const express = require('express');
const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();
app.use(express.json());

const projects = [];

function logRequests(request, response, next) {
    const { method, url } = request;
    const logLabel = `[${method.toUpperCase()}] ${url}`;
    console.time(logLabel);
    next();
    console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
    const { id } = request.params;
    if (!isUuid(id)) {
        return response.status(400).json({ error: 'Invalid project ID.' })
    }
    return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectId);

app.get('/projects', (request, response) => {
    const { title } = request.query;
    const result = title
        ? projects.filter(project => project.title.includes(title))
        : projects;

    return response.json(projects);
});

app.post('/projects', (request, response) => {
    const { title, owner } = request.body;
    const project = { id: uuid(), title, owner };
    projects.push(project);
    return response.json(project);
});

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const index = projects.findIndex(project => project.id === id);
    if (index < 0) {
        return response.status(400).json({ error: "Project not found" });
    }
    const { title, owner } = request.body;
    const project = { id, title, owner };

    projects[index] = project;

    return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;
    const index = projects.findIndex(project => project.id === id);
    if (index < 0) {
        return response.status(400).json({ error: "Project not found" });
    }

    projects.splice(index, 1);

    return response.json({ success: "Success!" });
});


app.listen(3333, () => {
    console.log('(¬‿¬) Back-end started')
});

