import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

const postSchema = new Schema(
  {
    author: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },
    client: {
      type: String
    },
    description: {
      type: String
    },
    full_url: {
      type: String
    },
    tag: {
      type: String
    },
    thumb_url: {
      type: String
    },
    title: {
      type: String
    },
    comment: [
      {
        type: Schema.ObjectId,
        ref: 'Comment'
      }
    ],
    like: [
      {
        type: Schema.ObjectId,
        ref: 'User'
      }
    ]
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

postSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      author: this.author.view(),
      client: this.client,
      description: this.description,
      full_storage_uri: this.full_storage_uri,
      full_url: this.full_url,
      tag: this.tag,
      thumb_storage_uri: this.thumb_storage_uri,
      thumb_url: this.thumb_url,
      title: this.title,
      like: this.like,
      comment: this.comment.map(o => o.view(full)),
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

postSchema.plugin(mongooseKeywords, { paths: ['title', 'tag'] })

const model = mongoose.model('Post', postSchema)

export const schema = model.schema
export default model
