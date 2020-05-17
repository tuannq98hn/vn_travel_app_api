import mongoose, { Schema } from 'mongoose'

const roomSchema = new Schema(
  {
    creator: {
      type: Schema.ObjectId,
      ref: 'User'
      // required: true
    },
    name: {
      type: String
    },
    description: {
      type: String
    },
    cover: {
      type: String
    },
    background: {
      type: String
    },
    member: {
      type: [{ userId: String, socketId: String }]
    },
    invited: {
      type: [{ userId: String }]
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

roomSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      creator: this.creator.view(full),
      name: this.name,
      description: this.description,
      cover: this.cover,
      background: this.background,
      member: this.member,
      invited: this.invited,
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

const model = mongoose.model('Room', roomSchema)

export const schema = model.schema
export default model
