const message = localStorage.getItem('message');
const alertType = localStorage.getItem('alertType');
if (message && alertType) {
    const alerts = document.getElementsByClassName('alerts')[0];
    const elem = document.createElement('div');
    elem.classList.add('alert', `alert-${alertType}`);
    const textNode = document.createTextNode(message);
    elem.appendChild(textNode);
    alerts.appendChild(elem);
    setTimeout(() => {
        localStorage.clear();
        alerts.removeChild(alerts.childNodes[0]);
    }, 3000);
}

// Listing Recipes
let AllRecipes = [];
let recipes = [];
function listRecipesinUI(param) {
    recipes = param;
    const row = document.getElementsByClassName('row')[0];
    recipes.forEach((recipe) => {
        const col = createDomElement('div');
        col.classList.add('col-sm-12', 'col-md-6', 'col-lg-4', 'card', 'bg-light')
        const p = createDomElement('p');
        p.classList.add('p');
        const img = createDomElement('img');
        img.classList.add('card-image-top','img','w-100');
        img.setAttribute('src',`/static/${recipe.image}`);
        img.setAttribute('alt',"...");
        addChild(p,img)
        const cardBody = createDomElement('div');
        cardBody.classList.add('card-body');
        const cardTitle = createDomElement('h3');
        cardTitle.classList.add('text-primary', 'card-title', 'mt-2');
        cardTitle.innerHTML = `${recipe.name}<span class="badge badge-primary" style="float:right;">€${recipe.price}</span>`;
        const carddesc = createDomElement('p');
        carddesc.innerHTML = truncate(recipe.desc, 50);
        const cardActions = createDomElement('p');
        cardActions.innerHTML = `<a href='/recipes/update/${recipe._id.$oid}' class='btn btn-dark mr-1'>Edit</a><button class='btn btn-danger' id='deleteRecipeItem' onclick="deleteRecipe('${recipe._id.$oid}')">Delete</button> <a class='btn btn-warning m-2 ml-auto'  href='/recipes/${recipe._id.$oid}'>Read More...</a>`
        addChild(cardBody, p);
        addChild(cardBody, cardTitle);
        addChild(cardBody, carddesc);
        addChild(cardBody, cardActions);
        addChild(col, cardBody);
        addChild(row, col);
    })
}

function removeChildNodes() {
    const nodes = document.getElementsByClassName('row')[0];
    while (nodes.hasChildNodes()) {
        nodes.removeChild(nodes.firstChild);
    }
}

function filterRecipes() {
    const text = document.getElementById('filtertext').value;
    if (text !== '') {
        const filteredRecipes = recipes.filter((recipe) => {
            const regexp = new RegExp(`${text}`, 'gi');
            return recipe.name.match(regexp);
        })
        // Keep track of old recipes
        const oldrecipes = recipes;
        removeChildNodes();
        listRecipesinUI(filteredRecipes);
        // Assign all recipes so that the filtering happens on all recipes every time the input is changed
        recipes = oldrecipes;
    }
    else {
        removeChildNodes();
        axios.get('/api/result')
            .then(res => listRecipesinUI(res.data))
            .catch(err => {
                console.error(err.message);
                localStorage.setItem('message', err.message);
                localStorage.setItem('alertType', 'danger');
            })
    }
}

function deleteRecipe(deleteRecipeItem) {
    axios.delete(`/recipes/delete/${deleteRecipeItem}`)
        .then(res => {
            localStorage.setItem('message', res.data.message);
            localStorage.setItem('alertType', 'success')
            location.assign('/menu')
        })
        .catch(err => {
            console.error(err.message);
            localStorage.setItem('message', err.message);
            localStorage.setItem('alertType', 'danger');
            location.assign('/menu');
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

document.addEventListener('DOMContentLoaded', () => {
    axios.get('/api/result')
        .then(res => listRecipesinUI(res.data))
        .catch(err => {
            console.error(err.message);
            localStorage.setItem('message', err.message);
            localStorage.setItem('alertType', 'danger');
        })
})