// validation status
export const EMAIL_OK = 'верный email'
export const LOGIN_OK = 'верный логин'
export const PASSWD_OK = 'верный пароль'
export const AVATAR_OK = 'валидное изображение для профиля'
export const SALARY_OK = 'корректное значение зарплаты'
export const INPUT_TEXT_OK = 'корректный текст для ввода'
export const PHONE_OK = 'верный номер тел.'
export const DATE_OK = 'корректная дата'

export const EMAIL_EMPTY = 'Укажите email.'
export const LOGIN_EMPTY = 'Укажите логин.'
export const PASSWD_EMPTY = 'Укажите пароль.'
export const PHONE_EMPTY = 'Укажите номера телефона.'
export const SALARY_EMPTY = 'Укажите зарплату.'
export const INPUT_TEXT_EMPTY = 'Поле обязательно для заполнения.'
export const DATE_EMPTY = 'Укажите дату.'
export const DATE_START_EMPTY = "Начальная дата не введена."
export const DATE_END_EMPTY = "Конечная дата не введена."

export const INCORRECT_EMAIL = 'Email должен содержать "@" и латинские буквы, цифры, символы.';
export const INCORRECT_LOGIN = 'Логин должен содержать 4-20 символов, а также содержать латинские символы и цифры.';
export const INCORRECT_PASSWD = 'Пароль должен содержать по крайней мере от 5 до 25 символов.';
export const INCORRECT_AVATAR_F = 'Аватар должен быть формата jpeg или png и быть размером менее 1 MB.';
export const INCORRECT_INPUT_TEXT = 'Неверное количество символов.'
export const INCORRECT_PHONE = 'Неверный номер телефона.'
export const INCORRECT_SALARY = 'Поле не может принимать отрицательное значение.'
export const INCORRECT_DATE = 'Некорректная дата.'


// validation allowed expressions
export const EMAIL_EXP = new RegExp(/^([A-z0-9_-]+\.)*[A-z0-9_-]+@[A-z0-9_-]+(\.[A-z0-9_-]+)*\.[A-z]{2,6}$/)
export const PASSWD_EXP = new RegExp(/^.{5,25}$/);
export const PHONE_EXP = new RegExp(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
export const JPEG_AVATAR_F = 'image/jpeg';
export const PNG_AVATAR_F = 'image/png';
export const NOT_NUMBER = 'Некорректное число';


//scales
export const DESKTOP_WIDTH = 1440;
export const DESKTOP_HEIGHT = 1024;
export const MOBILE_WIDTH = 720;
export const MOBILE_HEIGHT = 1280;

//satus code

export const SUCCESS = 200;
export const UNAUTHORISED = 401;


//path
export const DOMAIN = "https://studhunt.ru/";

export const URL = "https://studhunt.ru/api";
// export const URL = "api";
// export const URL = "http://localhost/api";
//export const URL = "http://127.0.0.1/api";


export const loginURL = "/v1/users/login";
export const logoutURL = "/v1/users/logout";


export const meUserURL = "/v1/users/me";
export const addUserURL = "/v1/users/";
export const updateUserURL = "/v1/users/";


export const addResumeURL = "/v1/resume/";
export const resumeByIdURL = "/v1/resume/by/id/";
export const resumePageURL = "/v1/resume/page?";
export const resumeMineURL = "/v1/resume/mine";
// export const updateResumeURL = "/v1/resume/update";
export const resumeSearchURL = '/v1/resume/search';

export const getTopSpheres = '/v1/vacancy/top';


export const addVacancyURL = "/v1/vacancy/";
export const vacancyByIdURL = "/v1/vacancy/by/id/";
export const vacancyPageURL = "/v1/vacancy/page?";
export const vacancyRecommendationsPageURL = "/v1/vacancy/recommendation?";
export const vacancyMineURL = "/v1/vacancy/mine?";
// export const updateVacancyURL = "/v1/vacancy/update";
export const vacancySearchURL = '/v1/vacancy/search';

export const vacancyCompURL = "/v1/vacancy/comp?";

export const addCompanyURL = "/v1/company/";
export const companyByIdURL = "/v1/company/by/id/";
export const companyPageURL = "/v1/company/page?";
export const companyMineURL = "/v1/company/mine";
export const companySearchURL = "/v1/company/search";
export const companyNamesURL = "/v1/company/names"

export const addLikeResumeURL = "/v1/resume/favorite/by/id/";
export const deleteLikeResumeURL = "/v1/resume/favorite/by/id/";
export const myLikeResumeURL = "/v1/resume/myfavorites";
export const getLikeURL = "/v1/resume/favorite/"

export const createRespURL = "/v1/response/";
export const updateRespStatusURL = "/v1/response/update";
export const getMyRespURL = "/v1/response/my";

export const myFreeResumesURL = "/v1/response/free/resumes/";
export const myFreeVacanciesURL = "/v1/response/free/vacancies/";

export const notificationsPageURL = "/v1/response/notify?";

export const deleteUserURL = "/v1/users";
export const deleteResumeURL = "/v1/resume/resume/";
export const deleteVacancyURL = "/v1/vacancy/";

export const PAGES_WITH_ABSOLUTE = ["/", "/auth", "/reg"];
export const PAGES_NEED_SEARCH = ['/candidatesList', '/employersList', '/companiesList'];

//sphere
export const spheres = [
  "Автомобильный бизнес",
  "Гостиницы, рестораны, общепит, кейтеринг",
  "Государственные организации",
  "Добывающая отрасль",
  "ЖКХ",
  "Информационные технологии, системная интеграция, интернет",
  "Лесная промышленность, деревообработка",
  "Медицина, фармацевтика, аптеки",
  "Металлургия, металлообработка",
  "Нефть и газ",
  "Образовательные учреждения",
  "Общественная деятельность, партии, благотворительность, НКО",
  "Перевозки, логистика, склад, ВЭД",
  "Продукты питания",
  "Промышленное оборудование, техника, станки и комплектующие",
  "Розничная торговля",
  "СМИ, маркетинг, реклама, BTL, PR, дизайн, продюсирование",
  "Сельское хозяйство",
  "Строительство, недвижимость, эксплуатация, проектирование",
  "Телекоммуникации, связь",
  "Товары народного потребления (непищевые)",
  "Тяжелое машиностроение",
  "Управление многопрофильными активами",
  "Услуги для бизнеса",
  "Услуги для населения",
  "Финансовый сектор",
  "Химическое производство, удобрения",
  "Электроника, приборостроение, бытовая техника, компьютеры и оргтехника",
  "Энергетика",
]


export const educationLevel = {
  "middle": "Среднее",
  "specialized_secondary": "Среднее специальное",
  "incomplete_higher": "Неоконченное высшее",
  "higher": "Высшее",
  "bachelor": "Бакалавр",
  "master": "Магистр",
  "phD": "Кандидат наук",
  "doctoral": "Доктор наук",
}

export const experienceLevel = {
  "junior": "Junior",
  "middle": "Middle",
  "senior": "Senior"
}

export const experienceMonth = {
  0: "Не работал",
  1: "Меньше года",
  5: "1-5 лет",
  10: "5-10 лет",
}


export const responsesStatus = {
  "sent": "Отправлено",
  "accepted": "Приглашение",
  "refusal": "Отказ"
}