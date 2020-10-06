// validation status
export const EMAIL_OK = 'OK email'
export const LOGIN_OK = 'OK login'
export const PASSWD_OK = 'OK password'
export const AVATAR_OK = 'OK avatar'
export const INPUT_TEXT_OK = 'OK input text'
export const EMAIL_EMPTY = 'EMPTY email'
export const LOGIN_EMPTY = 'EMPTY login'
export const PASSWD_EMPTY = 'EMPTY password'
export const INPUT_TEXT_EMPTY = 'EMPTY input text'

// validation common errors
export const INCORRECT_EMAIL = 'Email should contain "@" and latin letters, numbers, special symbols';
export const INCORRECT_LOGIN = 'Login should have 4-20 symbols and contain latin letters and numbers';
export const INCORRECT_PASSWD = 'Password should has at least 5-25 symbols and not contain russian letters';
export const INCORRECT_AVATAR_F = 'Avatar must be jpeg or png format and must be less than 10 MB in size';
export const INCORRECT_INPUT_TEXT = 'Input exceeds limit of characters'

// validation allowed expressions
export const EMAIL_EXP = new RegExp(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/)
export const LOGIN_EXP = new RegExp(/^[a-zA-Z][a-zA-Z0-9-_]{4,20}$/);
export const PASSWD_EXP = new RegExp(/[^а-яёА-ЯЁ]{5,25}$/);
export const JPEG_AVATAR_F = 'image/jpeg';
export const PNG_AVATAR_F = 'image/png';
