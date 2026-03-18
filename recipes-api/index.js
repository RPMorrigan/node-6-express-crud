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
// You'll see that for each helper function, we add async before 'function'.
// This is because we're working with an API, and the api needs a moment to reply.
// Otherwise, it will try to access data that isn't there yet.
async function getAllRecipes() {

    // This is another thing you'll see on all of our helper functions.
    // Consider it boiler plate code. We have 'await' there to wait for a reply.
    // 'data' takes the data from the json which is replying with standard 'utf8' characters.
    // Then it parses it into a usable json object.
    const data = await fs.readFile('recipes-data.json', 'utf8');
    const recipes = JSON.parse(data);

    // Variable ready to be loaded by for loop.
    let list = '';
    
    // Makes a literal, formatted for easy reading.
    for (let recipe in recipes) {
        list += recipes[recipe].name.toUpperCase() + '\n'
            + 'Method: ' + recipes[recipe].cookingMethod + '.\n'
            + 'Ingredients: ' + recipes[recipe].ingredients + '.\n \n';
    }

    // This is our resulting string which is passed on to the end-point.
    return list;

}

// 2. getOneRecipe(index)

async function getOneRecipe(index) {

    const data = await fs.readFile('recipes-data.json', 'utf8');
    const recipes = JSON.parse(data);

    // This helper is the same as above but this one uses the index provided in the url.
    // Though this one only returns a single recipe, which is why we don't have a 'list' variable.
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

    // This helper is also needs a 'list' variable since we're iterating and generating strings from the titles of the recipes.
    for (let recipe in recipes) {
        list += recipes[recipe].name + '\n \n';

    }
    
    return list;

}

// 4. getRecipesCount()

async function getRecipesCount() {

    const data = await fs.readFile('recipes-data.json', 'utf8');
    const recipes = JSON.parse(data);

    // I really enjoy this one as we create a cute literal.
    // We only need a '.length' method to count out the rows in our data.
    const listLength = `We have ${recipes.length} recipes in our cookbook! 🍰`;

    return listLength;

}

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-recipes

// End-points route requests and replies from the client to the server and back.
// We can discern what type of request we're passing on by looking at 'app.get'.
// Because 'get' is there, we can see we're sending a GET request.
// Like our helpers, this request has to include 'async' and 'await' so that we don't throw an error.
// 'req' is request and 'res' is response.
// 'app' houses the 'express()' method.
// The string is our url endpoint.
app.get("/get-all-recipes", async (req, res) => {

    // When the request is passed through we actuate the helper function 
    const list = await getAllRecipes();
    // This is what actually sends back a usable string to the user.
    res.send(list);

})

// 2. GET /get-one-recipe/:index

// This endpoint is a little different.
// We add a dynamic variable that our users will use in the request url.
// ':index' is letting us know that we can choose the id number of the specific data we're looking for.
app.get("/get-one-recipe/:index", async (req, res) => {

    // You can see that our call of getOneRecipe has some params in the parenthesis.
    // The extra bit of code in there is what's passing on the index number our user chose, to the functino.
    const recipe = await getOneRecipe(req.params.index);
    res.send(recipe);

});

// 3. GET /get-all-recipe-names

app.get("/get-all-recipe-names", async (req, res) => {

    // Pretty simple to explain, we just get back a list of only the recipe names.
    const list = await getAllRecipeNames();

    res.send(list);

});

// 4. GET /get-recipes-count

app.get("/get-recipes-count", async (req, res) => {

    // This list is a little different.
    // Our helper gives us a count of all of the rows in our list of recipes.
    const listLength = await getRecipesCount();

    res.send(listLength);

});
