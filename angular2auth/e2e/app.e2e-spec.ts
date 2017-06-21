import { Angular2authPage } from './app.po';

describe('angular2auth App', () => {
  let page: Angular2authPage;

  beforeEach(() => {
    page = new Angular2authPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
