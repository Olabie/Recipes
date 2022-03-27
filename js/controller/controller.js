import * as model from '../model/model.js'
import  recipeView from "../views/recipeView.js"
import * as config from "../config.js"
const searchForm = document.querySelector(".searchForm")
let availabeSearch = ['carrot',
'broccoli','asparagus','cauliflower','corn','cucumber','green pepper','lettuce',
'mushrooms','onion','potato','pumpkin','red pepper','tomato','beetroot','brussel sprouts',
'peas','zucchini','radish','sweet potato','artichoke','leek','cabbage','celery','chili',
'garlic','basil','coriander','parsley','dill','rosemary','oregano',
'cinnamon','saffron','green bean','bean','chickpea',
'lentil','apple','apricot','avocado','banana','blackberry','blackcurrant',
'blueberry','boysenberry','cherry','coconut','fig','grape','grapefruit',
'kiwifruit','lemon','lime','lychee','mandarin','mango','melon','nectarine',
'orange','papaya','passion fruit','peach','pear','pineapple','plum','pomegranate',
'quince','raspberry','strawberry','watermelon','salad','pizza','pasta',
'popcorn','lobster','steak','bbq','pudding','hamburger','pie','cake',
'sausage','tacos','kebab','poutine','seafood','chips','fries','masala',
'paella','som tam','chicken','toast','marzipan','tofu','ketchup','hummus',
'chili','maple syrup','parma ham','fajitas','champ','lasagna','poke',
'chocolate','croissant','arepas','bunny chow','pierogi','donuts','rendang',
'sushi','ice cream','duck','curry','beef','goat','lamb','turkey','pork',
'fish','crab','bacon','ham','pepperoni','salami','ribs'];
let times = 0;

const renderRecipes = async function(query)
{
    try{      
        recipeView.renderLoading(recipeView._resultsParent);
    const data = await model.getRecipeSimpleData(query);
     const myRecipes = await model.createRecipes(data); 
     recipeView.recipesPerPage(config.RESULT_PER_PAGE,myRecipes);
     recipeView.goNext(myRecipes);
     recipeView.goPrev(myRecipes);
     if(times === 0){
     recipeView.getRecipeID();
    //  recipeView.markRecipe();
     }
     times++;
    }
    catch(err){
        throw err;
    } 
}
searchForm.addEventListener("submit",function(e){
    e.preventDefault();
   recipeView.pageNumber.textContent = '1';
   if(availabeSearch.includes(String(recipeView.searchFeild.value.toLocaleLowerCase())))
    renderRecipes(recipeView.searchFeild.value);
    else{
       recipeView.renderNotFoundRecipe();
    }
    recipeView.searchFeild.value= '';
   recipeView.right.classList.add("hidden");
   
});

recipeView.clearOnLoad();

