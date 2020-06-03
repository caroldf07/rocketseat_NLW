
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

    const ufValue = event.target.value;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios?orderBy=nome`

    citys.innerHTML=`<option value=''>Selecione a cidade</potion>` //Colocamos essa linha para que a seleção seja resetada e não acumule as cidades caso o usuário escolha um estado e depois altere para outro estado//
    citys.disabled = true

    fetch(url)
    .then (res => res.json())
    .then (cities => {
        for(const city of cities){
            citys.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citys.disabled = false
    })
}

document.querySelector('select[name=uf]')
        .addEventListener('change', cities)

// Itens de coleta

const items = document.querySelectorAll('.items-grid li')

for(item of items){
    item.addEventListener('click',selectedItem)
}

const itemsSent = document.querySelector('input[name=item')
let itemSelected = []


function selectedItem(event){
    const itemLi = event.target // Buscamos a li
    const itemId = itemLi.dataset.id; //Essa linha puxa o id da li e coloca numa variável

    itemLi.classList.toggle('selected') //O Toggle verifica se ali existe a classe pedida, se não tiver, ele aplica, caso contrário ele tira.

// Verificação se o item já consta na seleção, caso estiver, retornar o item selecionado
const alreadySelected = itemSelected.findIndex(item => item == itemId)

//Se já estiver selecionado, tira da seleção
if (alreadySelected >= 0){
    const filteredItem = itemSelected.filter(item => item !== itemId)
    itemSelected = filteredItem;

//Se não estiver selecionado
} else {
    itemSelected.push(itemId)
}
//Atualiza o campo hidden value do input item
    itemsSent.value = itemSelected;
}

