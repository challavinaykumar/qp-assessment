import { Request, Response } from 'express';
import Product from '../model/Products';

export const createProduct = async (req: Request, res: Response) => {
    const { name, inventory ,price} = req.body;
    
    try {
      const product = await Product.create({ name, inventory,price});
      res.status(201).json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  export const getAllProducts =async (req: Request, res: Response) => {

            try{
                const product =await Product.findAll()
                res.json(product)
            }
            catch(error){
                console.error('Error fetching products:', error);
                res.status(500).json({ error: 'Internal server error' });
            }

  }


  export const getItemById = async (req: Request, res: Response) => {
   
    try {
      const id = parseInt(req.params.id)
      const item = await Product.findByPk(id);
      
      if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
} catch (error) {
  console.error('Error fetching products:', error);
  res.status(500).json({ error: 'Internal server error' });
}
  };

  export const updateItem = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { name, price,inventory  } = req.body;
        const item = await Product.findByPk(id);
        if (item) {
            await item.update({ name, price,inventory });
            res.json(item);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
      const id = parseInt(req.params.id);
      const item = await Product.findByPk(id);
      if (item) {
          await item.destroy();
          res.sendStatus(204);
      } else {
          res.status(404).json({ message: 'Item not found' });
      }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



export const manageInventory = async (req: Request, res: Response) => {
  try {
      const { id, quantity } = req.body;
      const groceryItem = await Product.findByPk(id);
      if (!groceryItem) {
          return res.status(404).json({ message: 'Grocery item not found' });
      }
      const newInventory = groceryItem.inventory + quantity;
      await groceryItem.update({ inventory: newInventory });
      res.sendStatus(204);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

