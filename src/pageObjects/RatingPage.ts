import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class RatingPage extends Page {
    get RatingTable() {
        return browser.$$('td[class*=\'rating-names_item\']');
    }

    get LikeCounters() {
        return browser.$('//td[.//*[contains(@data-icon,"thumbs-up")]]');
    }

    open() {
        return super.open(`rating`);
    }

    waitForLoaded() {
        super.waitForLoaded();
        return browser.waitUntil(async () => {
            return (await this.RatingTable).length > 0;
        });
    }
}

export default new RatingPage('Страница рейтинга');

