#BRANDWEB TEST

# notes

comments are added in the code,
These are mainly to make it easier for you to find something if you want to know how I did something.
I generaly dont place comments this much for every single thing.


I added Mansory plugin to have the cards line up more like a pintrest style layout better but when changing the resolution rapidly it struggles to keep up and does not update properly, resizing gently allows it to keep up

# Navigation:
- profile buttons move to hidden sidebar on smaller screen and move to top navigation on bigger screens


# search:
When searching results will show in a smaller format under the searchbar.
When clicking the search icon after typing the results will be shown in a bigger format in the actual page

# detail page:

- Main image with back to home button
- Tabs for various info (about, info, availble platforms)
- Gallery with modal can be opened in a larger version by clicking on them, option to go to next or previous picture, buttons dissapear if there is no next or previous picture
- Modal can be closed with close button or pressing/clicking the image again
- A section with all various minor info (Tags, genres, age rating, publisher, developers metascore and more)
- Clicking on either a "Tag" or "Genre" will go to a new page and show results that have that tag/genre"

# FireBase
# #Auth pages
- login/register with google / custom email&password
- (facebook, twitter, github info: code is in place, but I do not have the developer api keys for every one of these)
- profile

#   FireStore
- have a account based collection of games saved(wishlist style) that you can add & remove
- games can be saved/removed from the collection by pressing the button on the card

# other things

- loading state on detail page
- cards specific loading state (image wave effect / text loading effect)

sitemap:
Home: /
Game details: /details?slug=${slug}