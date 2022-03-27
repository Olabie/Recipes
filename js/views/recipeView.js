import * as config from "../config.js"
import * as model from "../model/model.js"
class RecipeView{
     searchFeild = document.querySelector(".search-feild");
     pageNumber = document.querySelector(".pageNumber");
     right= document.querySelector(".rightt")
     _prev = document.querySelector(".prevr");
     _next = document.querySelector(".nextr");
     _resultsParent =  document.querySelector(".results");
     _ingredients = document.querySelector(".ingredients");
     _guide = document.querySelector(".guide");
     _ingTitle = document.querySelector(".ingTitle");
     _lastPage  = false;
     _firstPage = false;
    //  booksmarks =[]; 
    timesN = 0; //make sure that only 1 event listener is added to the next button
    timesP =0;//make sure that only 1 event listener is added to the prev button
    // markRecipe(id){
    //   const  markButton = document.querySelector(".mark"); 
    //     markButton.addEventListener("click",()=>{
    //         if(!id) return;
    //         const arrMarks = JSON.parse(localStorage.getItem("bookedRecipes"));
    //         console.log(arrMarks)
    //         if(!arrMarks && this.booksmarks.length > 0) return;
    //         if(arrMarks)
    //         this.booksmarks = [...this.booksmarks,...arrMarks]
    //         console.log(this.booksmarks);
    //         if(this.booksmarks.includes(id))return;
    //         console.log("A new recipe has been added");
    //         localStorage.removeItem("bookedRecipes");
    //         this.booksmarks.push(id);
    //     localStorage.setItem("bookedRecipes",JSON.stringify(this.booksmarks));
    //     });
        
    // }
        // Start methods
     goNext(myRecipes){      
         if(this.timesN ===0)  
            this._next.addEventListener("click",()=>{
             if(this._lastPage === true)
             return;
            Number(this.pageNumber.textContent++); 
            this.recipesPerPage(config.RESULT_PER_PAGE,myRecipes,Number(this.pageNumber.textContent));
         });
         
    }       
    renderLoading(par){
        const markup = `
        <div class="loader"> </div>`;
        par.innerHTML =' ';
        par.classList.remove("hidden");
        par.insertAdjacentHTML("afterbegin",markup);
    }
       getRecipeID(){
           this._resultsParent.addEventListener("click",async (e)=>{
                    const clicked = e.target.closest(".result");
                    if(!clicked) return;  
                    this.right.classList.remove("hidden");
                    this.right.innerHTML = ''
                    this.renderLoading(this.right);
              await this.getRecipeDetails(clicked.dataset.id);
             
           });
           return this.recipeId;
       }
      async getRecipeDetails(recipe){
          const data = await model.getRecipeData(recipe)
      
         
         this.renderRecipeDetails(data.recipe);
           
       }
       renderIngredients(arr)
       {      
           let string = "";
           for(let i =0; i<arr.length;i++)
           {
             const markup =  `<div class="ingredient">
               <p><i class="fa-solid check fa-check"></i>  ${arr[i]}</p>
           </div>
               `
               string= string + markup;
           }
           return string;
       }
       renderRecipeDetails(recipe){
      this.right.innerHTML ='';
          const markup = `
          <div class="top">
            <h3 class="ingTitle" >${recipe.title}</h3>
            <!--  <button  style="max-height: 50px;" class="mark"><i class="fa-solid fa-bookmark"></i></button> -->  
        </div>
        <div style="flex-direction: column;" class="ingredients">
           
          ${this.renderIngredients(recipe.ingredients)}
          
        </div>
        <div class="help">
            <p class="description">
                This recipe was made by ${recipe.publisher},Click on the Tutorial button to get
                more detials on how to cook it!
            </p>
            
            <a target="_blank" href="${recipe.source_url}" class="guide" >Tutorial</a>
        </div>
          `
          this.right.insertAdjacentHTML("afterbegin",markup)
        //   this.markRecipe(121322)
       }
     goPrev(myRecipes){
        if(this.timesN ===0) 
         this._prev.addEventListener("click",()=>{     
             if(this._firstPage === true)
             return;
        Number(this.pageNumber.textContent--);
        this.recipesPerPage(config.RESULT_PER_PAGE,myRecipes,Number(this.pageNumber.textContent)); 
         });
    }     
    renderNotFoundRecipe(){
      
        const markup = `<p class="error-msg" >Sorry we could not find <span class="searchValue">${this.searchFeild.value}
       </span> in our reciepes,Try another one!</p>`;
        this._next.classList.add("hidden");
        this._prev.classList.add("hidden");
        this.pageNumber.classList.add("hidden"); 
        this.right.classList.add("hidden"); 
        this.right.innerHTML = '';
        this._resultsParent.innerHTML = '';
        this._resultsParent.classList.remove("hidden")
        this._resultsParent.insertAdjacentHTML("afterbegin",markup);
    }
    clearOnLoad()
    {     
        window.addEventListener("load",()=>{        
           this._resultsParent.innerHTML = '';
            if(this._resultsParent.innerHTML ==='')
            {
                this._next.classList.add("hidden");
                this._prev.classList.add("hidden");
                this.pageNumber.classList.add("hidden"); 
                this.right.classList.add("hidden"); 
            }
        });
    }
     renderResults(recipes){
        for(let i = 0 ; i<recipes.length; i++)
        {
             let recipe = recipes[i]
            let title= '';
                if(recipe.title.length > 12)
                    title =recipe.title.slice(0,12) +"...";
                    else
                    title = recipe.title;
            const markup = `
            <div data-id=${recipe.recipeId} class="result">
            <img src="${recipe.img}" alt="">
            <div class="text">
                <h3>${title}</h3>
            <p class="creator">Created by ${recipe.creator}</p>
            </div>
          </div>
            `;
            this._resultsParent.insertAdjacentHTML('afterbegin',markup);
        }
    }
recipesPerPage (resPerPage,recipes,page=1)
{
     this._resultsParent.innerHTML = '';
     this.pageNumber.classList.remove("hidden");
    const start = (page-1) * resPerPage;
    if(!recipes[start]) return;
    const end = page* resPerPage;
    if(end > recipes.length-1) {
        this._lastPage = true;
    this.renderResults(recipes.slice(start,end));
    this._next.classList.add("hidden");
    }
    else{
        this._lastPage=false;
    this.renderResults(recipes.slice(start,end));
    this._next.classList.remove("hidden"); 
}
    if(start <= 0) {
        this._firstPage= true;
        this._prev.classList.add("hidden");
        }
     else{
            this._firstPage =false;
            this._prev.classList.remove("hidden");
         }
}
} 
export default new RecipeView()