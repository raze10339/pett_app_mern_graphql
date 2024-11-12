import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const likeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
const noteSchema = new Schema({
    text: {
        type: String,
        minLength: [2, 'Your note text must be at least 3 characters in length']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [likeSchema]
});
const Note = model('Note', noteSchema);
export default Note;
