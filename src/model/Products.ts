import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../util/Sequelize';

interface ProductAttributes {
  name: string;
  price: number;
  inventory: number;
}

class Product extends Model<ProductAttributes> implements ProductAttributes {
  public name!: string;
  public price!: number;
  public inventory!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  inventory: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
},
}, {
  sequelize,
  modelName: 'Product'
});

export default Product;