//creating our liked drinks table model
module.exports = function(sequelize, DataTypes) {
  console.log("creating liked drinks---------------");
  var LikedDrinks = sequelize.define("LikedDrinks", {
    userId: DataTypes.INTEGER,
    drinksId: DataTypes.INTEGER,
    drinksName: DataTypes.STRING,
  })
  return LikedDrinks;
};