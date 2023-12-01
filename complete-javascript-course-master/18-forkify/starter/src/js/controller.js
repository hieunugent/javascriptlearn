
import { async } from 'regenerator-runtime';
import * as model from './model.js'
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime'
import resultView from './views/resultView.js';
const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
if (module.hot){
  module.hot.accept()
}
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
   
    if(!id) return ;
    // loading spinner
    recipeView.renderSpinner()
    // 1. loading recipe
    await model.loadRecipe(id);
   
    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
   
    
  } catch (error) {
    console.log(error);
    recipeView.renderError()
  }
};
const controlSearchResults = async function(){
  try {
    resultView.renderSpinner();

    //  1 get search query
    const query = searchView.getQuery();
    if (!query) return;
    // 2 load search results;
    await model.loadSearchResults(query);
    // 3. render results
    // console.log(model.state.search.results);
    console.log(model.getSearchResultsPage());

    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultsPage());

    // 4. render initial pagination button  
    paginationView.render(model.state.search)

  } catch (error) {
    console.log(error);
  }
}
const controlPagination = function(goToPage){
  // 1. Render new results
  // console.log(model.state.search.results);
    resultView.render(model.getSearchResultsPage(goToPage));


  // 2. Render new pagination buttons
     paginationView.render(model.state.search);

}

const controlServing = function(updateTo){
  // Update the recipe servings (in state)
     model.updateServings(updateTo);

  // update the recipe view 
    recipeView.render(model.state.recipe);
}
const init = function(){
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServing);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}
init();