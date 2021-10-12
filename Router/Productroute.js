const Product = require('../model/User')
const createHttpError = require('http-errors')


exports.addproduct = async (req, res, next) => {
    try {
            console.log(req.body)
            const newpro = new Product(req.body);
            const save = await newpro.save()
            res.status(200).send({
                    data: save,
                    message: "Product Added Successfully "
            })
    } catch (error) {
            console.log(error)
            next(error)

    }

}
exports.updateproduct = async (req, res, next) => {
    const rawdata = req.body
    console.log(rawdata)
    try {
            const doesExist = await Product.findOne({ _id: rawdata._id })
            if (!doesExist) throw createHttpError.BadRequest()
            const save = await Product.updateOne({ _id: rawdata._id }, { $set: rawdata })
            res.status(200).send({
                    data: save,
                    message: "Product Updated Successfully "
            })
    }
    catch (error) {
            console.log(error)
            next(error)


    }

}
exports.deleteProduct = async (req, res, next) => {
    try {
            const { id } = req.params
            console.log(id)
            const doesExist = await Product.findOne({ _id: id })
            if (!doesExist) throw createHttpError.BadRequest()
            await Product.deleteOne({ _id: id })
            res.status(200).send({
                    message: "Product deleted  Successfully "
            })

    } catch (error) {
            next(error)
    }

}

exports.AllProduct = async (req, res, next) => {
    try {
            const data = await Product.find()
            if (!data) throw createHttpError.ServiceUnavailable("server error")
            res.status(200).send({
                    product: data
            })

    } catch (error) {
            next(error)
    }

}