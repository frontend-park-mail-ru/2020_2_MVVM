
import Validation from '../../../../libs/validation.js'
import {EMAIL_OK, INPUT_TEXT_OK, SALARY_OK} from "../../../../libs/constants.js";
let error = document.getElementsByClassName('error');


export function checkFrom(submitF, form, jobsArr) {
    let isOk = true;

    const title = form[0];
    const surname = form[1];
    const name = form[2];
    const email = form[5];
    const description = form[7];
    const skills = form[10];
    const place = form[11];
    const salaryMin = form[12];
    const salaryMax = form[13];


    const resTitle = Validation.validateTextField(title.value);
    const resSurname = Validation.validateTextField(surname.value);
    const resName = Validation.validateTextField(name.value);
    const resEmail = Validation.validateEmail(email.value);
    const resDescription = Validation.validateTextField(description.value);
    const resSkills = Validation.validateTextField(skills.value);
    const resPlace = Validation.validateTextField(place.value);
    const resSalaryMin = Validation.validateSalary(salaryMin.value);
    const resSalaryMax = Validation.validateSalary(salaryMax.value);


    if (resTitle !== INPUT_TEXT_OK) {
        isOk = false;
        error[0].innerHTML = `${resTitle}`;
    }
    if (resSurname !== INPUT_TEXT_OK) {
        isOk = false;
        error[1].innerHTML = `${resSurname}`;
    }
    if (resName !== INPUT_TEXT_OK) {
        isOk = false;
        error[2].innerHTML = `${resName}`;
    }
    if (resEmail !== EMAIL_OK) {
        isOk = false;
        error[3].innerHTML = `${resEmail}`;
    }
    if (resDescription !== INPUT_TEXT_OK) {
        isOk = false;
        error[4].innerHTML = `${resDescription}`;
    }
    if (resSkills !== INPUT_TEXT_OK) {
        isOk = false;
        error[5].innerHTML = `${resSkills}`;
    }
    if (resPlace !== INPUT_TEXT_OK) {
        isOk = false;
        error[6].innerHTML = `${resPlace}`;
    }
    if (resSalaryMin !== SALARY_OK) {
        isOk = false;
        error[7].innerHTML = `${resSalaryMin}`;
    }
    if (resSalaryMax !== SALARY_OK) {
        isOk = false;
        error[8].innerHTML = `${resSalaryMax}`;
    }

    if (isOk) {
        submitF(form, jobsArr);
    }


    let arr = [title, surname, name, email, description, skills, place, salaryMin, salaryMax];

    arr.forEach((item, index)=>{
        item.addEventListener('keydown', function (event) {
            error[index].innerHTML='';
        });
    }, false);

}