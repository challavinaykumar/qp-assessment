"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Sequelize_1 = __importDefault(require("../util/Sequelize"));
const Products_1 = __importDefault(require("./Products"));
const Orders_1 = __importDefault(require("./Orders"));
class OrderItem extends sequelize_1.Model {
}
OrderItem.init({
    orderId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    itemId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    itemTotalPrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    sequelize: Sequelize_1.default,
    tableName: 'order_items',
});
OrderItem.belongsTo(Orders_1.default, { foreignKey: 'orderId' });
OrderItem.belongsTo(Products_1.default, { foreignKey: 'itemId' });
exports.default = OrderItem;
