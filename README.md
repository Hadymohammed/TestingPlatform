# TestingPlatform
Testing platform RESTFul API integrated with PostgreSql database for faculty online exams nodejs &amp; typescript based.
## Sections
- [Features v0](#features-v0)
- [How to start](#how-to-start)
- [End Points](#end-points)
    * [Student](#student)
    * [Admin](#admin)
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
#### student
- v0 : create ,login and get students using nationalId/Id
- <details>
    <summary>/student</summary>

    - <details>
        <summary>GET : /</summary>

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
        </details>
    - <details>
        <summary>GET : /national</summary>

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
        </details>
    - <details>
        <summary>GET : /id</summary>

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
        </details>
    - <details>
        <summary>GET : /login </summary>

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
        </details>
    - <details>
    <summary>POST : /</summary>

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
    </details>
</details>

#### admin
- v0 : create ,login and get admins using username
- <details>
    <summary>/admin</summary>

    - <details>
        <summary>GET : /</summary>

        * Get all admins.
        * No request body required.
        * Response body:
            * status(200):
                ```json
                [
                    {
                        "id": 1,
                        "name": "Abdelhady Mohamed",
                        "username": "Hady23",
                        "national_id": "2323"
                    }
                ]
                ```
        </details>
    - <details>
        <summary>GET : /username</summary>

        * Get admin by username
        * Request body:
            ```json
            {
                "username":"Hady23"
            }
            ```
        * Response body:
            * status(200) :
                ```json
                {
                    "id": 1,
                    "name": "Abdelhady Mohamed",
                    "username": "Hady23",
                    "national_id": "2323"
                }
                ```
            * status(400) : ```Invalid username```
        </details>
    - <details>
        <summary>GET : /login</summary>

        * Login to admin account
        * Request body:
            ```json
            {
                "national_id":"2323",
                "password":"1111"
            }
            ```
        * Response body
            * status(200):
                ```json
                {
                    "national_id":"2323",
                    "password":"1111"
                }
                ```
            * status(401): ``` Wrong national Id or password ```
        </details>
    - <details>
    <summary>POST : /</summary>

    * Create new admin
    * Request body
        ```json
        {
            "name":"Abdelhady Mohamed",
            "username":"Hady23",//must be unique
            "national_id":"2323",//must be unique
            "password":"1111"
        }
        ```
    * Response body
        * status(200):
            ```json
            {
                "id": 1,
                "name": "Abdelhady Mohamed",
                "username": "Hady23",
                "national_id": "2323"
            }
            ```
        * status(400): ``` reserved keys : key1,key2  ```
    </details>
</details>