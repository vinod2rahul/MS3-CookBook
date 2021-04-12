function like(id){
    const likes = document.getElementById('likes');
    const dislikes = document.getElementById('dislikes');
    axios.put(`/recipe/like/${id}`)
    .then(res => {
        likes.innerHTML = res.data.likes;
        dislikes.value += 0;
    })
    .catch(err => console.error(err))
}

function dislike(id){
    const dislikes = document.getElementById('dislikes');
    const likes = document.getElementById('likes');
    axios.put(`/recipe/dislike/${id}`)
    .then(res => {
        dislikes.innerHTML = res.data.likes++;
        likes.innerHTML = res.data.likes;
    })
    .catch(err => console.error(err))
}
