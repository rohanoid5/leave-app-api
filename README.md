# leave-app-api
A small NodeJS application for a leave application submission and approval.

## Assignment Details
The application involves 2 sets of users ( Employee & Manager) with different authorizations.

APIs for Employee:
1. (GET) Ability to see all previously created leave request & their approval status
2. (POST) Create a new leave request ( Start Date , End Date , Leave Type , Reason)

APIs for Manager
1. (PUT) Ability to approve leave requests created by an employee
2. (GET) See all leave requests in the system ( for all employees)

Schema used in this application:
1. Leave:
StartDate, EndDate, LeaveType , Reason , RequestBy, RequestedAt, ApprovalStatus, ApprovedAt
LeaveType & ApprovalStatus must be enum with predefined possible values.
2. User:
FirstName, LastName, email, role, username, etc.

## Running project

Node.js and MongoDB need to be installed.

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
In the head put:
```
Content-Type application/json
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
Role is an enum which can be either "MNG" which is Manger or "EMP" which is Employee.

### Logging in new user

For login use this endpoint:
```
http POST http://localhost:3000/authenticate
```
In the head put:
```
Content-Type application/json
```
In the body put:
```
{
	"email": "x@y.com",
	"password": "xyz"
}
```
You'll get an Access Token in response. All other endpoints must use that token to verify the legitimacy of the User.
```
"token": "JWT SOMETHING RANDOM"
```

## Creating a Leave Request

Only an Employee can create a leave request and the endpoint for that is:
```
http POST http://localhost:3000/leaves
```
In the head put:
```
Content-Type application/json
Authorization USER_ACCESS_TOKEN
```
In the body put:
```
{
	"reason": "XYZ",
  "start_date": "DATE",
  "end_date": "DATE",
  "leave_type": "MEDICAL"
}
```
leave_type is an enum with values "MEDICAL", "FAMILY" and "OTHERS".

## Getting the Leave Request data

If the user is an Employee then they can see only their leave requests but the manager can see all of the requests made by all Employees.
```
http GET http://localhost:3000/leaves
```
In the head put:
```
Content-Type application/json
Authorization USER_ACCESS_TOKEN
```
You'll get a response like:
```
{
    "leaves": [
        {
            "_id": "594fe31f7e341e0011d5664e",
            "reason": "Knee Injury.",
            "start_date": "2017-06-25T16:21:46.326Z",
            "end_date": "2017-06-25T16:21:48.482Z",
            "__v": 0,
            "approval_status": "APPROVED",
            "leave_type": "MEDICAL",
            "requested_at": "2017-06-25T16:21:51.288Z",
            "requested_by": {
                "id": "594f4cbc98b6b713886aadf9",
                "username": "rd5",
                "name": "Rahul Dey"
            }
        },
        {
            "_id": "5950251c17075f0011e57fc4",
            "reason": "I have a doctor's appointment.",
            "start_date": "2017-06-27T18:30:00.000Z",
            "end_date": "2017-06-27T18:30:00.000Z",
            "__v": 0,
            "approval_status": "APPROVED",
            "leave_type": "MEDICAL",
            "requested_at": "2017-06-25T21:03:24.035Z",
            "requested_by": {
                "id": "594f4cbc98b6b713886aadf9",
                "username": "rd5",
                "name": "Rahul Dey"
            }
        }
    ]
}
```

## Change Approval Status of a Leave request
Only a Manager can use this endpoint to change the approval status:
```
http PUT http://localhost:3000/leaves/<leave id>
```
In the head put:
```
Content-Type application/json
Authorization USER_ACCESS_TOKEN
```
In the body put:
```
{
	"approval_status": "REJECTED"
}
```
approval_status is an enum and can only take three values "PENDING", "APPROVED", "REJECTED".

## Modules used

Some of non standard modules used:
* [express](https://www.npmjs.com/package/express)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [passport](https://www.npmjs.com/package/passport)
* [bcrypt](https://www.npmjs.com/package/bcryptjs)
* [passport-jwt](https://www.npmjs.com/package/passport-jwt)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [cors](https://www.npmjs.com/package/cors)

## Live Endpoint

This app is currently live on Heroku and can be found here:
* [Live](https://leave-request-api.herokuapp.com)

Use this endpoint instead of http://localhost:3000 to make all requests if you don't want to run the app locally.

## Live React app

A very basic implementation of this App can be found here:
* [React App](https://requestify-app.herokuapp.com/#/)

It is a React-Redux Application built using Material Design.
This project is also available on gitHub:
* [gitHub](https://github.com/rohanoid5/requestify)

## Disclaimer

If you're planning to use this application make sure you change the mLab link in app.js
