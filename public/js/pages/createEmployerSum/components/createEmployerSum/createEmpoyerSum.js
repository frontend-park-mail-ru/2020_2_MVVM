
import Validation from '../../../../libs/validation.js'
import {EMAIL_OK, INPUT_TEXT_OK, PHONE_OK} from "../../../../libs/constants.js";

const form = document.getElementsByTagName("send-form-empl");
let error = document.getElementsByClassName('error');

export function checkFrom() {
    const companyName = document.getElementById('company');
    const vacancyName = document.getElementById('summary-name');
    const info = document.getElementById('description');
    const email = document.getElementById('email');
    const phoneNumber = document.getElementById('tel');
    const address = document.getElementById('address');


    form[0].addEventListener('submit', function (event) {
        const resCompanyName = Validation.validateTextField(companyName.value);
        const resVacancyName = Validation.validateTextField(vacancyName.value);
        const resInfo = Validation.validateTextField(info.value);
        const resEmail = Validation.validateEmail(email.value);
        const resPhoneNumber = Validation.validateTelephone(phoneNumber.value);
        const resAddress = Validation.validateTextField(address.value);

        if (resCompanyName !== INPUT_TEXT_OK){
            event.preventDefault();
            error[0].innerHTML =`${resCompanyName}`;
        }
        if (resVacancyName !== INPUT_TEXT_OK){
            event.preventDefault();
            error[1].innerHTML =`${resVacancyName}`;
        }
        if (resInfo !== INPUT_TEXT_OK){
            event.preventDefault();
            error[2].innerHTML =`${resInfo}`;
        }
        if (resEmail !== EMAIL_OK){
            event.preventDefault();
            error[3].innerHTML =`${resEmail}`;
        }
        if (resPhoneNumber !== PHONE_OK){
            event.preventDefault();
            error[4].innerHTML =`${resPhoneNumber}`;
        }
        if (resAddress !== INPUT_TEXT_OK){
            event.preventDefault();
            error[5].innerHTML =`${resAddress}`;
        }
    }, false);


    const arr = [companyName, vacancyName, info,email,phoneNumber,address];

    arr.forEach((item, index)=>{
        console.log(index);
        item.addEventListener('keydown', function (event) {
            error[index].innerHTML='';
        });
    }, false);
}