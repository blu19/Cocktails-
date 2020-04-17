$(document).ready(function () {
  let drinksArray = []
  let likedDrinksArray = []
  let indexCount = 0

  getFavorites(likedDrinksArray)

  $(document).on("click", ".favRow", function () {

    const queryURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + $(this).data("value")
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      $(".drinkResults").remove()
      displayDrinks(response.drinks, 0, likedDrinksArray)
      $(".next").hide()
      $(".prev").hide()
    })
  })

  $("#find-drink").on("click", function (event) {
    event.preventDefault()
    $(".drinkResults").remove()
    const data = $("#drink-input").val().trim()
    const queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + data

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      drinksArray = response.drinks
      displayDrinks(drinksArray, indexCount, likedDrinksArray)
    })
  })

  $(document).on("click", ".next", function () {
    $(".drinkResults").remove()
    indexCount++
    if (indexCount === drinksArray.length) {
      indexCount = 0
      displayDrinks(drinksArray, indexCount, likedDrinksArray)
    } else {
      displayDrinks(drinksArray, indexCount, likedDrinksArray)
    }
  })

  $(document).on("click", ".prev", function () {
    $(".drinkResults").remove()
    indexCount--
    if (indexCount === -1) {
      indexCount = drinksArray.length - 1
      displayDrinks(drinksArray, indexCount, likedDrinksArray)
    } else {
      displayDrinks(drinksArray, indexCount, likedDrinksArray)
    }
  })


  $(document).on("click", ".like", function () {
    var currentLikeId = $(this).data("value")
    var currentDrinkName = $(this).data("name")
    updateLikeBtn(currentLikeId, currentDrinkName, likedDrinksArray);
    $(".like").hide()
  })

})

function displayDrinks(arry, counter, likedArray) {
  const newBtn = $("<div class='drinkResults' value='" + arry[counter].idDrink + "'>")
  const fgTemp = $("<figure>")
  const imgTemp = $("<img class='drinkImg' src='" + arry[counter].strDrinkThumb + "'>")
  const divTemp = $("<div class='drinkInfo'>")
  const strTitle = $("<strong class='drinkTitle'>").text(arry[counter].strDrink)
  const like = $(
    "<img class='like' src='https://img.icons8.com/bubbles/75/000000/thumb-up.png' data-name='" +
      arry[counter].strDrink +
      "' data-value='" +
      arry[counter].idDrink +
      "'>"
  )
  const next = $("<button class='next carousel-control-next-icon' value='" + arry[counter].idDrink + "'>")
  const prev = $("<button class='prev carousel-control-prev-icon' value='" + arry[counter].idDrink + "'>")
  
  fgTemp.append(prev)
  fgTemp.append(imgTemp)
  fgTemp.append(next)
  newBtn.append(fgTemp)
  newBtn.append(divTemp)
  newBtn.append(like)
  $("#results").append(newBtn)

  const ingUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + arry[counter].idDrink
  $.get(ingUrl, function (data) {
    getIngredients(data.drinks)
  })

  for (i = 0; i < likedArray.length; i++) {
    if (arry[counter].idDrink.toString() === likedArray[i].toString()) {
      $(".like").hide()
      break
    }
  }
}

function getIngredients(array) {
  const { strDrink, strCategory, strAlcoholic, strInstructions } = array[0]
  const newArray = Object.entries(array[0])
  var tempStr = ""

  tempStr = testI(tempStr, newArray)

  $("#ingredientsRes").html(`\ <div class= "border-box" </div> <h1 id="drinkName"> ${strDrink} </h1> 
  <br>
  <br>
  <h4> Category: ${strCategory} <h4>
  <br>
  <br>
  <h4> ${strAlcoholic} </h4> 
  <br>
  <br>
  <h4> Instructions: ${strInstructions} </h4>
  <br>
  <br>
  <h4> ${tempStr} </h4>`)

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

function updateLikeBtn(id, name, array) {
  let drinkId = { id: id, name: name }
  drinkId = JSON.stringify(drinkId)

  $.post("/updatelikes", {
    id: id,
    name: name,
  }).then((drink) => {console.log("You've liked this drink")
    getFavorites(array)
})
}

function getFavorites(array) {
  $(".tempDiv").remove()
  $.ajax({
    url: "/favorites",
    method: "GET",
  }).then(function (response) {
    for (i = 0; i < response.length; i++) {
      array.push(response[i].drinksId)
      const outterDiv = $("<div class = tempDiv>")
      const newFav = $("<div class='favRow' id='favRowId' data-value='" + response[i].drinksId + "'>").text(response[i].drinksName)

      outterDiv.append(newFav)
      $("#likedTable").append(outterDiv)
    }
  })
}