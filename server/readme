1. Git clone or extract the file from a zip:

   - Clone the Git repository or extract the contents of the zip file.

2. Go to inside the server directory:

   - Navigate to the directory where the server files are located.

3. Install dependencies:

   - Before opening or running the project, run the following command to install the necessary dependencies: npm install

4. Postman setup:

   - Download the attached Postman file.
   - Import the file into Postman.
   - All user-related APIs can be found in the "users" folder.
   - Make sure to log in and obtain an authorization token.
   - Paste the authorization token into the Postman environment variable (if the existing one has expired).

5. API access and permissions:

   - Check all API access permissions and ensure that the required permissions are set correctly.

6. Categories API:

   - The categories API can be found in the "categories" folder within the Postman collection.

7. Products API:

   - The products API can be found in the "products" folder within the Postman collection.

8. Real-time chat module:

   - To use the real-time chat module, follow these steps:

   For the first user:

   - Visit the following URL: http://localhost:5000/verify-user
   - Enter the email of a registered user and click "Verify."
   - The page will redirect to the chat page.

   For the second user:

   - Visit the same URL in a different browser or a new tab within the same browser.
   - http://localhost:5000/verify-user
   - Enter the email of another registered user and click "Verify."
   - The page will redirect to the chat page.
   - Enter a message, and the other user will receive the message on their chat page.

###########################

## Node.js practical

###########################
:::::::::::::
::Task-1
:::::::::::::
registeration - API

---

name (required)
email (unique|required)
phone (required)
password (min:6|required)

## login - API

email
password

(jsonwebtoken authentication)

## view profile - API (only logged in user access)

name
email
phone
password

## update profile - API (only logged in user access)

name
email
phone
password

## category management - API (only logged in user access)

category management
name
select parent category
(manage multilevel categories Like - Cloths > Men's > Tshirt > Round Neck)

## product management - API (only logged in user access)

image
title
category (manage multilevel categories Like - Cloths > Men's > Tshirt > Round Neck)
description
amount

(CRUD operations. eg. insert, update, delete, listing apis)

- Also search input with listing api to filter products by title

:::::::::::::
::Task-3
:::::::::::::

- Realtime chat module using Socket I/O

There should be a chatbox in HTML/EJS/PUG/HBS where 2 user can able to chat with each other in realtime
