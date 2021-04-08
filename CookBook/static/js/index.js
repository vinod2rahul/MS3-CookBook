const message = localStorage.getItem('message');
const alertType = localStorage.getItem('alertType');
if(message && alertType){
    const alerts = document.getElementsByClassName('alerts')[0];
    const elem = document.createElement('div');
    elem.classList.add('alert',`alert-${alertType}`);
    const textNode = document.createTextNode(message);
    elem.appendChild(textNode);
    alerts.appendChild(elem);
    setTimeout(()=>{
        localStorage.clear();
        alerts.removeChild(alerts.childNodes[0]);
    },3000);
}

function deleteRecipe(deleteRecipeItem){
    axios.delete(`/recipes/delete/${deleteRecipeItem}`)
    .then(res => {
        localStorage.setItem('message', res.data.message);
        localStorage.setItem('alertType', 'success')
        location.assign('/')
    })
    .catch(err => {
        console.error(err.message);
        localStorage.setItem('message', err.message);
        localStorage.setItem('alertType', 'danger');
        location.assign('/');
    })
}


// Listing Recipes
let recipes = [];
function listRecipesinUI(param) {
    recipes = param;
    const row = document.getElementsByClassName('row')[0];
    recipes.forEach((recipe) => {
        const col = createDomElement('div');
        col.classList.add('col', 'card', 'bg-light')
        const cardBody = createDomElement('div');
        cardBody.classList.add('card-body');
        const cardTitle = createDomElement('h3');
        cardTitle.classList.add('text-primary', 'card-title');
        cardTitle.innerHTML = `${recipe.name}<span class="badge badge-primary" style="float:right;">€${recipe.price}</span>`;
        const carddesc = createDomElement('p');
        carddesc.innerHTML = truncate(recipe.desc, 50);
        const cardActions = createDomElement('p');
        cardActions.innerHTML = `<a href='/recipes/update/${recipe._id.$oid}' class='btn btn-dark mr-1'>Edit</a><button class='btn btn-danger' id='deleteRecipeItem' onclick="deleteRecipe('${recipe._id.$oid}')">Delete</button> <a class='btn btn-warning' style='float:right;' href='/recipes/${recipe._id.$oid}'>Read More...</a>`
        addChild(cardBody, cardTitle);
        addChild(cardBody, carddesc);
        addChild(cardBody, cardActions);
        addChild(col, cardBody);
        addChild(row, col);
    })
}

function createDomElement(elem) {
    return document.createElement(elem);
}


function addChild(parent, child) {
    parent.appendChild(child);
}

function truncate(str, len) {
    if (str.length > len && str.length > 0) {
        let new_str = "";
        new_str = str.substr(0, len);
        new_str += " ";
        new_str = str.substr(0, new_str.lastIndexOf(" "));
        new_str = (new_str.length > 0) ? new_str : str.substr(0, len);
        return new_str + "...";
    }
    return str;
}

document.addEventListener('DOMContentLoaded',() => {
    axios.get('/api/result')
    .then(res => listRecipesinUI(res.data))
    .catch(err => { 
        console.error(err.message);
        localStorage.setItem('message', err.message);
        localStorage.setItem('alertType', 'danger');
    })
})