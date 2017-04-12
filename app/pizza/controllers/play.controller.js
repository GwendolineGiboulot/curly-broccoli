import { uniq } from "lodash";

export class PlayController {
    constructor(RecipeService, PizzaService, AlertService) {
        this.RecipeService = RecipeService;
        this.PizzaService = PizzaService;
        this.AlertService = AlertService;
        RecipeService.getToppings().then(ltop => this.listToppings = ltop);

        RecipeService.getRecipes().then(lrecip => this.listRecipe = lrecip);

        if (PizzaService.start === 0) {
            PizzaService.start = 1;
            this.open();
        }
    }

    temps(score) {
        return 6000 - 5000 * (1 - Math.exp(-score * 0.1));
    }

    open() {
        this.x = () => {
            this.RecipeService
                .getRandomRecipe()
                .then(recipe => ({
                    recipe: recipe.name,
                    toppings: [],
                    status: "incomplete",
                    idRecette: recipe.id
                }))
                .then(pizza => this.PizzaService.addPizza(pizza))
                .then(pizza => {
                    if (this.PizzaService.pizzaCounter > 9) {
                        clearInterval(this.interval);
                        this.AlertService.addAlert(
                            "TU AS FAIT " +
                                this.PizzaService.score +
                                " POINTS !! WOUHOU !",
                            "alert alert-success"
                        );
                    } else {
                        this.speedUp();
                        this.PizzaService.pizzaCounter++;

                        return pizza;
                    }
                });
        };

        this.interval = setInterval(this.x, 1000);
    }

    speedUp() {
        clearInterval(this.interval);
        this.speed = this.temps(this.PizzaService.score);
        console.log("vitesse : " + this.speed);
        this.interval = setInterval(this.x, this.speed);
    }

    addTopping(topping) {
        if (!this.currentPizza) {
            this.AlertService.addAlert(
                "Arrête de mettre les ingrédients dans le vide !!!!!",
                "alert alert-danger"
            );
        } else {
            this.currentPizza.toppings.push(topping);
            this.currentPizza.status = this.getStatus(
                this.currentPizza,
                this.listRecipe
            );
            console.log(this.currentPizza.status);
        }
    }

    selectCommand(commande) {
        if (commande.status !== "wrong") {
            this.currentPizza = commande;
        }
    }

    valider() {
        if (!this.currentPizza) {
            alert("RIEN A VALIDER !!!!");
        } else {
            if (this.currentPizza.status === "complete") {
                this.PizzaService.deletePizza(this.currentPizza.id);
                this.currentPizza = undefined;
                this.PizzaService.pizzaCounter--;
                this.PizzaService.score++;
            }
        }
    }

    // TOOLS

    getStatus(p1, listRecipe) {
        let recette = listRecipe.find(recipe => p1.recipe === recipe.name);

        let { ok, ko } = recette.toppings.reduce(
            (acc, item, idx, arr) => {
                let first = p1.toppings.indexOf(item);
                let last = p1.toppings.lastIndexOf(item);

                if (first !== -1 && first === last) acc.ok++;
                else acc.ko++;
                return acc;
            },
            { ok: 0, ko: 0 }
        );

        if (ok < p1.toppings.length) return "wrong";
        else if (ko > 0) return "incomplete";
        else return "complete";
    }
}
