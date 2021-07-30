import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class RatingPage extends Page {
    get RatingResults() {
        return browser.$$('div .rating-names_table__Jr5Mf > tbody > tr > td');
    }

    open() {
        return super.open(`rating`);
    }

    waitForLoaded() {
        super.waitForLoaded();
        return browser.waitUntil(async () => {
            return (await this.RatingResults).length > 0;
        });
    }
}

export default new RatingPage('Страница рейтинга');

