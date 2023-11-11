SELECT u.username, ur.role_id_role, ur.user_uuid, r.role_name, r.id_role
FROM users u
         INNER JOIN user_role ur
                    ON u.uuid = ur.user_uuid
         INNER JOIN roles r
                    ON r.id_role = ur.role_id_role
WHERE id_role = 4;

SELECT *
FROM roles;

SELECT *
FROM "knowledges"
ORDER BY created_at DESC
LIMIT 10;

SELECT *
FROM "references"
WHERE code_ref1 = '001';

SELECT *
FROM "references";

SELECT *
FROM "references"
WHERE code_ref1 = '001';

SELECT *
FROM knowledges;

SELECT *
FROM "quizzes"
WHERE quiz_title ILIKE '%jav%'
ORDER BY id_quiz DESC
LIMIT 2;

SELECT *
FROM sections;

SELECT *
FROM "references"
WHERE code_ref1 = '004'
  AND code_ref2 = '0043';


-- QUERIES FOR THE LIST OF THREAD
-- IN THE COURSE
SELECT c.course_name, t.threads_title, t.created_at
FROM courses c
         INNER JOIN threads t
                    ON c.id_course = t.id_course
WHERE c.id_course = 1
ORDER BY t.created_at;

SELECT *
FROM threads
WHERE id_course = 1
ORDER BY created_at DESC
LIMIT 10;


-- QUERIES FOR THE FORUM POSTS
-- IN THE THREADS
SELECT u.username, c.course_name, t.threads_title, p.content, p.created_at
FROM courses c
         INNER JOIN threads t
                    ON c.id_course = t.id_course
         INNER JOIN posts p
                    ON t.id_threads = p.id_threads
         INNER JOIN users u
                    ON p.user_uuid = u.uuid
WHERE t.id_threads = 1
ORDER BY p.created_at DESC;

SELECT *
FROM threads
WHERE id_threads = 1;

SELECT p.id_post,
       t.id_threads,
       t.threads_title,
       p.content,
       p.created_at,
       p.updated_at,
       u.username,
       u.uuid AS user_uuid,
       c.course_name,
       r.role_name
FROM courses c
         INNER JOIN threads t
                    ON c.id_course = t.id_course
         INNER JOIN posts p
                    ON t.id_threads = p.id_threads
         INNER JOIN users u
                    ON p.user_uuid = u.uuid
         INNER JOIN user_role ur
                    ON u.uuid = ur.user_uuid
         INNER JOIN roles r
                    ON r.id_role = ur.role_id_role
WHERE t.id_threads = 1
ORDER BY p.created_at
LIMIT 10 OFFSET 0;

INSERT INTO posts (id_threads, user_uuid, content)
VALUES (?, ?, ?)
RETURNING id_post, id_threads, user_uuid, content, created_at, updated_at;


SELECT *
FROM posts
WHERE id_threads = 6;

-- Count the number course that a user has
SELECT COUNT(c.id_course) AS number_of_course
FROM courses c
         INNER JOIN user_course uc
                    ON c.id_course = uc.course_id_course
WHERE uc.user_uuid = '02cf0f69-55bb-4ff7-8efd-9fc06353fec5';


-- Count the number of post that a user has
SELECT COUNT(p.id_post) AS number_of_post
FROM posts p
         INNER JOIN users u
                    ON p.user_uuid = u.uuid
WHERE u.uuid = 'cf97bdce-fd2d-415c-8ae7-7f998e2b1987';

-- Count the number of quiz that a user has
SELECT COUNT(q.id_quiz) AS number_of_quiz
FROM quizzes q
         INNER JOIN user_quizzes uq
                    ON q.id_quiz = uq.id_quiz
WHERE uq.user_uuid = '02cf0f69-55bb-4ff7-8efd-9fc06353fec5';

-- Average score of a user quiz in a course
SELECT AVG(uq.score) AS average_score
FROM user_quizzes uq
         INNER JOIN users u
                    ON uq.user_uuid = u.uuid
         INNER JOIN quizzes q
                    ON uq.id_quiz = q.id_quiz
WHERE u.uuid = '02cf0f69-55bb-4ff7-8efd-9fc06353fec5';

-- count how many times a user has taken a quiz by quiz id
SELECT q.id_quiz, q.quiz_title, COUNT(uq.id_quiz) AS attemps
FROM user_quizzes uq
         INNER JOIN users u
                    ON uq.user_uuid = u.uuid
         INNER JOIN quizzes q
                    ON uq.id_quiz = q.id_quiz
WHERE u.uuid = '02cf0f69-55bb-4ff7-8efd-9fc06353fec5'
  AND q.id_quiz = 1
GROUP BY q.id_quiz;

-- count how many times a user has taken a quiz by quiz id and get the attempt count
SELECT q.id_quiz, q.quiz_title, COUNT(uq.id_quiz) AS attemps
FROM user_quizzes uq
         INNER JOIN users u
                    ON uq.user_uuid = u.uuid
         INNER JOIN quizzes q
                    ON uq.id_quiz = q.id_quiz
WHERE u.uuid = '02cf0f69-55bb-4ff7-8efd-9fc06353fec5'
  AND q.id_quiz = 1
GROUP BY q.id_quiz;

-- list of quiz that a user has taken
SELECT q.id_quiz, q.quiz_title, q.quiz_desc, r.value_ref1 AS quiz_type, q.created_at, uq.score
FROM quizzes q
         INNER JOIN user_quizzes uq
                    ON q.id_quiz = uq.id_quiz
         INNER JOIN "references" r
                    ON q.quiz_type = r.code_ref2
WHERE uq.user_uuid = '02cf0f69-55bb-4ff7-8efd-9fc06353fec5';

-- count list of quiz that a user has taken
SELECT COUNT(q.id_quiz)
FROM quizzes q
         INNER JOIN user_quizzes uq
                    ON q.id_quiz = uq.id_quiz
         INNER JOIN "references" r
                    ON q.quiz_type = r.code_ref2
WHERE uq.user_uuid = '02cf0f69-55bb-4ff7-8efd-9fc06353fec5';


-- view recent post that a user has made in a thread
SELECT p.id_post,
       c.id_course,
       t.id_threads,
       t.threads_title,
       p.content,
       p.created_at,
       p.updated_at,
       u.username,
       u.uuid AS user_uuid,
       c.course_name,
       r.role_name
FROM courses c
         INNER JOIN threads t
                    ON c.id_course = t.id_course
         INNER JOIN posts p
                    ON t.id_threads = p.id_threads
         INNER JOIN users u
                    ON p.user_uuid = u.uuid
         INNER JOIN user_role ur
                    ON u.uuid = ur.user_uuid
         INNER JOIN roles r
                    ON r.id_role = ur.role_id_role
WHERE u.uuid = '02cf0f69-55bb-4ff7-8efd-9fc06353fec5'
ORDER BY p.created_at DESC
LIMIT 10;


-- Get link quiz to course
SELECT c.id_course, c.course_name, q.quiz_title, q.quiz_desc, q.created_at
FROM courses c
         INNER JOIN section_course sc
                    ON c.id_course = sc.course_id_course
         INNER JOIN sections s
                    ON sc.section_id_section = s.id_section
         INNER JOIN quizzes q
                    ON s.id_section = q.id_section
WHERE q.id_quiz = 99;

-- Get user role status
SELECT r.role_name
FROM users u
         INNER JOIN user_role ur
                    ON u.uuid = ur.user_uuid
         INNER JOIN roles r
                    ON r.id_role = ur.role_id_role
WHERE u.uuid = 'b3b9b16c-490f-4b02-9ab6-f7cca037f08b';


-- Select course that a user has enrolled that can be searched by course name
SELECT c.id_course, c.id_knowledge, c.course_name, c.course_desc, c.image, c.created_at, c.updated_at
FROM courses c
         INNER JOIN user_course uc
                    ON c.id_course = uc.course_id_course
WHERE uc.user_uuid = '02cf0f69-55bb-4ff7-8efd-9fc06353fec5'
  AND c.course_name ILIKE '%Python%'
ORDER BY c.created_at DESC
LIMIT 10 OFFSET 0;

-- count how many course that a user has enrolled
SELECT COUNT(c.id_course) AS number_of_course
FROM courses c
         INNER JOIN user_course uc
                    ON c.id_course = uc.course_id_course
WHERE uc.user_uuid = '02cf0f69-55bb-4ff7-8efd-9fc06353fec5';

SELECT c.id_course,
       c.id_knowledge,
       c.course_name,
       c.course_desc,
       c.image,
       c.date_start,
       c.date_end,
       c.created_at,
       c.updated_at
FROM courses c
         INNER JOIN user_course uc
                    ON c.id_course = uc.course_id_course
WHERE uc.user_uuid = '02cf0f69-55bb-4ff7-8efd-9fc06353fec5'
  AND c.course_name ILIKE '%%'
ORDER BY c.created_at
LIMIT 10 OFFSET 0;


-- select quiz that a user has taken and no duplicate
-- also average score of the quiz if user taken the quiz more than once
SELECT subq.id_quiz,
       subq.quiz_title,
       subq.quiz_desc,
       subq.value_ref1 AS quiz_type,
       subq.created_at,
       subq.average_score
FROM (SELECT q.id_quiz, q.quiz_title, q.quiz_desc, r.value_ref1, q.created_at, AVG(uq.score) AS average_score
      FROM quizzes q
               INNER JOIN user_quizzes uq ON q.id_quiz = uq.id_quiz
               INNER JOIN "references" r ON q.quiz_type = r.code_ref2
      WHERE uq.user_uuid = '02cf0f69-55bb-4ff7-8efd-9fc06353fec5'
      GROUP BY q.id_quiz, q.quiz_title, q.quiz_desc, q.quiz_type, q.created_at, r.value_ref1) subq
ORDER BY subq.average_score
LIMIT 10 OFFSET 0;

-- count query above
SELECT COUNT(subq.id_quiz)
FROM (SELECT q.id_quiz, q.quiz_title, q.quiz_desc, r.value_ref1, q.created_at, AVG(uq.score) AS average_score
      FROM quizzes q
               INNER JOIN user_quizzes uq ON q.id_quiz = uq.id_quiz
               INNER JOIN "references" r ON q.quiz_type = r.code_ref2
      WHERE uq.user_uuid = '02cf0f69-55bb-4ff7-8efd-9fc06353fec5'
      GROUP BY q.id_quiz, q.quiz_title, q.quiz_desc, q.quiz_type, q.created_at, r.value_ref1) subq;


SELECT c.id_course, c.course_name, q.quiz_title, q.quiz_desc, q.created_at
FROM courses c
         INNER JOIN section_course sc
                    ON c.id_course = sc.course_id_course
         INNER JOIN sections s
                    ON sc.section_id_section = s.id_section
         INNER JOIN quizzes q
                    ON s.id_section = q.id_section
WHERE q.id_quiz = '2';

-- Get question and answer of a quiz
SELECT q.id_quiz, q.quiz_title, qu.question_text, a.answer_text, a.is_correct
FROM quizzes q
         INNER JOIN questions qu
                    ON q.id_quiz = qu.id_quiz
         INNER JOIN answers a
                    ON qu.id_question = a.id_question
WHERE q.id_quiz = 2;


-- Get user that taken a quiz by quiz id and get the attempt count
SELECT DISTINCT u.username, u.uuid as user_uuid, COUNT(uq.id_quiz) AS attemps
FROM users u
         INNER JOIN user_quizzes uq
                    ON u.uuid = uq.user_uuid
WHERE uq.id_quiz = 1
GROUP BY u.uuid
LIMIT 10 OFFSET 0;

-- join user selected_answer with answer parse json b
SELECT u.username, u.uuid, uq.id_user_quiz, uq.score, uq.selected_answers, b.answer_text, b.is_correct
FROM users u
         INNER JOIN user_quizzes uq
                    ON u.uuid = uq.user_uuid
         INNER JOIN LATERAL JSONB_ARRAY_ELEMENTS_TEXT(uq.selected_answers) AS a ON TRUE
         INNER JOIN answers b
                    ON a::int = b.id_answer
WHERE uq.id_quiz = 1;

SELECT DISTINCT uq.id_user_quiz, uq.user_uuid, uq.id_user_quiz, a.answer_text, a.is_correct, q.id_question, a.id_answer
FROM questions q
         INNER JOIN (SELECT key::int AS question_id, value::int AS answer_id
                     FROM user_quizzes uq
                              CROSS JOIN LATERAL JSONB_EACH_TEXT(selected_answers
                         ) AS json_data) data ON q.id_question = data.question_id
         INNER JOIN answers a ON data.answer_id = a.id_answer
         INNER JOIN user_quizzes uq ON q.id_quiz = uq.id_quiz
WHERE uq.id_user_quiz = 4 AND uq.user_uuid = '02cf0f69-55bb-4ff7-8efd-9fc06353fec5';

SELECT * from user_quizzes WHERE selected_answers @> '{"1": 3, "2": 6, "3": 9}';

-- map selected answer key to question id and value to answer id and filter by user uuid and quiz id
SELECT DISTINCT key::int AS id_question, value::int AS id_answer, uq.id_user_quiz, uq.user_uuid, a.answer_text, a.is_correct, uq.score
FROM user_quizzes uq
         CROSS JOIN LATERAL JSONB_EACH_TEXT(selected_answers) AS json_data
         INNER JOIN answers a
                    ON json_data.value::int = a.id_answer
WHERE uq.user_uuid = '02cf0f69-55bb-4ff7-8efd-9fc06353fec5'
  AND uq.id_user_quiz = 7;

-- count how much attempt a user has taken a quiz based on uq.id_user_quiz
SELECT COUNT(uq.id_user_quiz)
FROM user_quizzes uq
         INNER JOIN quizzes q ON uq.id_quiz = q.id_quiz
         INNER JOIN users u ON uq.user_uuid = u.uuid
WHERE uq.id_user_quiz = 1;


SELECT COUNT(q.id_quiz)
FROM user_quizzes uq
         INNER JOIN quizzes q ON uq.id_quiz = q.id_quiz
         INNER JOIN users u ON uq.user_uuid = u.uuid
WHERE q.id_quiz = 1;

-- count only distinct user from quiz
SELECT COUNT(DISTINCT u.uuid)
FROM user_quizzes uq
         INNER JOIN quizzes q ON uq.id_quiz = q.id_quiz
         INNER JOIN users u ON uq.user_uuid = u.uuid
WHERE q.id_quiz = 1;

-- get question and answer of a quiz
SELECT DISTINCT qu.id_question, qu.id_quiz, qu.question_text, a.*
FROM quizzes q
         INNER JOIN questions qu
                    ON q.id_quiz = qu.id_quiz
         INNER JOIN answers a
                    ON qu.id_question = a.id_question
WHERE q.id_quiz = 1;

SELECT * FROM "answers" WHERE "answers"."id_question" IN (1,2,3);

SELECT * FROM "questions" WHERE "questions"."id_quiz" = 1;

SELECT * FROM "quizzes" WHERE "quizzes"."id_quiz" = 1 ORDER BY "quizzes"."id_quiz" LIMIT 1;

-- get all quiz attempt by user
SELECT uq.id_user_quiz, uq.user_uuid, q.*, a.*
FROM questions q
         INNER JOIN (SELECT key::int AS question_id, value::int AS answer_id
                     FROM user_quizzes uq
                              CROSS JOIN LATERAL JSONB_EACH_TEXT(selected_answers
                         ) AS json_data) data ON q.id_question = data.question_id
         INNER JOIN answers a ON data.answer_id = a.id_answer
         INNER JOIN user_quizzes uq ON q.id_quiz = uq.id_quiz
WHERE uq.user_uuid = '02cf0f69-55bb-4ff7-8efd-9fc06353fec5';


SELECT q.id_quiz,
       uq.id_user_quiz,
       uq.user_uuid,
       u.username,
       r.value_ref1 AS quiz_type,
       q.created_at,
       uq.score
FROM quizzes q
         INNER JOIN user_quizzes uq
                    ON q.id_quiz = uq.id_quiz
         INNER JOIN "references" r
                    ON q.quiz_type = r.code_ref2
         INNER JOIN users u
                    ON uq.user_uuid = u.uuid
WHERE q.id_quiz = 1
ORDER BY uq.score DESC;

-- select users that not assigned to a course
SELECT DISTINCT u.username, u.uuid AS user_uuid
FROM users u
WHERE u.uuid NOT IN (SELECT uc.user_uuid
                     FROM user_course uc
                              INNER JOIN courses c ON uc.course_id_course = c.id_course
                     WHERE c.id_course = 1)

ORDER BY u.username DESC
LIMIT 10 OFFSET 0;

SELECT DISTINCT u.username, u.uuid AS user_uuid
FROM users u
         INNER JOIN user_role ur
                    ON u.uuid = ur.user_uuid
WHERE u.username NOT IN (SELECT u.username
                         FROM users u
                                  INNER JOIN user_role ur
                                             ON u.uuid = ur.user_uuid
                                  INNER JOIN user_course uc
                                             ON u.uuid = uc.user_uuid
                                  INNER JOIN courses c
                                             ON uc.course_id_course = c.id_course
                         WHERE c.id_course = 1);

-- count how many post in a thread
SELECT DISTINCT COUNT(u.username) AS number_of_users
FROM users u
         INNER JOIN posts p
                    ON u.uuid = p.user_uuid
WHERE p.id_threads = 1;

-- count how many unique user uuid in a thread
SELECT COUNT(DISTINCT u.uuid) AS number_of_users
FROM users u
         INNER JOIN posts p
                    ON u.uuid = p.user_uuid
WHERE p.id_threads = 1;

-- select one last post in a thread
SELECT p.created_at
FROM users u
         INNER JOIN posts p
                    ON u.uuid = p.user_uuid
WHERE p.id_threads = 1
ORDER BY p.created_at DESC
LIMIT 1;

-- check if user enrolled in a course and return true or false
SELECT u.username, u.uuid AS user_uuid, c.course_name, c.id_course
FROM users u
         INNER JOIN user_course uc
                    ON u.uuid = uc.user_uuid
         INNER JOIN courses c
                    ON uc.course_id_course = c.id_course
WHERE u.uuid = 'dfdd8512-d688-47af-bcfc-7e1f676a651c'
  AND c.id_course = 3;

-- check if user enrolled in a course and return true or false
SELECT CASE WHEN u.username IS NOT NULL THEN TRUE ELSE FALSE END AS enrolled
FROM users u
         INNER JOIN user_course uc
                    ON u.uuid = uc.user_uuid
         INNER JOIN courses c
                    ON uc.course_id_course = c.id_course
WHERE u.uuid = '02cf0f69-55bb-4ff7-8efd-9fc06353fec5'
  AND c.id_course = 2;

SELECT * FROM threads WHERE id_course = 1;

SELECT COUNT(DISTINCT u.uuid) AS number_of_users,
       COUNT(p.id_post)       AS number_of_posts,
       t.id_threads,
       t.id_course,
       t.threads_title,
       t.created_at
FROM users u
         INNER JOIN posts p
                    ON u.uuid = p.user_uuid
         INNER JOIN threads t
                    ON p.id_threads = t.id_threads
WHERE t.id_course = 1
GROUP BY t.id_threads
LIMIT 10 OFFSET 0;


-- join course with approval_course
SELECT c.*, ac.status
FROM courses c
         LEFT JOIN approval_course ac
                   ON c.id_course = ac.id_course
WHERE c.course_name ILIKE '%%'
ORDER BY c.created_at DESC
LIMIT 10 OFFSET 0;

SELECT c.*, ac.status, ref.value_ref1 AS status_text
FROM courses c
         LEFT JOIN approval_course ac
                   ON c.id_course = ac.id_course
         LEFT JOIN "references" ref
                   ON ac.status::text = ref.code_ref2
WHERE ac.status = '0051'
  AND c.course_name ILIKE '%Unity%'
ORDER BY c.created_at DESC
LIMIT 10 OFFSET 0;


CREATE TYPE statusValue as enum ('0051', '0052', '0053');

ALTER TABLE approval_course
ALTER COLUMN status TYPE status USING status::status;

-- all approval course
SELECT ap.*, ref.value_ref1 AS status_text, c.course_name, u.username AS user_approver, u2.username AS user_request
FROM approval_course ap
         INNER JOIN public.courses c ON c.id_course = ap.id_course
         INNER JOIN public."references" ref ON ap.status::text = ref.code_ref2
         LEFT JOIN public.users u ON u.uuid = ap.user_uuid_approver
         LEFT JOIN public.users u2 ON u2.uuid = ap.user_uuid_request
WHERE c.course_name ILIKE '%%'
ORDER BY ap.created_at DESC
LIMIT 10 OFFSET 0;

-- count all approval course
SELECT COUNT(ap.id_approval_course)
FROM approval_course ap
         INNER JOIN public.courses c ON c.id_course = ap.id_course
         INNER JOIN public."references" ref ON ap.status::text = ref.code_ref2
         LEFT JOIN public.users u ON u.uuid = ap.user_uuid_approver
         LEFT JOIN public.users u2 ON u2.uuid = ap.user_uuid_request;


-- pending approval
SELECT ap.*, ref.value_ref1 AS status_text, c.course_name, u.username AS user_approver, u2.username AS user_request
FROM approval_course ap
         INNER JOIN courses c ON c.id_course = ap.id_course
         INNER JOIN "references" ref ON ap.status::text = ref.code_ref2
         LEFT JOIN users u ON u.uuid = ap.user_uuid_approver
         LEFT JOIN users u2 ON u2.uuid = ap.user_uuid_request
WHERE ap.status = '0051'
  AND course_name ILIKE '%%'
ORDER BY course_name DESC
LIMIT 10 OFFSET 0;



-- count pending approval
SELECT COUNT(ap.id_approval_course) as pending_approval
FROM approval_course ap
         INNER JOIN public.courses c ON c.id_course = ap.id_course
         LEFT JOIN public.users u ON u.uuid = ap.user_uuid_approver
         LEFT JOIN public.users u2 ON u2.uuid = ap.user_uuid_request
WHERE ap.status = '0051';

-- approved
SELECT ap.*, c.course_name, u.username AS user_approver, u2.username AS user_request
FROM approval_course ap
         INNER JOIN public.courses c ON c.id_course = ap.id_course
         LEFT JOIN public.users u ON u.uuid = ap.user_uuid_approver
         LEFT JOIN public.users u2 ON u2.uuid = ap.user_uuid_request
WHERE ap.status = '0052';

-- count approved
SELECT COUNT(ap.id_approval_course) as approved
FROM approval_course ap
         INNER JOIN public.courses c ON c.id_course = ap.id_course
         LEFT JOIN public.users u ON u.uuid = ap.user_uuid_approver
         LEFT JOIN public.users u2 ON u2.uuid = ap.user_uuid_request
WHERE ap.status = '0052';

-- rejected
SELECT ap.*, c.course_name, u.username AS user_approver, u2.username AS user_request
FROM approval_course ap
         INNER JOIN public.courses c ON c.id_course = ap.id_course
         LEFT JOIN public.users u ON u.uuid = ap.user_uuid_approver
         LEFT JOIN public.users u2 ON u2.uuid = ap.user_uuid_request
WHERE ap.status = '0053';

-- count rejected
SELECT COUNT(ap.id_approval_course) as rejected
FROM approval_course ap
         INNER JOIN public.courses c ON c.id_course = ap.id_course
         LEFT JOIN public.users u ON u.uuid = ap.user_uuid_approver
         LEFT JOIN public.users u2 ON u2.uuid = ap.user_uuid_request
WHERE ap.status = '0053';


SELECT SUM(CASE WHEN ap.status = '0051' THEN 1 ELSE 0 END) AS pending,
       SUM(CASE WHEN ap.status = '0052' THEN 1 ELSE 0 END) AS approved,
       SUM(CASE WHEN ap.status = '0053' THEN 1 ELSE 0 END) AS rejected
FROM approval_course ap
         INNER JOIN courses c ON c.id_course = ap.id_course
         LEFT JOIN users u ON u.uuid = ap.user_uuid_approver
         LEFT JOIN users u2 ON u2.uuid = ap.user_uuid_request;

SELECT ap.*, ref.value_ref1 AS status_text, c.course_name, u.username AS user_approver, u2.username AS user_request
FROM approval_course ap
         INNER JOIN public.courses c ON c.id_course = ap.id_course
         INNER JOIN public."references" ref ON ap.status::text = ref.code_ref2
         LEFT JOIN public.users u ON u.uuid = ap.user_uuid_approver
         LEFT JOIN public.users u2 ON u2.uuid = ap.user_uuid_request
WHERE c.course_name ILIKE '%%'
ORDER BY created_at
LIMIT 10 OFFSET 0;



-- all approval knowledge
SELECT ak.*, ref.value_ref1 AS status_text, k.knowledge_title, u.username AS user_approver, u2.username AS user_request
FROM approval_knowledge ak
         INNER JOIN knowledges k ON k.id_knowledge = ak.id_knowledge
         INNER JOIN "references" ref ON ak.status::text = ref.code_ref2
         LEFT JOIN users u ON u.uuid = ak.user_uuid_approver
         LEFT JOIN users u2 ON u2.uuid = ak.user_uuid_request
WHERE k.knowledge_title ILIKE '%%'
ORDER BY created_at DESC
LIMIT 10 OFFSET 0;

-- check if id approval knowledge status already 0052 or 0053 return true if already approved or rejected and false if not
SELECT CASE WHEN ak.status = '0052' OR ak.status = '0053' THEN TRUE ELSE FALSE END
FROM approval_knowledge ak
WHERE ak.id_approval_knowledge = 3;


-- update approval knowledge by id
UPDATE approval_knowledge
SET status = '0052', user_uuid_approver = '02cf0f69-55bb-4ff7-8efd-9fc06353fec5', approved_at = NOW(), comment = 'Oke deh'
WHERE id_approval_knowledge = 2;

-- count all approval knowledge
SELECT COUNT(ak.id_approval_knowledge)
FROM approval_knowledge ak
         INNER JOIN knowledges k ON k.id_knowledge = ak.id_knowledge
         INNER JOIN "references" ref ON ak.status::text = ref.code_ref2
         LEFT JOIN users u ON u.uuid = ak.user_uuid_approver
         LEFT JOIN users u2 ON u2.uuid = ak.user_uuid_request;

SELECT SUM(CASE WHEN ak.status = '0051' THEN 1 ELSE 0 END) AS pending,
       SUM(CASE WHEN ak.status = '0052' THEN 1 ELSE 0 END) AS approved,
       SUM(CASE WHEN ak.status = '0053' THEN 1 ELSE 0 END) AS rejected
FROM approval_knowledge ak
            INNER JOIN knowledges k ON k.id_knowledge = ak.id_knowledge
            LEFT JOIN users u ON u.uuid = ak.user_uuid_approver
            LEFT JOIN users u2 ON u2.uuid = ak.user_uuid_request;


SELECT COUNT(ak.id_approval_knowledge)
FROM approval_knowledge ak
         INNER JOIN knowledges k ON k.id_knowledge = ak.id_knowledge
         INNER JOIN "references" ref ON ak.status::text = ref.code_ref2
         LEFT JOIN users u ON u.uuid = ak.user_uuid_approver
         LEFT JOIN users u2 ON u2.uuid = ak.user_uuid_request
WHERE ak.status = '0052';

-- check if approval_knowledge_id is exist and status is 0051
SELECT CASE
           WHEN ak.status = '0051'
               THEN TRUE
           ELSE FALSE END AS is_exist
FROM approval_knowledge ak
WHERE ak.id_approval_knowledge = '6';

-- check if approval_course_id is exist and status is 0051
SELECT CASE
           WHEN ac.status = '0051'
               THEN TRUE
           ELSE FALSE END AS is_exist
FROM approval_course ac
WHERE ac.id_approval_course = '4';

-- check if approval_course_id is exist and status is 0052
SELECT CASE WHEN ac.status = '0052' THEN TRUE ELSE FALSE END
FROM approval_course ac
WHERE ac.id_approval_course = 6;


-- check if approval_course_id is exist and status is 0051
SELECT CASE WHEN ac.status = '0051' THEN TRUE ELSE FALSE END
FROM approval_course ac
WHERE ac.id_approval_course = 6;


-- get id approval_knowledge by id_knowledge
SELECT ak.id_approval_knowledge
FROM approval_knowledge ak
    INNER JOIN knowledges k ON k.id_knowledge = ak.id_knowledge
WHERE ak.id_knowledge = 7;

SELECT ac.id_approval_course
FROM approval_course ac
         INNER JOIN courses c ON c.id_course = ac.id_course
WHERE ac.id_course = 3;


SELECT COUNT(ac.id_approval_course) AS accepted
FROM approval_course ac
         INNER JOIN courses c ON ac.id_course = c.id_course
WHERE ac.status = '0052'
  AND ac.user_uuid_approver = '58d76fc2-db09-491a-8387-f2a5750b64e3';


SELECT k.id_knowledge,
       k.knowledge_title,
       k.description,
       u.username    AS user_request,
       u2.username   AS user_approver,
       ak.approved_at,
       ak.status,
       ak.comment,
       rf.value_ref1 AS status_text
FROM approval_knowledge ak
         INNER JOIN knowledges k ON k.id_knowledge = ak.id_knowledge
         INNER JOIN users u ON ak.user_uuid_request = u.uuid
         INNER JOIN users u2 ON ak.user_uuid_approver = u2.uuid
         INNER JOIN "references" rf ON ak.status::text = rf.code_ref2
WHERE ak.user_uuid_approver = '58d76fc2-db09-491a-8387-f2a5750b64e3'
LIMIT 10 OFFSET 0;


SELECT c.id_course,
       c.course_name,
       u.username    AS user_request,
       u2.username   AS user_approver,
       ac.approved_at,
       ac.status,
       ac.comment,
       rf.value_ref1 AS status_text
FROM approval_course ac
         INNER JOIN courses c ON c.id_course = ac.id_course
         INNER JOIN users u ON ac.user_uuid_request = u.uuid
         INNER JOIN users u2 ON ac.user_uuid_approver = u2.uuid
         INNER JOIN "references" rf ON ac.status::text = rf.code_ref2
WHERE ac.user_uuid_approver = '58d76fc2-db09-491a-8387-f2a5750b64e3'
LIMIT 10 OFFSET 0;

SELECT k.*,
       c.category_name,
       ak.status      AS status_code,
       ref.value_ref1 AS status_text,
       ak.comment,
       ak.user_uuid_approver,
       ak.user_uuid_request,
       u.username     AS user_approver,
       u2.username    AS user_request
FROM knowledges k
         LEFT JOIN approval_knowledge ak ON k.id_knowledge = ak.id_knowledge
         LEFT JOIN category c ON k.id_category = c.id_category
         LEFT JOIN "references" ref ON ak.status::text = ref.code_ref2
         LEFT JOIN users u ON u.uuid = ak.user_uuid_approver
         LEFT JOIN users u2 ON u2.uuid = ak.user_uuid_request
WHERE k.knowledge_title ILIKE '%pYTHON%'
AND k.id_category IN (9, 15)
ORDER BY id_knowledge
LIMIT 10 OFFSET 0;


select c.*,
       k.knowledge_title,
       ac.status      AS status_code,
       ref.value_ref1 AS status_text,
       ac.comment,
       ac.user_uuid_approver,
       ac.user_uuid_request,
       u.username     AS user_approver,
       u2.username    AS user_request
FROM courses c
         LEFT JOIN knowledges k ON c.id_knowledge = k.id_knowledge
         LEFT JOIN approval_course ac ON c.id_course = ac.id_course
         LEFT JOIN "references" ref ON ac.status::text = ref.code_ref2
         LEFT JOIN users u ON u.uuid = ac.user_uuid_approver
         LEFT JOIN users u2 ON u2.uuid = ac.user_uuid_request
WHERE c.course_name ILIKE '%%'
ORDER BY id_course ASC
LIMIT 10 OFFSET 0;


INSERT INTO approval_course (id_course, status, user_uuid_request, user_uuid_approver, created_at, updated_at)
VALUES (1, '0051', '02cf0f69-55bb-4ff7-8efd-9fc06353fec5', '58d76fc2-db09-491a-8387-f2a5750b64e3', NOW(), NOW());


SELECT ac.*, ref.value_ref1 AS status_text, c.course_name, u.username AS user_approver, u2.username AS user_request
FROM approval_course ac
         INNER JOIN courses c ON c.id_course = ac.id_course
         INNER JOIN "references" ref ON ac.status::text = ref.code_ref2
         LEFT JOIN users u ON u.uuid = ac.user_uuid_approver
         LEFT JOIN users u2 ON u2.uuid = ac.user_uuid_request
WHERE ac.id_course = ?;


SELECT CASE WHEN ak.status = '0051' OR ak.status = '0052' OR ak.status = '0053' THEN TRUE ELSE FALSE END
FROM approval_knowledge ak
WHERE ak.id_knowledge = '23';


SELECT CASE WHEN ac.status = '0051' OR ac.status = '0052' OR ac.status = '0053' THEN TRUE ELSE FALSE END
FROM approval_course ac
WHERE ac.id_course = '7';


-- if ak.status not 0053 then return true
SELECT CASE WHEN ak.status = '0053' THEN TRUE ELSE FALSE END
FROM approval_knowledge ak
WHERE ak.id_knowledge = '23';


SELECT CASE WHEN ac.status = '0053' THEN TRUE ELSE FALSE END
FROM approval_course ac
WHERE ac.id_course = '7';


SELECT c.id_course,
       c.id_knowledge,
       c.course_name,
       c.course_desc,
       c.image,
       c.date_start,
       c.date_end,
       c.created_at,
       c.updated_at
FROM courses c
         INNER JOIN user_course uc
                    ON c.id_course = uc.course_id_course
         INNER JOIN approval_course ac
                    ON c.id_course = ac.id_course
WHERE uc.user_uuid = '524101f8-69d8-4d35-adeb-8406e39cd2f1'
  AND c.course_name ILIKE '%%'
ORDER BY c.created_at ASC
LIMIT 1000 OFFSET 0;

-- select case if user enrolled in a course and course status is approved
SELECT CASE WHEN uc.user_uuid IS NOT NULL AND ac.status = '0052' THEN TRUE ELSE FALSE END
FROM courses c
         INNER JOIN user_course uc
                    ON c.id_course = uc.course_id_course
         INNER JOIN approval_course ac
                    ON c.id_course = ac.id_course
WHERE uc.user_uuid = '524101f8-69d8-4d35-adeb-8406e39cd2f1'
  AND ac.status = '0052'
  AND c.id_course = 3;


-- SELECT ENROLLED COURSE
SELECT * FROM courses WHERE id_course IN (SELECT course_id_course FROM user_course WHERE user_uuid = '524101f8-69d8-4d35-adeb-8406e39cd2f1');


-- SELECT USERS WITH ROLE
SELECT u.*, STRING_AGG(r.role_name, ',') AS roles
FROM users u
         INNER JOIN user_role ur
                    ON u.uuid = ur.user_uuid
         INNER JOIN roles r
                    ON ur.role_id_role = r.id_role
WHERE u.username ILIKE '%%'
GROUP BY u.uuid, u.created_at
ORDER BY u.created_at DESC
LIMIT 10 OFFSET 1;


-- CREATE USER AND ASSIGN ROLE IN ONE QUERY
INSERT INTO users (username, email, password, created_at, updated_at)
VALUES ('test', 'novianandika@gmail.com', '123456', NOW(), NOW())
RETURNING uuid;

INSERT INTO user_role (user_uuid, role_id_role)
VALUES ('b3b9b16c-490f-4b02-9ab6-f7cca037f08b');


SELECT COUNT(u.uuid)
FROM users u;


-- ASSIGN USER TO ROLE
INSERT INTO user_role (user_uuid, role_id_role)
VALUES ('b3b9b16c-490f-4b02-9ab6-f7cca037f08b', 1);





-- REMOVE ROLE FROM USER
DELETE FROM user_role WHERE user_uuid = 'b3b9b16c-490f-4b02-9ab6-f7cca037f08b' AND role_id_role = 1;


SELECT CASE WHEN ur.role_id_role = 2 THEN TRUE ELSE FALSE END
FROM user_role ur
WHERE ur.user_uuid = '524101f8-69d8-4d35-adeb-8406e39cd2f1';


SELECT k.*,
       ak.status      AS status_code,
       ref.value_ref1 AS status_text,
       ak.comment,
       ak.user_uuid_approver,
       ak.user_uuid_request,
       u.username     AS user_approver,
       u2.username    AS user_request
FROM knowledges k
         LEFT JOIN approval_knowledge ak ON k.id_knowledge = ak.id_knowledge
         LEFT JOIN "references" ref ON ak.status::text = ref.code_ref2
         LEFT JOIN users u ON u.uuid = ak.user_uuid_approver
         LEFT JOIN users u2 ON u2.uuid = ak.user_uuid_request
WHERE k.knowledge_title ILIKE '%%'
  AND ak.status IN ('0051', '0052')
ORDER BY created_at ASC
LIMIT 10 OFFSET 0;

SELECT k.*,
       ak.status      AS status_code,
       ref.value_ref1 AS status_text,
       ak.comment,
       ak.user_uuid_approver,
       ak.user_uuid_request,
       u.username     AS user_approver,
       u2.username    AS user_request
FROM knowledges k
         LEFT JOIN approval_knowledge ak ON k.id_knowledge = ak.id_knowledge
         LEFT JOIN "references" ref ON ak.status::text = ref.code_ref2
         LEFT JOIN users u ON u.uuid = ak.user_uuid_approver
         LEFT JOIN users u2 ON u2.uuid = ak.user_uuid_request
WHERE k.knowledge_title ILIKE '%%'
  AND ak.status IN ('0052')
ORDER BY created_at ASC
LIMIT 10 OFFSET 0;


SELECT q.*,
       ref.value_ref1 AS status_text
FROM quizzes q
INNER JOIN "references" ref ON q.quiz_type = ref.code_ref2
WHERE q.quiz_title ILIKE '%%'
AND q.quiz_type IN  ('0022')
ORDER BY q.created_at DESC
LIMIT 10 OFFSET 0;


SELECT c.*,
       (SELECT COUNT(*)
        FROM knowledges k
        WHERE k.id_category = c.id_category) AS total_knowledge
FROM category c
WHERE c.category_name ILIKE '%%';

SELECT c.*,
       (SELECT COUNT(*)
        FROM knowledges k
        WHERE k.id_category = c.id_category) AS total_knowledge
FROM category c
WHERE c.category_name ILIKE '%%'
ORDER BY created_at DESC
LIMIT 10 OFFSET 0;


SELECT t.threads_title,
       t.created_at,
       (SELECT COUNT(*) FROM posts p WHERE p.id_threads = t.id_threads)                    AS total_post,
       (SELECT COUNT(DISTINCT p.user_uuid) FROM posts p WHERE p.id_threads = t.id_threads) AS total_user,
       c.id_course,
       c.course_name
FROM threads t
         INNER JOIN courses c ON t.id_course = c.id_course
         INNER JOIN user_course uc ON c.id_course = uc.course_id_course
         INNER JOIN users u ON uc.user_uuid = u.uuid
WHERE u.uuid = '197aad55-b0bb-4c5c-bee2-aa3399b35214';

SELECT q.id_quiz, q.quiz_title, q.quiz_desc, q.quiz_type as quiz_type_code, r.value_ref1 AS quiz_type, q.created_at, uq.score
FROM quizzes q
         INNER JOIN user_quizzes uq
                    ON q.id_quiz = uq.id_quiz
         INNER JOIN "references" r
                    ON q.quiz_type = r.code_ref2
WHERE uq.user_uuid = '02cf0f69-55bb-4ff7-8efd-9fc06353fec5'
AND q.quiz_type IN ('0022')
ORDER BY q.created_at ASC
LIMIT 10 OFFSET 0;