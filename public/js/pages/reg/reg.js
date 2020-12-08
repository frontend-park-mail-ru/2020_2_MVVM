import { checkFrom } from "./components/reg_form/reg.js";
import createElem from "Js/libs/createElem";
import regTemp from "./components/reg_form/reg.tmpl.xml";

const app = window.document.getElementById("main");

export default class RegList {
  constructor(onsubmit, getCompanyListF) {
    this.onsubmit = onsubmit;
    this.getCompanyList = getCompanyListF;
  }

  async render() {
    this.user_type = 'candidate';
    this.company = null;
    this.selectedCompany = null;
    app.innerHTML = "";


    const companies = await this.getCompanyList();

    const main = createElem("div", "main", app);
    main.insertAdjacentHTML("beforeend", regTemp(companies));

    const dropbtn = document.getElementsByClassName('dropbtn')[0];
    dropbtn.addEventListener('click', ()=>{
      document.getElementById("my_Dropdown").classList.toggle("show");
      getCompany(this, companies);
    });




    const userTypeBtn = document.getElementsByClassName('Switcher')[0];
    const companyField = document.getElementById('companyField');
    const regCheckbox = document.getElementById('regCheckbox');

    userTypeBtn.addEventListener('click', () => {
      const regCheckboxBlock = document.getElementById('regCheckboxBlock');
      if (this.user_type === "candidate") {
        this.user_type = 'employer';
        companyField.classList.remove('hide');
        regCheckboxBlock.classList.remove('hide');
        this.company = this.selectedCompany;
      } else {
        this.user_type = 'candidate';
        this.company = null;
        regCheckboxBlock.classList.add('hide');
        companyField.classList.add('hide');
        regCheckbox.checked = false;
      }
    });


    regCheckbox.addEventListener('click', ()=>{
      if (regCheckbox.checked) {
        this.company = null;
        companyField.classList.add('hide');
      } else {
        this.company = this.selectedCompany;
        companyField.classList.remove('hide');
      }
    })


    const companyInputField = document.getElementById('myInput');
    companyInputField.addEventListener('input', async ()=>{
      filterFunction();
    })


    const form = document.querySelector("form");
    let error = document.getElementsByClassName("error");

    checkFrom(this, form, error);
  }
}

const getCompany = (regClass, companies) => {
  const a = document.getElementsByClassName("dropdown-content__div");
  for (let i = 0; i < a.length; i++) {
    a[i].addEventListener('click', ()=>{
      regClass.company = companies.find(item => item.name === a[i].innerText);
      regClass.selectedCompany = regClass.company;
      document.getElementById("my_Dropdown").classList.remove('show');
      document.getElementsByClassName('dropbtn')[0].innerText = `${a[i].innerText}`;
    })
  }
}


const filterFunction = () => {
  const input = document.getElementById("myInput");
  const filter = input.value.toUpperCase();
  const div = document.getElementById("my_Dropdown");
  const a = div.getElementsByClassName("dropdown-content__div");
  for (let i = 0; i < a.length; i++) {
    const value = a[i].value || a[i].innerText;
    if (value.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}