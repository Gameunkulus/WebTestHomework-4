const jestConfig = require("./jest.config");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
  testTimeout: 60000
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1', {
      waitUntil: 'load',
      setTimeout: 5000
    });
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href'), {
      waitUntil: 'load',
      setTimeout: 5000
    });
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent, {
      waitUntil: 'load',
      setTimeout: 5000
    });
    expect(actual).toContain("Sign up for free")
  });
});
