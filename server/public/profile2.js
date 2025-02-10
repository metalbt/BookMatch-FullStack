const user_back = document.getElementById('back_user');
document.addEventListener('DOMContentLoaded', () => {
    const User = JSON.parse(localStorage.getItem('user'));
    const user_name = document.getElementById('name_user');
    user_name.innerHTML = User.name;
    user_back.src = User.back_url;


    
})

const form = document.getElementById('form_image2');
const Token = localStorage.getItem('token');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const back_input = document.getElementById('back_input');
    formData.append('back', back_input.files[0]);
    console.log(formData)
    const response = await fetch(`http://localhost:3000/api/users/back`, {
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
        User.back_url = path;
        localStorage.setItem('user', JSON.stringify(User));
        user_back.src = path;
        alert('Plano de fundo atualizado com sucesso');
    } else {
        console.error('Erro ao atualizar plano de fundo');
    }
});