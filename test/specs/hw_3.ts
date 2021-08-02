import RatingPage from '../../src/pageObjects/RatingPage';
import allureReporter from "@wdio/allure-reporter";
import SearchPage from "../../src/pageObjects/SearchPage";

describe('Рейтинг лайков котиков', async () => {

    beforeEach(async () => {
        await RatingPage.open();
    });

    it('Проверка сортировки по убыванию лайков котиков в рейтинге лайков', async () => {

        await RatingPage.waitForLoaded();

        /*const RatingResultsSelector: any = (await RatingPage.RatingTable).selector;
        const RatingResultsByScript = await browser.execute(
            // @ts-ignore
            (selector) => [...document.querySelectorAll(selector)].map((el) => el.textContent),
            RatingResultsSelector
        );*/

        //Получаем массив лайков
        //const LikeCountersSelector = (await RatingPage.LikeCounters).selector
        const arrayOfLikes = await browser.execute(() => {
            // @ts-ignore
            const xPathResult = document.evaluate('//td[.//*[contains(@data-icon,"thumbs-up")]]', document, null, XPathResult.ANY_TYPE, null);
            const arrayOfLikes = [];
            let node = xPathResult.iterateNext();
            while (node) {
                arrayOfLikes.push(Number.parseInt(node.textContent));
                node = xPathResult.iterateNext();
            }
            return arrayOfLikes;
        });

        //Проверяем, что котики в рейтинге лайков отсортированы по убыванию лайков
        const expectedResultOfSorting: boolean = true;
        let actualResultOfSorting: boolean = true;
        for (let i = 0; i < arrayOfLikes.length - 1; i++) {
            if ( arrayOfLikes[i] >= arrayOfLikes[i+1]) {
                continue
            } else {
                actualResultOfSorting = false
            }
        }

        allureReporter.startStep('Проверка сортировки котиков в рейтинге лайков');
        allureReporter.addAttachment('Ожидаемое значение', expectedResultOfSorting.toString(), 'text/plain');
        allureReporter.addAttachment('Фактическое значение', actualResultOfSorting.toString(), 'text/plain')
        expect(expectedResultOfSorting).toEqual(actualResultOfSorting);
        allureReporter.endStep();
    });
});
