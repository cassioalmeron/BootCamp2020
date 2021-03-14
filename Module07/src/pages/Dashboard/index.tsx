import React, { FormEvent, useState, useEffect } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/logo.svg'
import {Title, Form, Repositories, Error} from './styles'
import api from '../../services/api'

interface Repository {
    full_name: string;
    owner: {
        login: string;
        avatar_url: string;
    },
    description: string;
}

const localStorageKey = '@GithubExplorer:repositories'

const Dashboard:React.FC = () => {
    const [newRepo, setNewRepo] = useState('');
    const [inputError, setInputError] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storagedRepositories = localStorage.getItem(localStorageKey);
        if (storagedRepositories)
            return JSON.parse(storagedRepositories);
        return []
    });

    useEffect(()=>{
        
    }, [])

    useEffect(()=>{
        localStorage.setItem(localStorageKey, JSON.stringify(repositories))
    }, [repositories])

    async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setInputError('')
        
        if (!newRepo){
            setInputError('Digite o autor/nome do repositório')
            return;
        }

        try{
            const response = await api.get<Repository>(`repos/${newRepo}`);

            const repository = response.data;
    
            setRepositories([...repositories, repository])
            setNewRepo('');
        }
        catch (err){
            setInputError('Erro na busca por esse repositório')
        }
    }

    return <>
        <img src={logoImg} alt="Github Explorer"/>
        <Title>Explore repositórios no GitHub</Title>

        <Form hasError={!!inputError} onSubmit={handleAddRepository}>
            <input 
                value={newRepo}
                onChange={e => setNewRepo(e.target.value)}
                placeholder="Digite o nome do repositório"/>
            <button type="submit">Pesquisar</button>
        </Form>

        {inputError && (<Error>{inputError}</Error>)} 

        <Repositories>
            {repositories.map(repository =>
                <Link to={`/repository/${repository.full_name}`} href="teste" key={repository.full_name}>
                    <img 
                        src={repository.owner.avatar_url} 
                        alt={repository.owner.login}
                    />

                    <div>
                        <strong>{repository.full_name}</strong>
                        <p>{repository.description}</p>
                    </div>
                    
                    <FiChevronRight size={20} />
                </Link>
            )}
            
            
        </Repositories>
    </>
}

export default Dashboard