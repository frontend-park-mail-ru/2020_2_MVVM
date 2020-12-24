import createElem from "Js/libs/createElem";
import searchJobTemp from "Js/pages/mainPage/components/searchJob/searchJob.tmpl.xml";
import categoryTemp from "Js/pages/mainPage/components/category/category.tmpl.xml";
import goToCreateResumeTemp from "Js/pages/mainPage/components/createResume/goToCreateResume.tmpl.xml";
import {iconClassSpheres, spheres} from "Js/libs/constants";


const app = window.document.getElementById("main");

export default class MainPage {
  constructor(router, searchDataF, getSpheresF, searchSphereF) {
    this.router = router;
    this.searchData = searchDataF;
    this.getSpheres = getSpheresF;
    this.searchSphere = searchSphereF;
  }

  async render() {
    app.innerHTML = "";

    const topSpheresInfo = await this.getSpheres();
    let category = [];
    let tmpMass = [];

    const mainPage = createElem("div", "main-page", app);
    mainPage.insertAdjacentHTML(
      "afterbegin",
      searchJobTemp("Самый простой способ найти новую работу")
    );

    const searchBtn = document.getElementById("searchBtn");
    searchBtn.addEventListener("click", () => {
      const searchJob = document.getElementById("searchJob");
      const searchPlace = document.getElementById("searchPlace");
      this.searchData({
        keywords: searchJob.value,
        keywordsGeo: searchPlace.value,
      });
    });

    // spheres.forEach((item, i)=>{
    //   tmpMass.push({
    //             name: item,
    //             count: i,
    //             iconCLass: iconClassSpheres[i]
    //           });
    // })
    // category.push(tmpMass);

    if (topSpheresInfo) {
      topSpheresInfo.top_spheres.forEach((item, i) => {
        const j = i + 1;
        if (j % 3 === 0) {
          tmpMass.push({
            name: spheres[item.sphere_idx],
            count: item.sph_vac_cnt,
            iconCLass: iconClassSpheres[item.sphere_idx]
          });
          category.push(tmpMass);
          tmpMass = [];
        } else {
          tmpMass.push({
            name: spheres[item.sphere_idx],
            count: item.sph_vac_cnt,
            iconCLass: iconClassSpheres[item.sphere_idx]
          });
        }
      });
      category.push(tmpMass);
    }

    const allVacCnt = topSpheresInfo ? topSpheresInfo.all_vac_cnt : 0;
    const newVacCnt = topSpheresInfo ? topSpheresInfo.new_vac_cnt : 0;
    mainPage.insertAdjacentHTML("beforeend", categoryTemp({category: category, countRows: category.length, allVacCnt: allVacCnt, newVacCnt: newVacCnt}));

    const sphereNode = document.getElementsByClassName("category-sec-row");
    for (let i = 0; i < sphereNode.length; i++) {
      sphereNode[i].addEventListener("click", () => {
        this.searchSphere({ sphere: [topSpheresInfo.top_spheres[i].sphere_idx] });
      });
    }

    if (category.length > 2) {
      const categoryBtn = document.getElementById("categoryBtn");
      categoryBtn.addEventListener("click", () => {
        const categoryGrid = document.getElementById("categoryGrid").childNodes;
        categoryGrid.forEach((item, i) => {
          if (i > 1) {
            item.classList.toggle("hide");
          }
        });
        categoryBtn.textContent =
          categoryBtn.textContent === "Показать больше категорий"
            ? "Скрыть часть категорий"
            : "Показать больше категорий";
      });
    }


    mainPage.insertAdjacentHTML(
      "beforeend",
      goToCreateResumeTemp(localStorage.getItem("user_type"))
    );

    // const jobs = [
    //     {
    //         position: 'Web Designer / Developer',
    //         nameCompany: 'Massimo Artemisis',
    //         logo: 'img/l1.png',
    //         location: 'Sacramento, California',
    //         schedule: 'Full time',
    //         durationPublic: '5 месяцев назад',
    //     },
    //     {
    //         position: 'C Developer (Senior) C .Net',
    //         nameCompany: 'Massimo Artemisis',
    //         logo: 'img/l2.png',
    //         location: 'Sacramento, California',
    //         schedule: 'Full time',
    //         durationPublic: '5 месяцев назад',
    //     },
    // ]
    // main.insertAdjacentHTML("beforeend", popularJobTemp(jobs));

    // app.insertAdjacentHTML("beforeend", footerTemp());
  }
}
