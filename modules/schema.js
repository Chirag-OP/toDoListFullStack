import mongoose from 'mongoose';
const { Schema } = mongoose;

const toDoSchema = new Schema({
  value: String, // String is shorthand for {type: String}
  isChecked: {type:Boolean, default:false},
});

export const toDo = mongoose.model('toDo', toDoSchema);