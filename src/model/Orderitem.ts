import { DataTypes, Model } from 'sequelize';
import sequelize  from '../util/Sequelize';
import GroceryItem from './Products';
import Order from './Orders';

interface OrderItemAttributes {

    orderId: number;
    itemId: number;
    quantity: number;
   itemTotalPrice : number;
}

class OrderItem extends Model<OrderItemAttributes> implements OrderItemAttributes {

    public orderId!: number;
    public itemId!: number;
    public quantity!: number;
    public itemTotalPrice!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

OrderItem.init(
    {
      
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        itemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        itemTotalPrice: { // Define itemTotalPrice attribute
            type: DataTypes.FLOAT,
            allowNull: false,
          },
    },
    {
        sequelize,
        tableName: 'order_items',
    }
);

OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(GroceryItem, { foreignKey: 'itemId' });

export default OrderItem;
