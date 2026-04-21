import { Model, Types, model, models, Schema } from 'mongoose';

import { EPostType } from '@/types/post-types';

interface IPostModel {
  title: string;
  type: EPostType;
  tags: Types.ObjectId[];
  description: string;
  ownerId: Types.ObjectId;
  checklist?: string[];
  codeExample?: string;
  content?: string;
  learningResources?: {
    label: string;
    link: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

interface ILearningResourcesSchema {
  label: string;
  link: string;
}

const learningResourcesSchema = new Schema<ILearningResourcesSchema>({
  label: { type: String, required: true },
  link: { type: String, required: true },
});

const postSchema = new Schema<IPostModel>(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: [EPostType.COMPONENT, EPostType.KNOWLEDGE, EPostType.WORKFLOW],
      required: true,
    },
    description: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    ownerId: { type: Schema.Types.ObjectId, required: true },
    checklist: [String],
    codeExample: String,
    content: String,
    learningResources: [learningResourcesSchema],
  },
  { timestamps: true }
);

const Post: Model<IPostModel> =
  models?.Post || model<IPostModel>('Post', postSchema);

export default Post;
