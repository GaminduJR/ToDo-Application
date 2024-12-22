import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum TodoStatus {
    OPEN = 'OPEN',
    WIP = 'WIP',
    COMPLETED = 'COMPLETED',
}

@Schema({
    timestamps: true,
})
export class Todo {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: String, enum: TodoStatus, default: TodoStatus.OPEN })
    status: TodoStatus;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

