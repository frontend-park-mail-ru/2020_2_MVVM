
import Validation from '../../../../libs/validation.js'
import {EMAIL_OK, INPUT_TEXT_OK, SALARY_OK} from "../../../../libs/constants.js";
let error = document.getElementsByClassName('error');


export function checkFrom(submitF, form, jobsArr) {
    let isOk = true;

    const surname = form[0];
    const name = form[1];
    const email = form[4];
    const description = form[5];
    const skills = form[8];
    const place = form[9];
    const salaryMin = form[10];
    const salaryMax = form[11];


    const resSurname = Validation.validateTextField(surname.value);
    const resName = Validation.validateTextField(name.value);
    const resEmail = Validation.validateEmail(email.value);
    const resDescription = Validation.validateTextField(description.value);
    const resSkills = Validation.validateTextField(skills.value);
    const resPlace = Validation.validateTextField(place.value);
    const resSalaryMin = Validation.validateSalary(salaryMin.value);
    const resSalaryMax = Validation.validateSalary(salaryMax.value);


    if (resSurname !== INPUT_TEXT_OK) {
        isOk = false;
        error[0].innerHTML = `${resSurname}`;
    }
    if (resName !== INPUT_TEXT_OK) {
        isOk = false;
        error[1].innerHTML = `${resName}`;
    }
    if (resEmail !== EMAIL_OK) {
        isOk = false;
        error[2].innerHTML = `${resEmail}`;
    }
    if (resDescription !== INPUT_TEXT_OK) {
        isOk = false;
        error[3].innerHTML = `${resDescription}`;
    }
    if (resSkills !== INPUT_TEXT_OK) {
        isOk = false;
        error[4].innerHTML = `${resSkills}`;
    }
    if (resPlace !== INPUT_TEXT_OK) {
        isOk = false;
        error[5].innerHTML = `${resPlace}`;
    }
    if (resSalaryMin !== SALARY_OK) {
        isOk = false;
        error[6].innerHTML = `${resSalaryMin}`;
    }
    if (resSalaryMax !== SALARY_OK) {
        isOk = false;
        error[7].innerHTML = `${resSalaryMax}`;
    }

    if (isOk) {
        submitF(form, jobsArr);
    }


    let arr = [surname, name, email, description, skills, place, salaryMin, salaryMax];

    arr.forEach((item, index)=>{
        item.addEventListener('keydown', function (event) {
            console.log(item, index);
            error[index].innerHTML='';
        });
    }, false);

}