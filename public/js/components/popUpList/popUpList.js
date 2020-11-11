import popUpListTemp from "Js/components/popUpList/popUpList.tmpl.xml";
import responseResultTemp from "Js/components/popUpList/responseResult.tmpl.xml";


export default function popUpList(app, responsedCls, responsedId, data) {
    data.user_type = localStorage.getItem('user_type');
    app.insertAdjacentHTML("afterbegin", popUpListTemp(data));

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