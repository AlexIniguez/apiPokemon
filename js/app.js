console.log('Conectado...')
const lista = document.getElementById('lista')
const infoPokemon = document.getElementById('infoPokemon').content //.content es solo el contenido y no todo el template
const fragment = document.createDocumentFragment()
//elementos del filtro
const btnFiltro = document.getElementById('btnFiltro')
const input = document.getElementById('filtroPokemones')

let pokemones = []
let pokemonBuscado = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchPokemones()
})

btnFiltro.addEventListener('click', () =>{
    if(input.value > 0 && input.value){
        console.log('clik en el filtro', input)
        fetchPokemones(input.value)
    }
})
lista.addEventListener('click', e =>{
    if (e.target.classList.contains('btn-dark')){
    const id =  e.target.dataset.id
    fetchPokemoneBuscado(id)
    }
})

const fetchPokemoneBuscado = id => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(async(res)=>{
        //console.log(await res.json())
        pokemonBuscado = await res.json()
        const pokemon = {
            nombre: pokemonBuscado.name,
            experiencia: pokemonBuscado.base_experience,
            hp: pokemonBuscado.stats[0].base_stat,
            ataque: pokemonBuscado.stats[1].base_stat,
            defensa: pokemonBuscado.stats[1].base_stat,
            especial: pokemonBuscado.stats[1].base_stat,
            imgJuego: pokemonBuscado.sprites.from_default,
            imgCvh: pokemonBuscado.sprites.other.dream_world.from_default,
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonBuscado.id}.png`
        }
        console.log('pokemon', pokemon)
        pintaPokemon(pokemon)
    })
    .catch( error => {
        console.log(error)
    })
}

const pintaPokemon = pokemon => {
    const pokemonBuscado = document.getElementById('pokemonBuscado')
    const template = document.getElementById('card').content
    const clone = template.cloneNode(true)
    const fragment = document.createDocumentFragment()
    pokemonBuscado.innerHTML = ''
    clone.querySelector('.card-body-img').setAttribute('src', pokemon.imgCvg)

    fragment.appendChild(clone)
    console.log('jk', clone, fragment)
    pokemonBuscado.appendChild(fragment)
}

const fetchPokemones = (total) =>{
    const limit = total || 2000
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
        .then(async(res) =>{
            //console.log('res', await res.json())
            pokemones= []
            let data = await res.json()
            pokemones = await data.results
            //console.log('pokemones', pokemones)
            pintarPokemones()
        })
        .catch(error => {
            console.log('error', error)
        })
}
 const pintarPokemones = () => {
    lista.innerHTML = ''
    pokemones.forEach((item, index) =>{
        console.log(item)
        infoPokemon.querySelectorAll('p')[0].textContent = item.name
        infoPokemon.querySelectorAll('p')[1].textContent = item.url
        infoPokemon.querySelector('button').dataset.id = index +1

        const clone = infoPokemon.cloneNode(true)
        fragment.appendChild(clone)
    })
    lista.appendChild(fragment)
}
