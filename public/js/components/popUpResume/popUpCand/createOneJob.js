import {app} from "../../../pages/createCandidateSum/createCandidateSum.js";
import Validation from "../../../libs/validation.js";
import endWorkTemplate from '../endWorkField/endWorkField.tmpl.xml'
import jobBoardTemplate from '../jobBoard/jobBoard.tmpl.xml'
import popUpCandTemplate from './popUpCand.tmpl.xml'
import {
    DATE_OK,
    DATE_END_EMPTY,
    INPUT_TEXT_OK,
    INPUT_TEXT_EMPTY,
    DATE_EMPTY,
    DATE_START_EMPTY
} from "../../../libs/constants.js"


// let numOfJob = 0;
let currentWork;

export async function renderInputForm(value, classCand) {

    app.insertAdjacentHTML("afterbegin", popUpCandTemplate(value));
    let exit = document.getElementsByClassName("popUp__cont_block");
    let bg = document.getElementsByClassName("bg");
    exit = Array.prototype.slice.call(exit);
    exit.forEach((item) => {
        item.addEventListener('click', (event) => {
            bg[0].remove();
        });
    });

    const checkbox = document.getElementById("popUp__cont_checkbox");
    const endWorkField = document.getElementById("div-finish");
    checkbox.addEventListener('change', (event)=>{
        if (checkbox.checked) {
            endWorkField.innerHTML='';
            currentWork = true;
        } else {
            currentWork = false;
            endWorkField.insertAdjacentHTML("afterbegin", endWorkTemplate(value));
        }
    });

    const form = bg[0].querySelector("form");
    await form.addEventListener('submit', (event) => {
        collectInfo(classCand, event, form, bg[0]).then(value =>{
            if (value){
                let board = document.getElementById("experience_board");
                classCand.jobsArr.push(value);
                board.insertAdjacentHTML("beforeend", jobBoardTemplate(value));
                board.lastChild.firstChild.addEventListener('click', (event)=>{
                    openJob(value, classCand);
                });
                board.lastChild.lastChild.addEventListener('click', (event)=>{
                    (event.currentTarget).parentNode.remove();
                    console.log(classCand.jobsArr);
                    console.log(value);
                    delete classCand.jobsArr[value.numOfJob];
                });
            }
        });
    });
}

async function openJob(value, classCand){
    renderInputForm(value, classCand);
}


async function collectInfo(classCand, event, form, bg){
    let data = {};
    event.preventDefault();
    const formData =  new FormData(form);

    data.numOfJob = classCand.numOfJob;
    data.begin = formData.get("begin");
    if (formData.get("finish") === null && currentWork) {
        data.finish = "today";
        data.continue_to_today = true;
    } else {
        data.continue_to_today = false;
        data.finish = formData.get("finish");
    }
    data.position = formData.get("position");
    data.name_job = formData.get("name_job");
    data.duties = formData.get("duties");
    if (await checkPopUpCand(data, form)) {
        classCand.numOfJob++;
        bg.remove();
        return data;
    }
}

async function checkPopUpCand(data, form){
    let isOk = true;

    const resDate = Validation.validateDate(data.begin, data.finish);
    const resType = Validation.validateTextField(data.position);
    const resJob = Validation.validateTextField(data.name_job);
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

export async function openAndDelJob(value, classCand) {
    let board = document.getElementById("experience_board");
    for (let i = 0; i<board.childElementCount; i++){
        board.children[i].firstChild.addEventListener('click', (event)=>{
            openJob(value[i], classCand);
        });
        board.children[i].lastChild.addEventListener('click', (event)=>{
            (event.currentTarget).parentNode.remove();
            delete classCand.jobsArr[value[i].numOfJob];
        });
    }

}