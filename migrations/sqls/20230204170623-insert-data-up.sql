INSERT INTO languages(name) values ('English'),('Arabic');
INSERT INTO admin_type(type) values ('Super'),('Instructor');
INSERT INTO faculty(arabic_name,english_name) values ('الحاسبات و المعلومات','Computers and information');
INSERT INTO admins(type_id,national_id,faculty_id,arabic_name,english_name,username,password,phone)
values (1,'30204452700945',1,'عبدالهادي محمد','Abdelhady Mohamed','Hady23','$2b$10$UFlSWnZCDQvWrW026IUvdebSr5gN.Br/LfO4AMKeCEQVSNbfxXrha','+201045226688'),/*1111*/
        (1,'30214582700568',1,'محمد ياسر','Mohamed Yasser','MoYasser','$2b$10$sJIbJsctlATmoIe1imUuwOoy6g9yot3OVjcf3yJF2xIq8Z5JzMSz2','+201144558879'),/*admin*/
        (2,'30248682700241',1,'سمى محمد','Sama Mohamed','SamaMo','$2b$10$sJIbJsctlATmoIe1imUuwOoy6g9yot3OVjcf3yJF2xIq8Z5JzMSz2','+201549814450');/*admin*/
/*students*/
INSERT INTO students(national_id,university_id,faculty_id,arabic_name,english_name,username,password,phone,grade)
values ('30301452700123','2020191002',1,'سامي علي','Sami Ali','Sami22','$2b$10$q1jbisBT379r5cKQtdZ4BuszBaCx/uHOA.enEqrpFBdnXJNuImK6m','+201548877987','Junior');/*12345678*/
/*questions*/
INSERT INTO questions(creator_id,language_id,content,option1,option2,option3,option4,correct_answer)
VALUES (1,1,'Which team won the first FIFA Womens World Cup?',
          'United States','Sweden','Norway','Brazil',
          'Norway'),
       (1,1,'Which country hosted the 2019 World Table Tennis Championships?',
          'Hungary','China','Japan','Sweden',
          'Hungary'),
       (2,2,'تعتبر أكبر جزيرة في العالم من ناحية المساحة؟',
          'جزيرة آيسلندا','جزيرة أيرلندا','جزيرة غرينلاند','جزيرة سيلاند',
          'جزيرة غرينلاند');
/*test*/
INSERT INTO tests(creator_id,language_id,title,total_questions,min_score,timer,public,date)
VALUES (1,1,'Sports for you',2,1,5,FALSE,1676008800000);
