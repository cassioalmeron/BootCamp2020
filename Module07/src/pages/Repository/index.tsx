import React from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import {useRouteMatch, Link} from 'react-router-dom'

import logoImg from '../../assets/logo.svg'
import {Header, RepositoryInfo, Issues} from './styles'

interface RepositoryParams {
    repository: string;
}

const Repository:React.FC = () => {
    const { params } = useRouteMatch<RepositoryParams>();
    
    return <>
        <Header>
            <img src={logoImg} alt="Github Explorer"/>
            <Link to="/dashboard">
                <FiChevronLeft size={16} />
                Voltar
            </Link>
        </Header>

        <RepositoryInfo>
            <header>
                <img src="https://avatars.githubusercontent.com/u/50529323?s=460&u=c55a50d54de5aeee129b70abd4ec18c3b364db31&v=4" alt="Cássio Almeron"/>
                <div>
                    <strong></strong>
                    <p></p>
                </div>
            </header>
            <ul>
                <li>
                    <strong>1111</strong>
                    <span>Stars</span>
                </li>
                <li>
                    <strong>1111</strong>
                    <span>Forks</span>
                </li>
                <li>
                    <strong>1111</strong>
                    <span>Issues</span>
                </li>
            </ul>
        </RepositoryInfo>

        <Issues>
            <Link to="">
                <div>
                    <strong>sss</strong>
                    <p>sss</p>
                </div>

                <FiChevronRight size={20} />
            </Link>
        </Issues>
    </>
}

export default Repository