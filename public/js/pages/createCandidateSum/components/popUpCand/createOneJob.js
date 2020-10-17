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

    const form = bg[0].querySelector("form");
    await form.addEventListener('submit', (event) => {
        collectInfo(event, form, bg[0]).then(value =>{
            if (value){
                jobsArr.push(value);
                let board = document.getElementById("experience_board");
                board.insertAdjacentHTML("beforeend", window.fest["jobBoard.tmpl"](value));
                board.lastChild.firstChild.addEventListener('click', (event)=>{
                    console.log(value);
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


async function openJob(value){
    renderInputForm(value);
}

async function collectInfo(event, form, bg){
    let data = {};
    event.preventDefault();
    const formData =  new FormData(form);
    data.numOfJob = numOfJob;
    data.start_work_year = formData.get("start_work_year");
    data.end_work_year = formData.get("end_work_year");
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