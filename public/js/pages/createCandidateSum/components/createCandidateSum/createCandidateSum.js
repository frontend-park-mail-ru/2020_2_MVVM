
import Validation from '../../../../libs/validation.js'
import {EMAIL_OK, INPUT_TEXT_OK, SALARY_OK} from "../../../../libs/constants.js";

const form = document.getElementsByTagName("form");
let error = document.getElementsByClassName('error');


export function checkFrom() {
    let isOk = true;

    const firstName = document.getElementById('username');
    const lastName = document.getElementById('surname');
    const email = document.getElementById('email');
    const citizenship = document.getElementById('citizenship');
    const place = document.getElementById('place');
    const salary = document.getElementById('salary');
    const info = document.getElementById('description');


    // form[0].addEventListener('submit', function (event) {
    //     const resFirstName = Validation.validateTextField(firstName.value);
    //     const resLastName = Validation.validateTextField(lastName.value);
    //     const resEmail = Validation.validateEmail(email.value);
    //     const resCitizenship = Validation.validateTextField(citizenship.value);
    //     const resPlace = Validation.validateTextField(place.value);
    //     const resSalary = Validation.validateSalary(salary.value);
    //     const resInfo = Validation.validateTextField(info.value);
    //
    //     if (resFirstName !== INPUT_TEXT_OK){
    //         isOk = false;
    //         error[0].innerHTML =`${resFirstName}`;
    //     }
    //     if (resLastName !== INPUT_TEXT_OK){
    //         isOk = false;
    //         error[1].innerHTML =`${resLastName}`;
    //     }
    //     if (resEmail !== EMAIL_OK){
    //         isOk = false;
    //         error[2].innerHTML =`${resEmail}`;
    //     }
    //     if (resCitizenship !== INPUT_TEXT_OK){
    //         isOk = false;
    //         error[3].innerHTML =`${resCitizenship}`;
    //     }
    //     if (resPlace !== INPUT_TEXT_OK){
    //         isOk = false;
    //         error[4].innerHTML =`${resPlace}`;
    //     }
    //     if (resSalary !== SALARY_OK){
    //         isOk = false;
    //         error[5].innerHTML =`${resSalary}`;
    //     }
    //     if (resInfo !== INPUT_TEXT_OK){
    //         isOk = false;
    //         error[7].innerHTML =`${resInfo}`;
    //     }

    // if (isOk){
    //     submitF(event,form);
    // } else {
    //     event.preventDefault();
    // }
    // }, false);
}

//     const arr = [firstName, lastName, email,citizenship, place, salary, info];
//
//     arr.forEach((item, index)=>{
//         console.log(index);
//         item.addEventListener('keydown', function (event) {
//             error[index].innerHTML='';
//         });
//     }, false);
// }