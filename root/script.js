let inputField = document.querySelector(".search input");
let mealsUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=`;
let recipeUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=`;
let searchButton = document.querySelector(".search-button img");
let greetingPage = document.querySelector(".greeting");

async function getMeal(url) {
  try {
    const response = await fetch(url);
    var data = await response.json();
    showMeal(data);
  } catch (error) {
    greetingPage.style.display = "flex";
    greetingPage.innerHTML = "WE DON'T HAVE THAT MEAL/INGRIDIENT";
  }
}

async function getRecipe(id) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    var data = await response.json();
    showRecipe(data);
  } catch (error) {
    greetingPage.style.display = "flex";
    greetingPage.innerHTML = "WE DON'T HAVE A RECIPE FOR THAT";
  }
}

function showRecipe(data) {
  for (let r of data.meals) {
    tab = `

            <div class="info-meal-name">${r.strMeal}</div>
            <div class="food-info-container">
            <div class="close-button div1"></div>
            <div class="close-button div2"></div>
                <p class="category">Category: ${r.strCategory}</p>
                <h3>INSTRUCTIONS</h3>
                <p class="instructions">${r.strInstructions}</p>
                <div class="info-watch-on">
                    <p>Watch on: </p>
                    <a href="${r.strYoutube}"><img src="./icons/youtube-logo.png" alt=""></a>
                </div>
            </div>
    `;

    document.querySelector(".food-info").innerHTML = tab;
    const closeButton = document.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
      document.querySelector(".food-info").style.display = "none";
    });
  }
}

function showMeal(data) {
  for (let r of data.meals) {
    tab = `
    <div class="meals">
            <div class="meal-card-container">
                <div class="meal-card">
                    <div class="meal-image">
                        <img src="${r.strMealThumb}" class="image">
                    </div>
                    <div class="meal-info">
                        <p>
                           ${r.strMeal}
                        </p>
                    </div>
                    <div class="read-more">
                        <button class="button-78" role="button">
                         <p class="${r.idMeal}">READ MORE...</p>
                         </button>
                    </div>
                </div>
            </div>
            </div>
    `;

    document.querySelector(".meals").innerHTML += tab;
  }
  const readMore = document.querySelectorAll(".read-more p");
  readMore.forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(".food-info").style.display = "flex";
      getRecipe(button.classList[0]);
    });
  });
}

searchButton.addEventListener("click", () => {
  greetingPage.style.display = "none";
  document.querySelector(".meals").innerHTML = "";
  getMeal(mealsUrl + inputField.value);
  inputField.value = "";
});
