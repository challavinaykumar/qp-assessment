import express from 'express';
import {viewAvailableGroceryItems,bookGroceryItems} from '../controller/User'
let app = express()

app.get('/available', viewAvailableGroceryItems);
app.post('/book', bookGroceryItems);



export default app;