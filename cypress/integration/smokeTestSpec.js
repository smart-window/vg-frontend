
// CYPRESS_BASE_URL=http://localhost:8080 CYPRESS_USER_PASSWORD=nothtepassword yarn run cypress open
describe('Smoke Test', () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
    cy.visit('/');
    cy.get('[id="okta-signin-username"]').type(
      'testautomation@velocityglobal.com'
    );
    // set password with env var export CYPRESS_USER_PASSWORD=notthepassword
    cy.get('[id="okta-signin-password"]').type(Cypress.env('USER_PASSWORD'));
    cy.get('[id="okta-signin-submit"]').click();
    // wait for redirects to resolve by getting the "profile name"
    expect(cy.get('span[aria-label="Test Automation"]', { timeout: 5000 })).to
      .exist;
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('can visit time-tracking', () => {
    cy.visit('/time-tracking');
  });

  it('can see all of the nav items', () => {
    cy.visit('/home');

    expect(cy.get('span[aria-label="Home"]')).to.exist;
    expect(cy.get('span[aria-label="Case Management"]')).to.exist;
    expect(cy.get('span[aria-label="Reports"]')).to.exist;
    expect(cy.get('span[aria-label="Employee Reporting"]')).to.exist;
    expect(cy.get('span[aria-label="Tags"]')).to.exist;
    expect(cy.get('span[aria-label="Calendars"]')).to.exist;
    expect(cy.get('span[aria-label="Payroll Calendars"]')).to.exist;
    expect(cy.get('span[aria-label="Countries"]')).to.exist;
    expect(cy.get('span[aria-label="PTO Accrual Policies"]')).to.exist;
    expect(cy.get('span[aria-label="Document Management"]')).to.exist;
    expect(cy.get('span[aria-label="Unit Management"]')).to.exist;
    // expect(cy.get('span[aria-label="Employment Training"]')).to.exist;
  });
});
