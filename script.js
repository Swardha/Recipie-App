
// initializing elements
const data = document.querySelector("#inp-data");
const button = document.querySelector("#btn-search");
const result = document.querySelector("#inp-result");
// url for recipies
const url="https://themealdb.com/api/json/v1/1/search.php?s=";

// adding event to search button
button.addEventListener("click", ()=>{
    let event = data.value;
    fetch(`${url}${event}`)
    .then((response) => response.json())
    .then((data) => {
        const myMeal = data.meals[0];
        // initializing count value to 1
        let count=1;
        // creating empty array for adding required ingredients
        let items=[];
        // printing all ingredients with their respective quantity-measures
        for(let i in myMeal){
            let item="";
            let measure="";
            if(i.startsWith("strIngredient") && myMeal[i]){
                item = myMeal[i];
                measure = myMeal[`strMeasure` + count];
                count+=1;
                items.push(`${item} ${measure}`)
                
            }
        }
        // adding html to result for search details
        result.innerHTML=`
        <div class="img-1">
        <img src=${myMeal.strMealThumb}
        </div>
        <div class="details">
        <h3>${event}</h3>
        <h2>${myMeal.strArea}</h2>
        </div>
        <div class="list-ingredients">
        <ul class="items">${items}</ul>
        </div>
        <div class="view">
        <button class="view-content">View Recipie</button>
        </div>
        <div class="watch-recipie">
        <button class="hide">X</button>
        <pre id="intructions">${myMeal.strInstructions}</pre>
         </div>`;
        //  initializing elements for close and view-recipie buttons
        let viewRecipie = document.querySelector(".view-content");
        let hidden = document.querySelector(".hide");
        let watchy = document.querySelector(".watch-recipie");
        // adding event to view-recipie button
        viewRecipie.addEventListener("click", ()=>{
            watchy.style.display = "block";
        })
        // adding event to close button
         hidden.addEventListener("click", ()=>{
            watchy.style.display = "none";
    })

})
// catching error for invalid data
.catch(()=>{
        result.innerHTML= `<h3>No data found</h3>`
    })

   
})






   
