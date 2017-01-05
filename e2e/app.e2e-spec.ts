import { Ng2RestPage } from './app.po';

describe('ng2-rest App', function() {
  let page: Ng2RestPage;

  beforeEach(() => {
    page = new Ng2RestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
