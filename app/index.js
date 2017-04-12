import angular from "angular";
import ngRoute from "angular-route";

import { PizzaModule } from "./pizza";
import { AlertModule } from "./alert";

angular
  .module("app", [PizzaModule, ngRoute,AlertModule])
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when("/", {
        templateUrl: "views/home.html",
        controller: "Home",
        controllerAs: "ctrl"
      })
      .when("/play", {
        templateUrl: "views/play.html",
        controller: "PlayController",
        controllerAs: "ctrl"
      })
      .when("/recipe/:id", {
        templateUrl: "views/recipe.html",
        controller: "RecipeController",
        controllerAs: "ctrl",
      })
      .otherwise({
        redirectTo: "/"
      });
  })
  .controller("Home", function() {});
