// ============================================================
// JavaScript Overview
// Companion script for js-overview.html
// Each section matches a topic heading in the HTML file
// All output is rendered into DOM elements — no console needed
// ============================================================

// Helper: write a line into an output div
function print(id, text) {
  const el = document.getElementById(id);
  const line = document.createElement("div");
  line.textContent = text;
  el.appendChild(line);
}

// Helper: write a comment-style line (greyed out)
function comment(id, text) {
  const el = document.getElementById(id);
  const line = document.createElement("div");
  line.textContent = text;
  line.style.color = "#6a9955";
  el.appendChild(line);
}

// Helper: write a highlighted result line
function result(id, text) {
  const el = document.getElementById(id);
  const line = document.createElement("div");
  line.textContent = "→ " + text;
  line.style.color = "#ce9178";
  el.appendChild(line);
}

// Helper: add a blank spacer line
function space(id) {
  const el = document.getElementById(id);
  el.appendChild(document.createElement("br"));
}


// ============================================================
// JavaScript Overview
// ============================================================

comment("out-overview", "// JavaScript is the language of the web");
comment("out-overview", "// It runs in the browser — no installation needed");
space("out-overview");
print("out-overview", 'document.title = "Hello from JavaScript";');
result("out-overview", 'Page title is now: "' + document.title + '"');
space("out-overview");
print("out-overview", 'alert("Hello!")  → shows a popup in the browser');
print("out-overview", 'document.getElementById("id")  → selects an HTML element');
print("out-overview", 'element.textContent = "..."  → changes what the user sees');


// ============================================================
// Data Types (Primitives and Objects)
// ============================================================

comment("out-datatypes", "// PRIMITIVES — simple, single values");
const str    = "Hello";
const num    = 42;
const bool   = true;
const nothing = null;
const undef  = undefined;

print("out-datatypes",  'const str    = "Hello"');
result("out-datatypes", 'typeof str    → ' + typeof str);
print("out-datatypes",  'const num    = 42');
result("out-datatypes", 'typeof num    → ' + typeof num);
print("out-datatypes",  'const bool   = true');
result("out-datatypes", 'typeof bool   → ' + typeof bool);
print("out-datatypes",  'const nothing = null');
result("out-datatypes", 'typeof null   → "object"  ← known JS quirk!');
print("out-datatypes",  'const undef  = undefined');
result("out-datatypes", 'typeof undef  → ' + typeof undef);

space("out-datatypes");
comment("out-datatypes", "// OBJECTS — collections of key-value pairs");
const user = { name: "Ravi", age: 28 };
const scores = [95, 87, 100];

print("out-datatypes",  'const user   = { name: "Ravi", age: 28 }');
result("out-datatypes", 'typeof user   → ' + typeof user);
print("out-datatypes",  'const scores = [95, 87, 100]');
result("out-datatypes", 'Array.isArray(scores) → ' + Array.isArray(scores));


// ============================================================
// Variables (var, let, const)
// ============================================================

comment("out-variables", "// var — function scoped, hoisted, avoid in modern JS");
var oldStyle = "I am var";
result("out-variables", oldStyle);

space("out-variables");
comment("out-variables", "// let — block scoped, can be reassigned");
let score = 10;
print("out-variables", "let score = 10");
result("out-variables", "score → " + score);
score = 20;
print("out-variables", "score = 20");
result("out-variables", "score → " + score);

space("out-variables");
comment("out-variables", "// const — block scoped, cannot be reassigned");
const PI = 3.14159;
print("out-variables", "const PI = 3.14159");
result("out-variables", "PI → " + PI);
print("out-variables", "PI = 3  → TypeError: Assignment to constant variable");

space("out-variables");
comment("out-variables", "// const with objects — the binding is fixed, not the contents");
const person = { name: "Meera" };
person.name = "Anjali";
print("out-variables", 'const person = { name: "Meera" }');
print("out-variables", 'person.name = "Anjali"  ← this is allowed');
result("out-variables", "person.name → " + person.name);


// ============================================================
// Type Coercion
// ============================================================

comment("out-coercion", "// Implicit coercion — JS converts types automatically");
space("out-coercion");

print("out-coercion",  '"5" + 3');
result("out-coercion", '"5" + 3  → ' + ("5" + 3) + '  (string wins — concatenation)');

print("out-coercion",  '"5" - 3');
result("out-coercion", '"5" - 3  → ' + ("5" - 3) + '  (string coerced to number)');

print("out-coercion",  '"5" == 5');
result("out-coercion", '"5" == 5  → ' + ("5" == 5) + '  (== coerces types — avoid this!)');

print("out-coercion",  '"5" === 5');
result("out-coercion", '"5" === 5  → ' + ("5" === 5) + '  (=== checks type AND value — use this)');

space("out-coercion");
comment("out-coercion", "// Explicit coercion — you control the conversion");
print("out-coercion",  'Number("42")');
result("out-coercion", "Number('42')  → " + Number("42"));
print("out-coercion",  'String(100)');
result("out-coercion", "String(100)  → " + String(100));
print("out-coercion",  'Boolean(0)');
result("out-coercion", "Boolean(0)   → " + Boolean(0) + "  (0, '', null, undefined are falsy)");


// ============================================================
// Strict Mode
// ============================================================

comment("out-strict", '// "use strict" — enables strict mode');
comment("out-strict", '// Prevents: using undeclared variables, duplicate params, deleting variables');
space("out-strict");
print("out-strict",  '"use strict";');
print("out-strict",  "x = 10;  → ReferenceError in strict mode (x was never declared)");
print("out-strict",  "function fn(a, a) {}  → SyntaxError in strict mode (duplicate param)");
space("out-strict");
result("out-strict", "Strict mode is ON by default in ES Modules and Classes");
result("out-strict", "Always write 'use strict' at the top of old-style scripts");


// ============================================================
// Arithmetic Operators
// ============================================================

const a = 10, b = 3;
comment("out-arithmetic", "// a = 10, b = 3");
space("out-arithmetic");

print("out-arithmetic",  "a + b");
result("out-arithmetic", "a + b  → " + (a + b));

print("out-arithmetic",  "a - b");
result("out-arithmetic", "a - b  → " + (a - b));

print("out-arithmetic",  "a * b");
result("out-arithmetic", "a * b  → " + (a * b));

print("out-arithmetic",  "a / b");
result("out-arithmetic", "a / b  → " + (a / b).toFixed(4));

print("out-arithmetic",  "a % b  (modulo — remainder)");
result("out-arithmetic", "a % b  → " + (a % b));

print("out-arithmetic",  "a ** b  (exponentiation)");
result("out-arithmetic", "a ** b  → " + (a ** b));

space("out-arithmetic");
let counter = 5;
print("out-arithmetic",  "let counter = 5");
print("out-arithmetic",  "counter++  (post-increment)");
counter++;
result("out-arithmetic", "counter → " + counter);
print("out-arithmetic",  "counter--  (post-decrement)");
counter--;
result("out-arithmetic", "counter → " + counter);


// ============================================================
// Comparison and Logical Operators
// ============================================================

comment("out-comparison", "// Comparison — always returns true or false");
space("out-comparison");

result("out-comparison", "5 > 3   → " + (5 > 3));
result("out-comparison", "5 < 3   → " + (5 < 3));
result("out-comparison", "5 >= 5  → " + (5 >= 5));
result("out-comparison", "5 === 5 → " + (5 === 5) + "  (strict — same type and value)");
result("out-comparison", "5 !== 3 → " + (5 !== 3));

space("out-comparison");
comment("out-comparison", "// Logical — combine conditions");
space("out-comparison");

result("out-comparison", "true && true   → " + (true && true)  + "  (AND — both must be true)");
result("out-comparison", "true && false  → " + (true && false) + " (AND — one is false)");
result("out-comparison", "true || false  → " + (true || false) + "  (OR — at least one true)");
result("out-comparison", "!true          → " + (!true)         + " (NOT — flips the value)");

space("out-comparison");
comment("out-comparison", "// Nullish coalescing ?? — fallback when null or undefined");
const username = null;
result("out-comparison", 'null ?? "Guest"  → ' + (username ?? "Guest"));


// ============================================================
// Assignment Operators
// ============================================================

let x = 10;
comment("out-assignment", "// x starts at 10");
space("out-assignment");

print("out-assignment",  "x = 10   (basic assignment)");
result("out-assignment", "x → " + x);

x += 5;
print("out-assignment",  "x += 5   (same as x = x + 5)");
result("out-assignment", "x → " + x);

x -= 3;
print("out-assignment",  "x -= 3");
result("out-assignment", "x → " + x);

x *= 2;
print("out-assignment",  "x *= 2");
result("out-assignment", "x → " + x);

x /= 4;
print("out-assignment",  "x /= 4");
result("out-assignment", "x → " + x);

x **= 2;
print("out-assignment",  "x **= 2  (x squared)");
result("out-assignment", "x → " + x);

space("out-assignment");
comment("out-assignment", "// Logical assignment");
let name = null;
name ??= "Default Name";
print("out-assignment",  'let name = null');
print("out-assignment",  'name ??= "Default Name"  (assign only if null/undefined)');
result("out-assignment", "name → " + name);


// ============================================================
// Control Flow (if/else, switch, loops)
// ============================================================

comment("out-control", "// if / else");
const temperature = 35;
if (temperature > 30) {
  result("out-control", "if (temperature > 30) → Hot day! temperature = " + temperature);
} else {
  result("out-control", "Cool day");
}

space("out-control");
comment("out-control", "// switch");
const day = "Monday";
print("out-control", 'switch (day) — day = "Monday"');
switch (day) {
  case "Monday":
    result("out-control", "Start of the work week"); break;
  case "Friday":
    result("out-control", "Almost weekend"); break;
  default:
    result("out-control", "Midweek");
}

space("out-control");
comment("out-control", "// for loop");
print("out-control", "for (let i = 1; i <= 5; i++)");
let forOutput = "";
for (let i = 1; i <= 5; i++) { forOutput += i + " "; }
result("out-control", forOutput.trim());

space("out-control");
comment("out-control", "// for...of loop — iterates over array values");
const fruits = ["mango", "banana", "papaya"];
print("out-control", 'for (const fruit of ["mango", "banana", "papaya"])');
let fruitsOutput = "";
for (const fruit of fruits) { fruitsOutput += fruit + "  "; }
result("out-control", fruitsOutput.trim());

space("out-control");
comment("out-control", "// while loop");
let count = 0;
let whileOutput = "";
while (count < 4) { whileOutput += count + " "; count++; }
print("out-control", "while (count < 4)");
result("out-control", whileOutput.trim());


// ============================================================
// Array and Array Methods
// ============================================================

const nums = [10, 20, 30, 40, 50];
comment("out-arrays", "// const nums = [10, 20, 30, 40, 50]");
space("out-arrays");

result("out-arrays", "nums[0]        → " + nums[0] + "  (first element)");
result("out-arrays", "nums.length    → " + nums.length);

space("out-arrays");
comment("out-arrays", "// Adding and removing");
const arr = [1, 2, 3];
arr.push(4);
result("out-arrays", "[1,2,3].push(4) → " + JSON.stringify(arr));
arr.pop();
result("out-arrays", "arr.pop()       → " + JSON.stringify(arr));

space("out-arrays");
comment("out-arrays", "// map — transform every element");
const doubled = nums.map(n => n * 2);
result("out-arrays", "nums.map(n => n * 2)  → " + JSON.stringify(doubled));

space("out-arrays");
comment("out-arrays", "// filter — keep elements that pass a test");
const big = nums.filter(n => n > 25);
result("out-arrays", "nums.filter(n => n > 25)  → " + JSON.stringify(big));

space("out-arrays");
comment("out-arrays", "// find — first element matching a condition");
const found = nums.find(n => n > 25);
result("out-arrays", "nums.find(n => n > 25)  → " + found);

space("out-arrays");
comment("out-arrays", "// reduce — accumulate into a single value");
const sum = nums.reduce((acc, n) => acc + n, 0);
result("out-arrays", "nums.reduce((acc, n) => acc + n, 0)  → " + sum);

space("out-arrays");
comment("out-arrays", "// includes — check if a value exists");
result("out-arrays", "nums.includes(30)  → " + nums.includes(30));
result("out-arrays", "nums.includes(99)  → " + nums.includes(99));


// ============================================================
// Functions — Declaration and Expression
// ============================================================

comment("out-functions", "// Function Declaration — hoisted, callable before definition");
space("out-functions");

function greet(name) {
  return "Hello, " + name + "!";
}

print("out-functions",  "function greet(name) { return 'Hello, ' + name + '!' }");
result("out-functions", "greet('Priya')  → " + greet("Priya"));

space("out-functions");
comment("out-functions", "// Function Expression — assigned to a variable, not hoisted");
space("out-functions");

const square = function(n) {
  return n * n;
};

print("out-functions",  "const square = function(n) { return n * n }");
result("out-functions", "square(7)  → " + square(7));

space("out-functions");
comment("out-functions", "// Functions are first-class — they can be passed as arguments");
function applyTwice(fn, value) {
  return fn(fn(value));
}
print("out-functions",  "applyTwice(square, 3)");
result("out-functions", "→ square(square(3)) → square(9) → " + applyTwice(square, 3));


// ============================================================
// Arrow Functions
// ============================================================

comment("out-arrow", "// Arrow functions — shorter syntax using =>");
space("out-arrow");

comment("out-arrow", "// Regular function");
print("out-arrow",  "function add(a, b) { return a + b }");
result("out-arrow", "add(3, 4)  → " + (function(a, b){ return a + b; })(3, 4));

space("out-arrow");
comment("out-arrow", "// Arrow function — same thing, shorter");
const add = (a, b) => a + b;
print("out-arrow",  "const add = (a, b) => a + b");
result("out-arrow", "add(3, 4)  → " + add(3, 4));

space("out-arrow");
comment("out-arrow", "// Single param — parentheses optional");
const double = n => n * 2;
print("out-arrow",  "const double = n => n * 2");
result("out-arrow", "double(5)  → " + double(5));

space("out-arrow");
comment("out-arrow", "// Especially useful in array methods");
const cities = ["Mumbai", "Pune", "Delhi"];
const upper = cities.map(c => c.toUpperCase());
print("out-arrow",  '["Mumbai","Pune","Delhi"].map(c => c.toUpperCase())');
result("out-arrow", "→ " + JSON.stringify(upper));


// ============================================================
// Default Parameters
// ============================================================

comment("out-defaults", "// Without default params — missing args become undefined");
space("out-defaults");

function greetUser(name = "Guest", role = "Visitor") {
  return `Hello, ${name}! You are logged in as: ${role}`;
}

print("out-defaults",  'function greetUser(name = "Guest", role = "Visitor")');
space("out-defaults");

print("out-defaults",  'greetUser("Arjun", "Admin")  — both args provided');
result("out-defaults", greetUser("Arjun", "Admin"));

print("out-defaults",  'greetUser("Arjun")  — role uses default');
result("out-defaults", greetUser("Arjun"));

print("out-defaults",  'greetUser()  — both use defaults');
result("out-defaults", greetUser());


// ============================================================
// Object Literals
// ============================================================

comment("out-objects", "// Objects store related data and behaviour together");
space("out-objects");

const product = {
  name: "Laptop",
  price: 75000,
  inStock: true,
  specs: {
    ram: "16GB",
    storage: "512GB SSD"
  },
  describe() {
    return `${this.name} costs ₹${this.price}`;
  }
};

print("out-objects",  "const product = { name, price, inStock, specs, describe() }");
space("out-objects");

result("out-objects", "product.name        → " + product.name);
result("out-objects", "product.price       → " + product.price);
result("out-objects", "product.inStock     → " + product.inStock);
result("out-objects", "product.specs.ram   → " + product.specs.ram);
result("out-objects", "product.describe()  → " + product.describe());

space("out-objects");
comment("out-objects", "// Destructuring — extract values into variables");
const { name: pName, price } = product;
print("out-objects",  "const { name, price } = product");
result("out-objects", "name  → " + pName);
result("out-objects", "price → " + price);

space("out-objects");
comment("out-objects", "// Spread operator — copy or merge objects");
const updated = { ...product, price: 70000 };
print("out-objects",  "const updated = { ...product, price: 70000 }");
result("out-objects", "updated.price → " + updated.price + "  (original unchanged: " + product.price + ")");


// ============================================================
// Template Literals
// ============================================================

comment("out-template", "// Backtick strings — embed expressions with ${}");
space("out-template");

const firstName = "Kavya";
const lang = "JavaScript";
const year = 2024;

comment("out-template", "// Old way — string concatenation");
print("out-template",  '"Hello, " + firstName + "! You are learning " + lang');
result("out-template", "Hello, " + firstName + "! You are learning " + lang);

space("out-template");
comment("out-template", "// Template literal — cleaner and more readable");
print("out-template",  '`Hello, ${firstName}! You are learning ${lang}`');
result("out-template", `Hello, ${firstName}! You are learning ${lang}`);

space("out-template");
comment("out-template", "// Expressions inside ${}");
print("out-template",  '`Year: ${year}, Next year: ${year + 1}`');
result("out-template", `Year: ${year}, Next year: ${year + 1}`);

space("out-template");
comment("out-template", "// Multi-line strings");
const multiLine = `Line one
Line two
Line three`;
print("out-template",  "Template literals support real line breaks");
result("out-template", multiLine);


// ============================================================
// Naming Conventions
// ============================================================

comment("out-naming", "// camelCase — variables and functions");
print("out-naming",   "let userName = 'Rohan'");
print("out-naming",   "function getUserAge() {}");
print("out-naming",   "const totalPrice = 500");

space("out-naming");
comment("out-naming", "// PascalCase — classes and constructors");
print("out-naming",   "class UserProfile {}");
print("out-naming",   "class ShoppingCart {}");

space("out-naming");
comment("out-naming", "// UPPER_SNAKE_CASE — constants that never change");
print("out-naming",   "const MAX_RETRIES = 3");
print("out-naming",   "const API_BASE_URL = 'https://api.example.com'");

space("out-naming");
comment("out-naming", "// Boolean variables — prefix with is, has, can, should");
print("out-naming",   "let isLoggedIn = true");
print("out-naming",   "let hasPermission = false");
print("out-naming",   "let canEdit = true");

space("out-naming");
comment("out-naming", "// Be descriptive — avoid single letters except in loops");
print("out-naming",   "// Bad:   let d = new Date()");
print("out-naming",   "// Good:  let currentDate = new Date()");
print("out-naming",   "// Bad:   function fn(x) {}");
print("out-naming",   "// Good:  function calculateTax(amount) {}");
