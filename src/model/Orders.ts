import { DataTypes, Model } from 'sequelize';
import sequelize  from '../util/Sequelize';

interface OrderAttributes {
    id: number;
    totalPrice: number;
}

class Order extends Model<OrderAttributes> implements OrderAttributes {
    public id!: number;
    public totalPrice!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'orders',
    }
);

export default Order;
