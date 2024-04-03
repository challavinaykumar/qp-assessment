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
exports.manageInventory = exports.deleteItem = exports.updateItem = exports.getItemById = exports.getAllProducts = exports.createProduct = void 0;
const Products_1 = __importDefault(require("../model/Products"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, inventory, price } = req.body;
    try {
        const product = yield Products_1.default.create({ name, inventory, price });
        res.status(201).json(product);
    }
    catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createProduct = createProduct;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Products_1.default.findAll();
        res.json(product);
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllProducts = getAllProducts;
const getItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const item = yield Products_1.default.findByPk(id);
        if (item) {
            res.json(item);
        }
        else {
            res.status(404).json({ message: 'Item not found' });
        }
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getItemById = getItemById;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { name, price, inventory } = req.body;
        const item = yield Products_1.default.findByPk(id);
        if (item) {
            yield item.update({ name, price, inventory });
            res.json(item);
        }
        else {
            res.status(404).json({ message: 'Item not found' });
        }
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateItem = updateItem;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const item = yield Products_1.default.findByPk(id);
        if (item) {
            yield item.destroy();
            res.sendStatus(204);
        }
        else {
            res.status(404).json({ message: 'Item not found' });
        }
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deleteItem = deleteItem;
const manageInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, quantity } = req.body;
        const groceryItem = yield Products_1.default.findByPk(id);
        if (!groceryItem) {
            return res.status(404).json({ message: 'Grocery item not found' });
        }
        const newInventory = groceryItem.inventory + quantity;
        yield groceryItem.update({ inventory: newInventory });
        res.sendStatus(204);
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.manageInventory = manageInventory;
