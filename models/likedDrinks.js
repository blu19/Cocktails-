//creating our liked drinks table model
module.exports = function(sequelize, DataTypes) {
  console.log("creating")
  var likedDrinks = sequelize.define("Liked_Drinks", {
    userId: DataTypes.INTEGER,
    drinksId: DataTypes.INTEGER,
    drinksName: DataTypes.STRING,
  })
  return likedDrinks;
};