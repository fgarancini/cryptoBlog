const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db_connection");
const Post = require("./post");

const Category = sequelize.define("Category", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  Titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [5, 20],
    },
  },
},
{
  timestamps: false,
  tableName: "Caregories",
});


Category.hasMany(Post,{as:'Posts',foreignKey:'categoryID'});
// Post.belongsTo(Category, { foreignKey: 'id' });


module.exports = Category;
