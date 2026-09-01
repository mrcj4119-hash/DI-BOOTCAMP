
const person1 = {
  fullName: "John Doe",
  mass: 78,
  height: 1.7,
  calculateBMI: function () {
    return this.mass / (this.height * this.height);
  }
};

const person2 = {
  fullName: "Jane Smith",
  mass: 65,
  height: 1.6,
  calculateBMI: function () {
    return this.mass / (this.height * this.height);
  }
};

function compareBMI(personA, personB) {
  const bmiA = personA.calculateBMI();
  const bmiB = personB.calculateBMI();

  if (bmiA > bmiB) {
    console.log(`${personA.fullName} has the largest BMI.`);
  } else if (bmiB > bmiA) {
    console.log(`${personB.fullName} has the largest BMI.`);
  } else {
    console.log("Both people have the same BMI.");
  }
}

compareBMI(person1, person2);

function findAverage(gradesList) {
  let total = 0;

  for (let i = 0; i < gradesList.length; i++) {
    total += gradesList[i];
  }

  return total / gradesList.length;
}

function evaluateGrade(gradesList) {
  const average = findAverage(gradesList);
  console.log(`Average: ${average}`);

  if (average > 65) {
    console.log("Passed");
  } else {
    console.log("Failed. You must repeat the course.");
  }
}

const grades = [80, 70, 90, 75, 68];
evaluateGrade(grades);
