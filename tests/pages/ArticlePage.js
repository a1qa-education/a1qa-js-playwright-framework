import BasePage from "#framework/ui/page/BasePage.js";
import { Button, Label } from "#framework/ui/elements/index.js";

export default class ArticlePage extends BasePage {
  constructor(page) {
    super(new Label(page.locator('//h1'), 'Article page unique element'), 'Article Page');
    this.page = page
    this.downloadAsPdfButton = page.locator('a[title="Download this page as a PDF file"]')
  }

  async clickToolsMenuButton() {
    await this.page.locator('//div[@id="right-navigation"]//div[@class="vector-dropdown vector-page-tools-dropdown"]//input').click();
  }

  async clickDownloadAsPdfButton() {
    await this.downloadAsPdfButton.click()
  }
}
