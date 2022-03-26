import * as model from '../model/model.js'
import  recipeView from "../views/recipeView.js"
import * as config from "../config.js"
const searchForm = document.querySelector(".searchForm")

let times = 0;

const renderRecipes = async function(query)
{
    try{      
    const data = await model.getRecipeSimpleData(query);
    let myRecipes = await model.createRecipes(data);
     
     recipeView.recipesPerPage(config.RESULT_PER_PAGE,myRecipes);
     if(times === 0){
     recipeView.goNext(myRecipes);
     recipeView.goPrev(myRecipes);
     recipeView.getRecipeID();
    //  recipeView.markRecipe();
     }
     times++;
    }
    catch(err){
        console.log(err);
        throw err;
    } 
}
searchForm.addEventListener("submit",function(e){
    e.preventDefault();
   recipeView.pageNumber.textContent = '1';
    renderRecipes(recipeView.searchFeild.value);
    recipeView.searchFeild.value= '';
   recipeView.right.classList.add("hidden");
   
});

recipeView.clearOnLoad();

