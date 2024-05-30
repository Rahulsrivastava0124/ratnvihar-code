
const config = require("@config/auth.config");
const db = require("@models");
const { Op } = require("sequelize");
const { errorCodes, formatErrorResponse, formatResponse } = require("@utils/response.config");
const { getRoleId } = require("@library/common");
const { addActivityLog } = require("@library/activityLog");
const {UserCollection} = require("@resources/distributor/UserCollection");
const UserModel = db.users;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

/**
 * Change Password
 * 
 * @param {*} req
 * @param {*} res
 */
exports.editProfile = async(req, res) => {
    let data = req.body;
    let roleId = getRoleId('distributor');

    const existing_mobile = await UserModel.findOne({where: { role_id: roleId, mobile: data.mobile, id: {[Op.ne]: req.userId } } });
    if (existing_mobile) {
      return res.status(errorCodes.default).send(formatErrorResponse('User already exists'));
    }

    const postData = {
      name: data.name,
      email: data.email || null,
      mobile: data.mobile
    };

    UserModel.update(postData, { where: { id: req.userId } }).then(result => {
        res.send(formatResponse(null, 'Profile updated successfully!'));
    }).catch(error => {
        return res.status(errorCodes.default).send(formatErrorResponse('Profile does not updated due to some error' ));
    });

}


/**
 * Change Password
 * 
 * @param {*} req
 * @param {*} res
 */
exports.changePassword = async(req, res) => {
    let user = await UserModel.findOne({where: {id: req.userId}});
    if (!user) {
      res.status(errorCodes.default).send(formatErrorResponse(err));
      return;
    }

    /*var passwordIsValid = bcrypt.compareSync(
      req.body.old_password,
      user.password
    );
  
    if (! passwordIsValid) {
      return res.status(errorCodes.default).send(formatErrorResponse("Current password does not matched."));
    }*/

    if(req.body.password != req.body.confirm_password){
      res.status(errorCodes.default).send(formatErrorResponse("Password and confirm password doesn't match"));
      return;
    }

    let data = {
      password: bcrypt.hashSync(req.body.password, 8)
    }

    UserModel.update(data, { where: { id: req.userId } }).then(result => {
      res.send(formatResponse(null, 'Password changed successfully!'));
    }).catch(error => {
      return res.status(errorCodes.default).send(formatErrorResponse('Password does not changed due to some error' ));
    });
};