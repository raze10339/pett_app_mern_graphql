describe('Pet App Tests', () => {
  it('Should show the landing page', () => {
    cy.visit('/');

    cy.get('main h1').contains('Petstagram');
  })
})