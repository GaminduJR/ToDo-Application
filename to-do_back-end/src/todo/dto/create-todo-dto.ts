import { TodoStatus } from "../schemas/todo.schema";

export class CreateTodoDto{
    readonly title: string;
    readonly description: string;
    readonly status: TodoStatus;
} 