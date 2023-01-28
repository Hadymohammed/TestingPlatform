# TestingPlatform
Testing platform RESTFul API integrated with PostgreSql database for faculty online exams nodejs &amp; typescript based.
## Sections
- [Features v0](#features-v0)
- [How to start](#how-to-start)
- [End Points](#end-points)
    * [Student](#Student)
    * [Admin](#Admin)
    * [Question](#question)
    * [Test](#test)
        - [Test_Questions](#test-questions)
        - [Test_students](#test-to-student)
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
#### Student
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
            * status(422) : ```Wrong data```

        </details>
    - <details>
        <summary>GET : /id</summary>

        * Get user using ID
        * Request body : JSON
            ```json
            {        
                "id":5
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
            * status(422) : ```Wrong data```

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
            * status(401) : ```Wrong national Id or password```

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

        * status(422) : ```reserved keys : key1,key2```
    </details>
</details>

#### Admin
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
            * status(422) : ```Wrong data```

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

#### Subject
- future feature , add question tags 
- <details>
    <summary>/subject</summary>

    - <details>
        <summary>GET : /</summary>
        
        * Get all tags
        * No Request body required
        * Response body
            * status(200)
                ```json
                    [
                        {
                            "id": 1,
                            "name": "Math"
                        },
                        {
                            "id": 2,
                            "name": "Sport"
                        }
                    ]
                ```
        </details>
    - <details>
        <summary>GET : /id</summary>

        * Get tag by id
        * Request body:
            ```json
                {
                "id":2
                }
            ```
        * Response body
            * status(200):
                ```json
                    {
                    "id": 2,
                    "name": "Sport"
                    }
                ```
            * status(400): ``` No such Id ```

        </details>
    - <details>
        <summary>POST : /</summary>

        * create new tag
        * Request body:
            ```json
                {
                "name":"Sport"
                }
            ```
        * Response body
            * status(200):
                ```json
                    {
                    "id": 2,
                    "name": "Sport"
                    }
                ```

        </details>
</details>

#### Question
- v0 : Create , update and get questions using id
- <details>
    <summary>/question</summary>

    - <details>
        <summmary>GET : / </summary>

        * Get all questions
        * No request body required
        * Response body
            * status(200):
                ```json
                [
                    {
                        "id": 1,
                        "content": "Which team won qatar 2022 nationals world cup",
                        "subject_id": 2,
                        "option1": "Egypt",
                        "option2": "France",
                        "option3": "Argantina",
                        "option4": "Brazil",
                        "correct_answer": "Argantina"
                    }
                ]
                ```
            * status(422): ``` Wrong data ```

        </details>
    - <details>
        <summary>POST : /create</summary>

        * Create new question
        * Request body:
            ```json
            {
            "content":"Which team won qatar 2022 world cup",
            "subject_id":"2",
            "option1":"Egypt",
            "option2":"France",
            "option3":"Argantina",
            "option4":"Brazil",
            "correct_answer":"Argantina"
            }
            ```
        * Response body
            * status(200):
                ```json
                {
                "id": 1,
                "content": "Which team won qatar 2022 world cup",
                "subject_id": 2,
                "option1": "Egypt",
                "option2": "France",
                "option3": "Argantina",
                "option4": "Brazil",
                "correct_answer": "Argantina"
                }
                ```
            * status(422): ``` Wrong data ```

        </details>
    - <details>
        <summary>GET : /id</summary>

        * Get question by id
        * Request body:
            ```json
                {
                "id":1
                }
            ```
        * Response body
            * status(200):
                ```json
                {
                "id": 1,
                "content": "Which team won qatar 2022 world cup",
                "subject_id": 2,
                "option1": "Egypt",
                "option2": "France",
                "option3": "Argantina",
                "option4": "Brazil",
                "correct_answer": "Argantina"
                }
                ```
            * status(422): ``` Wrong data ```    

        </details>
    - <details>
        <summary>PATCH : /update</summary>

        * Update existing question
        * Request body:
            ```json
                {
                    "id": 1,
                    "content": "Which team won qatar 2022 nationals world cup",
                    "subject_id": 2,
                    "option1": "Egypt",
                    "option2": "France",
                    "option3": "Argantina",
                    "option4": "Brazil",
                    "correct_answer":"Argantina"
                }
            ```
        * Response body
            * status(200): //the entire question after edit
                ```json
                    {
                    "id": 1,
                    "content": "Which team won qatar 2022 nationals world cup",
                    "subject_id": 2,
                    "option1": "Egypt",
                    "option2": "France",
                    "option3": "Argantina",
                    "option4": "Brazil",
                    "correct_answer": "Argantina"
                    }
                ```
            * status(422): ``` Wrong data ```
            
        </details>

</details>

#### Test
- v0 : Create, update , add questions and assign to student
- <details>
    <summary>/test</summary>

    - <details>
        <summary>GET : /</summary>

        - get all tests in the system
        - No request body required
        - Response body
            - status(200):
                ```json
                    [
                    {
                        "id": 1,
                        "title": "Software Engineering",
                        "date": "2023-01-18T22:00:00.000Z",
                        "total_questions": 75,
                        "timer": 120,
                        "creator_id": 1
                    }
                    ]
                ```
                * status(422): ``` Wrong data ```

        </details>
    - <details>
        <summary>GET : /id</summary>

        - get test main data by id **without questions**
        - Request body
            ```json
                {
                    "id":1
                }
            ```
        - Response body
            - status(200):
                ```json
                    {
                    "id": 1,
                    "title": "Software Engineering",
                    "date": "2023-01-18T22:00:00.000Z",
                    "total_questions": 75,
                    "timer": 120,
                    "creator_id": 1
                    }
                ```
            * status(422): ``` Wrong data ```

        </details>
    - <details>
        <summary>POST : /</summary>

        - Create new test
        - Request body
            ```json
                {
                "title":"Software Engineering",
                "total_questions":50,
                "timer":120,
                "creator_id":1,
                "date":"2023-01-19"
                }
            ```
        - Response body
            - status(200):
                ```json
                    {
                    "id": 1,
                    "title": "Software Engineering",
                    "date": "2023-01-18T22:00:00.000Z",
                    "total_questions": 50,
                    "timer": 120,
                    "creator_id": 1
                    }
                ```
            * status(422): ``` Wrong data ```
        </details>
    - <details>
        <summary>PATCH : /update</summary>

        - update test main data **not questions or students in the test**
        - Request body
            ```json
                {
                "id":1,
                "title":"Software Engineering",
                "total_questions":75,
                "timer":120,
                "creator_id":1,
                "date":"2023-01-19"
                }
            ```
        - Response body
            - status(200):
                ```json
                    {
                    "id": 1,
                    "title": "Software Engineering",
                    "date": "2023-01-18T22:00:00.000Z",
                    "total_questions": 75,
                    "timer": 120,
                    "creator_id": 1
                    }
                ```
            * status(422): ``` Wrong data ```

        </details>
</details>

- #### Test questions
    - Add,remove and get question for test.
    - <details>
        <summary>test/question</summary>

        - <details>
            <summary>GET : /</summary>

            - get all questions in a spacific test
            - Request body:
                ```json
                    {
                    "test_id":1
                    }
                ```
            - Response body
                - status(200):
                    ```json
                        [
                        {
                            "content": "Which team won qatar 2022 nationals world cup",
                            "option1": "Egypt",
                            "option2": "France",
                            "option3": "Argantina",
                            "option4": "Brazil",
                            "correct_answer": "Argantina",
                            "score": 1,
                            "test_id": 1,
                            "question_id": 1
                        }
                        ]
                    ```
                * status(422): ``` Wrong data ```
            
            </details>
        - <details>
            <summary>POST : /</summary>

            - add question to test
            - Request body:
                ```json
                    {
                    "test_id":1,
                    "question_id":1,
                    "score":1
                    }
                ```
            - Response body
                - status(200):
                    ```json
                        {
                        "id": 1,
                        "question_id": 1,
                        "test_id": 1,
                        "score": 1
                        }
                    ```
                * status(422): ``` Wrong data ```
            
            </details>
        - <details>
            <summary>DELETE : /</summary>

            - remove question from test
            - Request body:
                ```json
                    {
                    "test_id":1,
                    "question_id":1
                    }
                ```
            - Response body
                - status(200):
                    ```json
                        {
                        "id": 1,
                        "question_id": 1,
                        "test_id": 1,
                        "score": 1
                        }
                    ```
                * status(422): ``` Wrong data ```
            
            </details>

    </details>

- #### test to student
    - Assign test to student
    - <details>
        <summary>/test/student</summary>

        - <details>
            <summary>GET : /</summary>

            - Get all students assigned to a test
            - Request body:
                ```json
                    {
                        "test_id":1
                    }
                ```
            - Response body
                - status(200):
                    ```json
                        [
                        {
                            "name": "Abdelhady",
                            "username": "HadyMohamed",
                            "national_id": "1111",
                            "university_id": "2222"
                        }
                        ]
                    ```
                * status(422): ``` Wrong data ```
            </details>
        - <details>
            <summary>POST : /</summary>

            - Assign test to a student
            - Request body:
                ```json
                    {
                        "test_id":1,
                        "student_id":2
                    }
                ```
            - Response body
                - status(200):
                    ```json
                        {
                        "id": 2,
                        "test_id": 1,
                        "student_id": 2
                        }
                    ```
                * status(422): ``` Wrong data ```
            </details>
        - <details>
            <summary>DELETE : /</summary>

            - remove student from a test
            - Request body:
                ```json
                    {
                        "test_id":1,
                        "student_id":1
                    }
                ```
            - Response body
                - status(200):
                    ```json
                        {
                        "id": 1,
                        "test_id": 1,
                        "student_id": 1
                        }
                    ```
                * status(422): ``` Wrong data ```
            </details>
    </details>
