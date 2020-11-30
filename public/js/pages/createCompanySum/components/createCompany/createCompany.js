export function selectCheckbox() {
  let expanded = false;
  const checkbox = document.getElementById("selectBox");

  checkbox.addEventListener("click", () => {
    let checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
      checkboxes.style.display = "block";
      expanded = true;
    } else {
      checkboxes.style.display = "none";
      expanded = false;
    }
  });
}


