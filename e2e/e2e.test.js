import puppeteer from 'puppeteer';

jest.setTimeout(50000);

describe('popover', () => {
  const baseUrl = 'http://localhost:9000';
  let browser;
  let page;

  beforeEach(async () => {
    try {
      browser = await puppeteer.launch({
        headless: false,
        slowMo: 100,
        devtools: true,
      });
    } catch (e) {
      console.error(e);
    }

    page = await browser.newPage();
  });

  test('should add .popover-message_visible', async () => {
    await page.goto(baseUrl);
    const container = await page.$('#popover-container');
    const btn = await container.$('.btn');
    btn.click();
    await page.waitForSelector('.popover-message_visible');
  });

  test('should add .product-row for valid data', async () => {
    await page.goto(baseUrl);
    const editor = await page.$('#editor-container');
    const addBtn = await editor.$('[data-id="add"]');
    addBtn.click();

    const form = await editor.$('#editor-form');
    const btn = await form.$('[data-toggle="editor-add"]');
    const inputName = await form.$('[data-id="name"]');
    const inputCost = await form.$('[data-id="cost"]');
    await inputName.type('cat');
    await inputCost.type('50');

    btn.click();
    await editor.waitForSelector('.product-row');
  });

  test('should initialize Editor correctly', async () => {
    await page.goto(baseUrl);
    const container = await page.$('#editor-container');
    expect(container).not.toBeNull();
    const table = await container.$('.table');
    expect(table).not.toBeNull();
    const deleteMessageDiv = await container.$('.delete-message');
    expect(deleteMessageDiv).not.toBeNull();
  });

  test('should render UI correctly via drawUi', async () => {
    await page.goto(baseUrl);
    const table = await page.$('.table');
    expect(table).not.toBeNull();
    const deleteMessageDiv = await page.$('.delete-message');
    expect(deleteMessageDiv).not.toBeNull();
  });

  test('should show form', async () => {
    await page.goto(baseUrl);
    const deleteBtn = await page.$('.add');
    await deleteBtn.click();
    await page.waitForSelector('.editor-form-container_visible');
  });

  afterEach(async () => {
    if (browser) {
      await browser.close();
    }
  });
});
