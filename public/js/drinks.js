$(document).ready(function () {
  let drinksArray = []
  let indexCount = 0

  $("#find-drink").on("click", function (event) {
    event.preventDefault()

    const data = $("#drink-input").val().trim()
    const queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + data

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response.drinks)
      drinksArray = response.drinks
      displayDrinks(drinksArray, indexCount)
    })
  })

  // //whenever button clicked...
  // $(document).on("click", ".drinkResults", function () {
  //   const index = this.value
  //   const queryURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + index

  //   $.ajax({
  //     url: queryURL,
  //     method: "GET",
  //   }).then(function (res) {
  //     getIngredients(res.drinks)
  //   })
  // })

  $(document).on("click", ".next", function () {
    $(".drinkResults").remove()
    indexCount++
    displayDrinks(drinksArray, indexCount)
  })
  $(document).on("click", ".like", function () {
    var currentLikeId = $(this).val()
    var currentDrinkName = this.name
    // likeDrinks(currentLikeId,drinkStringId,updateDrinksId);
    // updateDrinksId(drinkStringId);
    updateLikeBtn(currentLikeId, currentDrinkName);
  })
  
})

// function that takes an array and a number and make the drink results into buttons (still need to add css style)

function displayDrinks(arry, counter) {
  const newBtn = $("<div class='drinkResults' value='" + arry[counter].idDrink + "'>")
  const fgTemp = $("<figure>")
  const imgTemp = $("<img class='drinkImg' src='" + arry[counter].strDrinkThumb + "'>")
  const divTemp = $("<div class='drinkInfo'>")
  const strTitle = $("<strong class='drinkTitle'>").text(arry[counter].strDrink)
  const arrows = $("<button class='next' value='" + arry[counter].idDrink + "'>").text("next")
  const like = $("<button class='like' name='" + arry[counter].strDrink + "' value='" + arry[counter].idDrink + "'>").text("like")

  strTitle.append(arrows)
  divTemp.append(strTitle)
  fgTemp.append(imgTemp)
  newBtn.append(fgTemp)
  newBtn.append(divTemp)
  newBtn.append(like)
  $("#results").append(newBtn)

  const ingUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + arry[counter].idDrink
  $.get(ingUrl, function (data) {
    console.log(data.drinks)
    getIngredients(data.drinks)
  })
}


//trying to get a function going to get the ingredients dynamically (function not working)
function getIngredients(array) {
  const { strDrink, strCategory, strAlcoholic, strInstructions } = array[0]
  const newArray = Object.entries(array[0])
  console.log(newArray)
  var tempStr = ""

  tempStr = testI(tempStr, newArray)

  $("#ingredientsRes").html(`<h3 id="drinkName">Drink Name: ${strDrink} </h3> 
  <br>
  <h6> Category: ${strCategory} <h6>

  <h6> ${strAlcoholic} </h6> 

  <h6> Instructions: ${strInstructions} </h6>

  <h6> ${tempStr} </h6>

  `)


  // `)
}

function testI(emStr, array) {
  for (i = 21; i < 35; i++) {
    if (array[i][1] === null) {
      return emStr
    } else {
      emStr += `
      ${ array[i][1]}: ${array[i + 15][1] === null ? "your decision" : array[i + 15][1]} <br>`
    }
  }
}





//ROAD BLOCK TO ASK FOR TA'S AND WILL 

// global variables.. Is there a different way to give updateDrinksId access to drinkStringId???
// var currentDrinkId;
// var drinkStringId;

// //Click Save Function 
// function likeDrinks(currentLikeId,drinkStringId,callback) {
//   currentDrinkId = currentLikeId;
//   drinkStringId = currentDrinkId.toString();
//   console.log(currentLikeId)
//   console.log(typeof drinkStringId)
//   $.get("/members", {
//     id: 1, 
//    user_liked_drinks: drinkStringId,
//   })
//     .then(function(data) {
//       console.log("---------------------------")
//       console.log(callback)
//       if(callback) {
//         callback(drinkStringId);
//       }
//       res.json(data)
//       // If there's an error, handle it by throwing up a bootstrap alert
//     })
// }

// // unable to access drinkStringId from above function because of scope
// function updateDrinksId(drinkStringId) {
//   console.log("---------------------------")
//   console.log(drinkStringId)
//   ajax.put("/members", {
//     id: 1,
//     user_liked_drinks: drinkStringId,
//   })
//   .then(function(id) {
//     console.log('Added your drinks to your favorites')
//     res.json(id)
//   })
// }

function updateLikeBtn(id, name) {
  // let drinkId = id
  let drinkId = { id : id, name : name }
  drinkId = JSON.stringify(drinkId)
  console.log(typeof drinkId, "----------------")
  console.log(drinkId, "*******")
  // console.log(drinkId)
  // console.log(drinkName, "--------------")


  $.post("/updatelikes", {
    id: id,
    name: name,
  }).then(() => console.log("You've liked this drink")  
  )
}
