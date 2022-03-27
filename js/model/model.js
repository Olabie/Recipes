import * as config from "../config.js"
export async function getRecipeSimpleData(query){
    try{
 const res = await fetch(`${config.API_QUERY_SEARCH}${query}`);
 if(res.status !==200)
 throw Error("It is not ok")
 return await res.json();
    }
    catch(err)
    {
      
        throw err;
    }
}
export async function getRecipeData(id){
    try{
 const res = await fetch(`${config.API_ID_SEARCH}${id}`);
 if(res.status !==200)
 throw Error("It is not ok")
 const data = await res.json();
 return data;
    }
    catch(err)
    {
        
        throw err;
    }
}
export async function createRecipes(data){
    try{
    const [...recipes] = data.recipes;
   return  recipes.map(res => res={
       img : res.image_url,
       creator : res.publisher,
       creatorLink : res.publisher_url,
       recipeId : res.recipe_id,
       tutorial : res.source_url,
       title: res.title,
   });
    }catch(err)
    {
       
        throw err;
    }
}