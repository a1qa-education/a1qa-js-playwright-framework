// @ts-check
import { test, expect } from '#framework/ui/fixtures/browser.fixture.js';
import ConfigReader from '#framework/utils/ConfigReader.js';
import RandomUtils from '#framework/utils/RandomUtils.js';
import MainPage from './pages/MainPage.js';
import WelcomePage from './pages/WelcomePage.js';

const email = RandomUtils.getRandomAlphabeticString();
const minPasswordLength = 8;
const password = RandomUtils.generatePassword(minPasswordLength);
const domain = RandomUtils.getRandomAlphabeticString();
const domainPostfix = RandomUtils.getRandomDomain();
const numberOfInterestsToSelect = 4;

test('cards test', async ({ customBrowser: browser }) => {
  const testData = ConfigReader.getTestData();

  const welcomePage = new WelcomePage(browser.page);
  await welcomePage.clickHereToGoLink();

  const mainPage = new MainPage(browser.page);
  const signUpForm = mainPage.signUpForm;
  await signUpForm.waitForPageToLoad();
  expect(await signUpForm.isPageOpened()).toBe(true);
  await signUpForm.typePassword(password);
  await signUpForm.typeEmail(email);
  await signUpForm.typeDomain(domain);
  await signUpForm.selectDomain(domainPostfix);
  await signUpForm.acceptTermsConditionsValue();
  await signUpForm.clickNextButton();

  const interestsForm = mainPage.interestsForm;
  await interestsForm.waitForPageToLoad();
  expect(await interestsForm.isPageOpened()).toBe(true);
  await interestsForm.clickRandomInterests(numberOfInterestsToSelect);
  await browser.uploadFileWithChooser(
    () => interestsForm.clickUploadButton(),
    testData.fileForUpload
  );
  await interestsForm.clickNextButton();

  const personalDetailsForm = mainPage.personalDetailsForm;
  await personalDetailsForm.waitForPageToLoad();
  expect(await personalDetailsForm.isPageOpened()).toBe(true);
});
