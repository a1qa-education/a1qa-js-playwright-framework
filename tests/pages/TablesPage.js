import BasePage from "#framework/ui/page/BasePage.js";
import { Label } from '#framework/ui/elements/index.js';
import { ElementsList } from '#framework/ui/elements/helpers/ElementsList.js';

export default class TablesPage extends BasePage {
  constructor(page) {
    // Change call of super() constructor to approriate one
    super();

    this.dueCells = new ElementsList(
        page.locator('#table1 td:nth-child(4)'),
        'Due column cells',
        Label
    );
  }

  async getDueColumnValues() {
    return await this.dueCells.getAllTexts();
  }
}
