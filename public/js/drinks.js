$(document).ready(function () {

  $("#find-drink").on("click", function (event) {
    event.preventDefault()

    const data = $("#drink-input").val().trim()
    const queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + data

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response.drinks)

      //hard coded to get 2 results for now, decide on how many to display
      for (let index = 0; index < 2; index++) {
        displayDrinks(response.drinks, index)
      }
    })
  })

  //whenever button clicked...
  $(document).on("click", ".drinkResults", function () {
    const index = this.value
    const queryURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + index

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (res) {
      getIngredients(res.drinks)
    })
  })
})

// function that takes an array and a number and make the drink results into buttons (still need to add css style)
function displayDrinks(arry, counter) {
  const newBtn = $("<button class='drinkResults' value='" + arry[counter].idDrink + "'>")
  const fgTemp = $("<figure>")
  const imgTemp = $("<img class='drinkImg' src='" + arry[counter].strDrinkThumb + "'>")
  const divTemp = $("<div class='drinkInfo'>")
  const strTitle = $("<strong class='drinkTitle'>").text(arry[counter].strDrink)

  divTemp.append(strTitle)
  fgTemp.append(imgTemp)
  newBtn.append(fgTemp)
  newBtn.append(divTemp)
  $("#results").append(newBtn)
}

//trying to get a function going to get the ingredients dynamically (function not working)
function getIngredients(array) {
  const { strDrink, strCategory, strAlcoholic, strInstructions } = array[0]
  const newArray = Object.entries(array[0])
  console.log(newArray)
  let tempStr = ""

  for (i = 21; i < 35; i++) {
    if (newArray[i] === null) {
      return tempstr
    } else {
      tempStr = `
      ${newArray[i][1]}, ${newArray[i + 15][1]}`
    }
  }

  console.log(tempstr)
  $("#ingredientsRes").text(`
  Drink Name: ${strDrink};
  Category: ${strCategory};
  ${strAlcoholic};
  Instructions: ${strInstructions};
  ${tempStr}
  `)
}
