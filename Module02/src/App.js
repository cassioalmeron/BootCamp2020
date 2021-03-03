import React, {useState, useEffect} from 'react'
import api from './services/api'

import './App.css'
import Header from './components/Header'
import backgroundImage from './assets/background.jpg'

function App(){
    
    const [projects, setProjects] = useState([])

    function handleAddProject(){
        //setProjects([...projects, 'Novo Projeto'])

        api.post('projects', {
            title: `Noew Project ${Date.now()}`,
	        owner: "Cássio"
        })
        .then(response => {
            setProjects([...projects, response.data])
            alert('Projeto cadastrado com sucesso!')
        })
    }

    useEffect(()=>{
        api.get('projects').then(response => {
            setProjects(response.data)
        });
    }, [])

    return <>
        <Header title="Homepage">
            <ul>
                <li>Linha 1</li>
                <li>Linha 2</li>
            </ul>
        </Header>
        <Header title="Projects">
            <ul>
                <li>Linha 1</li>
                <li>Linha 2</li>
                <li>Linha 3</li>
            </ul>
        </Header>

        <ul>
            {projects.map(project => <li key={project.id}>{project.title}</li>)}
        </ul>

        <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>

        <div>
            <img src={backgroundImage} alt="" width={800} />
        </div>
    </>
}

export default App;