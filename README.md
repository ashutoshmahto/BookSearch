# BookSearch
Simple application created for learning purpose which uses GoodReads API to search books

# Tech Stacks Used:

React, Redux, Redux Thunk
Express, Axios
Babel, Webpack

To get it running:

1. Clone the repo:

   > git clone https://github.com/ashutoshmahto/BookSearch.git

2. Go inside BookSearch:

   > cd BookSearch

3. Install the node modules and dependencies

   > npm install
   
4. Open the file server/index.js and add GoodReads API key at line number 14 :

  > const key = "<API KEY>"

5. Build the application:

   > npm run build

6. Start the application:

   > npm start

7. Application will be started on Port 3303 and you can hit the URL http://localhost:3303 in browser.

# TODO:
- Move API Keys and other infos to environment Variable
- Restructuring the UI and better view
- Error and Exception Handling
- Add Unit Test Framework and test cases
