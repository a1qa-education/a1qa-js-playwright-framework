import { chromium } from 'playwright';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('Steam Legacy Test', function () {
    this.timeout(60000);
    it(`STEAM-TC-001 Dynamic Filtering (by Windows & by Single-player) & Ascending Price Sorting`, async function () {
        const browser = await chromium.launch({
            headless: false
        });
        const page = await browser.newPage();
        await page.goto('https://store.steampowered.com/');

        expect(await page.title()).to.not.equal(null);
        expect(await page.locator('body')).to.not.equal(null);
        expect(await page.locator('body')).to.not.equal(null);

        const search = await page.locator('//form//input[@autocomplete="off"]');

        if (search) {
            if (await search.isVisible()) {
                if (await search.isEnabled()) {
                    expect(await search.isVisible()).to.equal(true);
                    expect(await search.isEnabled()).to.equal(true);
                    expect(await search.isEditable()).to.equal(true);

                    await search.fill('strategy');

                    await search.press('Enter');
                }
            }
        }

        await page.waitForTimeout(5000);

        const windowsCheckbox = await page.locator('//span[@role="button"]//span[contains(text(),"Windows")]');

        if (windowsCheckbox) {
            await windowsCheckbox.click();
        }

        await page.waitForTimeout(3000);

        await page.locator('//div[text()="Narrow by number of players"]').click();
        const singlePlayer = await page.locator('//span[@role="button"]//span[contains(text(),"Single-player")]');

        if (singlePlayer) {
            await singlePlayer.click();
        }

        await page.waitForTimeout(3000);

        const sortDropdown = await page.locator('//button[contains(@onclick,"sort_by")]');

        await sortDropdown.click();

        await page.waitForTimeout(2000);

        const lowestPrice = await page.locator('//*[contains(text(),"Lowest Price")]');

        await lowestPrice.click();

        await page.waitForTimeout(5000);

        const prices = [];

        for (let i = 1; i <= 10; i++) {
            try {
                const priceElement = await page.locator(`//a[contains(@class,'search_result_row')][${i}]//*[contains(@class,'price')]`);
                const raw = await priceElement.textContent();
                prices.push(parseFloat(raw.replace('$', '')));
            } catch (e) {
                console.log(
                    'Ignoring error: ' + e.message
                );
            }
        }

        const expected = [...prices];

        for (let i = 0; i < expected.length; i++) {
            for (let j = 0; j < expected.length - i; j++) {
                if (expected[j] > expected[j + 1]) {
                    let tmp = expected[j];
                    expected[j] = expected[j + 1];
                    expected[j + 1] = tmp;
                }
            }
        }

        expect(prices.toString()).to.equal(expected.toString());
        await browser.close();
    })

    it(`STEAM-TC-002 Dynamic Filtering (by macOS & by Multi-player) & Descending Price Sorting`, async function () {
        const browser = await chromium.launch({
            headless: false
        });
        const page = await browser.newPage();
        await page.goto('https://store.steampowered.com/');

        expect(await page.title()).to.not.equal(null);
        expect(await page.locator('body')).to.not.equal(null);
        expect(await page.locator('body')).to.not.equal(null);

        const search = await page.locator('//form//input[@autocomplete="off"]');

        if (search) {
            if (await search.isVisible()) {
                if (await search.isEnabled()) {
                    expect(await search.isVisible()).to.equal(true);
                    expect(await search.isEnabled()).to.equal(true);
                    expect(await search.isEditable()).to.equal(true);

                    await search.fill('strategy');

                    await search.press('Enter');
                }
            }
        }

        await page.waitForTimeout(5000);

        const windowsCheckbox = await page.locator('//span[@role="button"]//span[contains(text(),"macOS")]');

        if (windowsCheckbox) {
            await windowsCheckbox.click();
        }

        await page.waitForTimeout(3000);

        await page.locator('//div[text()="Narrow by number of players"]').click()
        const singlePlayer = await page.locator('//span[@role="button"]//span[contains(text(),"Multi-player")]');

        if (singlePlayer) {
            await singlePlayer.click();
        }

        await page.waitForTimeout(3000);

        const sortDropdown = await page.locator('//button[contains(@onclick,"sort_by")]');

        await sortDropdown.click();

        await page.waitForTimeout(2000);

        const lowestPrice = await page.locator('//*[contains(text(),"Highest Price")]');

        await lowestPrice.click();

        await page.waitForTimeout(5000);

        const prices = [];

        for (let i = 1; i <= 10; i++) {
            try {
                const priceElement = await page.locator(`//a[contains(@class,'search_result_row')][${i}]//*[contains(@class,'price')]`);
                const raw = await priceElement.textContent();
                prices.push(parseFloat(raw.replace('$', '')));
            } catch (e) {
                console.log(
                    'Ignoring error: ' + e.message
                );
            }
        }

        const expected = [...prices];

        for (let i = 0; i < expected.length; i++) {
            for (let j = 0; j < expected.length - i - 1; j++) {
                if (expected[j] < expected[j + 1]) {
                    let tmp = expected[j];
                    expected[j] = expected[j + 1];
                    expected[j + 1] = tmp;
                }
            }
        }

        expect(prices.toString()).to.equal(expected.toString());
        await browser.close();
    })
/*
    // Need to exclude from run
    it(`STEAM-TC-003`, async function () {
        const browser = await chromium.launch({
            headless: false
        });
        const page = await browser.newPage();
        await page.goto('https://store.steampowered.com/');

        expect(await page.title()).to.not.equal(null);
        expect(await page.locator('body')).to.not.equal(null);
        expect(await page.locator('body')).to.not.equal(null);
    })
*/
})
