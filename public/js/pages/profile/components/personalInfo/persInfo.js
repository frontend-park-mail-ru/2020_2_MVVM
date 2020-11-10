import {network} from "../../../../libs/networks.js";
import {EMAIL_OK, INPUT_TEXT_OK, PHONE_OK, updateUserURL} from "../../../../libs/constants.js";
import Validation from "Js/libs/validation";

export function updateProfileFields() {
    const updateButton = document.getElementsByClassName("pers__list_refactor");
    for (let i=0; i< updateButton.length; i++){
        updateButton[i].addEventListener('click', ()=>{
            if (updateButton[i].textContent === 'Изменить' || updateButton[i].textContent === 'Добавить') {
                updateButton[i].previousSibling.innerHTML=`<input class="pers__list_refactor-input">`
                updateButton[i].innerHTML="<a href='/profile'>Принять</a>";
            } else {
                let newValueField = updateButton[i].previousSibling.firstChild.value;
                updateButton[i].previousSibling.innerHTML=`<div>${newValueField}</div>`;
                updateButton[i].innerHTML="<a href='/profile'>Изменить</a>";

                saveData(updateButton[i], newValueField);
            }
        });
    }
}


function saveData(tmpField, newValueField){
    let isOk = true;
    let error = document.getElementsByClassName("error");
    error[0].innerHTML = "";
    let field = tmpField.previousElementSibling.id;

   if (field === "name" ) {
       const resName = Validation.validateTextField(newValueField);
       if (resName !== INPUT_TEXT_OK) {
           error[0].innerHTML = `${resName}`;
           isOk = false;
       }
   }

    if (field === "surname" ) {
        const resSurname = Validation.validateTextField(newValueField);
        if (resSurname !== INPUT_TEXT_OK) {
            error[0].innerHTML = `${resSurname}`;
            isOk = false;
        }
    }

    if (field === "phone" ) {
        const resPhone = Validation.validateTelephone(newValueField);
        if (resPhone !== PHONE_OK) {
            error[0].innerHTML = `${resPhone}`;
            isOk = false;
        }
    }

    if (field === "email" ) {
        const resEmail = Validation.validateEmail(newValueField);
        if (resEmail !== EMAIL_OK) {
            error[0].innerHTML = `${resEmail}`;
            isOk = false;
        }
    }


    if (isOk) {
        console.log(isOk);
        let data = {
            [field]: newValueField.toString(),
        };
        doSubmit(data);
    }
}

async function doSubmit(data) {
    await network.doPut(updateUserURL, data);
}