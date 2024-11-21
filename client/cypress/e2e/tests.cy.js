

import { faker } from "@faker-js/faker";

const username = faker.person.firstName() + faker.person.lastName();
const petName = faker.animal.dog();

function loginUser(cy) {
  cy.visit('/login');
  
  cy.get('input[name="email"]').type(username + '@test.com');
  cy.get('input[name="password"]').type('password123');

  cy.get('form button').click();

}

describe('Pet App Tests', () => {
  it('Should show the homepage hero', () => {
    cy.visit('/');

    cy.get('h1').contains('Petstagram');
  });

  it('should be able to navigate  show the register page', () => {
    cy.visit('/');

    cy.get('nav a[href="/register"]').click();

    cy.get('form h2').contains('Register');
  });

  it('Should register a new user', () => {
    const username = faker.person.firstName() + faker.person.lastName();

    cy.visit('/register');

    cy.get('input[name="username"]').type(username);

    cy.get('input[name="email"]').type(username + '@test.com');

    cy.get('input[name="password"]').type('password123');

    cy.get('form button').click();

    cy.get('h3').contains('Your Pets');

  });

  it('Should log in an existing user', () => {
   
    const email = username + '@test.com';
    const password = 'password123';

    // Register a new user first
    cy.visit('/register');
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('form button').click();
    cy.get('h3').contains('Your Pets');
  });

    
it('Should login a user', () => {
  loginUser(cy);

  cy.get('h3').contains('Your Pets');



  });

  it('Should log a user out', () => {
    loginUser(cy);

    cy.get('nav a').contains('Profile Menu').click();

    cy.get('nav a').contains('Log Out').click();

    cy.get('nav').should('not.contain', 'Dashboard');

    cy.get('h1').contains('Petstagram');

  });

  it('Should be able to create a pet for the logged in user', () => {
    

    loginUser(cy);

    cy.get('nav a[href="/pet"]').click();

    cy.get('input[name="name"]').type(petName);

    cy.get('input[name="type"]').type('dog');

    cy.get('input[name="age"]').type(5);

    cy.get('form button').click();

    cy.get('.pet-output').contains(petName);
  });


  it('Should add a post for a pet', () => {
    const postTitle = 'Post for ' + petName;

    loginUser(cy);

    cy.get('article').contains(petName).get('button').first().click();

    cy.get('input[name="title"]').type('Post for ' + petName);

    cy.get('textarea[name="body"]').type('Oh happy day, I gets a tweat');

    cy.get('.modal-footer button').last().click();

    cy.get('article').contains(petName).get('button').contains('View Posts').last().click();

    cy.get('.modal-body').contains(postTitle);


  });



});