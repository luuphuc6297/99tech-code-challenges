import mongoose, { Document, Schema } from 'mongoose';

export interface ResourceDocument extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const ResourceSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        autoIndex: true,
    },
);

ResourceSchema.index({ createdAt: -1, name: 1 });

export const ResourceModel = mongoose.model<ResourceDocument>('Resource', ResourceSchema);
