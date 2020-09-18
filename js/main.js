const eventTreatment = (source, template, content) => {
    if (!source || !template || !content) {
        return;
    }
    source.addEventListener("click", () => {
        const newDiv = document.createElement("div");
        newDiv.innerHTML = document.getElementById(content).innerHTML;
        template.appendChild(newDiv);
    })
}

eventTreatment(document.getElementById("rb1"), document.getElementById("pos1"), "template1")
eventTreatment(document.getElementById("exp-need"), document.getElementById("exp-row-start"), "template2")