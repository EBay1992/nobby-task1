"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_1 = __importDefault(require("./routes/todos"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/todos", todos_1.default);
app.get("/", (req, res, next) => {
    res.status(200).json({ message: "Hello world, from aws" });
});
app.use((err, req, res, next) => {
    res.status(500).json({ message: "Internal Service Error" });
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server is running on port:" + port));
