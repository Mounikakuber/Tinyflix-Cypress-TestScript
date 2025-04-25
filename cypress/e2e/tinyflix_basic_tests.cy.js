describe('issue to access and click the Sign Up button', () => {
  it('should load the homepage and show the sign up', () => {
    cy.visit('http://localhost:5173/');
    cy.wait(4000);
    cy.contains('TinyFlix')
    cy.contains('button', 'Sign Up').click();
    cy.get('button.btn.btn-primary').click();

    cy.wait(4000);
  });

});

//----------------------------------
describe('TinyFlix - Filter by Popular using specific selector', () => {
  it('should filter videos by Popular when selected from the dropdown', () => {
    cy.visit('http://localhost:5173/');
    cy.wait(1000);

    // Use the provided CSS selector to select the dropdown
    cy.get('#root > div > main > div > div.search-filters > div.filter-controls > select:nth-child(1)')
      .select('Popular');

    cy.wait(4000);
  });
 
});
//--------------------------------------
describe('TinyFlix - Search Functionality', () => {
  it('should show videos related to "React Basic" when searched', () => {
    cy.visit('http://localhost:5173/');
    cy.wait(1000);

    // Type "React Basic" into the search box
    cy.get('input[placeholder="Search videos, tags, or descriptions"]')
      .clear()
      .type('React Basic');

    cy.wait(4000);
  });

});
//-------------------------------
describe('TinyFlix - Filter by Sort by Rating using specific selector', () => {
  it('should sort video by  Rating', () => {
    cy.visit('http://localhost:5173/');
    cy.wait(1000);

    // Use the provided CSS selector to select the dropdown
    cy.get('#root > div > main > div > div.search-filters > div.filter-controls > select:nth-child(2)')
      .select('Sort by Rating');

      cy.wait(4000);
  });
});
//------------------------------
describe('TinyFlix - Video Open on Double Click', () => {
  it('should open Advanced React video on double click', () => {
    cy.visit('http://localhost:5173/');
    cy.wait(1000);

    // Double-click the video card using its aria-label
    cy.get('[aria-label="Advanced React - 15:45 - 2.3K views views"]').dblclick();

    // Assert that the video player appears
    cy.get('video').should('exist');
    cy.wait(4000);
  });
 
});

//--------------------------
describe('TinyFlix - Video Open and Bookmark on Double Click', () => {
  it('should open Intro to Testing video and bookmark it on double click', () => {
    cy.visit('http://localhost:5173/');
    cy.wait(1000);

    // Double-click the video card to open the video
    cy.get('[aria-label="Intro to Testing - 12:20 - 1.8K views views"]').dblclick();

    // Assert that the video player appears
    cy.get('video').should('exist');

    // Double-click the bookmark button to bookmark it
    cy.get('[aria-label="Bookmark Intro to Testing"]').dblclick();
    cy.wait(4000);
  });
  
});

//-----------------------
describe('TinyFlix - Video Open, Comment and Post', () => {
  it('should open Advanced React video, type a comment, and post it', () => {
    cy.visit('http://localhost:5173/');
    cy.wait(1000);

    // Double-click the video card to open the video
    cy.get('[aria-label="Advanced React - 15:45 - 2.3K views views"]').dblclick();

    // Assert that the video player appears
    cy.get('video').should('exist');

    // Optional: confirm the video title is shown
    cy.contains('Advanced React');
      cy.wait(1000);
    // Type a comment into the textarea
    cy.get('textarea[aria-label="Comment text"]').type('good');

    // Click the "Post Comment" button
    cy.get('button[aria-label="Post comment"]').click();
    cy.wait(4000);
  });
 
});
//---------------------
describe('TinyFlix - Video sound adjusting', () => {
  it('should open the Advanced React video and adjust the volume but issue in sound', () => {
    cy.visit('http://localhost:5173/');
    cy.wait(1000);

    // Double-click the video card using its aria-label
    cy.get('[aria-label="Advanced React - 15:45 - 2.3K views views"]').dblclick();

    // Assert that the video player appears
    cy.get('video').should('exist');
    cy.wait(2000)
    // Adjust the volume by interacting with the volume slider
    cy.get('input[type="range"][aria-label="Volume"]')
      .should('exist') // Ensure the volume slider exists
      .invoke('val', 0.4) // Adjust volume to 70%
      .trigger('input'); // Trigger the input event to update the volume
    cy.wait(4000);
  });
    
});
//-------------------------------------
describe('TinyFlix - Video Open, Comment, Post, and Like', () => {
  it('should open Advanced React video, post a comment, and check wheather like the comment works', () => {
    cy.visit('http://localhost:5173/');
    cy.wait(1000);

    // Double-click the video card to open the video
    cy.get('[aria-label="Advanced React - 15:45 - 2.3K views views"]').dblclick();

    // Assert that the video player appears
    cy.get('video').should('exist');

    // Confirm the video title is shown
    cy.contains('Advanced React');
    cy.wait(2000);
    // Type a comment into the textarea
    cy.get('textarea[aria-label="Comment text"]').type('great video!');
    cy.wait(2000)
    // Click the "Post Comment" button
    cy.get('button[aria-label="Post comment"]').click();

    // Wait for the comment to appear and confirm it
    cy.contains('great video!').should('exist');
    cy.wait(3000)
    // Like the comment
    cy.get('button[aria-label="Like comment"]').then(($btn) => {
      const initialLikes = parseInt($btn.text().trim().replace('👍', '').trim());

      // Click the like button
      cy.wrap($btn).click();
        cy.wait(1000);
      // Verify the like count increased by 1
      cy.wrap($btn).should(($updatedBtn) => {
        const updatedLikes = parseInt($updatedBtn.text().trim().replace('👍', '').trim());
        expect(updatedLikes).to.eq(initialLikes + 1);
      });
    });
      cy.wait(4000);
  });
   
});

// //--------------------------
describe('TinyFlix - Video Open, Comment, Post, Like, and Reply', () => {
  it('should open Advanced React video, post a comment, like it, and reply to it', () => {
    cy.visit('http://localhost:5173/');
    cy.wait(1000);

    // Double-click the video card to open the video
    cy.get('[aria-label="Advanced React - 15:45 - 2.3K views views"]').dblclick();
      cy.wait(1000);
    // Assert that the video player appears
    cy.get('video').should('exist');

    // Confirm the video title is shown
    cy.contains('Advanced React');
    cy.wait(2000);

    // Type a comment into the textarea
    cy.get('textarea[aria-label="Comment text"]').type('great video!');
    cy.wait(2000);

    // Click the "Post Comment" button
    cy.get('button[aria-label="Post comment"]').click();

    // Wait for the comment to appear and confirm it
    cy.contains('great video!').should('exist');
    cy.wait(2000);

    // Like the comment
    cy.get('button[aria-label="Like comment"]').then(($btn) => {
      const initialLikes = parseInt($btn.text().trim().replace('👍', '').trim());
    cy.wait(2000);
      // Click the like button
      cy.wrap($btn).click();
      // Verify the like count increased by 1
      cy.wrap($btn).should(($updatedBtn) => {
        const updatedLikes = parseInt($updatedBtn.text().trim().replace('👍', '').trim());
        expect(updatedLikes).to.eq(initialLikes + 1);
      });
        cy.wait(4000);
    });

    cy.wait(2000);
    // Type a reply and submit
    cy.get('form.reply-form input[aria-label="Reply text"]').type('thank you');
    cy.wait(2000);
    cy.get('form.reply-form button[type="submit"]').click();
      cy.wait(4000);
  });
  
});

//-----------------------------------

describe('testing Video Player Controls', () => {
  it('video is not playing,speed check issue,Autoplay,quality issue and subtitle those are not functioning properly', () => {
    cy.visit('http://localhost:5173/');
    cy.wait(1000);
    // Double-click the video card to open the video
    cy.get('[aria-label="Advanced React - 15:45 - 2.3K views views"]').dblclick();
    cy.wait(2000);
    // Assert that the video player appears
    cy.get('video').should('exist');
    // Confirm the video title is shown
    cy.contains('Advanced React');
    cy.wait(2000);
    // 1. Click Play/Pause button
    cy.get('.video-controls button').first().click();
    cy.wait(2000);
    // 2. Change playback speed to 0.5x
    cy.get('select[aria-label="Playback speed"]').select('0.5');
    cy.wait(2000);
    // 3. Toggle Autoplay checkbox
    cy.contains('label', 'Autoplay').find('input[type="checkbox"]').click();
    cy.wait(2000);
    // 4. Select "High Quality" in quality dropdown
    cy.get('.user-preferences select').first().select('high');
    cy.wait(2000);
  });
});

