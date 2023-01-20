# TestingPlatform
Testing platform RESTFul API integrated with PostgreSql database for faculty online exams nodejs &amp; typescript based.
## Sections
- [Features v0](#features-v0)
- [How to start](#how-to-start)
- [End Points](#end-points)
    * [Student](#student)
## features v0
- Create student account.
- Admins add questions and create tests.
- Admins can create new questions or use from which are already created before.
- Admins assign test to specific students.
- Only allowed students can start a specific test.
- Students solve and get there marks after finishing.
## How to start
- Clone repo and install dependencies
```
npm install
```
- Connect to postgres
```
psqL -U postgres
CREATE USER Admin WITH PASSWORD '12345678';
CREATE DATABASE TestingPlatform;
CREATE DATABASE TestingPlatform_test;
\c TestingPlatform
GRANT ALL PRIVILEGES ON DATABASE TestingPlatform TO admin
\c TestingPlatform_test
GRANT ALL PRIVILEGES ON DATABASE TestingPlatform_test TO admin;
```
- Add .env file to the root directory following .env.example format
- Run dev script to start the application
```
npm run dev
```
- Open http://127.0.0.1:3000/v0
## How to use
### End Points
#### /student
- GET : /
    * Get all students
    * No body needed
    * Response body
        *  status(200)
            ```json
            [
                {
                "id": 1,
                "name": "Abdelhady",
                "username": "Hady",
                "password": "$2b$10$UOXLOi5BTu2ROiP.0RXoHOFieJTOe6f6xmDIU47Yij6VHOvrJ/dT6",
                "national_id": "01234567891234",
                "university_id": "2020191071"
                }
            ]
            ```
- Get : /national
    * Get user using national ID
    * Request body : JSON
        ```json
        {        
            "national_id":"01234567891234"
        }
        ```
    * Response body 
        * status(200)
            ```json
            {
                "id": 1,
                "name": "Abdelhady",
                "username": "Hady",
                "national_id": "01234567891234",
                "university_id": "2020191071"
            }
            ```
- Get : /id
    * Get user using ID
    * Request body : JSON
        ```json
        {        
            "student_id":5
        }
        ```
    * Response body
        * status(200)
            ```json
            {
                "id": 1,
                "name": "Abdelhady",
                "username": "Hady",
                "national_id": "01234567891234",
                "university_id": "2020191071"
            }
            ```
- Get : /login 
    * Student login
    * Request body : JSON
        ```json
        {
            "password": "12345678",
            "national_id": "01234567891234"
        }
        ```
    * Response body
        * status(200)
            ```json
            {
            "id": 1,
                "name": "Abdelhady",
                "username": "Hady",
                "password": "$2b$10$UOXLOi5BTu2ROiP.0RXoHOFieJTOe6f6xmDIU47Yij6VHOvrJ/dT6",
                "national_id": "01234567891234",
                "university_id": "2020191071"
            }
            ```
        * status(401) : 
            ```
            Wrong national Id or password
            ```
- POST : /
    * Create new student
    * Request body : JSON
        ```json
        {
            "name":"Ahmed",
            "username":"Ahmed",//must be unique
            "password":"12345678",
            "national_id":"1212",//must be unique
            "university_id":"2121"//must be unique
        }
        ```
    * Response body
        * status(200)
            ```json
            {
                "id": 3,
                "name":"Ahmed",
                "username":"Ahmed",
                "password":"12345678",
                "national_id":"1212",
                "university_id":"2121"
            }
            ```

        * status(400) : 
            ```
            reserved keys : key1,key2
            ```