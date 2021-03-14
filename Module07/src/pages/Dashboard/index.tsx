import React, { FormEvent, useState } from 'react'
import { FiChevronRight } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'
import {Title, Form, Repositories} from './styles'
import api from '../../services/api'

interface Repository {
    full_name: string;
    owner: {
        login: string;
        avatar_url: string;
    },
    description: string;
}

const Dashboard:React.FC = () => {
    const [newRepo, setNewRepo] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>([]);

    async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const response = await api.get<Repository>(`repos/${newRepo}`);

        const repository = response.data;

        setRepositories([...repositories, repository])
        setNewRepo('');
    }

    return <>
        <img src={logoImg} alt="Github Explorer"/>
        <Title>Explore repositórios no GitHub</Title>

        <Form onSubmit={handleAddRepository}>
            <input 
                value={newRepo}
                onChange={e => setNewRepo(e.target.value)}
                placeholder="Digite o nome do repositório"/>
            <button type="submit">Pesquisar</button>
        </Form>

        <Repositories>
            {repositories.map(repository =>
                <a href="teste" key={repository.full_name}>
                    <img 
                        src={repository.owner.avatar_url} 
                        alt={repository.owner.login}
                    />

                    <div>
                        <strong>{repository.full_name}</strong>
                        <p>{repository.description}</p>
                    </div>
                    
                    <FiChevronRight size={20} />
                </a>
            )}
            
            
        </Repositories>
    </>
}

export default Dashboard