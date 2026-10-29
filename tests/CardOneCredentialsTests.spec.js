// @ts-check
import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import ConfigReader from '#framework/utils/ConfigReader.js';
import MainPage from './pages/MainPage.js';

const firstCardPageIndicatorText = "1 / 4";
const secondCardPageIndicatorText = "2 / 4";

test('Check password policy compliance', async ({ customBrowser: browser }) => {
  const testData = ConfigReader.getTestData();

  const mainPage = new MainPage(browser.page);
  const signUpForm = mainPage.signUpForm;
  await signUpForm.waitForPageToLoad();
  expect(await signUpForm.isPageOpened()).toBe(true);
  expect(await signUpForm.getPageIndicatorText()).toBe(firstCardPageIndicatorText);
  await signUpForm.typePassword(testData.firstPassword);
  await signUpForm.typeEmail(testData.emailName);
  await signUpForm.typeDomain(testData.emailDomain);
  await signUpForm.selectDomain(testData.emailExtension);
  await signUpForm.acceptTermsConditionsValue();
  await signUpForm.clickNextButton();

  const interestsForm = mainPage.interestsForm;
  expect(await interestsForm.getPageIndicatorText()).toBe(secondCardPageIndicatorText);
  expect(await interestsForm.isPageOpened()).toBe(true);
});

test('Check email domain extensions', async ({ customBrowser: browser }) => {
  const emailExtensions = ['.org', '.co.uk', '.net', '.gov', '.de', '.fr', '.nl', '.com', '.be', '.jpg'];
  const testData = ConfigReader.getTestData();

  const mainPage = new MainPage(browser.page);
  const signUpForm = mainPage.signUpForm;
  const interestsForm = mainPage.interestsForm;

  for(const emailExtension of emailExtensions) {
    await signUpForm.waitForPageToLoad();
    expect(await signUpForm.isPageOpened()).toBe(true);
    expect(await signUpForm.getPageIndicatorText()).toBe(firstCardPageIndicatorText);
    await signUpForm.typePassword(testData.secondPassword);
    await signUpForm.typeEmail(testData.emailName);
    await signUpForm.typeDomain(testData.emailDomain);
    await signUpForm.selectDomain(emailExtension);
    await signUpForm.acceptTermsConditionsValue();
    await signUpForm.clickNextButton();

    await interestsForm.waitForPageToLoad();
    expect(await interestsForm.isPageOpened()).toBe(true);
    expect(await interestsForm.getPageIndicatorText()).toBe(secondCardPageIndicatorText);
    await browser.refresh();
  }
});
