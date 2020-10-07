
export function updateProfileFields() {
    const updateButton = document.getElementsByClassName("pers__list_refactor");

    for (let i=0; i< updateButton.length; i++){
        updateButton[i].addEventListener('click', ()=>{
            if (updateButton[i].textContent === 'Изменить' || updateButton[i].textContent === 'Добавить') {
                const field = updateButton[i].previousElementSibling.className;
                updateButton[i].previousSibling.innerHTML=`<input class="pers__list_refactor-${field}">`
                updateButton[i].innerHTML="<a href='/profile'>Принять</a>";
            } else {
                updateButton[i].innerHTML="<a href='/profile'>Изменить</a>";
            }
        });
    }
}
