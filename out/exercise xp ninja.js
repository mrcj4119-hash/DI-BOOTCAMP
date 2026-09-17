"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Container {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    remove(index) {
        if (index < 0 || index >= this.items.length) {
            return undefined;
        }
        return this.items.splice(index, 1)[0];
    }
    list() {
        return [...this.items];
    }
}
function parseResponse(response) {
    return response.data;
}
class Repository {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    retrieve(index) {
        return this.items[index];
    }
    list() {
        return [...this.items];
    }
}
const container = new Container();
container.add({ id: 1, createdAt: new Date() });
const response = {
    status: 200,
    data: { name: "Alex", score: 100 },
};
const parsedResponse = parseResponse(response);
const repository = new Repository();
repository.add("first item");
console.log(container.list());
console.log(container.remove(0));
console.log(parsedResponse.name, parsedResponse.score);
console.log(repository.retrieve(0));
console.log(repository.list());
