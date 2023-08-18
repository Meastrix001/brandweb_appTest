#BRANDWEB TEST

# notes

comments are added in the code,
These are mainly to make it easier for you to find something if you want to know how I did something.
I generaly dont place comments this much for every single thing.

During registration, if you add a picture, make sure the string is not too long, this wil cause same random firestore error

## full list of things used
- React
- Nextjs
- Typescript
- scss
- css
- Firebase authentication
- Firestore collections
- bootstrap 5
- Hosted on AWS

# Navigation:
- Profile buttons move to hidden sidebar on smaller screen and move to top navigation on bigger screens.
- If logged in option to log out or go to profile
- If not logged in go to auth page
- Most items on the side navigation or visual


# search:
When searching results will show in a smaller format under the searchbar.
When clicking the search icon after typing the results will be shown in a bigger format in the actual page.

# detail page:
- Main image with back to home button
- Tabs for various info (about, info, availble platforms).
- Gallery with modal can be opened in a larger version by clicking on them, option to go to next or previous picture, buttons dissapear if there is no next or previous picture.
- Modal can be closed with close button or pressing/clicking the image again.
- A section with all various minor info (Tags, genres, age rating, publisher, developers metascore and more).
- Clicking on either a "Tag" or "Genre" will go to a new page and show results that have that tag/genre".
- Button to add game to collection

# FireBase
# #Auth pages
- Login/register with google / custom email&password
- (facebook, twitter, github info: code is in place, but I do not have the developer api keys for every one of these)
- Profile
- During log in user wil be shown his entered picture if valid, and name, email

# Profile page
- User can see & update his Photo & display name

#   FireStore
- Have a account based collection of games saved(wishlist style) that you can add & remove
- Games can be saved/removed from the collection by pressing the button on the card
- Games can be removed from the side navigation
- Clicking on a game from your collection wil send you to the detail page form that game
- Games collection only updates when pressing the reload icon or when you remove a game from collection

# other things
- Loading state on detail page
- Cards specific loading state (image wave effect / text loading effect)

sitemap:
Home: /
Game details:       /details?slug=${slug}
Search:             /search?tag=${slug}
Profile:            /profile
login&register:     /auth

Hosted version:
[1]:https://develop.d3ugc7acqiiyqr.amplifyapp.com  "JAGL: Just Another Games Library"
