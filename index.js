async function populate() {
    const requestURL = "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json";
    const request = new Request(requestURL);

    const response = await fetch(request);
    const superheroes = await response.json();

    console.log(superheroes);
    
    populateHeader(superheroes);
    // populateHeroes(superheroes);
}

populate();

function populateHeader(obj) {
    const header = document.querySelector("header");
    const h1 = document.createElement("h1");

    h1.textContent = obj.squadName;
    header.appendChild(h1);

    const p = document.createElement("p");
    p.textContent = `Hometown: ${obj.homeTown} // Formed: ${obj.formed}`;
    header.appendChild(p);

}
