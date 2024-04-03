"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookGroceryItems = exports.viewAvailableGroceryItems = void 0;
const Products_1 = __importDefault(require("../model/Products"));
const sequelize_1 = require("sequelize");
const Orderitem_1 = __importDefault(require("../model/Orderitem"));
const Orders_1 = __importDefault(require("../model/Orders"));
const Sequelize_1 = __importDefault(require("../util/Sequelize"));
const viewAvailableGroceryItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const availableItems = yield Products_1.default.findAll({
            where: {
                inventory: {
                    [sequelize_1.Op.gt]: 0,
                },
            },
        });
        res.json(availableItems);
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.viewAvailableGroceryItems = viewAvailableGroceryItems;
const bookGroceryItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield Sequelize_1.default.transaction();
    try {
        const { items } = req.body;
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Invalid or empty items array' });
        }
        // Create a new order
        const order = yield Orders_1.default.create({ totalPrice: 0 }); // Initialize total price as 0
        let totalPrice = 0;
        for (const item of items) {
            const { itemId, quantity } = item;
            const groceryItem = yield Products_1.default.findByPk(itemId);
            if (!groceryItem) {
                return res.status(404).json({ error: `Grocery item with id ${itemId} not found` });
            }
            if (groceryItem.inventory < quantity) {
                return res.status(400).json({ error: `Not enough inventory for item with id ${itemId}` });
            }
            const itemTotalPrice = groceryItem.price * quantity;
            totalPrice += itemTotalPrice;
            // Create order item
            yield Orderitem_1.default.create({
                orderId: order.id,
                itemId,
                quantity,
                itemTotalPrice,
            });
            // Update inventory
            groceryItem.inventory -= quantity;
            yield groceryItem.save();
        }
        // Update total price of the order
        yield order.update({ totalPrice });
        res.status(201).json({ message: 'Order created successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message }); // Cast error to Error type
    }
});
exports.bookGroceryItems = bookGroceryItems;
