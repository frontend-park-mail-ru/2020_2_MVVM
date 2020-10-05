const form = document.getElementsByTagName("form");
let error = document.getElementsByClassName('error');

export function checkFrom() {

    const email = document.getElementById('emailAuth');
    const nickname = document.getElementById('nickAuth');
    const password = document.getElementById('passAuth');


    checkField(email, 0, checkEmail, 'email');
    checkField(password, 2, checkPassw, 'пароль');
}


function checkField(field, count, func, name){
    field.addEventListener('keydown', function (event) {
        error[count].innerHTML='';
    }, false);

    form[0].addEventListener('submit', function (event){
        if (!func(field.value)) {
            error[count].innerHTML = `Введите корректный ${name}`;
            error[count].className = "error";
            error[count].preventDefault();
        }
    }, false);
}


function checkPassw(passw){
    if (passw ===undefined){
        return false;
    } else {
        return (passw.length > 8)
    }
}

function checkEmail(email){
    const re = /^.+@.+\..+$/;
    return re.test(email);
}