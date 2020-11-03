import {network} from "../../../../libs/networks.js";
import {updateUserURL} from "../../../../libs/constants.js";

export function updateProfileFields() {
    const updateButton = document.getElementsByClassName("pers__list_refactor");
    for (let i=0; i< updateButton.length; i++){
        updateButton[i].addEventListener('click', ()=>{
            if (updateButton[i].textContent === 'Изменить' || updateButton[i].textContent === 'Добавить') {
                console.log("kek");
                const field = updateButton[i].previousElementSibling.className;
                updateButton[i].previousSibling.innerHTML=`<input class="pers__list_refactor-${field}">`
                updateButton[i].innerHTML="<a href='/profile'>Принять</a>";
            } else {
                console.log("lol");
                let newValueField = updateButton[i].previousSibling.firstChild.value;
                updateButton[i].previousSibling.innerHTML=`<div>${newValueField}</div>`;
                updateButton[i].innerHTML="<a href='/profile'>Изменить</a>";

                saveData(updateButton[i], newValueField).catch((error)=>console.log(error));
            }
        });
    }
}


async function saveData(tmpField, newValueField){
    let url = updateUserURL;
    let field = tmpField.previousElementSibling.id;
    let data = {
        [field]: newValueField.toString(),
    };
    const response = await network.doPut(url, data);
    console.log(response.ok);
}