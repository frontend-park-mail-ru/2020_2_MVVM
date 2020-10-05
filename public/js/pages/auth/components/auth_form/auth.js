const form = document.getElementsByTagName("form");
let error = document.getElementsByClassName('error');

export function checkFrom() {

    const email = document.getElementById('emailAuth');
    const nickname = document.getElementById('nickAuth');
    const password = document.getElementById('passAuth');


    checkField(email, 0, checkEmail, 'Введите корректный email');
    checkField(password, 2, checkPassw, 'Пароль должен быть длиннее 8 символов');
}


function checkField(field, count, func, textError){
    field.addEventListener('keydown', function (event) {
        error[count].innerHTML='';
    }, false);

    form[0].addEventListener('submit', function (event){
        if (!func(field.value)) {
            error[count].innerHTML = `${textError}`;
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