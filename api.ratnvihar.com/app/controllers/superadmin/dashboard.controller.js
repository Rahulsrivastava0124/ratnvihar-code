const {
  formatResponse,
  formatErrorResponse,
  errorCodes,
} = require("@utils/response.config");
const { UserCollection } = require("@resources/superadmin/UserCollection");
const {
  getRoleId,
  getTotalStockPriceByUser,
  getWalletBalance,
  getWorkingUserID,
  getNextUserName,
  isSuperAdmin,
  getUserColumnValue,
  isDistributor,
  isAdmin,
  getAdminSEWhereCondition,
  isSalesExecutive,
  getTotalStockByUser,
  getMyRetailerIds,
  isManager,
  getPurchaseProducts,
  avlStockUserIds,
  getOwnUserSaleProducts,
  getAdminDistributorIds,
} = require("@library/common");
const {
  displayAmount,
  addLog,
  getDateFromToWhere,
  arrayColumn,
  priceFormat,
  getMonthDateRange,
} = require("@helpers/helper");
const moment = require("moment");
const db = require("@models");
const dbSequelize = db.sequelize;
const { Op, QueryTypes } = require("sequelize");
const { upperFirst } = require("lodash");
const UserModel = db.users;
const RoleModel = db.roles;
const StockModel = db.stocks;
const PurchaseModel = db.purchases;
const OrderModel = db.orders;
const saleModel = db.sales;
const NoticationModel = db.notifiactions;
const UserToUserModel = db.user_to_users;
const RetailerVisitModel = db.retailer_visits;
const {
  NotificationCollection,
} = require("@resources/superadmin/NotificationCollection");

/**
 * Super Admin Dashboard
 *
 * @param req
 * @param res
 */
exports.index = async (req, res) => {
  try {
    let user = await UserModel.findByPk(req.userId);
    let adminRoleId = getRoleId("admin");
    let distributorRoleId = getRoleId("distributor");
    let retailerRoleId = getRoleId("retailer");
    let supplierRoleId = getRoleId("supplier");
    let customerRoleId = getRoleId("customer");
    let sales_executiveRoleId = getRoleId("sales_executive");
    let userID = isManager(req) ? req.userId : await getWorkingUserID(req);
    let totalAdmin = 0,
      totalOtherAdmin = 0,
      totalDistributor = 0,
      totalOtherDistributor = 0,
      totalRetailer = 0,
      totalSupplier = 0,
      totalCustomer = 0,
      totalsales_executive = 0,
      totalStock = 0,
      purchaseDueAmount = 0,
      saleDueAmount = 0,
      totalStockPrice = 0,
      walletBalance = 0,
      myRetailer = 0,
      myRetailerDueAmunt = 0,
      totalSeStock = 0,
      totalSeStockPrice = 0,
      materialTotalStock = 0,
      materialTotalStockPrice = 0,
      returnStock = 0,
      returnStockPrice = 0,
      totalAdminStock = 0,
      totalAdminStockPrice = 0,
      totalDistributorStock = 0,
      totalDistributorStockPrice = 0,
      totalOwnUsersSale = 0,
      totalOwnUsersSaleProducts = 0,
      totalOtherAdminStock = 0,
      totalOtherAdminStockPrice = 0,
      totalOtherDistributorStock = 0,
      totalOtherDistributorStockPrice = 0,
      totalPurchase = 0,
      totalAvlStock = 0,
      totalAvlStockPrice = 0,
      total_retailer_due = 0,
      totalManagerStock = 0,
      totalManagerStockPrice = 0,
      totalPurchaseProduct = 0;
    let state_id = user.state_id; // await getUserColumnValue(req.userId, 'state_id');
    let avl_stockUser_ids = [];
    if (isSuperAdmin(req)) {
      //totalAdmin = await UserModel.count({where: {role_id: adminRoleId}});
      //totalDistributor = await UserModel.count({where: {role_id: distributorRoleId}});
      totalRetailer = await UserModel.count({
        where: { role_id: retailerRoleId },
      });
      totalCustomer = await UserModel.count({
        where: { role_id: customerRoleId },
      });
      //totalsales_executive = await UserModel.count({where: {role_id: sales_executiveRoleId}});
      totalStock = await getTotalStockByUser(userID);
      totalStockPrice = await getTotalStockPriceByUser(null, userID);
      materialTotalStock = await getTotalStockByUser(userID, "material");
      materialTotalStockPrice = await getTotalStockPriceByUser(
        null,
        userID,
        "material"
      );
      totalSupplier = await UserModel.count({
        where: { role_id: supplierRoleId, parent_id: userID },
      });
      saleDueAmount = await saleModel.sum("due_amount", {
        where: {
          sale_by: userID,
          is_approved: { [Op.ne]: 2 },
          is_assigned: false,
          is_approval: false,
        },
      });

      //total distributor stocks
      let distributors = await UserModel.findAll({
        attributes: ["id"],
        where: { role_id: distributorRoleId, own: true },
      });
      let distributorIds = arrayColumn(distributors, "id");
      totalDistributor = distributors.length;
      totalDistributorStock = await getTotalStockByUser(distributorIds);
      totalDistributorStockPrice = await getTotalStockPriceByUser(
        null,
        distributorIds
      );

      //total other distributor stocks
      let otherdistributors = await UserModel.findAll({
        attributes: ["id"],
        where: { role_id: distributorRoleId, own: false },
      });
      let otherdistributorIds = arrayColumn(otherdistributors, "id");
      totalOtherDistributor = otherdistributorIds.length;
      totalOtherDistributorStock = await getTotalStockByUser(
        otherdistributorIds
      );
      totalOtherDistributorStockPrice = await getTotalStockPriceByUser(
        null,
        otherdistributorIds
      );

      //total admin stocks
      let admins = await UserModel.findAll({
        attributes: ["id"],
        where: { role_id: adminRoleId, own: true },
      });
      let adminIds = arrayColumn(admins, "id");
      totalAdmin = admins.length;
      totalAdminStock = await getTotalStockByUser(adminIds);
      totalAdminStockPrice = await getTotalStockPriceByUser(null, adminIds);

      //total other admin stocks
      let otheradmins = await UserModel.findAll({
        attributes: ["id"],
        where: { role_id: adminRoleId, own: false },
      });
      let otheradminIds = arrayColumn(otheradmins, "id");
      totalOtherAdmin = otheradmins.length;
      totalOtherAdminStock = await getTotalStockByUser(otheradminIds);
      totalOtherAdminStockPrice = await getTotalStockPriceByUser(
        null,
        otheradminIds
      );

      //total se stocks
      let se = await UserModel.findAll({
        attributes: ["id"],
        where: { role_id: sales_executiveRoleId },
      });
      let seIds = arrayColumn(se, "id");
      totalsales_executive = se.length;
      totalSeStock = await getTotalStockByUser(seIds);
      totalSeStockPrice = await getTotalStockPriceByUser(null, seIds);

      //total sales based on own users
      let ownUsers = await UserModel.findAll({
        attributes: ["id"],
        where: { own: true },
      });
      let ownUserIds = arrayColumn(ownUsers, "id");
      ownUserIds.push(userID);
      let ownSaleResult = await getOwnUserSaleProducts(req);
      //totalOwnUsersSale = await saleModel.sum('bill_amount', { where: { sale_by: {[Op.in]: ownUserIds}, is_approved: {[Op.ne]: 2 }, is_assigned: false, is_approval: false } });
      totalOwnUsersSale = ownSaleResult.total_amount;
      totalOwnUsersSaleProducts = ownSaleResult.total_product;

      //total purchase
      let purchaseProductsRes = await getPurchaseProducts();
      totalPurchase = purchaseProductsRes.total_amount;
      totalPurchaseProduct = purchaseProductsRes.total_product;
      // totalPurchase = totalPurchase ? parseFloat(totalPurchase) : 0;
      // let totalPurchaseReturn = await PurchaseModel.sum('return_amount', { where: {is_approved: {[Op.ne]: 2 }, is_assigned: false, is_approval: false, sale_id: {[Op.is]: null} } });
      // totalPurchaseReturn = totalPurchaseReturn ? parseFloat(totalPurchaseReturn) : 0;
      // totalPurchase = priceFormat(totalPurchase - totalPurchaseReturn);
      avl_stockUser_ids = await avlStockUserIds(req);
      let stockUserIds = avl_stockUser_ids;
      //stockUserIds.push(userID);
      totalAvlStock = await getTotalStockByUser(stockUserIds);
      totalAvlStockPrice = await getTotalStockPriceByUser(null, stockUserIds);

      //retailer due
      total_retailer_due = await saleModel.sum("sales.due_amount", {
        where: {
          is_approved: { [Op.ne]: 2 },
          is_assigned: false,
          is_approval: false,
        },
        include: [
          {
            model: UserModel,
            as: "user",
            where: { role_id: retailerRoleId },
            required: true,
            attributes: ["id"],
          },
        ],
      });

      returnStock = await getTotalStockByUser(userID, "return");
      returnStockPrice = await getTotalStockPriceByUser(null, userID, "return");

      //manager stock
      let managerUsers = await UserModel.findAll({
        attributes: ["id"],
        where: { role_id: getRoleId("manager") },
      });
      let managerUsersIds = arrayColumn(managerUsers, "id");
      totalManagerStock = await getTotalStockByUser(managerUsersIds);
      totalManagerStockPrice = await getTotalStockPriceByUser(
        null,
        managerUsersIds
      );
    } else if (isAdmin(req)) {
      totalStockPrice = await getTotalStockPriceByUser(null, userID);
      totalStock = await getTotalStockByUser(userID);

      //customers
      totalCustomer = await UserModel.count({
        where: { role_id: customerRoleId, state_id: user.state_id },
      });

      //total distributor stocks
      let distributors = await UserModel.findAll({
        attributes: ["id"],
        where: { role_id: distributorRoleId, own: true, state_id: state_id },
      });
      let distributorIds = arrayColumn(distributors, "id");
      totalDistributor = distributors.length;
      totalDistributorStock = await getTotalStockByUser(distributorIds);
      totalDistributorStockPrice = await getTotalStockPriceByUser(
        null,
        distributorIds
      );

      //total other distributor stocks
      let otherdistributors = await UserModel.findAll({
        attributes: ["id"],
        where: { role_id: distributorRoleId, own: false, state_id: state_id },
      });
      let otherdistributorIds = arrayColumn(otherdistributors, "id");
      totalOtherDistributor = otherdistributorIds.length;
      totalOtherDistributorStock = await getTotalStockByUser(
        otherdistributorIds
      );
      totalOtherDistributorStockPrice = await getTotalStockPriceByUser(
        null,
        otherdistributorIds
      );

      let allDistributors = distributors.concat(otherdistributors);

      totalRetailer = await UserModel.count({
        where: { role_id: retailerRoleId, state_id: state_id },
      });
      let _cond = await getAdminSEWhereCondition(allDistributors);
      totalsales_executive = await UserModel.count({ where: _cond });
      totalSupplier = await UserModel.count({
        where: { role_id: supplierRoleId, parent_id: userID },
      });
      totalSupplier += 1; //bnecause superadmin is also a supplier
      saleDueAmount = await saleModel.sum("due_amount", {
        where: {
          sale_by: userID,
          is_approved: { [Op.ne]: 2 },
          is_assigned: false,
          is_approval: false,
        },
      });

      avl_stockUser_ids = await avlStockUserIds(req);
      let stockUserIds = avl_stockUser_ids;
      //stockUserIds.push(userID);
      totalAvlStock = await getTotalStockByUser(stockUserIds);
      totalAvlStockPrice = await getTotalStockPriceByUser(null, stockUserIds);

      //retailer due
      total_retailer_due = await saleModel.sum("sales.due_amount", {
        where: {
          is_approved: { [Op.ne]: 2 },
          is_assigned: false,
          is_approval: false,
        },
        include: [
          {
            model: UserModel,
            as: "user",
            where: { role_id: retailerRoleId, state_id: state_id },
            required: true,
            attributes: ["id"],
          },
        ],
      });
      
    } else if (isDistributor(req)) {
      let district_id = await getUserColumnValue(req.userId, "district_id");
      totalStockPrice = await getTotalStockPriceByUser(null, userID);
      totalStock = await getTotalStockByUser(userID);
      totalRetailer = await UserModel.count({
        where: { role_id: retailerRoleId, district_id: district_id },
      });
      let totalsales_executiveArr = await UserModel.findAll({
        where: { role_id: sales_executiveRoleId, parent_id: req.userId },
      });
      let seIds = [];
      for (let item of totalsales_executiveArr) {
        seIds.push(item.id);
      }
      totalsales_executive = seIds.length;
      totalSupplier = 1;
      let saleByArr = seIds.concat(userID);
      saleDueAmount = await saleModel.sum("due_amount", {
        where: {
          sale_by: { [Op.in]: saleByArr },
          is_approved: { [Op.ne]: 2 },
          is_assigned: false,
          is_approval: false,
        },
      });
      // totalSeStock = await StockModel.sum('quantity', {
      //   include: [{
      //     model: UserModel,
      //     as: 'user',
      //     where: { parent_id: req.userId, role_id: sales_executiveRoleId }
      //   }]
      // });
      // totalSeStock = !totalSeStock ? 0 : totalSeStock;
      totalSeStock = await getTotalStockByUser(seIds);
      totalSeStockPrice = await getTotalStockPriceByUser(null, seIds);

      avl_stockUser_ids = await avlStockUserIds(req);
      let stockUserIds = avl_stockUser_ids;
      //stockUserIds.push(userID);
      totalAvlStock = await getTotalStockByUser(stockUserIds);
      totalAvlStockPrice = await getTotalStockPriceByUser(null, stockUserIds);
    } else if (isSalesExecutive(req)) {
      let state_id = await getUserColumnValue(req.userId, "state_id");
      totalRetailer = await UserModel.count({
        where: { role_id: retailerRoleId, state_id: state_id },
      });
      totalStock = await getTotalStockByUser(userID);
      totalStockPrice = await getTotalStockPriceByUser(null, userID);
      let myRetailerIds = await getMyRetailerIds(req.userId);
      myRetailer = await UserModel.count({
        where: { role_id: retailerRoleId, id: { [Op.in]: myRetailerIds } },
      });

      //total retailer due
      let whereObj = {
        where: {
          sale_by: userID,
          is_approved: { [Op.ne]: 2 },
          is_assigned: false,
          is_approval: false,
        },
      };
      whereObj.include = includes = [
        {
          model: UserModel,
          as: "user",
          where: { role_id: retailerRoleId },
        },
      ];
      saleDueAmount = await saleModel.sum("sales.due_amount", whereObj);

      //my retailer due
      whereObj.include = includes = [
        {
          model: UserModel,
          as: "user",
          where: { id: { [Op.in]: myRetailerIds } },
        },
      ];
      myRetailerDueAmunt = await saleModel.sum("sales.due_amount", whereObj);
      returnStock = await getTotalStockByUser(userID, "return");
      returnStockPrice = await getTotalStockPriceByUser(null, userID, "return");

      avl_stockUser_ids = await avlStockUserIds(req);
      let stockUserIds = avl_stockUser_ids;
      //stockUserIds.push(userID);
      totalAvlStock = await getTotalStockByUser(stockUserIds);
      totalAvlStockPrice = await getTotalStockPriceByUser(null, stockUserIds);
    }

    //common
    purchaseDueAmount = await PurchaseModel.sum("due_amount", {
      where: {
        user_id: userID,
        is_approved: { [Op.ne]: 2 },
        is_assigned: false,
        is_approval: false,
      },
    });
    walletBalance = await getWalletBalance(userID);

    //chart
    let months_name = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "Novenber",
      "December",
    ];
    let customerMonthwise = [];
    let retailerMonthwise = [];
    let orderMonthwise = [];
    let salesMonthwise = [];
    let BestAdmins = [];
    let PoorAdmins = [];

    let adminDisIds = [],
      adminSaleByIds = [],
      distrSaleByUserIds = [];
    if (isAdmin(req)) {
      let distributors = await UserModel.findAll({
        attributes: ["id"],
        where: { role_id: distributorRoleId, state_id: state_id },
      });
      adminDisIds = arrayColumn(distributors, "id");

      let allDstIds = await getAdminDistributorIds(req.userId);
      let _cond = await getAdminSEWhereCondition(allDstIds, null, true);
      let se = await UserModel.findAll({ attributes: ["id"], where: _cond });
      let seIds = arrayColumn(se, "id");
      adminSaleByIds = seIds.concat(allDstIds);
      adminSaleByIds.push(req.userId);
    } else if (isDistributor(req)) {
      let _cond = await getAdminSEWhereCondition([req.userId], null, true);
      let se = await UserModel.findAll({ attributes: ["id"], where: _cond });
      let seIds = arrayColumn(se, "id");
      distrSaleByUserIds = seIds;
      distrSaleByUserIds.push(req.userId);
    }

    let month = 1;
    avl_stockUser_ids.push(userID);
    while (month < 13) {
      let month_range = getMonthDateRange(moment().format("YYYY"), month);
      month_range.start = month_range.start.format("YYYY-MM-DD 00:00:00");
      month_range.end = month_range.end.format("YYYY-MM-DD 23:59:59");

      let currMonthCustomer = 0,
        currMonthOrder = 0,
        currMonthSales = 0,
        currMonthRetailer = 0;
      //customer
      if (isSuperAdmin(req)) {
        currMonthCustomer = await UserModel.count({
          where: {
            role_id: customerRoleId,
            createdAt: {
              [Op.gte]: month_range.start,
              [Op.lte]: month_range.end,
            },
          },
        });
        currMonthOrder = await OrderModel.sum("total_amount", {
          where: {
            order_from: "front_website",
            createdAt: {
              [Op.gte]: month_range.start,
              [Op.lte]: month_range.end,
            },
          },
        });
        currMonthSales = await saleModel.sum("total_payable", {
          where: {
            sale_by: { [Op.in]: avl_stockUser_ids },
            is_approved: { [Op.ne]: 2 },
            is_assigned: false,
            is_approval: false,
            invoice_date: {
              [Op.gte]: month_range.start,
              [Op.lte]: month_range.end,
            },
          },
        });
      } else if (isAdmin(req)) {
        currMonthCustomer = await UserModel.count({
          where: {
            role_id: customerRoleId,
            state_id: state_id,
            createdAt: {
              [Op.gte]: month_range.start,
              [Op.lte]: month_range.end,
            },
          },
        });
        currMonthOrder = await OrderModel.sum("total_amount", {
          where: {
            order_from: "front_website",
            to_user_id: { [Op.in]: adminDisIds },
            createdAt: {
              [Op.gte]: month_range.start,
              [Op.lte]: month_range.end,
            },
          },
        });
        currMonthSales = await saleModel.sum("total_payable", {
          where: {
            sale_by: { [Op.in]: adminSaleByIds },
            is_approved: { [Op.ne]: 2 },
            is_assigned: false,
            is_approval: false,
            invoice_date: {
              [Op.gte]: month_range.start,
              [Op.lte]: month_range.end,
            },
          },
        });
      } else if (isDistributor(req)) {
        currMonthCustomer = await UserModel.count({
          where: {
            role_id: customerRoleId,
            district_id: user.district_id,
            createdAt: {
              [Op.gte]: month_range.start,
              [Op.lte]: month_range.end,
            },
          },
        });
        currMonthOrder = await OrderModel.sum("total_amount", {
          where: {
            order_from: "front_website",
            to_user_id: req.userId,
            createdAt: {
              [Op.gte]: month_range.start,
              [Op.lte]: month_range.end,
            },
          },
        });
        currMonthSales = await saleModel.sum("total_payable", {
          where: {
            sale_by: { [Op.in]: distrSaleByUserIds },
            is_approved: { [Op.ne]: 2 },
            is_assigned: false,
            is_approval: false,
            invoice_date: {
              [Op.gte]: month_range.start,
              [Op.lte]: month_range.end,
            },
          },
        });
      } else if (isSalesExecutive(req)) {
        currMonthRetailer = await UserToUserModel.count({
          where: {
            to_role_id: retailerRoleId,
            user_id: req.userId,
            createdAt: {
              [Op.gte]: month_range.start,
              [Op.lte]: month_range.end,
            },
          },
        });
        currMonthOrder = await OrderModel.sum("total_amount", {
          where: {
            order_from: "front_website",
            sales_executive_id: req.userId,
            createdAt: {
              [Op.gte]: month_range.start,
              [Op.lte]: month_range.end,
            },
          },
        });
        currMonthSales = await saleModel.sum("total_payable", {
          where: {
            sale_by: req.userId,
            is_approved: { [Op.ne]: 2 },
            is_assigned: false,
            is_approval: false,
            invoice_date: {
              [Op.gte]: month_range.start,
              [Op.lte]: month_range.end,
            },
          },
        });
      }

      customerMonthwise.push(currMonthCustomer);
      orderMonthwise.push(currMonthOrder);
      salesMonthwise.push(currMonthSales);
      retailerMonthwise.push(currMonthRetailer);
      month++;
    }

    /*const bestAdmin = await saleModel.findAll({
      attributes: [
        'user_id',
        [Op.fn('sum', Op.col('total_payable')), 'total_amount'],
      ],
      include: [
        {
          model: UserModel,
          as: 'users',
        }
      ],
      limit: 1,
      group: ['sales.user_id'],
      raw: true,
      order: Op.literal('total_amount DESC')
    });
    console.log({bestAdmin});*/
    let result = {
      total_admin: totalAdmin,
      total_other_admin: totalOtherAdmin,
      total_distributor: totalDistributor,
      total_other_distributor: totalOtherDistributor,
      total_retailer: totalRetailer,
      total_supplier: totalSupplier,
      total_customer: totalCustomer,
      total_sales_executive: totalsales_executive,
      total_stock: totalStock,
      material_total_stock: materialTotalStock,
      purchase_due_amount: displayAmount(purchaseDueAmount),
      sale_due_amount: displayAmount(saleDueAmount),
      my_retailer_due_amount: displayAmount(myRetailerDueAmunt),
      total_stock_price: displayAmount(totalStockPrice),
      material_total_stock_price: displayAmount(materialTotalStockPrice),
      wallet_balance: displayAmount(walletBalance),
      all_months: months_name,
      month_wise_customer: customerMonthwise,
      month_wise_retailer: retailerMonthwise,
      month_wise_order: orderMonthwise,
      month_wise_sales: salesMonthwise,
      best_admin: BestAdmins,
      poor_admins: PoorAdmins,
      my_retailer: myRetailer,
      total_se_stock: totalSeStock,
      total_se_stock_price: displayAmount(totalSeStockPrice),
      return_stock: returnStock,
      return_stock_price: displayAmount(returnStockPrice),
      total_distributor_stock: totalDistributorStock,
      total_distributor_stock_price: displayAmount(totalDistributorStockPrice),
      total_other_distributor_stock: totalOtherDistributorStock,
      total_other_distributor_stock_price: displayAmount(
        totalOtherDistributorStockPrice
      ),
      total_admin_stock: totalAdminStock,
      total_admin_stock_price: displayAmount(totalAdminStockPrice),
      total_other_admin_stock: totalOtherAdminStock,
      total_other_admin_stock_price: displayAmount(totalOtherAdminStockPrice),
      total_own_sale: displayAmount(totalOwnUsersSale),
      is_own: user.own,
      total_purchase: displayAmount(totalPurchase),
      total_avl_stock: totalAvlStock,
      total_avl_stock_price: displayAmount(totalAvlStockPrice),
      total_retailer_due: displayAmount(total_retailer_due),
      total_manager_stock: totalManagerStockPrice,
      total_manager_stock_price: displayAmount(totalManagerStockPrice),
      total_purchase_product: totalPurchaseProduct,
      total_own_sale_products: totalOwnUsersSaleProducts,
    };

    res.send(formatResponse(result, "Dashboard"));
  } catch (error) {
    console.log(error);
    return res
      .status(errorCodes.default)
      .send(formatErrorResponse(error.toString()));
  }
};

/**
 * Get Next User name
 *
 * @param req
 * @param res
 */
exports.nextUserName = async (req, res) => {
  let id = req.query.id || "";
  let name = await getNextUserName(req.query.role, id);

  res.send(formatResponse(name));
};

/**
 * Auto Notification
 *
 * @param req
 * @param res
 */
exports.autoNotifications = async (req, res) => {
  let today = moment().format("YYYY-MM-DD");
  let todayFormat = moment().format("DD/MM/YYYY");
  let sales = await saleModel.findAll({
    where: {
      [Op.or]: [{ due_date: today }, { settlement_date: today }],
      is_approved: 1,
      is_assigned: false,
      is_approval: false,
      due_amount: { [Op.gt]: 0 },
    },
  });
  for (let i = 0; i < sales.length; i++) {
    //due date
    if (moment(sales[i].due_date).isSame(moment(), "day")) {
      console.log(sales[i].id);
      let haveSent = await NoticationModel.findOne({
        where: {
          type: "sale_due",
          type_id: sales[i].id,
          ...getDateFromToWhere(today, today),
        },
      });
      if (!haveSent) {
        let message = `${sales[i].invoice_number} sale due date is ${todayFormat}.`;
        let data = {
          user_id: sales[i].sale_by,
          type_id: sales[i].id,
          type: "sale_due",
          params: JSON.stringify({
            sale_id: sales[i].id,
            due_date: moment(sales.due_date).format("YYYY-MM-DD"),
          }),
          message: message,
        };
        let notification = await NoticationModel.create(data);
        notification = NotificationCollection(notification);
        req.pusher.trigger(
          "ratnvihar_channel",
          `${sales[i].sale_by}-notification`,
          notification
        );
      }
    }

    //settlement date
    if (moment(sales[i].settlement_date).isSame(moment(), "day")) {
      let haveSent = await NoticationModel.findOne({
        where: { type: "sale_settlement", type_id: sales[i].id },
      });
      if (!haveSent) {
        let message = `${sales[i].invoice_number} sale settlement date is ${todayFormat}.`;
        let data = {
          user_id: sales[i].sale_by,
          type_id: sales[i].id,
          type: "sale_settlement",
          params: JSON.stringify({
            sale_id: sales[i].id,
            settlement_date: moment(sales[i].settlement_date).format(
              "YYYY-MM-DD"
            ),
          }),
          message: message,
        };
        let notification = await NoticationModel.create(data);
        notification = NotificationCollection(notification);
        req.pusher.trigger(
          "ratnvihar_channel",
          `${sales[i].sale_by}-notification`,
          notification
        );
      }
    }
  }

  let purchases = await PurchaseModel.findAll({
    where: {
      due_date: today,
      is_approved: 1,
      is_approval: false,
      sale_id: { [Op.is]: null },
      due_amount: { [Op.gt]: 0 },
    },
  });
  for (let i = 0; i < purchases.length; i++) {
    if (!purchases[i].sale_id) {
      continue;
    }

    //due date
    if (moment(purchases[i].due_date).isSame(moment(), "day")) {
      let haveSent = await NoticationModel.findOne({
        where: {
          type: "purchase_due",
          type_id: purchases[i].id,
          ...getDateFromToWhere(today, today),
        },
      });
      if (!haveSent) {
        let message = `${purchases[i].invoice_number} purchase due date is ${todayFormat}.`;
        let data = {
          user_id: purchases[i].user_id,
          type_id: purchases[i].id,
          type: "purchase_due",
          params: JSON.stringify({
            purchase_id: purchases[i].id,
            due_date: moment(purchases[i].due_date).format("YYYY-MM-DD"),
          }),
          message: message,
        };
        let notification = await NoticationModel.create(data);
        notification = NotificationCollection(notification);
        req.pusher.trigger(
          "ratnvihar_channel",
          `${purchases[i].user_id}-notification`,
          notification
        );
      }
    }
  }

  //visit notification
  let visits = await RetailerVisitModel.findAll({
    where: { [Op.and]: [{ date: { [Op.not]: null } }, { date: today }] },
  });
  for (let i = 0; i < visits.length; i++) {
    let haveSent = await NoticationModel.findOne({
      where: {
        type: "retailer_visit",
        type_id: visits[i].id,
        ...getDateFromToWhere(today, today),
      },
    });
    if (!haveSent) {
      let message = visits[i].notes;
      let data = {
        user_id: visits[i].user_id,
        type_id: visits[i].id,
        type: "retailer_visit",
        params: JSON.stringify({
          visit_id: visits[i].id,
          date: moment(visits[i].date).format("YYYY-MM-DD"),
          retailer_id: visits[i].visit_user_id,
        }),
        message: message,
      };
      let notification = await NoticationModel.create(data);
      notification = NotificationCollection(notification);
      req.pusher.trigger(
        "ratnvihar_channel",
        `${visits[i].user_id}-notification`,
        notification
      );
    }
  }

  res.send(formatResponse());
};
