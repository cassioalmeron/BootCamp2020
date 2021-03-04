import {Request, Response} from 'express'
import createUser from './services/CreateUser'

export function cassioAlmeron(request: Request, response: Response){
    const user = createUser({
        name: "Cássio Almeron",
        email: "cassioalmeron@gmail.com",
        password: "123456",
        techs:[
            "C#",
            "PHP",
            "DELPHI",
        ]
    })
    
    response.json({message: 'Cássio Almeron is Back!!! stronger that ever!!!!!', user});
}