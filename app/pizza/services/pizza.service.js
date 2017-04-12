export class PizzaService {
    constructor() {
        this.listPizza = [];
        this.id = 0;
        this.start = 0;

        this.score = 0;
        this.pizzaCounter = 0;
    }

    addPizza(pizza) {
        pizza.id = this.id;
        ++this.id;
        this.listPizza.push(pizza);
        return pizza;
    }

    deletePizza(id) {
        let idDelete = this.listPizza.findIndex(pizza => pizza.id === id);
        this.listPizza.splice(idDelete, 1);
    }

    getPizzas(){
        return this.listPizza;
    }
}
