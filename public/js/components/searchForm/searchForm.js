
export function checkBoxes() {
    const singleOption = document.getElementsByClassName('main__specialism_name');
    const checkBoxName = document.getElementsByClassName("main__type_name");
    for (let i=0; i<checkBoxName.length; i++) {
        checkBoxName[i].addEventListener('click', (e) => {

            let t = (e.target).previousSibling;
            if ((t.tagName === 'INPUT') && (t.type === 'checkbox')) t.click();
        })
    }


    for (let num = 0; num < singleOption.length; num++)
        singleOption[num].addEventListener('click', () => {
            const blockOfSpecialism = singleOption[num].parentElement;
            if (singleOption[num].className === "main__specialism_name"){
                singleOption[num].className = "main__specialism_name hidden";
                for (let i = 1; i < blockOfSpecialism.childNodes.length; i++) {
                    blockOfSpecialism.childNodes[i].style.display = "none";
                }
            } else {
                singleOption[num].className = "main__specialism_name";
                for (let i = 1; i < blockOfSpecialism.childNodes.length; i++) {
                    blockOfSpecialism.childNodes[i].style.display = "flex";
                }
            }
    });
}
