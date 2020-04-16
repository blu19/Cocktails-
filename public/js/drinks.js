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
      console.log(response)
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
      console.log(response.drinks)
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
      console.log(indexCount)
      displayDrinks(drinksArray, indexCount, likedDrinksArray)
    } else {
      displayDrinks(drinksArray, indexCount, likedDrinksArray)
    }
  })


  $(document).on("click", ".like", function () {
    var currentLikeId = $(this).val()
    var currentDrinkName = this.name
    updateLikeBtn(currentLikeId, currentDrinkName);
    getFavorites(likedDrinksArray)
    $(".like").hide()
  })

})

// function that takes an array and a number and make the drink results into buttons (still need to add css style)
function displayDrinks(arry, counter, likedArray) {
  const newBtn = $("<div class='drinkResults' value='" + arry[counter].idDrink + "'>")
  const fgTemp = $("<figure>")
  const imgTemp = $("<img class='drinkImg' src='" + arry[counter].strDrinkThumb + "'>")
  const divTemp = $("<div class='drinkInfo'>")
  const strTitle = $("<strong class='drinkTitle'>").text(arry[counter].strDrink)
  const like = $("<button class='like' name='" + arry[counter].strDrink + "' value='" + arry[counter].idDrink + "'>").text("like")
  const next = $("<button class='next' value='" + arry[counter].idDrink + "'>").text(">")
  const prev = $("<button class='prev' value='" + arry[counter].idDrink + "'>").text("<")

  divTemp.append(strTitle)
  fgTemp.append(prev)
  fgTemp.append(imgTemp)
  fgTemp.append(next)
  newBtn.append(fgTemp)
  newBtn.append(divTemp)
  newBtn.append(like)
  $("#results").append(newBtn)

  let checkId = false
  let arryCount = 0

  // while (checkId === false) {
  //   try {
  //     if (arry[counter].idDrink === likedArray[arryCount].toString() || arryCount === 100) {
  //       checkId = true
  //       console.log("hide Like")
  //       $(".like").hide()
  //     } else {
  //       arryCount++
  //     }
  //   }
  //   catch (err) {
  //     console.log("got an error")
  //   }

  const ingUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + arry[counter].idDrink
  $.get(ingUrl, function (data) {
    getIngredients(data.drinks)
  })

  for (i = 0; i < likedArray.length; i++) {
    if (arry[counter].idDrink.toString() === likedArray[i].toString()) {
      console.log("hide Like")
      $(".like").hide()
      break
    }
  }
}

//trying to get a function going to get the ingredients dynamically (function not working)
function getIngredients(array) {
  const { strDrink, strCategory, strAlcoholic, strInstructions } = array[0]
  const newArray = Object.entries(array[0])
  var tempStr = ""

  tempStr = testI(tempStr, newArray)

  $("#ingredientsRes").html(`<h3 id="drinkName">Drink Name: ${strDrink} </h3> 
  <br>
  <h6> Category: ${strCategory} <h6>

  <h6> ${strAlcoholic} </h6> 

  <h6> Instructions: ${strInstructions} </h6>

  <h6> ${tempStr} </h6>

  `)

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


function updateLikeBtn(id, name) {
  let drinkId = { id: id, name: name }
  drinkId = JSON.stringify(drinkId)

  $.post("/updatelikes", {
    id: id,
    name: name,
  }).then(() => console.log("You've liked this drink")
  )
}

function getFavorites(array) {
  $(".tempDiv").remove()
  console.log("working?")
  $.ajax({
    url: "/favorites",
    method: "GET",
  }).then(function (response) {
    for (i = 0; i < response.length; i++) {
      array.push(response[i].drinksId)
      const outterDiv = $("<div class = tempDiv>")
      const newFav = $("<div class='favRow' data-value='" + response[i].drinksId + "'>").text(response[i].drinksName)

      outterDiv.append(newFav)
      $("#likedTable").append(outterDiv)
    }
  })
}