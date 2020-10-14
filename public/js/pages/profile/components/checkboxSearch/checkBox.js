import {network} from "../../../../libs/networks.js";
import {updateUserURL} from "../../../../libs/constants.js";

export function updateProfileFields(person) {
    const updateButton = document.getElementsByClassName("pers__list_refactor");

    for (let i=0; i< updateButton.length; i++){
        updateButton[i].addEventListener('click', ()=>{
            if (updateButton[i].textContent === 'Изменить' || updateButton[i].textContent === 'Добавить') {
                const field = updateButton[i].previousElementSibling.className;
                updateButton[i].previousSibling.innerHTML=`<input class="pers__list_refactor-${field}">`
                updateButton[i].innerHTML="<a href='/profile'>Принять</a>";
            } else {
                let newValueField = updateButton[i].previousSibling.firstChild.value;
                updateButton[i].previousSibling.innerHTML=`<div>${newValueField}</div>`;
                updateButton[i].innerHTML="<a href='/profile'>Изменить</a>";

                saveData(updateButton[i], person.id, newValueField).catch((error)=>console.log(error));
            }
        });
    }
}


async function saveData(tmpField, personID, newValueField){
    let url = updateUserURL+personID;
    let field = tmpField.previousElementSibling.id;
    let data = {
        [field]: newValueField.toString(),
    };
    // console.log(url, JSON.stringify(data));
    const response = await network.doPut(url, data);
    console.log(response.ok);
}