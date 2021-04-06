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