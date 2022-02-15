import { Schema, Document } from 'mongoose';

export const bookSchema = new Schema({
    title: String,
    author: String,
    publisher: String,
    price: Number,
    pages: Number,
    image: { type: String, default: null}
});

export interface bookType extends Document {
    id: string,
    title: string,
    author: string,
    publisher: string,
    price: number,
    pages: number,
    image: string | null
}