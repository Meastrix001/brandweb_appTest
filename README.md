#BRANDWEB TEST

# notes

comments are added in the code,
These are mainly to make it easier for you to find something if you want to know how I did something.
I generaly dont place comments this much for every single thing.

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
- profile buttons move to hidden sidebar on smaller screen and move to top navigation on bigger screens.
- if logged in option to log out or go to profile
- if not logged in go to auth page
- most items on the side navigation or visual


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
- button to add game to collection

# FireBase
# #Auth pages
- login/register with google / custom email&password
- (facebook, twitter, github info: code is in place, but I do not have the developer api keys for every one of these)
- profile
- during log in user wil be shown his entered picture if valid, and name, email

# Profile page
- user can see & update his Photo & display name

#   FireStore
- have a account based collection of games saved(wishlist style) that you can add & remove
- games can be saved/removed from the collection by pressing the button on the card
- games can be removed from the side navigation
- clicking on a game from your collection wil send you to the detail page form that game
- games collection only updates when pressing the reload icon or when you remove a game from collection

# other things
- loading state on detail page
- cards specific loading state (image wave effect / text loading effect)

sitemap:
Home: /
Game details:       /details?slug=${slug}
Search:             /search?tag=${slug}
Profile:            /profile
login&register:     /auth

Hosted version:
[JAGL: Just Another Games Library](https://develop.d3ugc7acqiiyqr.amplifyapp.com/auth/auth)
