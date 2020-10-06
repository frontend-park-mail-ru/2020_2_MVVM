
import Validation from '../../../../libs/validation.js'
import {EMAIL_OK, LOGIN_OK, PASSWD_OK} from "../../../../libs/constants.js";

const form = document.getElementsByTagName("form");
let error = document.getElementsByClassName('error');

export function checkFrom() {
    const email = document.getElementById('emailAuth');
    const nickname = document.getElementById('nickAuth');
    const password = document.getElementById('passAuth');


    form[0].addEventListener('submit', function (event) {
        const resEmail = Validation.validateEmail(email.value);
        const resNick = Validation.validateLogin(nickname.value);
        const resPasswd = Validation.validatePasswd(password.value);

        if (resEmail !== EMAIL_OK){
            event.preventDefault();
            error[0].innerHTML =`${resEmail}`;
        }
        if (resNick !== LOGIN_OK){
            event.preventDefault();
            error[1].innerHTML =`${resNick}`;
        }
        if (resPasswd !== PASSWD_OK){
            event.preventDefault();
            error[2].innerHTML =`${resPasswd}`;
        }
    }, false);


    const arr = [email, nickname, password];

    arr.forEach((item, index)=>{
        console.log(index);
        item.addEventListener('keydown', function (event) {
            error[index].innerHTML='';
        });
    }, false);
}
