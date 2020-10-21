import {jobsArr, app} from "../../createCandidateSum.js";
import Validation from "../../../../libs/validation.js";
import {
    DATE_OK,
    DATE_END_EMPTY,
    INPUT_TEXT_OK,
    INPUT_TEXT_EMPTY,
    DATE_EMPTY,
    DATE_START_EMPTY
} from "../../../../libs/constants.js"

let numOfJob = 0;
let currentWork;

export async function renderInputForm(value) {

    app.insertAdjacentHTML("afterbegin", window.fest['popUpCand.tmpl'](value));
    let exit = document.getElementsByClassName("popUp__cont_block");
    let bg = document.getElementsByClassName("bg");
    exit = Array.prototype.slice.call(exit);
    exit.forEach((item) => {
        item.addEventListener('click', (event) => {
            bg[0].remove();
        });
    });

    const checkbox = document.getElementById("popUp__cont_checkbox");
    const endWorkField = document.getElementById("div-end_work_year");
    checkbox.addEventListener('change', (event)=>{
        if (checkbox.checked) {
            endWorkField.innerHTML='';
            currentWork = true;
        } else {
            currentWork = false;
            endWorkField.insertAdjacentHTML("afterbegin", window.fest['endWorkField.tmpl'](value));
        }
    });

    const form = bg[0].querySelector("form");
    await form.addEventListener('submit', (event) => {
        collectInfo(event, form, bg[0]).then(value =>{
            if (value){
                jobsArr.push(value);
                // openAndDelJob(value);
                let board = document.getElementById("experience_board");
                board.insertAdjacentHTML("beforeend", window.fest["jobBoard.tmpl"](value));
                board.lastChild.firstChild.addEventListener('click', (event)=>{
                    openJob(value);
                });
                board.lastChild.lastChild.addEventListener('click', (event)=>{
                    (event.currentTarget).parentNode.remove();
                    delete jobsArr[value.numOfJob];
                });
            }
        });
    });
}


export async function openAndDelJob(value) {
    let board = document.getElementById("experience_board");
    // board.insertAdjacentHTML("beforeend", window.fest["jobBoard.tmpl"](value));
    for (let i = 0; i<board.childElementCount; i++){
        board.children[i].firstChild.addEventListener('click', (event)=>{
            openJob(value[i]);
        });
        board.children[i].lastChild.addEventListener('click', (event)=>{
            (event.currentTarget).parentNode.remove();
            delete jobsArr[value[i].numOfJob];
        });
    }

}

async function openJob(value){
    renderInputForm(value);
}

async function collectInfo(event, form, bg){
    let data = {};
    event.preventDefault();
    const formData =  new FormData(form);

    data.numOfJob = numOfJob;
    data.start_work_year = formData.get("start_work_year");
    if (formData.get("end_work_year") === null && currentWork) {
        data.end_work_year = "today";
    } else {
        data.end_work_year = formData.get("end_work_year");
    }
    data.type_of_job = formData.get("type_of_job");
    data.job = formData.get("job");
    data.duties = formData.get("duties");
    if (await checkPopUpCand(data, form)) {
        numOfJob++;
        bg.remove();
        return data;
    }
}

async function checkPopUpCand(data, form){
    let isOk = true;

    const resDate = Validation.validateDate(data.start_work_year, data.end_work_year);
    const resType = Validation.validateTextField(data.type_of_job);
    const resJob = Validation.validateTextField(data.job);
    const resDuties = Validation.validateTextField(data.duties);

    let error = form.getElementsByClassName('error');

    error = Array.prototype.slice.call(error);
    error.forEach((item)=>{item.innerHTML="";});

    if (resDate !== DATE_OK){
        isOk = false;
        if (resDate === DATE_EMPTY){
            error[0].innerHTML =`${resDate}`;
        } else if (resDate === DATE_START_EMPTY){
            error[1].innerHTML =`${resDate}`;
        } else if (resDate === DATE_END_EMPTY) {
            error[2].innerHTML =`${resDate}`;
        } else
            error[0].innerHTML =`${resDate}`;
    }
    if (resType !== INPUT_TEXT_OK) {
        isOk = false;
        error[3].innerHTML =`${resType}`;
    }
    if (resJob !== INPUT_TEXT_OK) {
        isOk = false;
        error[4].innerHTML =`${resJob}`;
    }
    if (resDuties !== INPUT_TEXT_OK && resDuties !== INPUT_TEXT_EMPTY) {
        isOk = false;
        error[5].innerHTML =`${resDuties}`;
    }
    return isOk;

}