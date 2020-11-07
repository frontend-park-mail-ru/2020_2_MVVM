import recJobsTemp from './recentJobs.tmpl.xml'

export function recentJobs (parent) {
    const jobs = [
        {
            position: 'Web Designer / Developer',
            nameCompany: 'Massimo Artemisis',
            logo: 'img/l1.png',
            location: 'Sacramento, California',
            schedule: 'Full time',
            durationPublic: '5 месяцев назад',
        },
        {
            position: 'C Developer (Senior) C .Net',
            nameCompany: 'Massimo Artemisis',
            logo: 'img/l2.png',
            location: 'Sacramento, California',
            schedule: 'Full time',
            durationPublic: '5 месяцев назад',
        },
    ]

    parent.insertAdjacentHTML("beforeend", recJobsTemp(jobs));
}
