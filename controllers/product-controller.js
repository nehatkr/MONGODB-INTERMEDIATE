const Product = require("../models/Product");

const getProductStats = async (req, res) => {
  try {
    const result = await Product.aggregate([
      { //stage1:filter
        $match: {
          inStock: false,
          price: {
            $gte: 100,
          },
        },
      }, //Stage2 : grouping the product based on the category
      {
        $group:{
            _id: "$category",
            avgPrice: {
                $avg: "$price"
            },
            count: {
                $sum : 1,
            }
        }
      }
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

const getProductAnalysis = async(req, res)=>{
    try{
        const result = await Product.aggregate([
            {
                $match : {
                     category: " Electronics"
                },
            },
            {
                $group: {
                    _id : null,
                    totalRevenue :{
                        $sum : "$price"
                    },
                    averagePrice : {
                        $avg : "$price"
                    },
                    maxProductPrice : {
                        $max : "$price"
                    },
                    minProductPrice : {
                        $min : "$price"
                    },
                }
            },
            {
                $project:{
                    _id : 0,
                    totalRevenue: 1,
                    averagePrice : 1,
                    maxProducrtPrice : 1,
                    minProductPrice: 1,
                    priceRange: {
                        $subtract : ["$maxProductPrice", "$minProductPrice"]
                    }
                }
            }
            

        ])

        res.status(200).json({
            success: true,
            data: result
        })
    }catch(e){
           console.log(e);
        res.status(500).json({
            success: false,
            message: 'Some error occured!'
        })
    }
}

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
module.exports = { insertSampleProducts, getProductStats ,getProductAnalysis};
