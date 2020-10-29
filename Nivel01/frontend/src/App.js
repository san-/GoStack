import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import api from './services/api';

// import { Container } from './styles';
import "./App.css";
import brackgroundImage from './assets/background.jpeg';

function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('/projects').then(response => {
            setProjects(response.data);
        })
    }, []);

    async function handleAddClick() {
        // setProjects([...projects, `Novo projeto ${Date.now()}`]);
        const response = await api.post('/projects', {
            title: `Novo projeto ${Date.now()}`, 
            owner: 'Sandro Valgoi'
        });
        const project = response.data;
        
        setProjects([...projects, project]);
    }

    return (
        <>
            <Header title="Projects" />
            {/* <img width={250} src={brackgroundImage}/> */}
            <ul>
                {projects.map(project => <li key={project.id}>
                    {project.title}
                    </li>)}
            </ul>
            <button type="button" onClick={handleAddClick}>Add project</button>
        </>
    );
}

export default App;