// Dom variable Declarations
const Domname = document.getElementById('name');
const Domingredients = document.getElementById('ingredients');
const Domprepsteps = document.getElementById('stepsforprep');
const Domtools = document.getElementById('tools');
const recipeId = document.getElementById('recipeid').value;
console.log(recipeId)
// Check For form submission
document.getElementById('recipeUpdateForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = Domname.value;
    const ingredients = Domingredients.value;
    const prepsteps = Domprepsteps.value;
    const tools = Domtools.value;
    // Check for empty values
    if(name !== '' && ingredients !== '' && prepsteps !== '' && tools !== ''){
        const config = {
            'Content-Type' : 'Application/json'
        }
        const data = {
            name,
            ingredients,
            prepsteps,
            tools
        }
        axios.put(`/recipes/update/${recipeId}`, data, config)
        .then(res => {
            localStorage.setItem('message', res.data.message);
            localStorage.setItem('alertType', 'success');
            resetFields();
            location.assign('/');
        })
        .catch(err => {
            localStorage.setItem('message', err.message);
            localStorage.setItem('alertType', 'danger');
            console.error(err.message);
            location.assign('/');
        })
    }
    else if(name === '' && ingredients === '' && prepsteps === '' && tools === ''){
        Domname.classList.add('is-invalid');
        Domingredients.classList.add('is-invalid');
        Domprepsteps.classList.add('is-invalid');
        Domtools.classList.add('is-invalid');
    }
    else if(name === ''){
        Domname.classList.add('is-invalid');
    }
    else if(ingredients === ''){
        Domingredients.classList.add('is-invalid');
    }
    else if(prepsteps === ''){
        Domprepsteps.classList.add('is-invalid');
    }
    else if(tools === ''){
        Domtools.classList.add('is-invalid');
    }
    else{
        console.error("Error: Cannot Submit the form");
    }
})

function resetFields(){
    Domname.classList.remove('is-invalid');
    Domingredients.classList.remove('is-invalid');
    Domprepsteps.classList.remove('is-invalid');
    Domtools.classList.remove('is-invalid');
    document.getElementById('recipeUpdateForm').reset();
}