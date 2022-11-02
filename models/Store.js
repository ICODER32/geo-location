const mongoose = require('mongoose')
const geocoder = require('../utils/geocoder')

const StoreSchema = new mongoose.Schema({
    storeId: {
        type: String,
        required: [true, 'Store Id is required'],
        trim: true,
        unique: [true, "Store Id should be different"],
        maxLength: [10, 'Store id must be less than 10 characters']
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,

    }
}, { timestamps: true })


StoreSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address)
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    }

    this.address = undefined;
    next()
})

module.exports = mongoose.model('Store', StoreSchema)