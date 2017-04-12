export class RecipeController {
    constructor($routeParams, RecipeService) {
        this.$routeParams = $routeParams;
        this.RecipeService = RecipeService;

        this.getRecipe();


    }

       getRecipe() {
        return this.RecipeService
            .getRecipe(this.$routeParams.id)
            .then(recipe => this.recipe = recipe);
    }



}
