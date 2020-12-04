import Validation from "../../../../libs/validation.js";
import {EMAIL_OK, GENDER_OK, INPUT_TEXT_OK, SALARY_OK} from "Js/libs/constants";

let error = document.getElementsByClassName("error");

export function checkFrom(submitF, form, jobsArr) {
  let isOk = true;

  const title = document.getElementById("title");
  const surname = document.getElementById("surname");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const description = document.getElementById("description");
  const place = document.getElementById("place");
  const skills = document.getElementById("skills");
  const salaryMin = document.getElementById("salary_min");
  const salaryMax = document.getElementById("salary_max");

  const genderF = document.getElementById('female');
  const genderM = document.getElementById('male');

  const resGender = Validation.validateGender(genderF, genderM);



  const resTitle = Validation.validateTextField(title.value);
  const resSurname = Validation.validateTextField(surname.value);
  const resName = Validation.validateTextField(name.value);
  const resEmail = Validation.validateEmail(email.value);
  const resDescription = Validation.validateTextField(description.value);
  const resPlace = Validation.validateTextField(place.value);
  const resSkills = Validation.validateTextField(skills.value);
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
  if (resGender !== GENDER_OK) {
    isOk = false;
    error[3].innerHTML = `${resGender}`;
  }
  if (resEmail !== EMAIL_OK) {
    isOk = false;
    error[4].innerHTML = `${resEmail}`;
  }
  if (resDescription !== INPUT_TEXT_OK) {
    isOk = false;
    error[5].innerHTML = `${resDescription}`;
  }
  if (resPlace !== INPUT_TEXT_OK) {
    isOk = false;
    error[6].innerHTML = `${resPlace}`;
  }
  if (resSkills !== INPUT_TEXT_OK) {
    isOk = false;
    error[7].innerHTML = `${resSkills}`;
  }

  if (resSalaryMin !== SALARY_OK || resSalaryMax !== SALARY_OK) {
    isOk = false;
    if (resSalaryMin !== SALARY_OK && resSalaryMax !== SALARY_OK) {
      error[8].innerHTML = `${resSalaryMin} и ${resSalaryMax}`;
    } else if (resSalaryMin !== SALARY_OK) {
      error[8].innerHTML = `${resSalaryMin}`;
    } else {
      error[8].innerHTML = `${resSalaryMax}`;
    }
  }
  if (resSalaryMin === SALARY_OK && resSalaryMax === SALARY_OK) {
    const resSalaryAll = Validation.validateSalaryAll(salaryMin.value, salaryMax.value);
    if (resSalaryAll !== SALARY_OK) {

      isOk = false;
      error[8].innerHTML = `${resSalaryAll}`;
    }
  }


  if (isOk) {
    submitF(form, jobsArr);
  }

  const arr = [
    title,
    surname,
    name,
    genderF,
    email,
    description,
    place,
    skills,
  ];

  arr.forEach((item, index) => {
    item.addEventListener("keydown", () => {
      error[index].innerHTML = "";
    });
  }, false);

  const salaryArr = [salaryMin, salaryMax];
  salaryArr.forEach((item) => {
    item.addEventListener("keydown", () => {
      error[8].innerHTML = "";
    });
  })
  
  const genderArr = [genderM, genderF];
  
  genderArr.forEach((item) => {
    item.addEventListener('change', () => {
      error[3].innerHTML = '';
    })
  }, false);
}
