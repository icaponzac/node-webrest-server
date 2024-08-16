import { Request, Response } from "express"

const todos = [
    {id: 1, text: 'Buy milk', createAt: new Date()},
    {id: 2, text: 'Buy bread', createAt: null },
    {id: 3, text: 'Buy butter', createAt: new Date()},
];

export class TodoController {

    constructor(){}

    public getTodo = (req: Request, res: Response) => {
        res.json(todos);
    };

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: 'ID argument is not number'});

        const todo = todos.find(todo => todo.id === id);
        (todo) ? res.json(todo) : res.status(404).json({error: `Todo with id ${id} not found`})
    };

    public createTodo = (req: Request, res: Response) => {

        const { text } = req.body;
        if(!text) return res.status(400).json({error: 'Text property is required'});

        const newTodo = {
            id: todos.length + 1,
            text,
            createAt: null
        }

        todos.push(newTodo)

        res.json(newTodo)
        // res.json('POST create todo')
    }

    public updateTodo = (req: Request, res: Response) => {

        const id = +req.params.id
        if(isNaN(id)) return res.status(400).json({error: 'ID argument is not number'});

        const todo = todos.find(todo => todo.id === id);
        if(!todo) return res.status(404).json({error: `Todo with id ${id} not found`})

        const { text, createAt } = req.body;

        todo.text = text || todo.text; //si viene el valor usalo si no no haga nada

        (createAt === null) ? todo.createAt = null : todo.createAt = new Date(createAt || todo.createAt); //si tiene valor usalo si no usa el valor anterior

        res.json(todo);
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;

        const todo = todos.find(todo => todo.id === id);
        if(!todo) return res.status(404).json({error: `Todo with id ${id} not found`})

        todos.splice(todos.indexOf(todo), 1);
        res.json(todo);   
    }
}