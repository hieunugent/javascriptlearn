import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
addHandlerClick(handler){
  this._parentElement.addEventListener('click', function(e){
    const btn = e.target.closest('.btn--inline');
    if(!btn) return ;
    console.log(btn);
    const goToPage = +btn.dataset.goto;// converse the number data
    console.log(goToPage);
    handler(goToPage);
  })
}



  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // page1, and there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return ` <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }

    // last page
    if (this._data.page === numPages && numPages > 1) {
      return `<button data-goto="${
        curPage -1
      }"class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>`;
    }
    // Other page
    if (this._data.page < numPages) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          <button data-goto="${
            curPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    // page1. and there are no other pages
    return '';

    console.log(numPages);
  }
}
export default new PaginationView();
