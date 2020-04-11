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
})

// function that takes an array and a number and make the drink results into buttons (still need to add css style)
function displayDrinks(arry, counter) {
  const newBtn = $("<div class='drinkResults' value='" + arry[counter].idDrink + "'>")
  const fgTemp = $("<figure>")
  const imgTemp = $("<img class='drinkImg' src='" + arry[counter].strDrinkThumb + "'>")
  const divTemp = $("<div class='drinkInfo'>")
  const strTitle = $("<strong class='drinkTitle'>").text(arry[counter].strDrink)
  const arrows = $("<button class='next' value='" + arry[counter].idDrink + "'>").text("next")

  strTitle.append(arrows)
  divTemp.append(strTitle)
  fgTemp.append(imgTemp)
  newBtn.append(fgTemp)
  newBtn.append(divTemp)
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

  $("#ingredientsRes").html(`<h3>Drink Name: ${strDrink} </h3>
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