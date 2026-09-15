console.log("Hello, World!");

const age: number = 30;
const personName: string = "Alice";
console.log("Age:", age);
console.log("Name:", personName);

let id: string | number;
id = "user-123";
console.log("ID as string:", id);
id = 42;
console.log("ID as number:", id);

function checkNumber(value: number): string {
  if (value > 0) {
    return "Positive";
  } else if (value < 0) {
    return "Negative";
  } else {
    return "Zero";
  }
}

console.log(checkNumber(10));
console.log(checkNumber(-5));
console.log(checkNumber(0));

function getDetails(name: string, age: number): [string, number, string] {
  return [name, age, `Hello, ${name}! You are ${age} years old.`];
}

const details = getDetails("Alice", 25);
console.log(details);

type Person = {
  name: string;
  age: number;
};

function createPerson(name: string, age: number): Person {
  return { name, age };
}

const person = createPerson("Bob", 30);
console.log(person);

const inputElement = typeof document !== "undefined"
  ? document.getElementById("username") as HTMLInputElement | null
  : null;

if (inputElement) {
  inputElement.value = "Alice";
  console.log("Updated input value:", inputElement.value);
} else {
  console.log("No element with id 'username' was found in the DOM.");
}

function getAction(role: string): string {
  switch (role.toLowerCase().trim()) {
    case "admin":
      return "Manage users and settings";
    case "editor":
      return "Edit content";
    case "viewer":
      return "View content";
    case "guest":
      return "Limited access";
    default:
      return "Invalid role";
  }
}

console.log(getAction("admin"));
console.log(getAction("editor"));
console.log(getAction("viewer"));
console.log(getAction("guest"));
console.log(getAction("unknown"));

function greet(): string;
function greet(name: string): string;
function greet(name: string = "friend"): string {
  return `Hello, ${name}!`;
}

console.log(greet());
console.log(greet("Alice"));
