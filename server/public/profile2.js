
const user_background = document.getElementById('back_user');
document.addEventListener('DOMContentLoaded', () => {
    const User2 = JSON.parse(localStorage.getItem('user'));
    const user_name2 = document.getElementById('name_user');
    user_name2.innerHTML = User2.name;
    user_background.src = User2.back_url
});

const form2 = document.getElementById('form_image2');
const Token2 = localStorage.getItem('token');
form2.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData2 = new FormData();
    const back_input2 = document.getElementById('back_input');
    formData2.append('back', back_input2.files[0]);
    console.log(formData2);
    const response2 = await fetch(`http://localhost:3000/api/users/back`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${Token}`,
        },
        body: formData2,
    });
    console.log(Token);
    if (response2.ok) {
        const path2 = (await response2.json()).path;
        console.log(path2);
        
        const User2 = await JSON.parse(localStorage.getItem('user'));
        User2.back_url = path2;
        localStorage.setItem('user', JSON.stringify(User2));
        user_background.src = path2;
        alert('Plano de fundo atualizado com sucesso');
    } else {
        console.error('Erro ao atualizar plano de fundo');
    }
});