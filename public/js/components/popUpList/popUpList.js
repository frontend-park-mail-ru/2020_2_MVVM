import popUpListTemp from "Js/components/popUpList/popUpList.tmpl.xml";
import responseResultTemp from "Js/components/popUpList/responseResult.tmpl.xml";
import {DOMAIN} from "Js/libs/constants";


export default function popUpList(app, responsedCls, responsedId, data) {
    console.log(data);
    data.user_type = localStorage.getItem('user_type');
    if (data.list && data.list.length) {
        if (data.user_type==='candidate') {
            data.list.forEach((resume) => {
                resume.imgPath = `${DOMAIN}static/resume/${resume.resume_id}`;
            });
        } else if (data.user_type==='employer'){
            data.list.forEach((vacancy) => {
                vacancy.imgPath = `${DOMAIN}static/company/${vacancy.comp_id}`;
            });
        }
    }

    app.insertAdjacentHTML("afterbegin", popUpListTemp(data));
    let imgs = document.getElementsByClassName("listOfPopImg");
    if (data.user_type==='candidate') {
        for (let i=0; i<imgs.length;i++){
            imgs[i].onerror = ()=>{imgs[i].src = `${DOMAIN}static/resume/default.png`};
        }
    } else {
        for (let i=0; i<imgs.length;i++){
            imgs[i].onerror = ()=>{imgs[i].src = `${DOMAIN}static/vacancy/default.png`};
        }
    }


    let exit = document.getElementsByClassName("popUp__cont_block");
    let bg = document.getElementsByClassName("bg");
    exit = Array.prototype.slice.call(exit);
    exit.forEach((item) => {
        item.addEventListener('click', () => {
            bg[0].remove();
        });
    });
    let selectBtn = document.getElementsByClassName("main__candidate_shortlist");
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