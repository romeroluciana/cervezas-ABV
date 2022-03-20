




const $ = (id) => document.getElementById(id)




const getBeers = async () => {
    const response = await fetch('https://api.punkapi.com/v2/beers')
    return await response.json()
}

const filterAbv = (beers, min = 0, max = 100) => beers.filter(beer => beer.abv >= min && beer.abv <= max)


const renderHtml = (beers) => {
    const mostrarCards = document.querySelector('#beers')
    mostrarCards.innerHTML = beers.reduce((acc, data) => {
        return (
            acc +
            `
                
                    <div id="card" class="card">
                      <h2>${data.name}, ${data.abv}</h2>
                      <img
                        src=${data.image_url}
                        alt="beer"
                        height="180"
                      />
                      <p class="card__description">${data.description}</p>
                    </div>
                `
        )

    }, "")


}


const renderCards = async (min = 0, max = 100) => {
    const beers = await getBeers()
    const beersFilter = filterAbv(beers, min, max)

    renderHtml(beersFilter)
}

renderCards()



const initRenderCard = (min, max) => {
    return () => renderCards(min, max)
}
// $('btn-low').addEventListener('click', ()=> renderCards(0, 5))

$('btn-low').addEventListener('click', initRenderCard(0, 5))
$('btn-md').addEventListener('click', initRenderCard(5.1, 7.5))
$('btn-hg').addEventListener('click', initRenderCard(7.6, 50))
$('btn-all').addEventListener('click', initRenderCard())