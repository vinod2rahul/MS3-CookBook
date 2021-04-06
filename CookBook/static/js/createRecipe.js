// Dom variable Declarations
const Domname = document.getElementById('name');
const Domingredients = document.getElementById('ingredients');
const Domprepsteps = document.getElementById('stepsforprep');
const Domtools = document.getElementById('tools');

// Check For form submission
document.getElementById('formsubmit').addEventListener('submit', (e) => {
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
        axios.post('/recipes/add', data, config)
        .then(res => {
            console.log(res.data)
            resetFields();
        })
        .catch(err => console.error(err.message))
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
    document.getElementById('formsubmit').reset();
}