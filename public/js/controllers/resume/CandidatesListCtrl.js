import CandidatesList from "../../pages/candidatesList/candidatesList.js";

export default class CandidatesListCtrl {
  constructor(router) {
    this.router = router;
    this.page = new CandidatesList(router);
  }
}
