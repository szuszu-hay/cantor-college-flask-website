from config import db_config
import mysql.connector
from flask import Flask, render_template
from collections import defaultdict

app = Flask(__name__)

@app.route('/')
def home():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    
    cursor.execute("SELECT * FROM courses")
    data = cursor.fetchall()
    
    cursor.close()
    conn.close()

    return render_template('home.html', data=data)

@app.route('/computing')
def computing():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    
    cursor.execute("SELECT course_id, course_title, course_subject FROM courses " \
    "WHERE LOWER(course_subject) = %s LIMIT 5", ("computing",))
    
    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return render_template('computing.html', title='Computing Courses', data=data)


@app.route('/design')
def design():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    
    cursor.execute("SELECT course_id, course_title, course_subject FROM courses " \
    "WHERE LOWER(course_subject) = %s LIMIT 5", ("art and design",))
    
    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return render_template('design.html', title='Design Courses', data=data)

@app.route('/learning_resources')
def learning_resources():
    return render_template('learning_resources.html', title='Rules Governing the Use of the Library and Resource Centre', subtitle1='Introduction', subtitle2='Access', subtitle3='Use of Facilities')


@app.route('/info-for-staff')
def staff():
    return render_template('info-for-staff.html', title='Information for Staff')


@app.route('/info-for-students')
def students():
    return render_template('info-for-students.html', title='Information for Students')

@app.route('/courses')
def courses():
    conn = mysql.connector.connect(**db_config)

    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM courses")

    data = cursor.fetchall()

    cursor.close()
    conn.close()
    
    #group courses by subject
    group_by_subject = defaultdict(list)

    for course in data:
        group_by_subject[course["course_subject"]].append(course)

    #
    return render_template('courses.html', data=data, group_by_subject=group_by_subject)

@app.route('/courses/<int:course_id>')
def course_details(course_id):
    # Connect to the database
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)

    # Query the database for the staff member by their ID
    cursor.execute("SELECT * FROM courses WHERE course_id = %s", (course_id,))
    courses = cursor.fetchone()  # Fetch one record
    
    # Close database connections
    cursor.close()
    conn.close()
    
    # If the staff member exists, render the details page template
    if courses:
        return render_template('course_details.html', course=courses)
    else:
        # If no matching staff member, return 404 error page
        return "Courses not found", 404


@app.route('/info-for-business')
def business():
    return render_template('info-for-business.html', title='Information for Business')


if __name__ == '__main__':
    app.run(debug=True)
