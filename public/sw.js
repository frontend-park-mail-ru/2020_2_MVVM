const cacheName = 'myCache';
let {assets} = global.serviceWorkerOption;
const cacheUrls = [
    '/',
    '/css/general.css',
    '/controllers/CompanyCtrl.js',
    '/controllers/RegCtrl.js',
    '/controllers/CreateCompanyCtrl.js',
    '/controllers/ResumeCtrl.js',
    '/controllers/AuthCtrl.js',
    '/controllers/EmployersListCtrl.js',
    '/controllers/ProfileCtrl.js',
    '/controllers/MainCtrl.js',
    '/controllers/CreateResumeCtrl.js',
    '/controllers/VacancyCtrl.js',
    '/controllers/UpdateResumeCtrl.js',
    '/controllers/CandidatesListCtrl.js',
    '/controllers/CreateVacancyCtrl.js',
    '/controllers/LogoutCtrl.js',
    '/components/rightColumn/contactForm.js',
    '/components/rightColumn/jobOverview.tmpl.js',
    '/components/rightColumn/jobOverview.tmpl.xml',
    '/components/rightColumn/jobOverview.js',
    '/components/rightColumn/jobOverview.css',
    '/components/rightColumn/contactForm.tmpl.xml',
    '/components/rightColumn/contactForm.tmpl.js',
    '/components/footer/footer.tmpl.xml',
    '/components/footer/footer.tmpl.js',
    '/components/footer/footer.css',
    '/components/footer/footer.js',
    '/components/popUpResume/endWorkField/endWorkField.tmpl.js',
    '/components/popUpResume/endWorkField/endWorkField.tmpl.xml',
    '/components/popUpResume/popUpCand/popUpCand.tmpl.xml',
    '/components/popUpResume/popUpCand/createOneJob.js',
    '/components/popUpResume/popUpCand/popUpCand.tmpl.js',
    '/components/popUpResume/popUpCand/popUpCand.css',
    '/components/popUpResume/jobBoard/jobBoard.css',
    '/components/popUpResume/jobBoard/jobBoard.tmpl.js',
    '/components/popUpResume/jobBoard/jobBoard.tmpl.xml',
    '/components/popUpResume/jobBoard/jobBoard.js',
    '/components/searchForm/searchForm.css',
    '/components/searchForm/searchForm.tmpl.xml',
    '/components/searchForm/searchForm.js',
    '/components/searchForm/searchForm.tmpl.js',
    '/components/shareBar/shareBar.js',
    '/components/shareBar/shareBar.css',
    '/components/shareBar/shareBar.tmpl.js',
    '/components/shareBar/shareBar.tmpl.xml',
    '/components/header/sNavBar/sNavBar.tmpl.xml',
    '/components/header/sNavBar/sNavBar.tmpl.js',
    '/components/header/bNavBar/bNavBar.tmpl.js',
    '/components/header/bNavBar/bNavBar.tmpl.xml',
    '/components/header/navigation/navigation.tmpl.xml',
    '/components/header/navigation/navigation.tmpl.js',
    '/components/header/navBar.js',
    '/components/header/navBar.css',
    '/components/pagination/pagination.tmpl.js',
    '/components/pagination/pagination.css',
    '/components/pagination/pagination.tmpl.xml',
    '/components/pagination/pagination.js',
    '/app.js',
    '/pages/createCandidateSum/components/createCandidateSum/createCandidateSum.tmpl.xml',
    '/pages/createCandidateSum/components/createCandidateSum/createCandidateSum.tmpl.js',
    '/pages/createCandidateSum/components/createCandidateSum/createCandidateSum.css',
    '/pages/createCandidateSum/components/createCandidateSum/createCandidateSum.js',
    '/pages/createCandidateSum/createCandidateSum.js',
    '/pages/reg/components/reg_form/reg.tmpl.xml',
    '/pages/reg/components/reg_form/reg.js',
    '/pages/reg/components/reg_form/reg.css',
    '/pages/reg/components/reg_form/reg.tmpl.js',
    '/pages/reg/reg.js',
    '/pages/candidatesList/components/listOfCandidates/listOfCandidates.js',
    '/pages/candidatesList/components/listOfCandidates/listOfCandidates.tmpl.xml',
    '/pages/candidatesList/components/listOfCandidates/listOfCandidates.css',
    '/pages/candidatesList/components/listOfCandidates/listOfCandidates.tmpl.js',
    '/pages/candidatesList/candidatesList.js',
    '/pages/profile/components/listOfResumes/persResumes.tmpl.js',
    '/pages/profile/components/listOfResumes/persResumes.css',
    '/pages/profile/components/listOfResumes/persResumes.tmpl.xml',
    '/pages/profile/components/personalNavBar/persNavBar.tmpl.js',
    '/pages/profile/components/personalNavBar/persNavBar.js',
    '/pages/profile/components/personalNavBar/persNavBar.tmpl.xml',
    '/pages/profile/components/checkboxSearch/checkBoxJob.tmpl.js',
    '/pages/profile/components/checkboxSearch/checkBoxJob.css',
    '/pages/profile/components/checkboxSearch/checkBoxJob.tmpl.xml',
    '/pages/profile/components/checkboxSearch/checkBox.js',
    '/pages/profile/components/personalInfo/persInfo.css',
    '/pages/profile/components/personalInfo/persInfo.tmpl.xml',
    '/pages/profile/components/personalInfo/persInfo.js',
    '/pages/profile/components/personalInfo/persInfo.tmpl.js',
    '/pages/profile/profile.js',
    '/pages/company/components/companyPage/company.css',
    '/pages/company/components/companyPage/companyPage.tmpl.js',
    '/pages/company/components/companyPage/companyPage.tmpl.xml',
    '/pages/company/company.js',
    '/pages/employersList/components/listOfEmployers/listOfEmployers.js',
    '/pages/employersList/components/listOfEmployers/listOfEmployers.tmpl.js',
    '/pages/employersList/components/listOfEmployers/listOfEmployers.css',
    '/pages/employersList/components/listOfEmployers/listOfEmployers.tmpl.xml',
    '/pages/employersList/employersList.js',
    '/pages/updateResume/components/updateResume/updateResume.tmpl.xml',
    '/pages/updateResume/components/updateResume/updateResume.tmpl.js',
    '/pages/updateResume/updateResume.js',
    '/pages/resume/components/briefInfo/briefInfo.tmpl.js',
    '/pages/resume/components/briefInfo/briefInfo.css',
    '/pages/resume/components/briefInfo/briefInfo.tmpl.xml',
    '/pages/resume/components/briefInfo/briefInfo.js',
    '/pages/resume/components/resume/resume.tmpl.js',
    '/pages/resume/components/resume/resume.css',
    '/pages/resume/components/resume/resume.tmpl.xml',
    '/pages/resume/components/resume/resume.js',
    '/pages/resume/components/contact/contact.js',
    '/pages/resume/components/contact/contact.css',
    '/pages/resume/components/contact/contact.tmpl.xml',
    '/pages/resume/components/contact/contact.tmpl.js',
    '/pages/resume/resume.js',
    '/pages/createCompanySum/components/createCompany/createCompany.tmpl.js',
    '/pages/createCompanySum/components/createCompany/createCompany.tmpl.xml',
    '/pages/createCompanySum/components/createCompany/createCompany.js',
    '/pages/createCompanySum/components/createCompany/createCompany.css',
    '/pages/createCompanySum/createCompany.js',
    '/pages/createEmployerSum/components/createEmployerSum/createEmpoyerSum.js',
    '/pages/createEmployerSum/components/createEmployerSum/createEmployerSum.tmpl.js',
    '/pages/createEmployerSum/components/createEmployerSum/createEmployerSum.tmpl.xml',
    '/pages/createEmployerSum/createEmployerSum.js',
    '/pages/mainPage/components/popularJob/popularJob.js',
    '/pages/mainPage/components/popularJob/popularJob.tmpl.js',
    '/pages/mainPage/components/popularJob/popularJob.tmpl.xml',
    '/pages/mainPage/components/popularJob/popularJob.css',
    '/pages/mainPage/components/searchJob/searchJob.css',
    '/pages/mainPage/components/searchJob/searchJob.js',
    '/pages/mainPage/components/searchJob/searchJob.tmpl.js',
    '/pages/mainPage/components/searchJob/searchJob.tmpl.xml',
    '/pages/mainPage/components/category/category.tmpl.xml',
    '/pages/mainPage/components/category/category.js',
    '/pages/mainPage/components/category/category.css',
    '/pages/mainPage/components/category/category.tmpl.js',
    '/pages/mainPage/components/createResume/createResume.css',
    '/pages/mainPage/components/createResume/createResume.tmpl.xml',
    '/pages/mainPage/components/createResume/createResume.js',
    '/pages/mainPage/components/createResume/createResume.tmpl.js',
    '/pages/mainPage/components/gratitudes/gratitudes.tmpl.js',
    '/pages/mainPage/components/gratitudes/gratitudes.js',
    '/pages/mainPage/components/gratitudes/gratitudes.tmpl.xml',
    '/pages/mainPage/components/gratitudes/gratitudes.css',
    '/pages/mainPage/components/mainPage/mainPage.tmpl.xml',
    '/pages/mainPage/components/mainPage/mainPage.tmpl.js',
    '/pages/mainPage/components/mainPage/mainPage.js',
    '/pages/mainPage/components/mainPage/mainPage.css',
    '/pages/mainPage/mainPage.js',
    '/pages/auth/components/auth_form/auth.tmpl.xml',
    '/pages/auth/components/auth_form/auth.tmpl.js',
    '/pages/auth/components/auth_form/auth.css',
    '/pages/auth/components/auth_form/auth.js',
    '/pages/auth/auth.js',
    '/pages/vacancy/components/briefInfoJob/briefInfoJob.js',
    '/pages/vacancy/components/briefInfoJob/briefInfoJob.tmpl.xml',
    '/pages/vacancy/components/briefInfoJob/briefInfoJob.tmpl.js',
    '/pages/vacancy/components/briefInfoJob/briefInfoJob.css',
    '/pages/vacancy/components/recentJobs/recentJobs.css',
    '/pages/vacancy/components/recentJobs/recentJobs.tmpl.js',
    '/pages/vacancy/components/recentJobs/recentJobs.tmpl.xml',
    '/pages/vacancy/components/recentJobs/resentJobs.js',
    '/pages/vacancy/components/vacancy/vacancy.tmpl.xml',
    '/pages/vacancy/components/vacancy/vacancy.css',
    '/pages/vacancy/components/vacancy/vacancy.js',
    '/pages/vacancy/components/vacancy/vacancy.tmpl.js',
    '/pages/vacancy/vacancy.js',
    '/libs/eventBus.js',
    '/libs/validation.js',
    '/libs/createElem.js',
    '/libs/router.js',
    '/libs/networks.js',
    '/libs/constants.js',
    '/img/logo-mail.png',
    '/img/mslider1.jpg',
    '/img/em1.jpg',
    '/img/logo.png',
    '/img/p2.jpg',
    '/img/prev.png',
    '/img/login.png',
    '/img/profile.jpg',
    '/img/search1.svg',
    '/img/es1.jpg',
    '/img/sj.png',
    '/img/bmstuNight.jpg',
    '/img/p1.jpg',
    '/img/l1.png',
    '/img/profile.png',
    '/img/plus.png',
    '/img/next.png',
    '/img/geo.png',
    '/img/employer.jpg',
    '/img/candidate.jpg',
    '/img/r1.jpg',
    '/img/bmstuBuilding1.png',
    '/img/office.jpg',
    '/img/geo1.png',
    '/img/key.png',
    '/img/minus.png',
    '/img/search.png',
    '/img/l2.png',
    '/index.html',

];
//
// this.addEventListener('install', (event) => {
//     event.waitUntil(
//         caches.open(cacheName)
//             .then((cache) => {
//                 cache.addAll(cacheUrls);
//                 console.log("-----------")
//                 console.log(cache.keys());
//                 return cache;
//             })
//             .catch((err) => {
//                 console.error('smth went wrong with caches.open: ', err);
//             })
//     );
// });
//
// this.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.open(cacheName).then((cache) =>
//         cache.match(event.request)
//             .then((cachedResponse) => {
//                 if (cachedResponse && !navigator.onLine) {
//                     return cachedResponse;
//                 }
//
//                 return fetch(event.request);
//                     // .then((response) => {
//                     //     return caches.open(cacheName).then((cache) => {
//                     //         if(!event.request.url.includes('/api/')){
//                     //             cache.put(event.request.url, response.clone());
//                     //         }
//                     //         return response;
//                     //     });
//                     // });
//             }))
//             .catch((err) => {
//                 console.error('smth went wrong with caches.match: ', err);
//             })
//     );
// });

self.addEventListener('install', (event) => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(cacheName)
            .then((cache) => (cache.addAll(cacheUrls
            //     [
            //     '/dist/bundle.js',
            //     '/dist/style.css',
            //     '/dist/index.html',
            //     '/static/fallback.html',
            //     '/static/img/favicon-play.ico',
            // ]

            )))
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service worker activated!');
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (!navigator.onLine && cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request)
                    .then((response) => caches
                        .open(cacheName)
                        .then((cache) => {
                            if (event.request.method === 'GET') {
                                cache.put(event.request, response.clone());
                            }
                            return response;
                        }))
                    .catch((err) => {
                        console.error('smth went wrong with caches.match: ', err);
                        // if (event.request.mode === 'navigate') {
                            // return caches.match('/static/fallback.html');

                        // }
                    });
            })
    );
});