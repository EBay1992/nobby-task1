"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const TodoModel_1 = __importDefault(require("../model/TodoModel"));
const uuid_1 = require("uuid");
let todos = [];
const createTodo = (req, res, next) => {
    const id = (0, uuid_1.v4)();
    const { title, description } = req.body;
    if (title && description) {
        const newTodo = new TodoModel_1.default(id, title, description);
        console.log(newTodo);
        todos.push(newTodo);
        return res.status(201).json({
            message: "The todo is created successfully",
            createdTodo: newTodo,
        });
    }
    res
        .status(400)
        .json({ message: "Please fill the title and description fields" });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.status(200).json({ message: "All your todos", todos: todos });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    const { title, description } = req.body;
    const foundTodoIndex = todos.findIndex((todo) => todo.id === id);
    console.log(foundTodoIndex);
    if (foundTodoIndex !== -1) {
        const foundTodo = todos[foundTodoIndex];
        if (title) {
            foundTodo.title = title;
        }
        if (description) {
            foundTodo.description = description;
        }
        todos[foundTodoIndex] = foundTodo;
        res.status(200).json(foundTodo);
    }
    else {
        res.status(404).json({ message: "The todo does not exist" });
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const { id } = req.params;
    const foundTodoIndex = todos.findIndex((todo) => todo.id === id);
    if (foundTodoIndex !== -1) {
        todos = todos.filter((todo) => id !== todo.id);
        res.status(200).json({ message: "The todo has been deleted" });
    }
    else {
        res.status(404).json({ message: "The todo does not exist" });
    }
};
exports.deleteTodo = deleteTodo;
