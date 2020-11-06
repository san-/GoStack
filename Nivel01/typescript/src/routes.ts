import { Request, Response } from "express";
import createUser from "./services/CreateUser";

export function helloWord(request: Request,
    response: Response) {
    const user = createUser({
        name: "Sandro",
        email: "sandro@valgoi.com.br",
        password: "123456",
        techs: ['Node.js', 'ReactJS', 'ReactNative', { title: "Teste", experience: 99 }]
    });
    response.json({ message: 'Hello World' });
}