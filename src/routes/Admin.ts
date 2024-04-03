import express from 'express';
import {createProduct,getAllProducts,getItemById,updateItem,deleteItem,manageInventory} from '../controller/Admin'
let app = express()


app.post('/grocery-items',createProduct)
app.get('/grocery-items',getAllProducts)
app.get('/grocery-items/:id',getItemById)
app.put('/grocery-items/:id',updateItem)
app.delete('/grocery-items/:id',deleteItem)
app.post('/manage-inventory', manageInventory);


export default app;