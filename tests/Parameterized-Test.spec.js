const { test, expect } = require('@playwright/test');

const testCases = [
  {
    "id": 1,
    "name": "Test Case 1",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Draft project brief",
  },
  {
    "id": 2,
    "name": "Test Case 2",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Schedule kickoff meeting",
  },
  {
    "id": 3,
    "name": "Test Case 3",
    "leftNav": "Cross-functional project plan, Project",
    "column": "To do",
    "card_title": "Share timeline with teammates",
  },
  {
    "id": 4,
    "name": "Test Case 4",
    "leftNav": "Work Requests",
    "column": "New Requests",
    "card_title": "[Example] Laptop setup for new hire",
  },
  {
    "id": 5,
    "name": "Test Case 5",
    "leftNav": "Work Requests",
    "column": "In Progress",
    "card_title": "[Example] Password not working",
  },
  {
    "id": 6,
    "name": "Test Case 6",
    "leftNav": "Work Requests",
    "column": "Completed",
    "card_title": "[Example] New keycard for Daniela V",
  }
];

let usrName = "ben+pose@workwithloop.com";
let psWord = "Password123";

test.describe('Asana Data-Driven Tests', () => {
  testCases.forEach((testCases) => {
    test(`${testCases.name}`, async ({ page }) => {
      await test.step('Login to Asana', async () => {
        // Login to Asana
        await page.goto('https://app.asana.com/-/login');
        await page.getByLabel('Email address').fill(usrName);
        await page.getByRole('button', { name: 'Continue', exact: true }).click();
        await page.getByLabel('Password', { exact: true }).fill(psWord);
        await page.getByRole('button', { name: 'Log in' }).click();
      });

      await test.step('Navigate to the project page', async () => {
        // Navigate to the project page
        test.slow();
        await page.getByLabel(`${testCases.leftNav}`).click();
      });

      await test.step('Verify the card is within the correct column', async () => {
        // Verify the card is within the correct column
        test.slow();
        const swimLane = await page.getByRole('heading', { name:`${testCases.column}` }).boundingBox(); //need to grab the container not input Field. 
        const targetElement = await page.getByText(`${testCases.card_title}`).boundingBox(); 

        const isHorizontalWithin = (
            targetElement.x >= swimLane.x && //left edge Target is within Left edge Swimlane 
            targetElement.x + targetElement.width <= swimLane.x + swimLane.width //left edge Target is within Left edge Swimlane 
          );

          const isVerticalWithin = (
            targetElement.y >= swimLane.y &&
            targetElement.y + targetElement.height <= swimLane.y + swimLane.height
          );

        expect(isHorizontalWithin).toBeTruthy();
        expect(isVerticalWithin).toBeTruthy();
        });
      
    });
  });
});
