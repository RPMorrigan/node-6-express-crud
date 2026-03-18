// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

import express from 'express';
import fs from 'fs/promises';

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
    console.log('Welcome to good burger, home of the good burger. May I take your order?')
});

// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllRecipes()

async function getAllRecipes() {

    const data = await fs.readFile('recipes-data.json', 'utf8');
    const recipes = JSON.parse(data);

    let list = '';
    
    for (let recipe in recipes) {
        list += recipes[recipe].name.toUpperCase() + '\n'
            + 'Method: ' + recipes[recipe].cookingMethod + '.\n'
            + 'Ingredients: ' + recipes[recipe].ingredients + '.\n \n';
    }

    return list;

}

// 2. getOneRecipe(index)

async function getOneRecipe(index) {

    const data = await fs.readFile('recipes-data.json', 'utf8');

    // Here we're parsing our data into a data object
    const recipes = JSON.parse(data);

    // I've added some formatting to make the data more legible.
    // 'recipes[index]' accesses the specific recipe.
    let recipe = recipes[index].name.toUpperCase() + '\n'
        + 'Method: ' + recipes[index].cookingMethod + '\n'
        + 'Ingredients: ' + recipes[index].ingredients;
    
    return recipe;
    
}


// 3. getAllRecipeNames()

async function getAllRecipeNames() {

    const data = await fs.readFile('recipes-data.json', 'utf8');
    const recipes = JSON.parse(data);

    let list = '';

    for (let recipe in recipes) {
        list += recipes[recipe].name + '\n \n';

    }
    
    return list;

}

// 4. getRecipesCount()

async function getRecipesCount() {

    const data = await fs.readFile('recipes-data.json', 'utf8');
    const recipes = JSON.parse(data);

    const listLength = `We have ${recipes.length} recipes in our cookbook! 🍰`;

    return listLength;

}

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-recipes

app.get("/get-all-recipes", async (req, res) => {

    const list = await getAllRecipes();
    res.send(list);

})

// 2. GET /get-one-recipe/:index


// Here app is actually running the express method to help set up our endpoint
// 'get' is the request type that this endpoint makes for us.
// '/get-one-recipe/:index' is the endpoint we type in for our request, with :index being a dynamic variable we code in later on.
// Because we are working with a restful api, we need to make sure to add async as we have to wait for the reply from the api.

app.get("/get-one-recipe/:index", async (req, res) => {

    const recipe = await getOneRecipe(req.params.index);
    res.send(recipe);


});

// 3. GET /get-all-recipe-names

app.get("/get-all-recipe-names", async (req, res) => {

    const list = await getAllRecipeNames();

    res.send(list);

});

// 4. GET /get-recipes-count

app.get("/get-recipes-count", async (req, res) => {

    const listLength = await getRecipesCount();

    res.send(listLength);

});
