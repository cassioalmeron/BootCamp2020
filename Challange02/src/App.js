import React, {useState, useEffect} from "react";

import "./styles.css";
import api from './services/api'

function App() {
  
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
      api.get('repositories')
      .then(response => 
        {
          setRepositories(response.data);
          console.log(response.data.length, response.data);
        })
  }, [])
  
  async function handleAddRepository() {
    const response = await api.post('repositories', {title: "Desafio ReactJS"});
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    
    const index = repositories.findIndex(repository => repository.id===id);
    const list = [...repositories];
    list.splice(index);
    setRepositories([...list]);
  }

  return (
    <div>
      
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
          )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
