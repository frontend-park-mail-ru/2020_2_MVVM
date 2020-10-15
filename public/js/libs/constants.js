// validation status
export const EMAIL_OK = 'OK email'
export const LOGIN_OK = 'OK login'
export const PASSWD_OK = 'OK password'
export const AVATAR_OK = 'OK avatar'
export const SALARY_OK = 'OK salary'
export const INPUT_TEXT_OK = 'OK input text'
export const PHONE_OK = 'OK phone number'
export const EMAIL_EMPTY = 'EMPTY email'
export const LOGIN_EMPTY = 'EMPTY login'
export const PASSWD_EMPTY = 'EMPTY password'
export const PHONE_EMPTY = 'EMPTY phone'
export const SALARY_EMPTY = 'EMPTY salary'
export const INPUT_TEXT_EMPTY = 'EMPTY input text'

// validation common errors
export const INCORRECT_EMAIL = 'Email should contain "@" and latin letters, numbers, special symbols';
export const INCORRECT_LOGIN = 'Login should have 4-20 symbols and contain latin letters and numbers';
export const INCORRECT_PASSWD = 'Password should has at least 5-25 symbols and not contain russian letters';
export const INCORRECT_AVATAR_F = 'Avatar must be jpeg or png format and must be less than 10 MB in size';
export const INCORRECT_INPUT_TEXT = 'Input exceeds limit of characters'
export const INCORRECT_PHONE = 'wrong phone number'
export const INCORRECT_SALARY = 'salary can`t be less than zero'

// validation allowed expressions
export const EMAIL_EXP = new RegExp(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/)
export const LOGIN_EXP = new RegExp(/^[a-zA-Z][a-zA-Z0-9-_]{4,20}$/);
export const PASSWD_EXP = new RegExp(/[^а-яёА-ЯЁ]{5,25}$/);
export const PHONE_EXP = new RegExp(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
export const JPEG_AVATAR_F = 'image/jpeg';
export const PNG_AVATAR_F = 'image/png';


//satus code

export const SUCCESS = 200;
export const UNAUTHORISED = 401;


//path

// export const URL = "http://95.163.212.36/api";
export const URL = "https://studhunt.ru/api";
// export const URL = "http://localhost/api";
// export const URL = "api";


//urls

export const loginURL = "/v1/auth/login";

export const meUserURL = "/v1/users/me";
export const addUserURL = "/v1/users/add";
export const usersByIdURL = "/v1/users/by/id/";
export const updateUserURL = "/v1/users/update/";

export const addResumeURL = "/v1/resume/add";
export const resumeByIdURL = "/v1/resume/by/id/";
export const resumePageURL = "/v1/resume/page?";


export const addVacancyURL = "/v1/vacancy/add";
export const vacancyByIdURL = "/v1/vacancy/by/id/";
export const vacancyPageURL = "/v1/vacancy/page?";