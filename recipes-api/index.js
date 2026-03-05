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

// 2. getOneRecipe(index)

// 3. getAllRecipeNames()

// 4. getRecipesCount()

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-recipes

app.get("/get-all-recipes", async (req, res) => {

    const data = await fs.readFile('recipes-data.json', 'utf8');
    const recipes = JSON.parse(data);

    let list = '';
    
    for (let recipe in recipes) {
        list += recipes[recipe].name.toUpperCase() + '\n'
            + 'Method: ' + recipes[recipe].cookingMethod + '.\n'
            + 'Ingredients: ' + recipes[recipe].ingredients + '.\n \n';
    }
    
    res.send(list);

})

// 2. GET /get-one-recipe/:index

app.get("/get-one-recipe/:index", async (req, res) => {

    const data = await fs.readFile('recipes-data.json', 'utf8');
    const recipes = JSON.parse(data);

    let index = req.params.index;

    let recipe = recipes[index].name.toUpperCase() + '\n'
                 + 'Method: ' + recipes[index].cookingMethod + '\n'
                 + 'Ingredients: ' + recipes[index].ingredients;

    res.send(recipe);


});

// 3. GET /get-all-recipe-names

app.get("/get-all-recipe-names", async (req, res) => {

    const data = await fs.readFile('recipes-data.json', 'utf8');
    const recipes = JSON.parse(data);

    let list = '';

    for (let recipe in recipes) {
        list += recipes[recipe].name + '\n \n';
    }

    res.send(list);

});

// 4. GET /get-recipes-count

app.get("/get-recipes-count", async (req, res) => {

    const data = await fs.readFile('recipes-data.json', 'utf8');
    const recipes = JSON.parse(data);

    const listLength = `We have ${recipes.length} recipes in our cookbook! 🍰`;

    res.send(listLength);

});
