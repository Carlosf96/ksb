# KS Hire API

Below we will define how to install & interact with the KS Hire API. All API actions that require an authenticated user require a Bearer token in the headers containing a JWT provided when you login/register

- [Installation](#Installation)
- [Users](#Users)
- [Documents](#Documents)
- [Roles](#Roles)
- [Jobs](#Jobs)
- [Candidates](#Candidates)
- [Feedback](#Feedback)

**Note**: This is _not_ the final API documentation. Breaking changes will be rolling out regularly as basic development continues.

---

# Installation

The _only_ requirement to run the backend is Docker and the secret .env file. Once you have Docker up and running, run the following commands:

    chmod +x run.sh # make the run script executable
    ./run.sh

And viola!

# Users

#### ~ Register

Already registered users can log in with a POST call to:

    /api/v1/auth/register

The body of the POST request should consist of the following JSON:

```json
{
  "email": "admin@example.com",
  "name": "Señor Admin",
  "password": "adminadmin",
  "role": "admin"
}
```

The response looks like this:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywic3ViIjoiYWNjZXNzIiwiYXVkIjoidXNlciIsImV4cCI6MTU4NDk3Njc4NTg5MCwiaWF0IjoxNTc5NzkyNzg1ODkwLCJqdGkiOiJhYmM0YTI3OS0yY2M5LTRlMGMtYmFjMC1hNWE5NGEwMjVkMTUiLCJlbWFpbCI6ImFkbWlAZXhhbXBsZS5jb20ifQ.vzZIBWRSlMogYszFTj61Mn7XdjxeK16fZFnJtou3q1c",
  "expires": 1584976785890,
  "refresh_token": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywic3ViIjoicmVmcmVzaCIsImF1ZCI6InVzZXIiLCJleHAiOjE2MTE0MTUxODU4OTEsImlhdCI6MTU3OTc5Mjc4NTg5MSwianRpIjoiMjBiMGIwZGUtMWJlZC00ZGE4LWE1ZjEtY2QxZTgxZGZlNTQ1IiwiZW1haWwiOiJhZG1pQGV4YW1wbGUuY29tIn0.8Z7dTlHvglAW3iz1aCXz1Yffv4wfVrRMr3N5-tHX_bk",
    "expires": 1611415185891,
    "expires_in": 31622400
  },
  "user": {
    "id": 3,
    "name": null,
    "email": "admin@example.com"
  },
  "profile": {
    "id": 2,
    "time_zone": "America/Mexico_City",
    "locale": "es",
    "userId": 3,
    "createdAt": "2020-01-23T15:19:45.000Z",
    "updatedAt": "2020-01-23T15:19:45.000Z"
  }
}
```

#### ~ Log in

Already registered users can log in with a POST call to:

    /api/v1/auth/login

The body of the POST request should consist of the following JSON:

```json
{
  "email": "admin@example.com",
  "password": "adminadmin"
}
```

Thence shall you receive the following JSON response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic3ViIjoiYWNjZXNzIiwiYXVkIjoidXNlciIsImV4cCI6MTU4NDk3NzY5MjgxMywiaWF0IjoxNTc5NzkzNjkyODE0LCJqdGkiOiJhYzZmZmRlYy00YzZlLTRmZjMtYTZkMC1lMDhiMTc0YmI5OGYiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIn0.shbeImgizz_TEEMFe8J5cWBlkrqvY9o1YrZ2ChuSgZo",
  "expires": 1584977692813,
  "refresh_token": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic3ViIjoicmVmcmVzaCIsImF1ZCI6InVzZXIiLCJleHAiOjE2MTE0MTYwOTI4MTQsImlhdCI6MTU3OTc5MzY5MjgxNCwianRpIjoiODNmYTNkZGEtOTIzYS00ZDM2LThmODAtYzkzODg1YTNlNDU2IiwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSJ9.6uMJF_8Fxi55V8bcmTWgGdlBSAAklTwTT_BLtciKmGg",
    "expires": 1611416092814,
    "expires_in": 31622400
  },
  "user": {
    "id": 1,
    "name": "Admin",
    "email": "admin@example.com"
  },
  "profile": {
    "id": 1,
    "time_zone": "America/Mexico_City",
    "locale": "es",
    "userId": 1,
    "createdAt": "2020-01-22T14:26:25.000Z",
    "updatedAt": "2020-01-22T14:26:25.000Z"
  }
}
```

#### ~ Update User

Once a user has been created, they can be updated via a PUT request to

    /api/v1/user/:id

Where `:id` is the id of the user you wish to alter. The request body should be structured like so:

```json
{
  "name": "joe"
}
```

And in your request, the following header:

    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic3ViIjoicmVmcmVzaCIsImF1ZCI6InVzZXIiLCJleHAiOjE2MTE0MTYwOTI4MTQsImlhdCI6MTU3OTc5MzY5MjgxNCwianRpIjoiODNmYTNkZGEtOTIzYS00ZDM2LThmODAtYzkzODg1YTNlNDU2IiwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSJ9.6uMJF_8Fxi55V8bcmTWgGdlBSAAklTwTT_BLtciKmGg

The token must belong to a user with an administrative role. After the token, you can include whatever attributes of the user you wish to update (name, email, role, etc).

The response will look like this:

```
{
    success: true
}
```

The `success` field will be true if the operation was successful. Otherwise you will receive a response saying `"No Token Present"`.

#### ~ Delete User

If you wish to remove a user from the system, they can be deleted via a DELETE request to

    /api/v1/user/:id

Where `:id` is the id of the user you wish to remove. The request body should be structured like so:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic3ViIjoiYWNjZXNzIiwiYXVkIjoidXNlciIsImV4cCI6MTU4NDk3NzY5MjgxMywiaWF0IjoxNTc5NzkzNjkyODE0LCJqdGkiOiJhYzZmZmRlYy00YzZlLTRmZjMtYTZkMC1lMDhiMTc0YmI5OGYiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIn0.shbeImgizz_TEEMFe8J5cWBlkrqvY9o1YrZ2ChuSgZo"
}
```

Only administrators can delete users. The response will look like this:

```
{
    success: true
}
```

The `success` field will be true if the operation was successful. Otherwise you will receive a response saying `"No Token Present"`.

# Documents

#### ~ Upload

Any user can upload a document. Therefore, a valid token from any existing user is sufficient authorization to create a document. To do so, you make a POST request to:

    /api/v1/document/:candidateId

Since we are uploading a file, it will have to be a multipart form request, like so in curl:

    curl -F 'img=@hello.txt' http://localhost/api/v1/document/:candidateId --header "Content-Type: application/json" --data '{"token":"eyJHSdD878s7d8s7dSd87ggdf"}' -X POST

Where `candidateId` is the ID of the candidate the document pertains to. To get an idea of how this looks in React, consult this guide: https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/

The response will be a JSON containing the document's path and id:

```json
{
  "path": "/:candidateId/filename.txt",
  "id": "9"
}
```

#### ~ Delete

In cases where a document needs to be reuploaded, or updated, it is preferable to upload a new version of the document and leave the previous version available. Therefore, only administrative users can delete a document. To do so, a DELETE request must be made to the following route:

    /api/v1/document/:id

The body of the request should consist of JSON containing a valid token:

```json
{
  "token": "eyJHSdD878s7d8s7dSd87ggdf"
}
```

If the operation is successful, you will receive a JSON consisting of a single `"success": true` property.

# Roles

Currently, roles are hardcoded in the seeding of the database. There are two roles: roleId 1 (admin) and roleId 2 (recruiter). Soon we will be adding an API for role creation by admins. In the meantime, you can raise an issue in the Gitlab repository if you wish to add an additional role. In the meantime, you can see what privileges are provided for a certain role by calling

    /api/v1/role/:id

No token is necessary to inquire about the privileges of a given role.

# Jobs

#### ~ View Jobs

View all current jobs by sending a GET request to

    /api/v1/job/view_all

#### ~ Create Job

Any user can create a job via a POST request to the route

    /api/v1/job/create

The body of the POST request should consist of the following JSON:

```json
{
  "token": "ey2sd89d8h98gdfdsdsd98kjsdkjnmakq",
  "title": "Security Trainee",
  "salary": "12000",
  "description": "Perfect position for ambitious, eager devs like Alex"
}
```

If the operation is successful the API will respond with the new job ID

```json
{
  "jobId": "892"
}
```

#### ~ Delete Job

Any user can delete a job by sending a DELETE request to

    /api/v1/user/:id

Where `:id` is the JobId. The response should be a simple success message:

```json
{
  "success": "true"
}
```

# Candidates

#### ~ View Candidate by recruiter name

All candidates can be view by sending a GET request to

    /api/v1/candidate/recruiter?recruiter=name

Where `name` is the recruiter's name.

#### ~ View Candidates

All candidates can be viewed by sending a GET request to

    /api/v1/candidate/

#### ~ Add Candidate

To create a candidate as any user, send a POST request to

    /api/v1/candidate/

In the body of the POST request include the following JSON:

```json
{
  "name": "Ada Lovelace",
  "status": "hired",
  "token": "ey29817jsdmdb72b2b21o19a83",
  "phone": "8675309",
  "Github": "github.com/seisvelas"
}
```

As a response you will receive the Candidate ID.

#### ~ View single Candidate

To view a candidate with details such as the position they are applying to and who is recruiting them, make a GET call to

    /api/v1/candidate/:id

#### ~ Update Candidate

To update a candidate with details such as the position they are applying to and who is recruiting them, make a PUT call to

    /api/v1/candidate/:id

In the request body JSON, include whatever details you wish to alter (in addition to your token) and the candidate ID:

```json
{
  "token": "e2djfdjf3i42jsjhsdjaebrvzzc",
  "id": 929,
  "name": "Madam Babbage",
  "deprecate_recruiter": [784],
  "new_recruiter": [991, 881],
  "positions": [232, 113, 100],
  "note": "Great person, give big bucks"
}
```

#### ~ Delete Candidate

To delete a candidate, just send a DELETE request with your token to

    /api/v1/candidate/:id

where `:id` is the Candidate's id.

If the operation is successful you will receive a success message.

# Feedback

#### ~ View all Feedbacks

To view all feedbacks, make a GET request to

    /api/v1/feedback/

As a response you will receive an array containing all feedbacks in the feedbacks table

#### ~ Add Feedback

To add a feedback, make a POST request to

    /api/v1/feedback/

With a JSON containing the rating and description

```json
{
  "userId": 1,
  "candidateId": 121,
  "rating": 4,
  "description": "Candidate good, I like"
}
```

#### ~ View all Feedbacks given by a User

To get all feedbacks given by a user, make a GET request to

    /api/v1/feedback/user/:id

Where `:id` is the userId.

As a response you will receive an array of objects containing all the feedbacks given by a certain User.

#### ~ View all Feedbacks for a certain Candidate

To get all feedbacks given by a user, make a GET request to

    /api/v1/feedback/candidate/:id

Where `:id` is the candidateId.

As a response you will receive an array of objects containing all the feedbacks given to a certain Candidate.

#### ~ View/Edit/Delete feedback by id

To view a specific feedback by its feedback Id make a GET request to

    /api/v1/feedback/:id

Where `:id` is the feedbackId

To edit a specific feedback by its feedback Id make a PUT request to

    /api/v1/feedback/:id

Where `:id` is the feedbackId

To Delete a specific feedback by its feedback Id make a DELETE request to

    /api/v1/feedback/:id

Where `:id` is the feedbackId
