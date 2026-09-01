
const planets = [
    { name: "Mercury", color: "#8c7853", moons: 0 },
    { name: "Venus", color: "#ffc649", moons: 0 },
    { name: "Earth", color: "#4a90e2", moons: 1 },
    { name: "Mars", color: "#e27b58", moons: 2 },
    { name: "Jupiter", color: "#c88b3a", moons: 4 },
    { name: "Saturn", color: "#fad5a5", moons: 3 },
    { name: "Uranus", color: "#4fd0e7", moons: 2 },
    { name: "Neptune", color: "#4169e1", moons: 2 }
];

if (typeof document !== 'undefined') {

    const listPlanets = document.querySelector(".listPlanets");

    planets.forEach((planet) => {
    
    const planetDiv = document.createElement("div");
    planetDiv.classList.add("planet");
    planetDiv.style.backgroundColor = planet.color;
    
    const planetName = document.createElement("p");
    planetName.textContent = planet.name;
    planetName.style.color = "white";
    planetName.style.marginTop = "40px";
    planetName.style.fontSize = "12px";
    planetDiv.appendChild(planetName);
    
    const moonRadius = 70;
    for (let i = 0; i < planet.moons; i++) {
        const moon = document.createElement("div");
        moon.classList.add("moon");
        
        const angle = (i / planet.moons) * (2 * Math.PI);
        const x = Math.cos(angle) * moonRadius;
        const y = Math.sin(angle) * moonRadius;
        
        moon.style.left = (50 + x) + "px";
        moon.style.top = (50 + y) + "px";
        
        planetDiv.appendChild(moon);
    }

    listPlanets.appendChild(planetDiv);
});

console.log("Solar system created with", planets.length, "planets!");
}
