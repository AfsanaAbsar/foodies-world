const searchFood = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    console.log(searchText);

    // clear input
    searchInput.value = '';
    if (searchText == "") {
        document.getElementById('error-search').style.display = 'block';
    }

    //load api

    else {
        document.getElementById('error-search').style.display = 'none';
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`

        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals));
    }

}

const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = "";


    meals.forEach(meal => {
        console.log(meal);

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
     <div class="card h-100 rounded bg-light">
         <img src="${meal.strMealThumb}" class="card-img-top img-fluid p-4" alt="">
         <div class="card-body text-center">
             <h5 class="card-title p-4">${meal.strMeal}</h5>
           <button onclick="loadMealDetail(${meal.idMeal})" class="btn-success text-white ps-4 pe-4 pt-2 pb-2 border-0 rounded-pill">See Details</button>
         </div>
       
     </div>
 
     `
        searchResult.appendChild(div);
    });
}


const loadMealDetail = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => foodDetail(data.meals[0]))


}

const foodDetail = meal => {
    const mealDetails = document.getElementById('details-food');


    const div = document.createElement('div');
    div.classList.add('row');
    div.innerHTML = `
   
   <div class="col-md-4 p-5">
   <img src="${meal.strMealThumb}" class="img-fluid rounded " alt="">
  </div>
  <div class="col-md-8">
   <div class="card-body text-center">
       <h4 class="card-title text-success">${meal.strMeal}</h4>
       <h5>Ingredients</h5>
      <p>${meal.strIngredient1}</p>
      <p>${meal.strIngredient2}</p>
      <p>${meal.strIngredient3}</p>
      <p>${meal.strIngredient4}</p>
      <p>${meal.strIngredient5}</p>
    <a href="${meal.strYoutube}" target="blank"> <button class="rounded-pill btn-success text-white ps-4 pe-4 pb-2 pt-2 border-0">See Recipe Vedio</button></a>
   </div>
  </div>
    `
    mealDetails.appendChild(div);

}

