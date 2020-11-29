import popUpListTemp from "Js/components/popUpList/popUpList.tmpl.xml";
import responseResultTemp from "Js/components/popUpList/responseResult.tmpl.xml";


export default function popUpList(app, responsedCls, responsedId, data) {

    data.user_type = localStorage.getItem('user_type');
    document.body.classList.add("hide-scroll");


    app.insertAdjacentHTML("afterbegin", popUpListTemp(data));

    const createBtn = document.getElementsByClassName('btn-add-exp');
    if (createBtn) {
        createBtn[0].addEventListener('click',()=>{
            document.body.classList.remove("hide-scroll");
        })
    }

    let exit = document.getElementsByClassName("popUp-cont__block");
    let bg = document.getElementsByClassName("bg");
    const exitBtn = document.getElementById("exit-btn");
    exit = Array.prototype.slice.call(exit);
    exit.push(exitBtn);
    exit.forEach((item) => {
        item.addEventListener('click', () => {
            document.body.classList.remove("hide-scroll");
            bg[0].remove();
        });
    });

    let DomList = document.getElementsByClassName('list-row-photo__bg');

    if (data.list) {
        if (data.user_type==='candidate') {
            data.list.forEach((resume, i) => {
                console.log(resume);
                DomList[i].style.background = `no-repeat  0 0/cover url(${resume.imgPath}`;
            });
        } else {
            data.list.forEach((vacancy, i) => {
                DomList[i].style.background = `no-repeat  0 0/cover url(${vacancy.imgPath}`;
            });
        }
    }


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
                    document.body.classList.remove("hide-scroll");
                    bg[0].remove();
                });
            });
        })
    });
}