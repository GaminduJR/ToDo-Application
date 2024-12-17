import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})

export class Todo {
    
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    status: TodoStatus;
}

export enum TodoStatus {
    OPEN = 'OPEN',
    WIP = 'WIP',
    COMPLETED= 'COMPLETED'
}

export const TodoSchema = SchemaFactory.createForClass(Todo)