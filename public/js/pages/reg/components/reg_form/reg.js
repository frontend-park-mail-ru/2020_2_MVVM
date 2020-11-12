
import Validation from '../../../../libs/validation.js'
import {EMAIL_OK, PASSWD_OK, INPUT_TEXT_OK} from "Js/libs/constants";

export function checkFrom(submitF, form, error) {

    const email = document.getElementById('emailReg');
    const password = document.getElementById('passwReg');
    const password2 = document.getElementById('passwReg2');
    const firstName = document.getElementById('firstNameReg');
    const lastName = document.getElementById('lastNameReg');


    form.addEventListener('submit',function (event){
        let isOk = true;
        const resEmail = Validation.validateEmail(email.value);
        const resPasswd = Validation.validatePasswd(password.value);
        const resFirstName = Validation.validateTextField(firstName.value);
        const resLastName = Validation.validateTextField(lastName.value);


        if (resFirstName !== INPUT_TEXT_OK){
            isOk = false;
            error[0].innerHTML =`${resFirstName}`;
        }
        if (resLastName !== INPUT_TEXT_OK){
            isOk = false;
            error[1].innerHTML =`${resLastName}`;
        }
        if (resEmail !== EMAIL_OK){
            isOk = false;
            error[2].innerHTML =`${resEmail}`;
        }
        if (resPasswd !== PASSWD_OK){
            isOk = false;
            error[3].innerHTML =`${resPasswd}`;
        }
        if (password.value !== password2.value) {
            isOk = false;
            error[3].innerHTML = "Пароли не совпадают";
            error[4].innerHTML = "Пароли не совпадают";
        }

        if (isOk){
            submitF(event, form, error);
        } else {
            event.preventDefault();
        }
    }, false);


    const arr = [firstName, lastName, email, password, password2];

    arr.forEach((item, index)=>{
        item.addEventListener('keydown', function (event) {
            error[index].innerHTML='';
        });
    }, false);
}
