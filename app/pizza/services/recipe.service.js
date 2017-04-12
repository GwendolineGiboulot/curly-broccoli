import { uniq } from "lodash";

let cacheRecipes;
const API_URL = "http://localhost:3000/recipes";

export class RecipeService {
    constructor($http) {
        this.$http = $http;
    }

    getRecipes() {
        return this.$http
            .get("http://localhost:3000/recipes")
            .then(response => response.data);
    }

    getRecipe(id) {
        if (id) {
            return this.$http
                .get("http://localhost:3000/recipes/" + id)
                .then(response => response.data);
        }
    }

    getRandomRecipe() {
        return this.getRecipes().then(
            recipes => recipes[Math.floor(Math.random() * recipes.length)]
        );
    }


    getToppings() {
        return this.getRecipes().then(this._extractToppings);
    }

    _extractToppings(recipes) {
        return uniq(
            recipes.reduce(
                (toppings, recipe) => {
                    return [...toppings, ...recipe.toppings];
                },
                []
            )
        );
    }
}
