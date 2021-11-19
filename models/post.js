const { Sequelize, DataTypes } = require("sequelize");
const DateTime = require("tedious/lib/data-types/datetime");
const sequelize = require("../db_connection");


const Post = sequelize.define(
  "Post",
  {
    ID: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    Titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [5, 60],

      },
    },
    Contenido: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 250],
      },
    },
    Imagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Fecha_de_Creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date('now')
    },
    categoryID:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  },
  {
    timestamps: false,
    tableName: "Posts",
  }
);


module.exports = Post;
