const Product = require("../models/Product");

const getProductStats = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          inStock: false,
          price: {
            $gte: 100,
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const insertSampleProducts = async (req, res) => {
  try {
    const sampleProducts = [
      {
        name: "Laptop",
        category: " Electronics",
        price: 999,
        inStock: true,
        tags: ["computer", "tech"],
      },
      {
        name: "smartphone",
        category: " Electronics",
        price: 699,
        inStock: true,
        tags: ["mobile", "tech"],
      },
      {
        name: "Headphones",
        category: " Electronics",
        price: 199,
        inStock: false,
        tags: ["audio", "tech"],
      },
      {
        name: "Running Shoes",
        category: " Sports",
        price: 89,
        inStock: true,
        tags: ["footware", "running"],
      },
      {
        name: "Novel",
        category: " Books",
        price: 19,
        inStock: true,
        tags: ["fiction", "bestseller"],
      },
    ];
    const result = await Product.insertMany(sampleProducts);
    res.status(201).json({
      success: true,
      data: `Inserted ${result.length} sample products`,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};
module.exports = { insertSampleProducts, getProductStats };
