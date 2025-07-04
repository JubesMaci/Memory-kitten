// DEFINE O NÚMERO DE POSSIBILIDADES
const MEMORY_GAME_CARD_LIMIT = 6;

const CAT_API = `https://api.thecatapi.com/v1/images/search?format=json&limit=${MEMORY_GAME_CARD_LIMIT}`;

class Cat {
  id;
  url;
  constructor(id, url) {
    this.id = id;
    this.url = url;
  }
}

/**
 * @returns {Promise<Cat[]>} A promise that resolves to an array of Cat objects.
 */
async function fetchCatsFromApi() {
  const response = await fetch(CAT_API);
  const data = await response.json();
  return data
    .slice(0, MEMORY_GAME_CARD_LIMIT)
    .map((cat) => new Cat(cat.id, cat.url));
}

const gameContainer = document.querySelector(".game");
  if (gameContainer) {
    gameContainer.innerHTML = "";
   }


// TODO: VC VAI MEXER NESSA FUNÇÃO
async function displayCards() {
  const cats = await fetchCatsFromApi();
  const duplicatedCats = cats.flatMap(cat => [cat, cat]);

  duplicatedCats.sort(() => Math.random() - 0.5);

  duplicatedCats.forEach((cat) => {
    const cardHTML = `
      <div class="card-container" data-id="${cat.id}">
        <div class="card">
          <div class="card-front">
            <img src="${cat.url}" alt="gatinho fofo" />
          </div>
          <div class="card-back"></div>
        </div>
      </div>
    `;
    gameContainer.innerHTML += cardHTML;
  });
  
 

   



  // limpe a tela de jogos (gameContainer)

  // para cada cat, crie um cart-container como abaixo, alterando os valores de id e img
  //     <div class="card-container" data-id="id">
  //         <div class="card is-flipped">
  //             <div class="card-front">
  //                 <img src="img" alt="Frente" />
  //             </div>
  //             <div class="card-back"></div>
  //         </div>
  //   </div>

  // pesquise como criar e adicionar HTML sem usar document.createElement()

  // lembre-se de que precisa criar duas cartas para cada cat

  // você também vai precisar embaralhar as cartas
}

displayCards().then(() => {
  document.querySelectorAll(".card-container").forEach((container) => {
    console.log(container.dataset.id);
    container.addEventListener("click", () => {
      container.querySelector(".card").classList.toggle("is-flipped");
    });
  });
});
