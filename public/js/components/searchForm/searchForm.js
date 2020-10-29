
export function checkBoxes() {
    const singleOption = document.getElementsByClassName('main__specialism_name');

    for (let num = 0; num < singleOption.length; num++)
        singleOption[num].addEventListener('click', () => {
            console.log("lel");
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
