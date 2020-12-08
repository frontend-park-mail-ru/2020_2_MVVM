import {
  AVATAR_OK,
  DATE_EMPTY,
  DATE_END_EMPTY,
  DATE_OK,
  DATE_START_EMPTY,
  EMAIL_EMPTY,
  EMAIL_EXP,
  EMAIL_OK,
  INCORRECT_AVATAR_F,
  INCORRECT_DATE,
  INCORRECT_EMAIL,
  INCORRECT_INPUT_TEXT,
  INCORRECT_PASSWD,
  INCORRECT_PHONE,
  INCORRECT_SALARY,
  INPUT_TEXT_EMPTY,
  INPUT_TEXT_OK,
  JPEG_AVATAR_F,
  NOT_NUMBER,
  PASSWD_EMPTY,
  PASSWD_EXP,
  PASSWD_OK,
  PHONE_EMPTY,
  PHONE_EXP,
  PHONE_OK,
  PNG_AVATAR_F,
  SALARY_OK,
} from "./constants.js";
import {GENDER_EMPTY, GENDER_OK} from "Js/libs/constants";

export default class Validation {
  /**
   * check of val string instance (for object and for scalar value)
   * @param val
   * @return {boolean}
   */
  static isString(val) {
    return typeof val === "string" || val instanceof String;
  }

  /**
   * validateEmail - check validity of input email (using RegExp)
   * @param {string} email
   * @return {string}
   **/
  static validateEmail(email) {
    if (!this.isString(email)) {
      throw TypeError;
    }
    if (email.length === 0) {
      return EMAIL_EMPTY;
    }
    if (!EMAIL_EXP.test(email)) {
      return INCORRECT_EMAIL;
    }
    return EMAIL_OK;
  }

  /**
   * validatePasswd - check validity of input login (using RegExp)
   * @param passwd
   * @return {string}
   **/
  static validatePasswd(passwd) {
    if (!this.isString(passwd)) {
      throw TypeError;
    }
    if (passwd.length === 0) {
      return PASSWD_EMPTY;
    }
    if (!PASSWD_EXP.test(passwd)) {
      return INCORRECT_PASSWD;
    }
    return PASSWD_OK;
  }

  /**
   * validateTextField - check validity of input (by length)
   * * @param userInput
   * @param maxLength
   * @return {string}
   **/
  static validateTextField(userInput, maxLength = 512) {
    if (!this.isString(userInput)) {
      throw TypeError;
    }
    const len = userInput.length;
    if (len === 0) {
      return INPUT_TEXT_EMPTY;
    }
    if (len > maxLength) {
      return INCORRECT_INPUT_TEXT;
    }
    return INPUT_TEXT_OK;
  }

  /**
   * validateImage - check validity of input image
   * @return {string}
   * @param phone
   */
  static validateTelephone(phone) {
    if (!PHONE_EXP.test(phone)) {
      return INCORRECT_PHONE;
    }
    if (phone.length === 0) {
      return PHONE_EMPTY;
    }
    return PHONE_OK;
  }

  /**
   * validateImage - check validity of input image
   * @return {string}
   * @param salary
   */
  static validateSalary(salary) {
    // if (salary === '') {
    //     return INCORRECT_SALARY;
    // }
    if (isNaN(Number(salary))) {
      return NOT_NUMBER;
    }
    if (salary !== "" && Number(salary) <= 0) {
      return INCORRECT_SALARY;
    }
    return SALARY_OK;
  }

  static validateSalaryAll(salaryMin, salaryMax) {
    if (Number(salaryMin) > Number(salaryMax)) {
      return 'Минимальная зарплата не может быть больше максимальной';
    }
    return SALARY_OK;
  }

  /**
   * validateImage - check validity of input image
   * @return {string}
   * @param avatar
   */
  static validateAvatar(avatar) {
    const size = 10485760; // 10Mb
    if (
      (avatar.type !== JPEG_AVATAR_F && avatar.type !== PNG_AVATAR_F) ||
      avatar.size > size
    ) {
      return INCORRECT_AVATAR_F;
    }
    return AVATAR_OK;
  }

  static validateDate(start, end) {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;

    if (!start && !end) {
      return DATE_EMPTY;
    }
    if (!start) {
      return DATE_START_EMPTY;
    }
    if (!end) {
      return DATE_END_EMPTY;
    }
    if (start > today) {
      return INCORRECT_DATE;
    }
    if (end !== "today" && (start > end || end > today)) {
      return INCORRECT_DATE;
    }

    return DATE_OK;
  }

  static validateGender(female, male) {
    if (!female.checked && !male.checked) {
      return GENDER_EMPTY;
    }
    return GENDER_OK;
  }
}
