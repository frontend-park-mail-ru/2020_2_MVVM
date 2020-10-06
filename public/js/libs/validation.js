import {INCORRECT_EMAIL, INCORRECT_LOGIN, INCORRECT_PASSWD, INCORRECT_AVATAR_F, INCORRECT_INPUT_TEXT, INCORRECT_PHONE,INCORRECT_SALARY} from './constants.js';
import {EMAIL_OK, AVATAR_OK, LOGIN_OK, PASSWD_OK, INPUT_TEXT_OK, PHONE_OK, SALARY_OK} from './constants.js';
import {EMAIL_EMPTY, LOGIN_EMPTY, PASSWD_EMPTY, INPUT_TEXT_EMPTY, PHONE_EMPTY, SALARY_EMPTY} from './constants.js';
import {EMAIL_EXP, LOGIN_EXP, PASSWD_EXP, PHONE_EXP} from './constants.js';
import {JPEG_AVATAR_F, PNG_AVATAR_F} from "./constants.js";

export default class Validation {
    /**
     * check of val string instance (for object and for scalar value)
     * @param val
     * @return {boolean}
     */
    static isString(val) {
        return (typeof val === "string" || val instanceof String);
    };

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
    };

    /**
     * validateLogin - check validity of input login (using RegExp)
     * @param {string} login
     * @return {string}
     **/
    static validateLogin(login) {
        if (!this.isString(login)) {
            throw TypeError;
        }
        if (login.length === 0) {
            return LOGIN_EMPTY;
        }
        if (!LOGIN_EXP.test(login)) {
            return INCORRECT_LOGIN
        }
        return LOGIN_OK;
    };

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
    };

    /**
     * validateTextField - check validity of input (by length)
     * * @param userInput
     * @param maxLength
     * @return {string}
     **/
    static validateTextField(userInput, maxLength = 150) {
        if (!this.isString(userInput)) {
            throw TypeError;
        }
        const len = userInput.length
        if (len === 0) {
            return INPUT_TEXT_EMPTY;
        }
        if (len > maxLength) {
            return INCORRECT_INPUT_TEXT;
        }
        return INPUT_TEXT_OK;
    };

    /**
     * validateImage - check validity of input image
     * @return {string}
     * @param phone
     */
    static validateTelephone(phone) {
        if (!PHONE_EXP.test(phone)){
            return INCORRECT_PHONE;
        }
        if (phone.length === 0){
            return PHONE_EMPTY;
        }
        return PHONE_OK;
    };

    /**
     * validateImage - check validity of input image
     * @return {string}
     * @param salary
     */
    static validateSalary(salary) {
        if (Number(salary) <= 0){
            return INCORRECT_SALARY;
        }
        if (salary.length === 0){
            return SALARY_EMPTY;
        }
        return SALARY_OK;
    };

    /**
     * validateImage - check validity of input image
     * @return {string}
     * @param avatar
     */
    static validateAvatar(avatar) {
        const size = 10485760; // 10Mb
        if (avatar.type !== JPEG_AVATAR_F && avatar.type !== PNG_AVATAR_F || avatar.size > size) {
            return INCORRECT_AVATAR_F;
        }
        return AVATAR_OK;
    }
}