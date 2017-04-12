import angular from "angular";

import { PizzaService } from "./services/pizza.service";
import { RecipeService } from "./services/recipe.service";
import { RecipeController } from "./controllers/recipe.controller";
import { PlayController } from "./controllers/play.controller";

export const PizzaModule = angular
  .module("PizzaModule", [])
  .service("RecipeService", RecipeService)
  .service("PizzaService", PizzaService)
  .controller("RecipeController", RecipeController)
  .controller("PlayController", PlayController).name;
