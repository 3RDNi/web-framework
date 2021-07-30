import RatingPage from '../../src/pageObjects/RatingPage';
import allureReporter from "@wdio/allure-reporter";

describe('Рейтинг лайков котиков', async () => {

    beforeEach(async () => {
        await RatingPage.open();
    });

    it('Проверка сортировки по убыванию лайков котиков в рейтинге лайков', async () => {

        await RatingPage.waitForLoaded();

        const RatingResultsSelector: any = (await RatingPage.RatingResults).selector;
        const RatingResultsByScript = await browser.execute(
            // @ts-ignore
            (selector) => [...document.querySelectorAll(selector)].map((el) => el.textContent),
            RatingResultsSelector
        );

        //Создаем и наполняем словарь для котиков из рейтинга лайков
        let mapRatingLikes = new Map();
        for (let i = 0; i < RatingResultsByScript.length/2; i+=3) {
            mapRatingLikes.set(RatingResultsByScript[i], [RatingResultsByScript[i+1], RatingResultsByScript[i+2]]);
        }

        //Проверяем, что котики в рейтинге лайков отсортированы по убыванию лайков
        const expectedResultOfSorting: boolean = true;
        let actualResultOfSorting: boolean;
        let max = 0;
        for (let i = 0; i < mapRatingLikes.size; i++) {
            const key = (i+1).toString()
            if ( mapRatingLikes.get(key)[1] >= max ) {
                actualResultOfSorting = true
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
