
export function checkBoxes() {
    const singleOption = document.getElementsByClassName('option-single-title');
    const checkBoxName = document.getElementsByClassName("option-type__name");
    for (let i=0; i<checkBoxName.length; i++) {
        checkBoxName[i].addEventListener('click', (e) => {
            let t = (e.target).previousSibling;
            if ((t.tagName === 'INPUT') && (t.type === 'checkbox')) t.click();
        })
    }


    for (let num = 0; num < singleOption.length; num++)
        singleOption[num].addEventListener('click', () => {
            const blockOfSpecialism = singleOption[num].parentElement;
            if (singleOption[num].className === "option-single-title"){
                singleOption[num].className = "option-single-title option-single-title_hidden";
                for (let i = 1; i < blockOfSpecialism.childNodes.length; i++) {
                    blockOfSpecialism.childNodes[i].style.display = "none";
                }
            } else {
                singleOption[num].className = "option-single-title";
                for (let i = 1; i < blockOfSpecialism.childNodes.length; i++) {
                    blockOfSpecialism.childNodes[i].style.display = "flex";
                }
            }
    });
}
