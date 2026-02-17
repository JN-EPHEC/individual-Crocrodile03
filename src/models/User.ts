import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {}

User.init(
  {
    // Model attributes are defined here
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nom: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
  },
);

// the defined model is the class itself
console.log(User === sequelize.models.User); // true

// Valid
/*
class User extends Model {
  declare id: number; // this is ok! The 'declare' keyword ensures this field will not be emitted by TypeScript.
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  { sequelize },
);

const user = new User({ id: 1 });
console.log(user.id); // 1
*/
export default User;