export function preciseTextLocator(page, text) {
  return page.getByText(text, { exact: true });
}

export function partialTextLocator(page, text) {
  return page.getByText(text);
}
