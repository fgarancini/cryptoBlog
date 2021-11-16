const { Sequelize, DataTypes } = require("sequelize");
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
      validate: {
        len: [5, 20],
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
      allowNull: false,
    },
    Categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Fecha_de_Creacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "Posts",
  }
);

module.exports = Post;
