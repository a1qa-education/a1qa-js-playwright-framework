export default class FrameUtils {
  constructor(page) {
    this.page = page;
  }

  /**
   * Resolve a locator inside nested frames
   * @param {string[]} frameSelectors - ordered outer → inner
   * @param {string} targetSelector
   */
  locatorInFrames(frameSelectors, targetSelector) {
    let frame = this.page;

    for (const selector of frameSelectors) {
      frame = frame.frameLocator(selector);
    }

    return frame.locator(targetSelector);
  }

  async getText(frameSelectors, targetSelector) {
    const locator = this.locatorInFrames(frameSelectors, targetSelector);
    await locator.waitFor({ state: 'attached' });
    return await locator.innerText();
  }
}
