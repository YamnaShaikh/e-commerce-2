import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
    {
        name: { type:String, required: true},
        rating: { type:Number, required: true},
        comment: { type:String, required: true},
    },
    {
        timestamps: true,
    }
)

const productSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,           // for auto generated ID in mongo, Mongo create 12 bytes ID
            required: false,
            ref: 'user',
            // this is the method of creating relation
        },
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        //squrae brackets for array bcz of multiple reviews as we know we declare reviewSchema in this file.
        reviews: [reviewSchema],
        rating: {
            type: Number,
            required: true,
            default: 0
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0
        },
        prices: {
            type: Number,
            required: true,
            default: 0
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0
        },
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model('Product', productSchema)

export default Product