import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

export const Post = mongoose.model("Post", postSchema);
````````````````````````````````````````````````````;
````````````````````````````````````````````````````````````````````````````;
