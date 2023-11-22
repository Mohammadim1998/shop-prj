const Product = require('../models/Product');
const Category = require('../models/Category');
const { validationResult } = require('express-validator');

const getAllProducts = async (req, res) => {
    try {
        if (req.query.pn && req.query.pgn) {
            const paginate = req.query.pgn;
            const pageNumber = req.query.pn;
            const GoalProducts = await Product.find().sort({ _id: -1 }).skip((pageNumber - 1) * paginate).limit(paginate).select({ title: 1, updatedAt: 1, image: 1, imageAlt: 1, published: 1, price: 1, typeOfProduct: 1, buyNumber: 1, pageView: 1 });
            const AllProductsNum = await (await Product.find()).length;
            res.status(200).json({ GoalProducts, AllProductsNum });
        } else {
            const AllProducts = await Product.find().sort({ _id: -1 }).select({ mainFile: false });
            res.status(200).json(AllProducts);
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.getAllProducts = getAllProducts;



// THIS RELATED ProductS IS FOR ADD OR UPDATE A PRODUCT
const getRelProducts = async (req, res) => {
    try {
        const AllProducts = await Product.find({ published: true }).select({ title: 1 });
        res.status(200).json(AllProducts);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.getRelProducts = getRelProducts;


// THIS RELATED CATEGORIES IS FOR ADD OR UPDATE A PRODUCT
const getRelCategoriesOfProducts = async (req, res) => {
    try {
        const AllCategories = await Category.find({ situation: true }).select({ title: 1, slug: 1 });
        res.status(200).json(AllCategories);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.getRelCategoriesOfProducts = getRelCategoriesOfProducts;



const newProduct = async (req, res) => {
    try {
        // EXPRESS VALIDATOR 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ msg: errors.errors[0].msg });
        } else {
            if (req.body.image.endsWith(".png") ||
                req.body.image.endsWith(".jpg") ||
                req.body.image.endsWith(".jpeg") ||
                req.body.image.endsWith(".svg") ||
                req.body.image.endsWith(".webp")) {

                const theFeatures = req.body.features;
                const featuresError = theFeatures.filter(fe => !fe.includes(":"));
                if (featuresError.length > 0) {
                    res.status(422).json({ msg: "الگوی ویژگی ها رعایت نشده است..." });
                } else {
                    const data = req.body;
                    data.slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
                    await Product.create(data);
                    res.status(200).json({ msg: "محصول با موفقیت ذخیره شد" });
                }
            }
            else {
                res.status(422).json({ msg: "فرمت عکس اشتباه هست." });
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.newProduct = newProduct;




const updateProduct = async (req, res) => {
    try {
        // EXPRESS VALIDATOR 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ msg: errors.errors[0].msg });
        } else {
            if (req.body.image.endsWith(".png") ||
                req.body.image.endsWith(".jpg") ||
                req.body.image.endsWith(".jpeg") ||
                req.body.image.endsWith(".svg") ||
                req.body.image.endsWith(".webp")) {


                const theFeatures = req.body.features;
                const featuresError = theFeatures.filter(fe => !fe.includes(":"));
                if (featuresError.length > 0) {
                    res.status(422).json({ msg: "الگوی ویژگی ها رعایت نشده است..." });
                } else {
                    const data = req.body;
                    data.slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
                    await Product.findByIdAndUpdate(req.params.id, data, {
                        new: true
                    });
                    res.status(200).json({ msg: "محصول با موفقیت به روز رسانی شد" });
                }
            }
            else {
                res.status(422).json({ msg: "فرمت عکس اشتباه هست." });
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.updateProduct = updateProduct;





const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndRemove(req.params.id);
        res.status(200).json({ msg: "محصول با موفقیت حذف شد." });
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.deleteProduct = deleteProduct;




const getOneProduct = async (req, res) => {
    try {
        const goalProduct = await Product.findOne({ slug: req.params.slug }).select({ mainFile: false });
        if (goalProduct.published == true) {
            // ADD 1 TO Product PAGE VIEW
            const newProduct = {
                pageView: goalProduct.pageView + 1
            }
            await Product.findByIdAndUpdate(goalProduct._id, newProduct, {
                new: true
            });
            res.status(200).json(goalProduct);
        } else {
            res.status(400).json({ msg: "محصول هنوز منتشر نشده است..." })
        }

    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.getOneProduct = getOneProduct;





const getOneProductById = async (req, res) => {
    try {
        const goalProduct = await Product.findById(req.params.id);
        res.status(200).json(goalProduct);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.getOneProductById = getOneProductById;





const getNewProducts = async (req, res) => {
    try {
        const newApps = await Product.find({ published: true, typeOfProduct: "app" }).sort({ _id: -1 }).limit(8).select({ title: 1, slug: 1, image: 1, imageAlt: 1, price: 1, typeOfProduct: 1, pageView: 1, buyNumber: 1, categories: 1 });
        const newBooks = await Product.find({ published: true, typeOfProduct: "book" }).sort({ _id: -1 }).limit(8).select({ title: 1, slug: 1, image: 1, imageAlt: 1, price: 1, typeOfProduct: 1, pageView: 1, buyNumber: 1, categories: 1 });
        const newGFs = await Product.find({ published: true, typeOfProduct: "gr" }).sort({ _id: -1 }).limit(8).select({ title: 1, slug: 1, image: 1, imageAlt: 1, price: 1, typeOfProduct: 1, features: 1, pageView: 1, buyNumber: 1, categories: 1 });
        res.status(200).json(newApps, newBooks, newGFs);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.getNewProducts = getNewProducts;


const getMostViewedProduct = async (req, res) => {
    try {
        const GoalProducts = await Product.find({ published: true }).sort({ buyNumber: -1 }).limit(3).select({ title: 1, slug: 1 });
        res.status(200).json(GoalProducts);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "error" });
    }
}
module.exports.getMostViewedProduct = getMostViewedProduct;



// THIS RELATED ProductS IS FOR SINGLE PRODUCT PAGE
const getRelatedProducts = async (req, res) => {
    try {
        const goalIds = req.body.goalIds;
        const GoalProducts = await Product.find({ _id: goalIds }).select({ title: 1, slug: 1, image: 1, imageAlt: 1, price: 1, typeOfProduct: 1, features: 1, pageView: 1, buyNumber: 1, categories: 1 });
        res.status(200).json(GoalProducts);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.getRelatedProducts = getRelatedProducts;

//const goalProduct = await Product.findOne({ typeOfProduct: req.params.typeOfPro }).sort({ _id: -1 }).skip((pageNumber - 1) * paginate).limit(paginate).select({ title: 1, updatedAt: 1, image: 1, imageAlt: 1, published: 1, price: 1, typeOfProduct: 1, buyNumber: 1, pageView: 1 });

const getOneTypeProducts = async (req, res) => {
    try {
        if (req.query.pn && req.query.pgn) {
            const paginate = req.query.pgn;
            const pageNumber = req.query.pn;
            const GoalProducts = await Product.find({ typeOfProduct: req.params.typeOfPro }).sort({ _id: -1 }).skip((pageNumber - 1) * paginate).limit(paginate).select({ title: 1, updatedAt: 1, image: 1, imageAlt: 1, published: 1, price: 1, typeOfProduct: 1, buyNumber: 1, pageView: 1 });
            const AllProductsNum = await (await Product.find()).length;
            res.status(200).json({ GoalProducts, AllProductsNum });
        } else {
            const AllProducts = await Product.find({ typeOfProduct: req.params.typeOfPro }).sort({ _id: -1 }).select({ mainFile: false });
            res.status(200).json(AllProducts);
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
module.exports.getOneTypeProducts = getOneTypeProducts;

