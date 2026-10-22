USE mydb;

DROP TABLE IF EXISTS courses;

CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_title VARCHAR(150) NOT NULL,
    course_subject VARCHAR(50) NOT NULL,
    course_award_name VARCHAR(50),
    course_type VARCHAR(50),
    course_summary TEXT,
    has_foundation_year VARCHAR(5) DEFAULT 'No',
    mode_of_attendance VARCHAR(50),
    study_length VARCHAR(50),
    ucas_code VARCHAR(10),
    ucas_points VARCHAR(20),
    year_of_entry VARCHAR(10)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO courses
(course_title, course_subject, course_award_name, course_type, course_summary, has_foundation_year, mode_of_attendance, study_length, ucas_code, ucas_points, year_of_entry) VALUES
('Computer Science', 'Computing', 'BSc (Hons)', 'Undergraduate', 'Core principles of programming, algorithms, databases and computer systems, with a final-year project.', 'Yes', 'Full-time', '3 years', 'G401', '112-128', '2026'),
('Software Engineering', 'Computing', 'BSc (Hons)', 'Undergraduate', 'Design, build and test reliable software in teams, using agile methods and modern tools.', 'No', 'Full-time', '3 years', 'G601', '112-120', '2026'),
('Cyber Security', 'Computing', 'BSc (Hons)', 'Undergraduate', 'Learn how to protect networks and systems, from ethical hacking to digital forensics.', 'No', 'Full-time', '3 years', 'G701', '104-120', '2026'),
('Data Science', 'Computing', 'BSc (Hons)', 'Undergraduate', 'Collect, analyse and visualise data using statistics, Python and machine learning.', 'Yes', 'Full-time', '3 years', 'G501', '104-120', '2026'),
('Artificial Intelligence', 'Computing', 'BSc (Hons)', 'Undergraduate', 'Explore machine learning, neural networks and the ethics of intelligent systems.', 'No', 'Full-time', '3 years', 'G801', '112-128', '2026'),
('Games Programming', 'Computing', 'BSc (Hons)', 'Undergraduate', 'Build game engines and interactive experiences, with a focus on graphics and physics.', 'No', 'Full-time', '4 years (with placement)', 'G451', '104-120', '2026'),
('Graphic Design', 'Art and Design', 'BA (Hons)', 'Undergraduate', 'Develop skills in typography, branding and visual communication for print and screen.', 'No', 'Full-time', '3 years', 'W211', '96-112', '2026'),
('Illustration', 'Art and Design', 'BA (Hons)', 'Undergraduate', 'Create original illustration for books, editorial, games and animation.', 'No', 'Full-time', '3 years', 'W221', '96-112', '2026'),
('Fashion Design', 'Art and Design', 'BA (Hons)', 'Undergraduate', 'From sketch to garment: pattern cutting, textiles and collection design.', 'Yes', 'Full-time', '3 years', 'W231', '96-112', '2026'),
('Interior Design', 'Art and Design', 'BA (Hons)', 'Undergraduate', 'Design inviting and practical spaces, from concept sketches to 3D models.', 'No', 'Full-time', '3 years', 'W241', '96-112', '2026'),
('Animation', 'Art and Design', 'BA (Hons)', 'Undergraduate', 'Storyboarding, character design and 2D and 3D animation production.', 'No', 'Full-time', '3 years', 'W251', '104-120', '2026'),
('Photography', 'Art and Design', 'BA (Hons)', 'Undergraduate', 'Studio and location photography, editing, and building a professional portfolio.', 'No', 'Part-time', '5 years', 'W261', '96-112', '2026');

SELECT course_subject, COUNT(*) FROM courses GROUP BY course_subject;

USE mydb;

UPDATE courses
SET has_foundation_year = CASE has_foundation_year WHEN 'Yes' THEN '1' ELSE '0' END
WHERE course_id > 0;

ALTER TABLE courses MODIFY has_foundation_year TINYINT(1) NOT NULL DEFAULT 0;

SELECT course_title, has_foundation_year FROM courses;