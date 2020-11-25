import popUpListTemp from "Js/components/popUpList/popUpList.tmpl.xml";
import responseResultTemp from "Js/components/popUpList/responseResult.tmpl.xml";
import {DOMAIN} from "Js/libs/constants";


export default function popUpList(app, responsedCls, responsedId, data) {

    data.user_type = localStorage.getItem('user_type');

    app.insertAdjacentHTML("afterbegin", popUpListTemp(data));
    let DomList = document.getElementsByClassName('list-row-photo__bg');
    if (data.user_type==='candidate') {
        data.list.forEach((resume, i) => {
            DomList[i].style.background = `no-repeat  0 0/cover url(${DOMAIN}static/resume/${resume.resume_id}`;
        });
    } else {
        data.list.forEach((vacancy, i) => {
            DomList[i].style.background = `no-repeat  0 0/cover url(${DOMAIN}static/company/${vacancy.comp_id}`;
        });
    }


    let exit = document.getElementsByClassName("popUp-cont__block");
    let bg = document.getElementsByClassName("bg");
    const exitBtn = document.getElementById("exit-btn");
    exit = Array.prototype.slice.call(exit);
    exit.push(exitBtn);
    exit.forEach((item) => {
        item.addEventListener('click', () => {
            bg[0].remove();
        });
    });
    let selectBtn = document.getElementsByClassName("list-row");
    selectBtn = Array.prototype.slice.call(selectBtn);
    selectBtn.forEach((item, idx)=>{
        item.addEventListener('click',()=>{
            let selectedId;
            if (localStorage.getItem('user_type')==='candidate') {
                selectedId = data.list[idx].resume_id;
            } else {
                selectedId = data.list[idx].vac_id;
            }
            responsedCls.createResp(responsedId, selectedId).then(()=>{
                let page = document.getElementById("popUpContent");
                page.innerHTML = responseResultTemp();
                page.addEventListener('click',()=>{
                    bg[0].remove();
                });
            });
        })
    });
}