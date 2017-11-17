import { OkpdmarketWebPage } from './app.po';

describe('okpdmarket-web App', function() {
  let page: OkpdmarketWebPage;

  beforeEach(() => {
    page = new OkpdmarketWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
