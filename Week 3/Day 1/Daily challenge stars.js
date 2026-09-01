
let pattern = "";
for (let i = 1; i <= 6; i++) {
  pattern += "* ";
  console.log(pattern.trimEnd());
}

console.log("\n--- Nested loop version ---\n");

for (let i = 1; i <= 6; i++) {
  let row = "";
  for (let j = 1; j <= i; j++) {
    row += "* ";
  }
  console.log(row.trimEnd());
}
