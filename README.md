# TestingPlatform
Testing platform RESTFul API integrated with PostgreSql database for faculty online exams nodejs &amp; typescript based.
## Sections
- [Features v0](#features-v0)
- [How to start](#how-to-start)
- [End Points](#end-points)
    * [Student](#Student)
        * [Student's_test](#student-test)
    * [Admin](#Admin)
        * [Admin's_test](#admin-test)
    * [Question](#question)
    * [Tags](#tags)
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
- Run db:up script to build database shcema 
    ```
    npm run db:up
    ```
- Run dev script to start the application
    ```
    npm run dev
    ```
- Open http://127.0.0.1:3000/v0
## How to use
- admin accounts:
    * Abdelhady Mohamed :
        ```json
            {
                "national_id":"30204452700945",
                "password":1111
            }
        ```
    * Mohamed Yasser :
        ```json
            {
                "national_id":"30214582700568",
                "password":"admin"
            }
        ```
    * Sama Mohamed :
        ```json
            {
                "national_id":"30248682700241",
                "password":"admin"
            }
        ```
- student account:
    * Sami Ali:
        ```json
        {
            "national_id":"30301452700123",
            "password":"12345678"
        }
        ```
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
                    "arabic_name":"احمد احمد",
                    "english_name": "Ahmed",//may be null
                    "username": "Ahmed",
                    "password": "$2b$10$UOXLOi5BTu2ROiP.0RXoHOFieJTOe6f6xmDIU47Yij6VHOvrJ/dT6",
                    "national_id": "1212",
                    "university_id": "2121",//may be null
                    "phone":"01010010",//may be "null"
                    "faculty_id":1,
                    "grade":"junior"
                    }
                ]
                ```
        </details>
    - <details>
        <summary>GET : /national</summary>

        * Get user using national ID
        * Token required as Bearer
        * Request body : JSON
            ```json
            {        
                "national_id":"1212"
            }
            ```
        * Response body 
            * status(200)
                ```json
                {
                    "id": 1,
                    "arabic_name":"احمد احمد",
                    "english_name": "Ahmed",//may be null
                    "username": "Ahmed",
                    "national_id": "1212",
                    "university_id": "2121",//may be null
                    "phone":"01010010",//may be "null"
                    "faculty_id":1,
                    "grade":"junior"
                }
                ```
            * status(422) : ```Wrong data```

        </details>
    - <details>
        <summary>GET : /id</summary>

        * Get user using ID
        * Token required as Bearer
        * Request body : JSON
            ```json
            {        
                "id":1
            }
            ```
        * Response body
            * status(200)
                ```json
                {
                    "student_id": 1,
                    "national_id": "1212",
                    "university_id": "2121",
                    "arabic_name": "احمد احمد",
                    "english_name": "Ahmed",
                    "username": "Ahmed",
                    "phone": "0101010",
                    "faculty_id": 1,
                    "grade":"junior"
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
                "national_id": "1212"
            }
            ```
        * Response body
            * status(200): header containts token attribute
                ```json
                {
                "student_id": 1,
                "national_id": "1212",
                "university_id": "2121",
                "arabic_name": "احمد احمد",
                "english_name": "Ahmed",
                "username": "Ahmed",
                "password": "$2b$10$7a1dsfubQXr1X6wWFjAtnulZlnGC.MX/Wj8Te6h4skGLDdF08OaDC",
                "phone": "0101010",
                "faculty_id": 1,
                "faculty":"الحاسبات والمعلومات",
                "grade":"junior"
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
                "arabic_name":"احمد احمد",
                "english_name": "Ahmed",//may be "null"
                "username":"Ahmed",//must be unique
                "password":"12345678",
                "national_id":"1212",//must be unique
                "university_id": "2121",//may be "null"
                "phone":"01010010",//may be "null"
                "faculty_id":1,
                "grade":"junior"
                }
            ```
        * Response body
            * status(200): header containts token attribute
                ```json
                {
                    "student_id": 1,
                    "arabic_name":"عبدالهادي",
                    "english_name": "Abdelhady",//may be "null"
                    "username":"hady",
                    "national_id":"1212",//must be unique
                    "university_id": "2020191071",//may be "null"
                    "phone":"01010010",//may be "null"
                    "faculty_id":1,
                    "grade":"junior"
                }
                ```

            * status(400) : ```reserved keys : key1,key2```
            * status(422) : ```Wrong data```
        </details>
</details>

- #### Student test
    - Get students' tests
    - <details>
        <summary>/test</summary>

        - <details>
            <summary>GET : /</summary>

            - Get all tests for a student
            - Request body:
                ```json
                {
                "student_id":1
                }
                ```
            - Response body:
                - status(200):
                    ```json
                    [
                    {
                        "title": "Sports for you",
                        "test_id": 1,
                        "date": "1676008800000",
                        "score": null,
                        "public": false
                    }
                    ]
                    ```
                -status(422): ```Wrong data```

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
                        "admin_id": 1,
                        "type_id": 1,
                        "national_id": "2323",
                        "arabic_name": "عبدالهادي محمد",
                        "english_name": "Abdelhady Mohamed",//may be null
                        "username": "Hady23",
                        "phone": "01010",//may be null
                        "faculty_id": 1
                    }
                ]
                ```
        </details>
    - <details>
        <summary>GET : /username</summary>

        * Get admin by username
        * Token required as Bearer
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
                "admin_id": 1,
                "type_id": 1,
                "national_id": "2323",
                "arabic_name": "عبدالهادي محمد",
                "english_name": "Abdelhady Mohamed",//may be null
                "username": "Hady23",
                "phone": "01010",//may be null
                "faculty_id": 1//may be null
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
            * status(200): header containts token attribute
                ```json
                {
                "admin_id": 1,
                "type_id": 1,
                "faculty_id": 1,
                "national_id": "2323",
                "arabic_name": "عبدالهادي محمد",
                "english_name": "Abdelhady Mohamed",//may be null
                "username": "Hady23",
                "phone": "01010",//may be null
                "faculty": "الحاسبات و المعلومات",
                 "type": "Super"
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
                "arabic_name":"عبدالهادي محمد",
                "english_name": "Abdelhady Mohamed",//may be null
                "username": "Hady23",//must be unique
                "national_id": "2323",//must be unique
                "password":"1111",
                "phone":"01010",//may be null
                "type_id":1,
                "faculty_id":1
            }
            ```
        * Response body
            * status(200): header containts token attribute
                ```json
               {
                "admin_id":q,
                "type_id": 1,
                "national_id": "2323",
                "arabic_name": "عبدالهادي محمد",
                "english_name": "Abdelhady Mohamed",//may be null
                "username": "Hady23",
                "phone": "01010",//may be null
                "faculty_id": 1
                }
                ```
            * status(400): ``` reserved keys : key1,key2  ```
        </details>
</details>

- #### admin test
    - Get admins' tests
    - <details>
        <summary>/test</summary>

        - <details>
            <summary>GET : /</summary>
            
            - Get all tests created by an admin
            - Token required as Bearer
            - Request body : 
                ```json
                {
                    "admin_id":1
                }
                ```
            - Response body :
                - status(200):
                    ```json
                        [
                        {
                            "test_id": 1,
                            "title": "Sports for you",
                            "date": "1676008800000",//unix time
                            "min_score": 1,
                            "total_questions": 2,
                            "timer": 5,
                            "creator_id": 1,
                            "language_id": 1,
                            "public": false
                        }
                        ]
                    ```
                - status(422): ```Wrong data```
            </details>
        </details>

#### Tags
- future feature , add question tags 
- <details>
    <summary>/tag</summary>

    - <details>
        <summary>GET : /</summary>
        
        * Get all tags
        * No Request body required
        * Response body
            * status(200)
                ```json
                    [
                        {
                            "tag_id": 1,
                            "name": "Math"
                        },
                        {
                            "tag_id": 2,
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
                    "tag_id": 2,
                    "name": "Sport"
                    }
                ```
            * status(422): ``` Wrong data ```

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
                    "tag_id": 2,
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
                        "question_id": 1,
                        "content": "Which team won qatar 2022 nationals world cup",
                        "option1": "Egypt",
                        "option2": "France",
                        "option3": "Argantina",//may be null
                        "option4": "Brazil",//may be null
                        "correct_answer": "Argantina",
                        "language_id":1,
                        "creator_id":1
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
            "language_id":"2",
            "creator_id":1,
            "option1":"Egypt",
            "option2":"France",
            "option3":"Argantina",//may be null
            "option4":"Brazil",//may be null
            "correct_answer":"Argantina"
            }
            ```
        * Response body
            * status(200):
                ```json
                {
                "question_id": 1,
                "content": "Which team won qatar 2022 world cup",
                "language_id": 2,
                "option1": "Egypt",
                "option2": "France",
                "option3": "Argantina",//may be null
                "option4": "Brazil",//may be null
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
                "question_id": 1,
                "content": "Which team won qatar 2022 world cup",
                "language_id": 2,
                "creator_id":1,
                "option1": "Egypt",
                "option2": "France",
                "option3": "Argantina",//may be null
                "option4": "Brazil",//may be null
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
                    "language_id": 2,
                    "creator_id":1,
                    "option1": "Egypt",
                    "option2": "France",
                    "option3": "Argantina",//may be null
                    "option4": "Brazil",//may be null
                    "correct_answer":"Argantina"
                }
            ```
        * Response body
            * status(200): //the entire question after edit
                ```json
                    {
                    "question_id": 1,
                    "content": "Which team won qatar 2022 nationals world cup",
                    "language_id": 2,
                    "creator_id":1,
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
                        "test_id": 1,
                        "creator_id": 1,
                        "title": "Software Engineering",
                        "date": 1675459489775,//unix timestamp
                        "total_questions": 75,
                        "timer": 120,//may be null
                        "min_score":30,//may be null
                        "language_id":1,
                        "public":false
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
                    "test_id": 1,
                    "creator_id": 1,
                    "title": "Software Engineering",
                    "date": 1675459489775,
                    "total_questions": 75,
                    "timer": 120,
                    "timer": 120,//may be null
                    "min_score":30,//may be null
                    "language_id":1,
                    "public":false
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
                "creator_id":1,
                "title":"Software Engineering",
                "total_questions":50,
                "timer":120,
                "date":1675459489775,
                "timer": 120,//may be null
                "min_score":30,//may be null
                "language_id":1,
                "public":false
                }
            ```
        - Response body
            - status(200):
                ```json
                    {
                    "creator_id": 1,
                    "test_id": 1,
                    "title": "Software Engineering",
                    "date": 1675459489775,
                    "total_questions": 50,
                    "timer": 120,//may be null
                    "min_score":30,//may be null
                    "language_id":1,
                    "public":false
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
                "question_id":1,
                "title":"Software Engineering",
                "total_questions":75,
                "creator_id":1,
                "date":1675459489775,
                "timer": 120,//may be null
                "min_score":30,//may be null
                "language_id":1,
                "public":false
                }
            ```
        - Response body
            - status(200):
                ```json
                    {
                    "question_id":1,
                    "title":"Software Engineering",
                    "total_questions":75,
                    "creator_id":1,
                    "date":1675459489775,
                    "timer": 120,//may be null
                    "min_score":30,//may be null
                    "language_id":1,
                    "public":false
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
                            "test_id": 1,
                            "question_id": 1
                            "content": "Which team won qatar 2022 nationals world cup",
                            "option1": "Egypt",
                            "option2": "France",
                            "option3": "Argantina",
                            "option4": "Brazil",
                            "score": 1,
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
                    "test_question_id": 4,
                    "question_id": 2,
                    "test_id": 1,
                    "timer": 60,
                    "score": 1
                    }
                ```
            - Response body
                - status(200):
                    ```json
                        {
                        "test_question_id": 1,
                        "question_id": 1,
                        "test_id": 1,
                        "timer": 60,
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
                        "test_question_id": 1,
                        "question_id": 1,
                        "test_id": 1,
                        "score": 1,
                        "timer":60
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
                            "arabic_name":"عبدالهادي محمد",
                            "english_name": "Abdelhady",
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
                        "test_student_id": 1,
                        "test_id": 1,
                        "student_id": 1
                        }
                    ```
                * status(422): ``` Wrong data ```
            </details>
    </details>
