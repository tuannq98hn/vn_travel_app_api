import mongoose, { Schema } from 'mongoose'

const commentSchema = new Schema(
  {
    author: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },
    subComment: [
      {
        type: Schema.ObjectId,
        ref: 'Comment'
      }
    ],
    text: {
      type: String
    },
    refer: {
      type: String
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id
      }
    }
  }
)

commentSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      author: this.author.view(),
      subComment: this.subComment,
      text: this.text,
      refer: this.refer,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full
      ? {
          ...view
          // add properties for a full view
        }
      : view
  }
}

const model = mongoose.model('Comment', commentSchema)

export const schema = model.schema
export default model
