# leave-app-api
A small NodeJS application for a leave application submission and approval.

## Assignment Details
The application would involve 2 sets of users ( Employee & Manager) with different authorizations. You must ensure that all API end points consider user role for authorization checks:
APIs required for Employee
 (GET) Ability to see all previously created leave request & their approval status
 (POST) Create a new leave request ( Start Date , End Date , Leave Type , Reason)
APIs required for Manager
 (PUT) Ability to approve leave requests created by an employee
 (GET) See all leave requests in the system ( for all employees)
At a database level, below are sample entities that are required (kindly change accordingly if needed for better implementation) :
Leave:
StartDate, EndDate, LeaveType , Reason , RequestBy, RequestedAt, ApprovalStatus, ApprovedAt
LeaveType & ApprovalStatus must be enum with predefined possible values.
User:
FirstName, LastName, email, role, username, etc.

## Running project

You need to have installed Node.js and MongoDB

### Install dependencies

To install dependencies enter project folder and run following command:
```
npm install
```

### Run server

To run server execute:
```
node app
```

### Make Requests

Creating and refreshing access tokens:
```
http POST http://localhost:1337/api/oauth/token grant_type=password client_id=android client_secret=SomeRandomCharsAndNumbers username=myapi password=abc1234
http POST http://localhost:1337/api/oauth/token grant_type=refresh_token client_id=android client_secret=SomeRandomCharsAndNumbers refresh_token=[TOKEN]
```

Creating your article data:
```
http POST http://localhost:1337/api/articles title=NewArticle author='John Doe' description='Lorem ipsum dolar sit amet' images:='[{"kind":"thumbnail", "url":"http://habrahabr.ru/images/write-topic.png"}, {"kind":"detail", "url":"http://habrahabr.ru/images/write-topic.png"}]' Authorization:'Bearer PUT_YOUR_TOKEN_HERE'
```

Updating your article data:
```
http PUT http://localhost:1337/api/articles/YOUR_ARTICLE_ID_HERE title=NewArticleUpdated author='John Doe' description='Lorem ipsum dolar sit amet' images:='[{"kind":"thumbnail", "url":"http://habrahabr.ru/images/write-topic.png"}, {"kind":"detail", "url":"http://habrahabr.ru/images/write-topic.png"}]' Authorization:'Bearer PUT_YOUR_TOKEN_HERE'
```

Getting your data
```
http http://localhost:1337/api/users/info Authorization:'Bearer PUT_YOUR_TOKEN_HERE'
http http://localhost:1337/api/articles Authorization:'Bearer PUT_YOUR_TOKEN_HERE'
```

## Modules used

Some of non standard modules used:
* [express](https://www.npmjs.com/package/express)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [passport](https://www.npmjs.com/package/passport)
* [bcrypt](https://www.npmjs.com/package/bcryptjs)
* [passport-jwt](https://www.npmjs.com/package/passport-jwt)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [cors](https://www.npmjs.com/package/cors)
