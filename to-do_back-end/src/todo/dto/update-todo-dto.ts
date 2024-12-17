import { TodoStatus } from "../schemas/todo.schema";

export class UpdateTodoDto{
    readonly title: string;
    readonly description: string;
    readonly status: TodoStatus;
}