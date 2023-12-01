import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE} from './config';
import { getJSON } from './helpers';
export const state = {
  recipe: {},
  search: {
    query: '',
    page:1,
    results: [],
    resultsPerPage: RES_PER_PAGE,
  },
}
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    
  } catch (error) {
    // temp error handling
    console.error(`${error} 🔖 💣 `);
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);
   
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (error) {
    console.error(`${error} 🔖 💣 🙈`);
    throw error;
  }
};

export const getSearchResultsPage = function(page = state.search.page){
  state.search.page = page;
  const start = (page -1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  console.log(start, end);
  return state.search.results.slice(start, end);
}
export const updateServings = function(newServings){
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * newServings / state.recipe.servings;

    // newQt = oldQt*newServings / oldServings // 2 * 8 / 4 = 4
  });
  state.recipe.servings = newServings;
}