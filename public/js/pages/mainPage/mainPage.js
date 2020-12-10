import createElem from "Js/libs/createElem";
import searchJobTemp from "Js/pages/mainPage/components/searchJob/searchJob.tmpl.xml";
import categoryTemp from "Js/pages/mainPage/components/category/category.tmpl.xml";
import createResumeTemp from "Js/pages/mainPage/components/createResume/createResume.tmpl.xml";
import {spheres} from "Js/libs/constants";

import categoryGridTemp from 'Js/pages/mainPage/components/category/categoryGrid.tmpl.xml';

const app = window.document.getElementById("main");

export default class MainPage {
  constructor(router, searchDataF, getSpheresF,searchSphereF) {
    this.router = router;
    this.searchData = searchDataF;
    this.getSpheres = getSpheresF;
    this.searchSphere = searchSphereF;
  }

  async render() {

    app.innerHTML='';

    const mainPage = createElem("div", "main-page", app);
    mainPage.insertAdjacentHTML(
      "afterbegin",
      searchJobTemp("Самый простой способ найти новую работу")
    );


    const searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener('click', () => {
      const searchJob = document.getElementById('searchJob');
      const searchPlace = document.getElementById('searchPlace');
      this.searchData({keywords: searchJob.value, keywordsGeo: searchPlace.value});
    })

    const topSpheres = await this.getSpheres();
    let category = [];
    let tmpMass = [];


    topSpheres.top_spheres.forEach((item, i)=>{
      const j = i+1;
      if (j%3===0 ) {
        tmpMass.push({name: spheres[item.sphere_idx], count: item.vac_cnt});
        category.push(tmpMass);
        tmpMass = [];
      } else {
        tmpMass.push({name: spheres[item.sphere_idx], count: item.vac_cnt});
      }
    });
    category.push(tmpMass);



    mainPage.insertAdjacentHTML("beforeend", categoryTemp({category: category, countRows: category.length}));
    mainPage.insertAdjacentHTML(
      "beforeend",
      createResumeTemp(localStorage.getItem("user_type"))
    );

    const sphereNode = document.getElementsByClassName('category-sec-row');
    for (let i=0; i<sphereNode.length; i++) {
      sphereNode[i].addEventListener('click', ()=>{
        this.searchSphere({sphere: [topSpheres.top_spheres[i].sphere_idx]});
      })
    }



    const categoryBtn = document.getElementById('categoryBtn');
    categoryBtn.addEventListener('click', ()=>{
      const categoryGrid = document.getElementById('categoryGrid').childNodes;
        categoryGrid.forEach((item, i) => {
          if (i > 1) {
            item.classList.toggle('hide');
          }
        });
      categoryBtn.textContent = categoryBtn.textContent === 'Показать больше категорий' ? 'Скрыть часть категорий' : 'Показать больше категорий';
     });





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
