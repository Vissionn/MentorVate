const Category = require("../models/Category");


function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}


exports.createCategory = async(req,res) => {
    try {
        // fetch the data
        const {name , description} = req.body;

        //validation
        if(!name || !description) {
            return res.status(400).json({
                success:false,
                message:"Both fields are required for creating the Category",
            });
        }

        // create entry in db
        const CategoryCreated = await Category.create({
            name:name,
            description:description,
        })
        console.log(CategoryCreated);

        // return response
        return res.status(200).json({
            success:true,
            message:"Category Created successfully",
            data : CategoryCreated,
        });
    } 
    catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


// get all Category handler function

exports.showAllCategories =  async(req,res) => {
    try {
        const allCategory = await Category.find({} , {name:true, description:true});
        // console.log("all category", allCategory);
        
        res.status(200).json({
            success:true,
            message:"All Category returned Successfully",
            data : allCategory,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
  
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
      .populate([{
        path: "courses",
        populate: {
          path: "instructor"
        },
        match: { status: "Published" },
      },{
        path: "courses",
        populate: {
          path: "ratingAndReviews"
        },
        match: { status: "Published" },
      }])
        .exec()
  
      console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
        // $ne --> not equal (means those course which have id not equal to categoryId)
      })
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "courses",
          populate: {
            path: "instructor",
          },
          match: { status: "Published" },
        })
        .exec()
      console.log()
      
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "courses",
          populate: {
            path: "instructor",
          },
          match: { status: "Published" },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
  
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }
  