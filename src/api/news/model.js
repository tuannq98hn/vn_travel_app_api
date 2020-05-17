import mongoose, { Schema } from 'mongoose'

const newsSchema = new Schema(
  {
    title: {
      type: String
    },
    imgUrl: {
      type: String
    },
    link: {
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

newsSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      imgUrl: this.imgUrl,
      link: this.link,
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

const model = mongoose.model('New', newsSchema)

export const schema = model.schema
export default model
