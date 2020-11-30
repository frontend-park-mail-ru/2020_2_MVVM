import Validation from "../../../../libs/validation.js";
import { EMAIL_OK, PASSWD_OK } from "Js/libs/constants";

export function checkFrom(submitF, form, error) {
  const email = document.getElementById("emailAuth");
  const password = document.getElementById("passAuth");

  form.addEventListener(
    "submit",
    function (event) {
      let isOk = true;
      const resEmail = Validation.validateEmail(email.value);
      const resPasswd = Validation.validatePasswd(password.value);

      if (resEmail !== EMAIL_OK) {
        isOk = false;
        error[0].innerHTML = `${resEmail}`;
      }
      if (resPasswd !== PASSWD_OK) {
        isOk = false;
        error[1].innerHTML = `${resPasswd}`;
      }
      if (isOk) {
        submitF(event, form);
      } else {
        event.preventDefault();
      }
    },
    false
  );

  const arr = [email, password];

  arr.forEach((item, index) => {
    item.addEventListener("keydown", function (event) {
      error[index].innerHTML = "";
    });
  }, false);
}
