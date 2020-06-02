
function UF (){
    const ufs = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then (res => res.json())
    .then (states => {
        for(const state of states){
            ufs.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

UF()

function cities(event){
    const citys = document.querySelector("select[name=city]");
    
    const stateInput = document.querySelector("input[name=state]");
    const indexState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexState].text; /*ele vai alterar o valor do estado no front e registrar antes de mandar para o back-end*/

    const cityInput = document.querySelector("input[name=city]");
    const indexCity = event.target.selectedIndex;
    cityInput.value = event.target.options[indexCity].text;

    const ufValue = event.target.value;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios?orderBy=nome`

    fetch(url)
    .then (res => res.json())
    .then (cities => {
        for(const city of cities){
            citys.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        citys.disabled = false
    })
}

document.querySelector('select[name=uf]')
        .addEventListener('change', cities)