const user_image = document.getElementById('image_user');
document.addEventListener('DOMContentLoaded', () => {
    const User = JSON.parse(localStorage.getItem('user'));
    const user_name = document.getElementById('name_user');
    user_name.innerHTML = User.name;
    user_image.src = User.image_url;


    
})

const form = document.getElementById('form_image');
const Token = localStorage.getItem('token');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const image_input = document.getElementById('image_input');
    formData.append('image', image_input.files[0]);
    console.log(formData)
    const response = await fetch(`http://localhost:3000/api/users/image`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${Token}`,
        },
        body: formData,
    });
    console.log(Token)
    if (response.ok) {
     /*   const user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
        window.location.reload(); */
        const path = (await response.json()).path;
        console.log(path)
        
        const User = await JSON.parse(localStorage.getItem('user'));
        User.image_url = path;
        localStorage.setItem('user', JSON.stringify(User));
        user_image.src = path;
        alert('Imagem de perfil atualizada com sucesso');
    } else {
        console.error('Erro ao atualizar imagem de perfil');
    }
});