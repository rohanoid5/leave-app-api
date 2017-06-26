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

### Creating new user

For registration use this endpoint:
```
http POST http://localhost:3000/register
```
In the body put:
```
{
	"username": "XYZ",
	"password": "xyz",
	"email": "x@y.com",
	"name": "XYZ ABC",
	"role": "MNG"
}
```
Role can be either "MNG" which is Manger or "EMP" which is Employee.

## Modules used

Some of non standard modules used:
* [express](https://www.npmjs.com/package/express)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [passport](https://www.npmjs.com/package/passport)
* [bcrypt](https://www.npmjs.com/package/bcryptjs)
* [passport-jwt](https://www.npmjs.com/package/passport-jwt)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [cors](https://www.npmjs.com/package/cors)
