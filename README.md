# CookBook
Milestone three project:  Python and Data Centric Development - Code Institute
This is a full stack site that allows users to manage a dataset about particular domain. This project highlights convinient access to the data provided by other members using the application, it also suppors all CRUD operations,  a dashboard page that gives statistics about recipe for efficient understanding.

## Menu Page
Must have:
As a user I would like to quickly and easily check what are the recipes available in this site, also check whether this site  provides the information of a recipe that I like.

As a user I want to easily add, update, delete a recipe.

Should have:
As a user I'd like to read about recipes that are most liked and having good reviews in market.



# UX

## Strategy
My goal in the design was to make it as easy as possible to access information on the site while striving for a minimalist and user-friendly design.

##  Scope
For users, I wanted to provide a brief overview of all recipes, also create new entries if have any. This way, many other members of the community get a glimpse about recipes that they can order for and enjoy their lunchtime, weekends and party's, with average price in the market so they can plan for order.

## Structure
I wanted users to be able to quickly access the data that is available, providing a short description, ingredients, preparation steps about a recipe with number of people's likes/ dislikes and comments. A link to dashboard, menu pages for quick navigation and a overview of all recipes in a single dashboard page for quick access and efficient performance.

## Surface
The bootstrap color schema was chosen to create a modern feel.

## Technologies
1. HTML
2. CSS
3. Bootstrap
4. JS
5. Python + Flask
6. MongoDB database

##  Features
This site uses the bootstrap grid layout for better organising the content of a page. The navbar also stays regardless of the screen size to achieve quick access to pages.

# 1. Create
This site allows users to add a recipe with certain fields and a image for better understanding about a recipe

# 2. Edit
Every recipe can be updated with specific details if known with some additional information 

# 3.Delete
Users can delete a recipe if it no longer exist in market

# 4. Access
Every user will be provided with complete information about recipe that was shared by a single member in a community

# 5. Like/ Dislike and comments.
User can share their feedback about recipe

## Testing

The user and site owner achieved the intended outcome of providing them with a showcase of common data. In the dashboard section, they can quickly check usefull information of a recipe like name, comments, likes and dislikes, link which takes to that recipe page for full information. They are able to see all list of recipes via cards in menu section. They are also able to view comments submitted, number of likes and dislikes for a recipe in read more section. They are also able to edit, delete data specific to a recipe and comments. The application is also made responsive for a modern feel.

## Deployment
This site is hosted using Heroku Cloud platform, deployed directly from heroku remote master branch. The deployed site will update automatically upon new commits to the master branch of heroku. In order for the site to deploy correctly on heroku, the dependencies must be added to requirements.txt file and given this command web:gunicorn filename:variable_to_run in Procfile

Check it live here: https://cook-book-flask-app.herokuapp.com/menu

To run locally you can clone this repository directly into the editor of your choice by pasting git clone https://github.com/vinod2rahul/MS3-CookBook.git into your terminal. 

Use command python server.py to run app locally a port 8000 in cookbook folder.

You can check it run at localhost:8000 if followed above procedure correctly.

## Credits
All content and code in this project site was writen by me.
