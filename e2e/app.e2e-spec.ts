import { GoLjsPage } from './app.po';

describe('go-ljs App', function() {
  let page: GoLjsPage;

  beforeEach(() => {
    page = new GoLjsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
