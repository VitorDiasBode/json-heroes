# Projeto JSON Heroes - Apresentando dados do JSON
## Preparando para iniciar o projeto
O primeiro passo é implementar os arquivos **HTML** e **CSS** para iniciar a estrutura base da página. Inicialmente o **HTML** possui uma `section` para apresentar dados que virão de um **JSON** com informações de um grupo de heróis. Esse **HTML** faz conexão com um arquivo **CSS** que define o estilo inicial.

```HTML
<!DOCTYPE html>
<html lang="en-US">
  <head>
	<meta charset="utf-8">
	
    <title>Our superheroes</title>
	
    <link href="https://fonts.googleapis.com/css?family=Faster+One" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
  </head>

  <body>
      <header></header>
      
      <section></section>
	
      <script></script>
  </body>
</html>
```

```CSS
/* || general styles */

html {
  font-family: 'helvetica neue', helvetica, arial, sans-serif;
}

body {
  width: 800px;
  margin: 0 auto;
}

h1, h2 {
  font-family: 'Faster One', cursive;
}

/* header styles */

h1 {
  font-size: 4rem;
  text-align: center;
}

header p {
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
}

/* section styles */

section article {
  width: 33%;
  float: left;
}

section p {
  margin: 5px 0;
}

section ul {
  margin-top: 0;
}

h2 {
  font-size: 2.5rem;
  letter-spacing: -5px;
  margin-bottom: 10px;
}
```

## Acessando os dados do JSON
O arquivo `index.js` é criado e adicionado na tag `<script>` do **HTML**. Esse script vai acessar o **JSON** na página do **GitHub** e vai chamar os métodos para atualizar a página usando **DOM** junto com os dados dos heróis.

```HTML
<script src="index.js"></script>
```

Uma função assíncrona é criada. A constante `requestURL` recebe uma **string** com a **URL** que aponta para o **JSON**, em seguida a constante `request` usa o objeto nativo `Request` para criar um requisição com o `requestURL`.

```js
async function populate() {
    const requestURL = "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json";
    const request = new Request(requestURL);
```

Uma constante é usada para guardar a response que vier da requisição e outra é usada para armazenar o **JSON** que vier dessa requisição. O **JSON** é convertido em um objeto **JavaScript** com o método `.json()`.

```js
    const response = await fetch(request);
    const superheroes = await response.json();
```

## Popular o Header
A função `populateHeader(obj)` é criado para definir os dados que serão inseridos, esses dados virão do parâmetro `obj` que representa o JSON vindo da requisição. Uma constante é usada para acessar a tag `<header>` que vai guardar os elementos com dados sobre o esquadrão . A constante `h1` vai guardar a tag criada para apresentar o nome desse esquadrão que está no parâmetro `obj`.

```js
function populateHeader(obj) {
    const header = document.querySelector("header");
    const h1 = document.createElement("h1");
```

A propriedade `textContent` do `h1` é preenchida com `obj.squadName` e em seguida é adicionado como filho do **header**. Em seguida a tag `<p>` é criada, tem o seu `textContent` declarado com um **template literal** e também é adicionado com filho do **header**.

```js
function populateHeader(obj) {
    const header = document.querySelector("header");
    const h1 = document.createElement("h1");

    h1.textContent = obj.squadName;
    header.appendChild(h1);

    const p = document.createElement("p");
    p.textContent = `Hometown: ${obj.homeTown} — Formed: ${obj.formed}`;
    header.appendChild(p);
}
```

## Popular a Section com dados de cada herói
A função `populateHeroes(obj)` também vai receber um parâmetro que representa o **JSON** vindo da requisição. Os novos elementos vão ser adicionados no elemento section, por isso a variável `section` é declarada e recebe o próprio elemento.

A constante `heroes` vai receber o valor da chave `members`, que é um array de objetos que representa cada herói. Para cada herói dessa lista uma `<article>`, uma `<h2>`, três `<p>` e uma `<ul>` são criados. 

A `<article>` vai guardar cada um dos outros elementos, a `<h2>` vai estar com o nome dele, cada `<p>` é preenchida com um dado diferente e a `<ul>` vai ser preenchida com uma `<li>` para cada poder na lista de poderes daquele herói.

Depois de terem seus valores preenchidos, cada elemento é adicionado à `<article>`, que em seguida é adicionada com filha da constante `section`

```js
function populateHeroes(obj) {
    const section = document.querySelector("section");
    const heroes = obj.members;

    for (const hero of heroes) {
        const article = document.createElement("article");
        const h2 = document.createElement("h2");
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        const p3 = document.createElement("p");
        const uList = document.createElement("ul");

        h2.textContent = hero.name;
        p1.textContent = `Secret identity: ${hero.secretIdentity}`;
        p2.textContent = `Age: ${hero.age}`;
        p3.textContent = `Superpowers:`;

        const superPowers = hero.powers;
        for (const power of superPowers) {
            const listItem = document.createElement("li");
            listItem.textContent = power;
            
            uList.appendChild(listItem);
        }

        article.appendChild(h2);
        article.appendChild(p1);
        article.appendChild(p2);
        article.appendChild(p3);
        article.appendChild(uList);

        section.appendChild(article);
    }
}
```

## Concluindo
No final do `index.js` a função `populate()` é chamada para que a requisição do JSON seja realizada quando a página for carregada. Isso acontece por que a tag `<script>` no final do `body`, o código vai ser executado depois que o **DOM** for carregado. Assim os elementos serão criados dinamicamente com os dados vindos fornecidos pelo JSON.