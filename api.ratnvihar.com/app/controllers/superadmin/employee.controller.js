const { errorCodes, formatErrorResponse, formatResponse } = require("@utils/response.config");
const { getPaginationOptions } = require('@helpers/paginator');
const { base64FileUpload, removeFile, filterFilesFromRemove } = require('@helpers/upload');
const { isEmpty, isArray } = require("@helpers/helper");
const db = require("@models");
const { Op } = require("sequelize");
const { getRoleId, getCustomRoleIds, getNextUserName, isDistributor, getUserColumnValue, isSalesExecutive, isSuperAdmin } = require("@library/common");
const { EmployeeCollection } = require("@resources/superadmin/EmployeeCollection");
const { EmployeeListCollection } = require("@resources/superadmin/EmployeeListCollection");
const { EmployeeSalaryCollection } = require("@resources/superadmin/EmployeeSalaryCollection");
const userModel = db.users;
const RoleModel = db.roles;
const stateModel = db.states;
const districtModel = db.districts;
const countryModel = db.countries;
const SalaryStructure = db.salary_structures;
const moment = require('moment');

var bcrypt = require("bcryptjs");

/**
 * Retrieve all employee
 * @param req
 * @param res
 */
exports.index = async (req, res) => {
  let { page, limit, all, role_id } = req.query;
  let conditions = {};
  let load_stock_wallet = false;
  if (!isEmpty(role_id)) {
    conditions.role_id = role_id;
    if (role_id == 4) {
      if (isDistributor(req)) {
        conditions.parent_id = req.userId;
        load_stock_wallet = true;
      } else if (isSalesExecutive(req)) {
        let parent_id = await getUserColumnValue(req.userId, 'parent_id');
        conditions.parent_id = parent_id;
        conditions.id = { [Op.ne]: req.userId };
      } else if (isSuperAdmin(req)) {
        load_stock_wallet = true;
      }
    }

  } else {
    let mangerRoleId = getRoleId('manager');
    let workerRoleId = getRoleId('worker');
    let roleIds = await getCustomRoleIds();
    roleIds.push(mangerRoleId);
    roleIds.push(workerRoleId);
    conditions.role_id = { [Op.in]: roleIds };
  }

  if (all == 1) {
    conditions.status = true;
    userModel.findAll({
      where: conditions,
      order: [['name', 'ASC']]
    }).then(async (data) => {
      let result = {
        items: await EmployeeListCollection(data),
        total: data.length
      }
      res.send(formatResponse(result));
    })
      .catch(err => {
        res.status(errorCodes.default).send(formatErrorResponse(errorCodes.defaultErrorMsg));
      });
  } else {

    const paginatorOptions = getPaginationOptions(page, limit);
    userModel.findAndCountAll({
      where: conditions,
      order: [['id', 'DESC']],
      offset: paginatorOptions.offset,
      limit: paginatorOptions.limit,
      include: [
        {
          model: RoleModel,
          as: 'role'
        },
        {
          model: userModel,
          as: 'parent'
        }
      ]
    }).then(async (data) => {
      let result = {
        items: await EmployeeListCollection(data.rows, load_stock_wallet),
        total: data.count,
      }
      res.send(formatResponse(result, 'All users'));
    })
      .catch(err => {
        res.status(errorCodes.default).send(formatErrorResponse(errorCodes.defaultErrorMsg));
      });
  }
};

/**
 * Create Employee
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.store = async (req, res) => {
  let data = req.body;

  /**
   * check if mobile is exist or not
   */
  const existing_mobile = await userModel.findOne({ where: { mobile: data.mobile/*, role_id: data.role_id*/ } });
  if (existing_mobile) {
    return res.status(errorCodes.default).send(formatErrorResponse('This mobile is already exists.'));
  }

  //upload profile image
  let profile_image = null;
  let result = base64FileUpload(data.profile_image, 'users');
  if (result) {
    profile_image = result.path;
  }

  //upload pan image
  let pan_image = null;
  result = base64FileUpload(data.pan_image, 'users');
  if (result) {
    pan_image = result.path;
  }

  //upload adhar image
  let adhar_image = null;
  result = base64FileUpload(data.adhar_image, 'users');
  if (result) {
    adhar_image = result.path;
  }

  //upload company logo
  let company_logo = null;
  result = base64FileUpload(data.company_logo, 'users');
  if (result) {
    company_logo = result.path;
  }

  let user_name = await getNextUserName('employee');

  //upload documents
  let documents = [];
  for (let i = 0; i < data.documents.length; i++) {
    let result = base64FileUpload(data.documents[i], 'users');
    if (result) {
      documents.push(result);
    }
  }

  let parent_id = ('parent_id' in data && data.parent_id) ? data.parent_id : null;
  let branch_name = ('branch_name' in data && data.branch_name) ? data.branch_name : null;

  const postData = {
    role_id: data.role_id,
    user_name: user_name,
    name: data.name,
    email: data.email,
    mobile: data.mobile,
    parent_id: parent_id,
    adhar: data.adhar || null,
    pan: data.pan || null,
    password: bcrypt.hashSync(data.password, 8),
    address: data.address || null,
    city: data.city || null,
    landmark: data.landmark || null,
    pincode: data.pincode || null,
    district_id: data.district_id || null,
    state_id: data.state_id || null,
    country_id: data.country_id || null,
    p_address: data.p_address || null,
    p_city: data.p_city || null,
    p_pincode: data.p_pincode || null,
    p_district_id: data.p_district_id || null,
    p_state_id: data.p_state_id || null,
    p_country_id: data.p_country_id || null,
    company_name: data.company_name || null,
    gst: data.gst || null,
    bank_name: data.bank_name || null,
    bank_account_no: data.bank_account_no || null,
    bank_ifsc: data.bank_ifsc || null,
    branch_name: branch_name,
    profile_image: profile_image,
    pan_image: pan_image,
    adhar_image: adhar_image,
    company_logo: company_logo,
    status: data.status ? true : false,
    documents: documents,
    blood_group: data.blood_group || null,
    weekly_holidays: data.weekly_holidays
  };

  userModel.create(postData).then(result => {
    res.send(formatResponse("", "Created successfully!"));
  }).catch(error => {
    return res.status(errorCodes.default).send(formatErrorResponse(errorCodes.defaultErrorMsg));
  });
};


/**
 * Update Employee
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.update = async (req, res) => {
  let data = req.body;
  let admin = await userModel.findOne({ where: { id: req.params.id } });
  if (!admin) {
    return res.status(errorCodes.default).send(formatErrorResponse('User not found'));
  }

  /**
   * check if mobile is exist or not
   */
  const existing_mobile = await userModel.findOne({ where: { mobile: data.mobile, /*role_id: data.role_id,*/ id: { [Op.ne]: req.params.id } } });
  if (existing_mobile) {
    return res.status(errorCodes.default).send(formatErrorResponse('This mobile is already exists.'));
  }

  //upload profile image
  let profile_image = admin.profile_image;
  if (!isEmpty(data.profile_image) || data.remove_profile_image) {
    //remove old
    removeFile(admin.profile_image);
    if (data.remove_profile_image) {
      profile_image = null;
    }

    //upload new
    if (!isEmpty(data.profile_image)) {
      let result = base64FileUpload(data.profile_image, 'users');
      if (result) {
        profile_image = result.path;
      }
    }
  }

  //upload pan image
  let pan_image = admin.pan_image;
  if (!isEmpty(data.pan_image) || data.remove_pan_image) {
    //remove old
    removeFile(admin.pan_image);
    if (data.remove_pan_image) {
      pan_image = null;
    }

    //upload new
    if (!isEmpty(data.pan_image)) {
      let result = base64FileUpload(data.pan_image, 'users');
      if (result) {
        pan_image = result.path;
      }
    }
  }

  //upload adhar image
  let adhar_image = admin.adhar_image;
  if (!isEmpty(data.adhar_image) || data.remove_adhar_image) {
    //remove old
    removeFile(admin.adhar_image);
    if (data.remove_adhar_image) {
      adhar_image = null;
    }

    //upload new
    if (!isEmpty(data.adhar_image)) {
      let result = base64FileUpload(data.adhar_image, 'users');
      if (result) {
        adhar_image = result.path;
      }
    }
  }

  //upload company logo
  let company_logo = admin.company_logo;
  if (!isEmpty(data.company_logo) || data.remove_company_logo) {
    //remove old
    removeFile(admin.company_logo);
    if (data.remove_company_logo) {
      company_logo = null;
    }

    //upload new
    if (!isEmpty(data.company_logo)) {
      let result = base64FileUpload(data.company_logo, 'users');
      if (result) {
        company_logo = result.path;
      }
    }
  }

  let documents = [];
  let removeFiles = (isArray(data.remove_documents)) ? data.remove_documents : [];
  let oldFiles = filterFilesFromRemove(admin.documents, removeFiles);
  if (!isEmpty(data.documents)) {
    try {
      for (let i = 0; i < data.documents.length; i++) {
        let result = base64FileUpload(data.documents[i], 'users');
        if (result) {
          documents.push(result);
        }
      }
    } catch (error) {

    }
  }
  documents = [...documents, ...oldFiles];

  let user_name = admin.user_name;
  if (isEmpty(user_name)) {
    user_name = await getNextUserName('employee', admin.id);
  }

  let parent_id = ('parent_id' in data && data.parent_id) ? data.parent_id : null;
  let branch_name = ('branch_name' in data && data.branch_name) ? data.branch_name : null;
  let postData = {
    user_name: user_name,
    name: data.name,
    role_id: data.role_id,
    email: data.email,
    mobile: data.mobile,
    parent_id: parent_id,
    adhar: data.adhar || null,
    pan: data.pan || null,
    address: data.address || null,
    city: data.city || null,
    landmark: data.landmark || null,
    pincode: data.pincode || null,
    district_id: data.district_id || null,
    state_id: data.state_id || null,
    country_id: data.country_id || null,
    p_address: data.p_address || null,
    p_city: data.p_city || null,
    p_pincode: data.p_pincode || null,
    p_district_id: data.p_district_id || null,
    p_state_id: data.p_state_id || null,
    p_country_id: data.p_country_id || null,
    company_name: data.company_name || null,
    gst: data.gst || null,
    bank_name: data.bank_name || null,
    bank_account_no: data.bank_account_no || null,
    bank_ifsc: data.bank_ifsc || null,
    branch_name: branch_name,
    profile_image: profile_image,
    pan_image: pan_image,
    adhar_image: adhar_image,
    company_logo: company_logo,
    status: data.status ? true : false,
    documents: documents,
    blood_group: data.blood_group || null,
    weekly_holidays: data.weekly_holidays
  };
  if (!isEmpty(data.password)) {
    postData.password = bcrypt.hashSync(data.password, 8);
  }

  userModel.update(postData, { where: { id: req.params.id } }).then(result => {
    res.send(formatResponse("", "Updated successfully!"));
  }).catch(error => {
    return res.status(errorCodes.default).send(formatErrorResponse(errorCodes.defaultErrorMsg));
  });

};


/**
 * View Employee
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.fetch = async (req, res) => {
  let { role_id } = req.query;
  let conditions = {};
  if (!isEmpty(role_id)) {
    conditions.role_id = role_id;
  } else {
    let mangerRoleId = getRoleId('manager');
    let workerRoleId = getRoleId('worker');
    let seRoleId = getRoleId('sales_executive');
    let roleIds = await getCustomRoleIds();
    roleIds.push(mangerRoleId);
    roleIds.push(workerRoleId);
    roleIds.push(seRoleId);
    conditions.role_id = { [Op.in]: roleIds };
  }


  let user = await userModel.findOne({
    where: { id: req.params.id, ...conditions },
    include: [
      {
        model: districtModel,
        as: 'district',
      },
      {
        model: stateModel,
        as: 'state',
      },
      {
        model: countryModel,
        as: 'country',
      }
    ]
  });
  if (!user) {
    return res.status(errorCodes.default).send(formatErrorResponse('User not found'));
  }
  res.send(formatResponse(EmployeeCollection(user), "User fetched successfully!"));
};



/**
 * Create Salary
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.salaryCreate = async (req, res) => {
  let data = req.body;
  let postData = {
    role_id: !isEmpty(data.role_id) ? data.role_id : null,
    user_id: !isEmpty(data.user_id) ? data.user_id : null,
    gross_salary: !isEmpty(data.gross_salary) ? data.gross_salary : null,
    basic_salary: !isEmpty(data.basic_salary) ? data.basic_salary : null,
    eff_date: !isEmpty(data.eff_date) ? moment(data.eff_date).format('YYYY-MM-DD') : '',
    is_epf: data.is_epf >= 0 ? data.is_epf : null,
    is_medical: data.is_medical >= 0 ? data.is_medical : null,
    target: !isEmpty(data.target) ? data.target : null,
    visit_target: !isEmpty(data.visit_target) ? data.visit_target : null,
    incentive: !isEmpty(data.incentive) ? data.incentive : 0,
    hra_percent: !isEmpty(data.hra_percent) ? data.hra_percent : 0,
    conv_percent: !isEmpty(data.conv_percent) ? data.conv_percent : 0,
    epf_employee_percent: !isEmpty(data.epf_employee_percent) ? data.epf_employee_percent : 0,
    epf_employer_percent: !isEmpty(data.epf_employer_percent) ? data.epf_employer_percent : 0,
    medical_employee_percent: !isEmpty(data.medical_employee_percent) ? data.medical_employee_percent : 0,
    medical_employer_percent: !isEmpty(data.medical_employer_percent) ? data.medical_employer_percent : 0,
  };

  await SalaryStructure.create(postData).then(async result => {
    let salary_list = await SalaryStructure.findAll({ where: { user_id: postData.user_id, role_id: postData.role_id } });
    res.send(formatResponse(EmployeeSalaryCollection(salary_list), "Salary created successfully!"));
  }).catch(error => {
    return res.status(errorCodes.default).send(formatErrorResponse(errorCodes.defaultErrorMsg));
  });
};


/**Fetch Salary List
 * 
 * @param {*} req 
 * @param {*} res 
 */

exports.fetchSalaryList = async (req, res) => {
  let { page, limit, role_id, user_id } = req.query;

  if (!isEmpty(role_id) && !isEmpty(user_id)) {
    const paginatorOptions = getPaginationOptions(page, limit);
    SalaryStructure.findAndCountAll({
      order: [['id', 'DESC']],
      offset: paginatorOptions.offset,
      limit: paginatorOptions.limit,
      where: { user_id: user_id, role_id: role_id }
    }).then(async (data) => {
      let result = {
        items: EmployeeSalaryCollection(data.rows),
        total: data.count,
      }
      res.send(formatResponse(result, 'Salary fetched successfully!'));
    });
  }
  else {
    let result = {
      items: [],
      total: 0,
    }
    res.send(formatResponse(result, 'Salary List fetched successfully!'));
  }
};


/**Fetch Salary
 * 
 * @param {*} req 
 * @param {*} res 
 */

exports.fetchSalary = async (req, res) => {
  let salary = await SalaryStructure.findOne({ where: { id: req.params.id } });

  if (!salary) {
    return res.status(errorCodes.default).send(formatErrorResponse('Salary not found'));
  }
  res.send(formatResponse(EmployeeSalaryCollection(salary), 'Salary fetched successfully!'));
};


/**update Salary
 * 
 * @param {*} req 
 * @param {*} res 
 */

exports.updateSalary = async (req, res) => {
  let salary = await SalaryStructure.findOne({ where: { id: req.params.id } });
  let data = req.body;

  if (!salary) {
    return res.status(errorCodes.default).send(formatErrorResponse('Salary not found'));
  }

  let postData = {
    role_id: !isEmpty(data.role_id) ? data.role_id : null,
    user_id: !isEmpty(data.user_id) ? data.user_id : null,
    gross_salary: !isEmpty(data.gross_salary) ? data.gross_salary : null,
    basic_salary: !isEmpty(data.basic_salary) ? data.basic_salary : null,
    eff_date: !isEmpty(data.eff_date) ? moment(data.eff_date).format('YYYY-MM-DD') : '',
    is_epf: data.is_epf >= 0 ? data.is_epf : null,
    is_medical: data.is_medical >= 0 ? data.is_medical : null,
    target: !isEmpty(data.target) ? data.target : null,
    visit_target: !isEmpty(data.visit_target) ? data.visit_target : null,
    incentive: !isEmpty(data.incentive) ? data.incentive : 0,
    hra_percent: !isEmpty(data.hra_percent) ? data.hra_percent : 0,
    conv_percent: !isEmpty(data.conv_percent) ? data.conv_percent : 0,
    epf_employee_percent: !isEmpty(data.epf_employee_percent) ? data.epf_employee_percent : 0,
    epf_employer_percent: !isEmpty(data.epf_employer_percent) ? data.epf_employer_percent : 0,
    medical_employee_percent: !isEmpty(data.medical_employee_percent) ? data.medical_employee_percent : 0,
    medical_employer_percent: !isEmpty(data.medical_employer_percent) ? data.medical_employer_percent : 0,
  };

  await SalaryStructure.update(postData, { where: { id: req.params.id } }).then(async result => {
    let salary_list = await SalaryStructure.findAll({ where: { user_id: postData.user_id, role_id: postData.role_id } });
    res.send(formatResponse(EmployeeSalaryCollection(salary_list), "Salary updated successfully!"));
  }).catch(error => {
    return res.status(errorCodes.default).send(formatErrorResponse(errorCodes.defaultErrorMsg));
  });
};




/**
 * delete Employee
 * 
 * @param {*} req
 * @param {*} res 
 */
exports.delete = async (req, res) => {
  let admin = await userModel.findOne({ where: { id: req.params.id } });

  if (!isEmpty(admin.profile_image)) {
    removeFile(admin.profile_image);
  }

  if (!isEmpty(admin.pan_image)) {
    removeFile(admin.pan_image);
  }

  if (!isEmpty(admin.adhar_image)) {
    removeFile(admin.adhar_image);
  }

  if (!isEmpty(admin.company_logo)) {
    removeFile(admin.company_logo);
  }


  userModel.destroy({ where: { id: req.params.id } }).then(result => {
    res.send(formatResponse("", 'Deleted Successfully!'));
  }).catch(error => {
    return res.status(errorCodes.default).send(formatErrorResponse(errorCodes.defaultErrorMsg));
  });
};
