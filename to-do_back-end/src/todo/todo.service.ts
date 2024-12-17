import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './schemas/todo.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class TodoService {

    constructor(
        @InjectModel(Todo.name)
        private todoModel: mongoose.Model<Todo>
    ){}

    async findAll(): Promise<Todo[]> {
        const todos = await this.todoModel.find()
        return todos;
    }

    async create(todo: Todo): Promise<Todo>{
        const res = await this.todoModel.create(todo)
        return res;
    }

    async findById(id: string): Promise<Todo>{
        const todo = await this.todoModel.findById(id)

        if(!todo){
            throw new NotFoundException('Todo Not Found.');
        }
        return todo;
    }

    async updateById(id: string, todo: Todo): Promise<Todo>{
        
        return await  this.todoModel.findByIdAndUpdate(id, todo, {
            new: true, 
            runValidators: true,
        });
    }

    async deleteById(id: string): Promise<Todo>{
        const todo = await this.todoModel.findById(id)
        
        if(!todo){
            throw new NotFoundException('Todo Not Found.');
        }
        return await  this.todoModel.findByIdAndDelete(id);
    }
}
    