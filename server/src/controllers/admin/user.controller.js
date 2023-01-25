// __ __  Controller has  __ __ //
// __ been generated thourgh __ //
// __ __   command line   __ __ //

const APIError = require("../../utils/APIError");
const {
  debugHttpRequestBody,
  debugHttpResponse,
} = require("../../utils/debug");
const User = require("../../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");
const path = require("path");

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
    let users = await User.find({}, { password: 0 });
    debugHttpResponse(`res`, users);
    return res.send({
      code: 200,
      message: "Users have been retrieved successfully.",
      user: users,
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
    payload.profileImage = req?.file?.filename;
    let { email, password } = payload;
    let payloadUser = await User.findOne({ email });

    if (payloadUser) {
      return res.status(400).send({
        success: false,
        message: "A User with this email already exists.",
      });
    }
    const user = new User(payload);
    await user.save().then(() => {
      debugHttpResponse(`res`, user);
      return res.send({
        code: 201,
        message: "User has been created successfully!",
      });
    });
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
    const user = await User.findOne({ _id: ObjectId(id) }, { password: 0 });

    debugHttpResponse(`res`);
    return res.send({
      code: 200,
      message: "User have been fetched successfully.",
      user: user,
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
    const userId = req.params.id;
    const updates = req.body;
    // if profile_picture is present in the request
    if (req.file) {
      updates.profileImage = req?.file?.filename;
    }
    const user = await User.findOne({ userId });
    // console.log(user);
    // update user data
    const updated = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    if (updated) {
      let img = user?.profileImage;
      console.log(user.profileImage);
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
    await User.deleteOne({ _id: ObjectId(id) });

    debugHttpResponse(`res`);
    return res.send({
      code: 200,
      message: "User have been deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
