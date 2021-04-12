// Dom variable Declarations
const Domname = document.getElementById('name');
const Domingredients = document.getElementById('ingredients');
const Domprepsteps = document.getElementById('stepsforprep');
const Domtools = document.getElementById('tools');
const Domprice = document.getElementById('price');
const Domdesc = document.getElementById('desc');
const Domimg = document.getElementById('img');

// Check For form submission
document.getElementById('formsubmit').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = Domname.value;
    const ingredients = Domingredients.value;
    const prepsteps = Domprepsteps.value;
    const tools = Domtools.value;
    const price = Domprice.value;
    const desc = Domdesc.value;
    // Check for empty values
    if (name !== '' && ingredients !== '' && prepsteps !== '' && tools !== '' && price !== '' && desc !== '' && Domimg.files.length !== 0) {
        const formData = new FormData();
        const img = Domimg.files[0];
        formData.append('name', name);
        formData.append('ingredients', ingredients);
        formData.append('prepsteps', prepsteps);
        formData.append('tools', tools);
        formData.append('desc', desc);
        formData.append('price', price);
        formData.append('img', img);
        const config = {
            'Content-Type': 'Application/json',
            'enctype': 'multipart/form-data'
        }
        axios.post('/recipes/add', formData, config)
            .then(res => {
                localStorage.setItem('message', res.data.message);
                localStorage.setItem('alertType', 'success');
                resetFields();
                location.assign('/menu');
            })
            .catch(err => {
                localStorage.setItem('message', err.message);
                localStorage.setItem('alertType', 'danger');
                console.error(err.message);
                location.assign('/menu');
            })
    }
    else if (name === '' && ingredients === '' && prepsteps === '' && tools === '' && price === '' && desc === '' && Domimg.files.length === 0) {
        Domname.classList.add('is-invalid');
        Domingredients.classList.add('is-invalid');
        Domprepsteps.classList.add('is-invalid');
        Domtools.classList.add('is-invalid');
        Domprice.classList.add('is-invalid');
        Domdesc.classList.add('is-invalid');
        Domimg.classList.add('is-invalid');
    }
    else if (name === '') {
        Domname.classList.add('is-invalid');
    }
    else if (ingredients === '') {
        Domingredients.classList.add('is-invalid');
    }
    else if (prepsteps === '') {
        Domprepsteps.classList.add('is-invalid');
    }
    else if (tools === '') {
        Domtools.classList.add('is-invalid');
    }
    else if (price === '') {
        Domprice.classList.add('is-invalid');
    }
    else if (desc === '') {
        Domdesc.classList.add('is-invalid');
    }
    else if (Domimg.files.length === 0) {
        Domimg.classList.add('is-invalid');
    }
    else {
        console.error("Error: Cannot Submit the form");
    }
})

function resetFields() {
    Domname.classList.remove('is-invalid');
    Domingredients.classList.remove('is-invalid');
    Domprepsteps.classList.remove('is-invalid');
    Domtools.classList.remove('is-invalid');
    Domprice.classList.remove('is-invalid');
    Domdesc.classList.remove('is-invalid');
    document.getElementById('formsubmit').reset();
}