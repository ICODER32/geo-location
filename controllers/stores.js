const Store = require('../models/Store')
// @ controller for api/vq/stores

exports.getStore = async (req, res, next) => {
    try {
        const stores = await Store.find();
        return res.status(200).json({
            success: true,
            count: stores.length,
            data: stores,
        })

    } catch (error) {
        console.error(error)
        res.status(5000).json({
            message: "Server Error"
        })
    }
}

// Create Store Post Request

exports.createStore = async (req, res, next) => {
    try {
        const store = await Store.create(req.body)

        return res.status(201).json({
            success: true,
            data: store
        })
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.status(400).json({ message: "This store already exists" })
        }
        return res.status(500).json({
            message: 'Server Error'
        })
    }
}