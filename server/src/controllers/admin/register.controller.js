
const {
  debugHttpRequestBody,
  debugHttpResponse,
} = require("../../utils/debug");
const User = require("../../models/user.model");

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
