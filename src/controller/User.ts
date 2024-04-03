import { Request, Response } from 'express';
import GroceryItem from '../model/Products';
import { Op } from 'sequelize';
import OrderItem from '../model/Orderitem';
import Order from '../model/Orders';
import sequelize from '../util/Sequelize';

export const viewAvailableGroceryItems = async (req: Request, res: Response) => {
  try {
    const availableItems = await GroceryItem.findAll({
      where: {
        inventory: {
          [Op.gt]: 0,
        },
      },
    });
    res.json(availableItems);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const bookGroceryItems = async (req: Request, res: Response) => {
    const t = await sequelize.transaction();
    try {
       
      const { items } = req.body;
      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Invalid or empty items array' });
      }
  
      // Create a new order
      const order = await Order.create({ totalPrice: 0 } as Order); // Initialize total price as 0
  
 
    let totalPrice = 0;
    for (const item of items) {
      const { itemId, quantity } = item;
      const groceryItem = await GroceryItem.findByPk(itemId);
      if (!groceryItem) {
        return res.status(404).json({ error: `Grocery item with id ${itemId} not found` });
      }
      if (groceryItem.inventory < quantity) {
        return res.status(400).json({ error: `Not enough inventory for item with id ${itemId}` });
      }
      const itemTotalPrice = groceryItem.price * quantity;
      totalPrice += itemTotalPrice;

      // Create order item
      await OrderItem.create({
        orderId: order.id,
        itemId,
        quantity,
        itemTotalPrice,
      });
      
      // Update inventory
      groceryItem.inventory -= quantity;
      await groceryItem.save();
    }

    // Update total price of the order
    await order.update({ totalPrice });
    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message }); // Cast error to Error type
  }
};