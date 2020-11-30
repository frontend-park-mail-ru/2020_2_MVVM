import Validation from "../../../../libs/validation.js";
import { EMAIL_OK, INPUT_TEXT_OK, SALARY_OK } from "Js/libs/constants";

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
  if (resEmail !== EMAIL_OK) {
    isOk = false;
    error[3].innerHTML = `${resEmail}`;
  }
  if (resDescription !== INPUT_TEXT_OK) {
    isOk = false;
    error[4].innerHTML = `${resDescription}`;
  }
  if (resPlace !== INPUT_TEXT_OK) {
    isOk = false;
    error[5].innerHTML = `${resPlace}`;
  }
  if (resSkills !== INPUT_TEXT_OK) {
    isOk = false;
    error[6].innerHTML = `${resSkills}`;
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

  let arr = [
    title,
    surname,
    name,
    email,
    description,
    place,
    salaryMin,
    salaryMax,
  ];

  arr.forEach((item, index) => {
    item.addEventListener("keydown", function () {
      error[index].innerHTML = "";
    });
  }, false);
}
