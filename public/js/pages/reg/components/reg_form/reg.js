
import Validation from '../../../../libs/validation.js'
import {EMAIL_OK, LOGIN_OK, PASSWD_OK, INPUT_TEXT_OK} from "../../../../libs/constants.js";

const form = document.getElementsByTagName("form");
let error = document.getElementsByClassName('error');

export function checkFrom() {
    const email = document.getElementById('emailReg');
    const nickname = document.getElementById('nickReg');
    const password = document.getElementById('passwReg');
    const firstName = document.getElementById('firstNameReg');
    const lastName = document.getElementById('lastNameReg');


    form[0].addEventListener('submit',function (event){
        const resEmail = Validation.validateEmail(email.value);
        const resNick = Validation.validateLogin(nickname.value);
        const resPasswd = Validation.validatePasswd(password.value);
        const resFirstName = Validation.validateTextField(firstName.value);
        const resLastName = Validation.validateTextField(lastName.value);

        if (resNick !== LOGIN_OK){
            event.preventDefault();
            error[0].innerHTML =`${resNick}`;
        }
        if (resFirstName !== INPUT_TEXT_OK){
            event.preventDefault();
            error[1].innerHTML =`${resFirstName}`;
        }
        if (resLastName !== INPUT_TEXT_OK){
            event.preventDefault();
            error[2].innerHTML =`${resLastName}`;
        }
        if (resEmail !== EMAIL_OK){
            event.preventDefault();
            error[3].innerHTML =`${resEmail}`;
        }
        if (resPasswd !== PASSWD_OK){
            event.preventDefault();
            error[4].innerHTML =`${resPasswd}`;
        }
    }, false);


    const arr = [nickname, firstName, lastName, email, password];

    arr.forEach((item, index)=>{
        console.log(index);
        item.addEventListener('keydown', function (event) {
            error[index].innerHTML='';
        });
    }, false);
}
