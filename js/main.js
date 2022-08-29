const mealsContainer = document.getElementById("meals-container");
const spinner = document.getElementById("spinner");
spinner.style.display = "none";
const loadMealsData = () => {
  spinner.style.display = "block";
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((res) => res.json())
    .then((data) => displayMeals(data.categories));
};
const displayMeals = (meals) => {
  spinner.style.display = "none";
  const totalCategories = (document.getElementById(
    "total-categories"
  ).innerText = meals.length);

  meals.splice(0, 12).forEach((meal) => {
    const { strCategory, strCategoryThumb } = meal;
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
            <div class="col">
            <div class="card bg-dark">
            <div class="">
                <img
                src="${strCategoryThumb}"
                class="card-img-top img-fluid"
                alt="..."
                />
            </div>
            <div class="card-body text-center">
                <h5 class="card-title">${strCategory}</h5>
                <button class="btn btn-warning">Meal Details</button>
            </div>
            </div>
            </div>
    `;
    mealsContainer.appendChild(div);
  });
};

const searchMealsData = (searchInputValue) => {
  spinner.style.display = "block";
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputValue}`
  )
    .then((res) => res.json())
    .then((data) => displaySearchMeals(data.meals));
};
const displaySearchMeals = (meals) => {
  spinner.style.display = "none";
  mealsContainer.innerHTML = "";
  const mealsTitle = (document.getElementById("meals-title").innerText =
    "Find Search Meals");
  const totalSearch = (document.getElementById("total-search").innerText =
    meals.length);
  meals.forEach((meal) => {
    const { idMeal, strMeal, strMealThumb } = meal;
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
            <div class="col">
            <div class="card bg-dark">
            <div class="">
                <img
                src="${strMealThumb}"
                class="card-img-top img-fluid"
                alt="..."
                />
            </div>
            <div class="card-body text-center">
                <h5 class="card-title">${strMeal}</h5>
                <button onclick='mealsDetails("${idMeal}")' class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">Meal Details</button>
            </div>
            </div>
            </div>
    `;
    mealsContainer.appendChild(div);
  });
};
const mealsDetails = (mealID) => {
  spinner.style.display = "block";
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => displayMealDetails(data.meals));
};
const displayMealDetails = (meal) => {
  spinner.style.display = "none";
  const { strMeal, strArea, strMealThumb, strYoutube } = meal[0];
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
      <div class="card text-center">
      <div class="card-header fw-bold">
        ${strMeal}
      </div>
      <div class="card-body">
        <img class="img-fluid" src="${strMealThumb}" ></img>
        <p class="card-text">Area : <span class="text-danger">${strArea}</span> </p>
        <a href="${strYoutube}" class="btn btn-dark">Go YouTube</a>
      </div>
      </div>
  `;
  modalBody.appendChild(div);
};
// Search
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", function () {
  const searchInput = document.getElementById("search-input");
  const searchInputValue = searchInput.value.toLowerCase();
  searchMealsData(searchInputValue);
  searchInput.value = "";
});
loadMealsData();
