# Application Changelog

This will show the different changes done for the application. This will include assignment specific changes, what the assignment was, and when it was due. It will also have non-specific assignment updates that were done to make the landing page.

## Nov 11, 2025

- Added new stats section
  - Has both a mobile and a desktop version
  - Desktop mostly finished, still need to do more styling / content on mobile
  - TODO: Add a defensive toggle to swap all of the content (time allowing)
- Hooked statistics API from NE site
- Styled stats section
- Removed border-spacing from tables in global.css

## Nov 10, 2025

- Added sponsors + footer components
- Updated nav to be fixed on both desktop/mobile
- Added more global colors
- Updated HTML to be semantic
- Updated components to be semantic
- Split nav into own header.jsx for semantic HTML

## Nov 9/10, 2025

- Updated schedule component to start the initial slide at the index of a time that's not null
- Finished styling base schedule component
- Added new next/previous buttons for schedule component
- Updated readme
- Updated carousel to be wider
  - I didn't like to look of it anymore, so updated it
- Updated scheduleData to include:
  - opponentScore
  - homeScore
  - vars for all watch logos
  - updated times/scores
- Added some more global colors / styles
- Updated favicon to Nebraska logo

## Nov 8, 2025

- Updated carousel to remove arrows
- Updated carousel to autoplay in 7s intervals
- Updated styling for schedule to control padding of cards
- Updated data for schedule component

## Nov 7, 2025

- Began styling out and creating the shell for the schedule component

## Nov 5, 2025

- Updated CSS for how carousel is handled
- Fix: Updated navbar width on mobile
- Deleted unneeded images
- Added more global color variables

### Assignment specific changes (Accessible Landing Page: Due 11.6)

- Added styling to fix WCAG flagging some colors that weren't 4.5:1
- Ran a WCAG checker to make sure landing page was compliant

## Nov 4, 2025

- Added react-slick library to carousel.jsx
- Added settings for carousel
- Updated carouselData.json to .js for mapping purposes
- Mapped through carouselData to start pulling carousel image data
- Added github pages script into package.json
- Added deploy script
- Update image paths for carousel

## Nov 1, 2025

- Added remaining icons for Navbar
- Finished mobile navigation menu
- Adjusted padding and added max-width for desktop menu
- Updated responsiveness of all elements of desktop/tablet

## Oct 31, 2025

- Lots of Navbar updates
  - Added mobile menu functionality
    - Menu opens and closes
      - Able to click "X" and tap outside of menu to close
  - Moved primary-button css to global.css
  - Added core Navbar items (menu, mobile hamburger, button styling)
- Imported fontawesome for icons

### Assignment specific changes (Add Media Query to Landing Page: Due 11.1)

- Added desktop styling to remove hamburger menu
- Added desktop styling to remove side-menu (lives off-screen, no longer loads)
- Removed most things from 10/30 as they were no longer relevant with the changes made

## Oct 30, 2025

- More file restructure
- Added multiple component sections for different pieces of landing page
- Added css files for each component
- Created a global.css file that will house all global CSS
- Added images for the site

### Assignment specific changes (Add Media Query to Landing Page: Due 11.1)

- Added media query for "Navbar" @ src/assets/components/navbar/navbar.css
  - reordered content using flex for desktop
  - expanded margins for nav img
  - Removed "buy tickets" button on mobile

## Oct 28, 2025

- Initial Commits to start repository
- Creating react app
- Updating file structure
