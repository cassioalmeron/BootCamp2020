import React from 'react'
import { FiChevronRight } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'
import {Title, Form, Repositories} from './styles'

const Dashboard:React.FC = () =>
    <>
        <img src={logoImg} alt="Github Explorer"/>
        <Title>Explore repositórios no GitHub</Title>

        <Form action="">
            <input placeholder="Digite o nome do repositório"/>
            <button type="submit">Pesquisar</button>
        </Form>

        <Repositories>
            <a href="teste">
                <img src="https://avatars.githubusercontent.com/u/50529323?s=460&u=c55a50d54de5aeee129b70abd4ec18c3b364db31&v=4" alt="Cássio Almeron"/>

                <div>
                    <strong> cassioalmeron / BootCamp2020</strong>
                    <p>The developed about the classes and challanges shown on the BootCamp GoStack, trained by RocketSeat</p>
                </div>
                
                <FiChevronRight size={20} />
            </a>

            <a href="teste">
                <img src="https://avatars.githubusercontent.com/u/50529323?s=460&u=c55a50d54de5aeee129b70abd4ec18c3b364db31&v=4" alt="Cássio Almeron"/>

                <div>
                    <strong> cassioalmeron / BootCamp2020</strong>
                    <p>The developed about the classes and challanges shown on the BootCamp GoStack, trained by RocketSeat</p>
                </div>
                
                <FiChevronRight size={20} />
            </a>

            <a href="teste">
                <img src="https://avatars.githubusercontent.com/u/50529323?s=460&u=c55a50d54de5aeee129b70abd4ec18c3b364db31&v=4" alt="Cássio Almeron"/>

                <div>
                    <strong> cassioalmeron / BootCamp2020</strong>
                    <p>The developed about the classes and challanges shown on the BootCamp GoStack, trained by RocketSeat</p>
                </div>
                
                <FiChevronRight size={20} />
            </a>
        </Repositories>
    </>

export default Dashboard