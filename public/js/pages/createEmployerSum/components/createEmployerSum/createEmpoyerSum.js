import Validation from "../../../../libs/validation.js";
import {
  EMAIL_OK,
  INPUT_TEXT_OK,
  PHONE_OK,
  SALARY_OK,
} from "Js/libs/constants";

let error = document.getElementsByClassName("error");

export function checkFrom(submitF, form) {
  let isOk = true;

  const vacancyName = document.getElementById("summary-name");
  const description = document.getElementById("description");
  const skills = document.getElementById("skills");
  const requirements = document.getElementById("requirements");
  const duties = document.getElementById("duties");
  const salaryMin = document.getElementById("salary_min");
  const salaryMax = document.getElementById("salary_max");
  const phone = document.getElementById("phone");
  const email = document.getElementById("email");
  const address = document.getElementById("address");

  const resVacancyName = Validation.validateTextField(vacancyName.value);
  const resDescription = Validation.validateTextField(description.value);
  const resSkills = Validation.validateTextField(skills.value);
  const resRequirements = Validation.validateTextField(requirements.value);
  const resDuties = Validation.validateTextField(duties.value);
  const resSalaryMin = Validation.validateSalary(salaryMin.value);
  const resSalaryMax = Validation.validateSalary(salaryMax.value);
  const resPhone = Validation.validateTelephone(phone.value);
  const resEmail = Validation.validateEmail(email.value);
  const resAddress = Validation.validateTextField(address.value);

  if (resVacancyName !== INPUT_TEXT_OK) {
    isOk = false;
    error[0].innerHTML = `${resVacancyName}`;
  }
  if (resDescription !== INPUT_TEXT_OK) {
    isOk = false;
    error[1].innerHTML = `${resDescription}`;
  }
  if (resSkills !== INPUT_TEXT_OK) {
    isOk = false;
    error[2].innerHTML = `${resSkills}`;
  }
  if (resRequirements !== INPUT_TEXT_OK) {
    isOk = false;
    error[3].innerHTML = `${resRequirements}`;
  }
  if (resDuties !== INPUT_TEXT_OK) {
    isOk = false;
    error[4].innerHTML = `${resDuties}`;
  }
  if (resSalaryMin !== SALARY_OK || resSalaryMax !== SALARY_OK) {
    isOk = false;
    if (resSalaryMin !== SALARY_OK && resSalaryMax !== SALARY_OK) {
      error[5].innerHTML = `${resSalaryMin} и ${resSalaryMax}`;
    } else if (resSalaryMin !== SALARY_OK) {
      error[5].innerHTML = `${resSalaryMin}`;
    } else {
      error[5].innerHTML = `${resSalaryMax}`;
    }
  }
  if (resSalaryMin === SALARY_OK && resSalaryMax === SALARY_OK) {
    const resSalaryAll = Validation.validateSalaryAll(salaryMin.value, salaryMax.value);
    if (resSalaryAll !== SALARY_OK) {

      isOk = false;
      error[5].innerHTML = `${resSalaryAll}`;
    }
  }
  if (resPhone !== PHONE_OK) {
    isOk = false;
    error[6].innerHTML = `${resPhone}`;
  }
  if (resEmail !== EMAIL_OK) {
    isOk = false;
    error[7].innerHTML = `${resEmail}`;
  }
  if (resAddress !== INPUT_TEXT_OK) {
    isOk = false;
    error[8].innerHTML = `${resAddress}`;
  }

  if (isOk) {
    submitF(form);
  }

  const arr = [
    vacancyName,
    description,
    skills,
    requirements,
    duties,
    null,
    phone,
    email,
    address,
  ];

  arr.forEach((item, index) => {
    if (item !== null) {
      item.addEventListener("keydown", function (event) {
        error[index].innerHTML = "";
      });
    }
  }, false);


  const salaryArr = [salaryMin, salaryMax];
  salaryArr.forEach((item) => {
    item.addEventListener("keydown", () => {
      error[5].innerHTML = "";
    });
  })

}