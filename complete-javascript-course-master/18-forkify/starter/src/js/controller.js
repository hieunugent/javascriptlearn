
import { async } from 'regenerator-runtime';
import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';


import 'core-js/stable';
import 'regenerator-runtime/runtime'
const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
   
    if(!id) return ;
    // loading spinner
    recipeView.renderSpinner()
    // 1. loading recipe
    await model.loadRecipe(id);
   
    // 2. Rendering recipe
    recipeView.render(model.state.recipe)
    
  } catch (error) {
    console.log(error);
    recipeView.renderError()
  }
};
const controlSearchResults = async function(){
  try {
    //  1 get search query
    const query = searchView.getQuery();
    if(!query) return ;
    // 2 load search results;
    await model.loadSearchResults(query);
    console.log(model.state.search.results);
  } catch (error) {
    
  }
}

const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();