// __ __  Controller has  __ __ //
// __ been generated thourgh __ //
// __ __   command line   __ __ //

const APIError = require("../../utils/APIError");
const {
  debugHttpRequestBody,
  debugHttpResponse,
} = require("../../utils/debug");
const ObjectId = require("mongoose").Types.ObjectId;
const Blog = require("../../models/blog.model");
const path = require("path");
const fs = require("fs");
/**
 * Display a listing of the resource.
 * @param {JSON} req
 * @param {JSON} res
 * @param {Callback} next
 * @returns {JSON}
 */
exports.index = async (req, res, next) => {
  try {
    debugHttpRequestBody(`req.body`, req.body);
    let blogs = await Blog.find({});
    debugHttpResponse(`res`, blogs);
    return res.send({
      code: 200,
      message: "Blogs have been retrieved successfully.",
      blog: blogs,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Store a newly created resource in storage.
 * @param {JSON} req
 * @param {JSON} res
 * @param {callback} next
 * @returns {JSON}
 */
exports.store = async (req, res, next) => {
  try {
    debugHttpRequestBody(`req.body`, req.body);
    let payload = req.body;
    let { title, author, body } = payload;
    const blog = await Blog.findOne({ title });
    if (blog) {
      return res.status(300).send({
        success: false,
        message: "Blog already exists",
      });
    }

    let newBlog = new Blog({
      title: title,
      author: author,
      body: body,
    });
    newBlog.save((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Blog post saved.");
      }
    });
    debugHttpResponse(`res`, newBlog);
    if (newBlog) {
      return res.status(200).send({
        success: false,
        message: "Blog saved successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Show the form for editing the specified resource.
 * @param {JSON} req
 * @param {JSON} res
 * @param {Callback} next
 * @returns {JSON}
 */
exports.edit = async (req, res, next) => {
  try {
    debugHttpRequestBody(`req.body`, req.body);
    const { id } = req.params;
    const blog = await Blog.findOne({ _id: ObjectId(id) });

    debugHttpResponse(`res`, blog);
    return res.send({
      code: 200,
      message: "Blog has been fetched successfully.",
      blog: blog,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update the specified resource in storage.
 * @param {JSON} req
 * @param {JSON} res
 * @param {Callback} next
 * @returns {JSON}
 */
exports.update = async (req, res, next) => {
  try {
    debugHttpRequestBody(`req.body`, req.body);
    const blogId = req.params.id;
    const updates = req.body;
    // if profile_picture is present in the request
    if (req.file) {
      updates.profileImage = req?.file?.filename;
    }
    const blog = await Blog.findOne({ blogId });
    // update user data
    const updated = await Blog.findByIdAndUpdate(blogId, updates, {
      new: true,
    });
    if (updated) {
      let img = blog?.profileImage;
      const root = path.join(__dirname, "../../");
      const imgPath = path.join(root, "uploads/images", img);
      // const path = `uploads/images/${img}`;
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }
    debugHttpResponse(`res`);
    return res.send({
      code: 200,
      message: "User have been updated successfully.",
      user: updated,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Remove the specified resource from storage.
 * @param {JSON} req
 * @param {JSON} res
 * @param {Callback} next
 * @returns {JSON}
 */
exports.destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    debugHttpRequestBody(`req.body`, req.body);
    const deleted = await Blog.deleteOne({ _id: ObjectId(id) });
    debugHttpResponse(`res`);
    if (deleted.deletedCount > 0) {
      return res.send({
        code: 200,
        message: "Blog have been deleted successfully.",
      });
    }
    return res.send({
      code: 300,
      message: "Blog does not exist .",
    });
  } catch (error) {
    next(error);
  }
};
