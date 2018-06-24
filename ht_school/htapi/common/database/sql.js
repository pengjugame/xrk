'use strict';

/**--users 操作---**/
/*users: {
    exist_user: exist_user(),
    select_user_subscribe: select_user_subscribe(),
    add_user: add_user(),
    update_user_subscribe: update_user_subscribe(),
    update_user_unsubscribe: update_user_unsubscribe()
}*/

function exist_user() {
    return "select * from xrk_users where openid = ? "
}

function select_user_subscribe() {
    return "select * from xrk_users where subscribe = 1"
}

function add_user() {
    return "insert into xrk_users set ? "
}

function update_user_subscribe() {
    return "update xrk_users SET subscribe = 1 where openid = ? "
}

function update_user_unsubscribe() {
    return "update xrk_users SET subscribe = 0 where openid = ? "
}

/**--schools表 操作---**/
/*shcools:{
    exist_school: exist_school(),
    select_school: select_school(),
    select_school_active: select_school_active(),
    add_school: add_school(),
    delete_school: delete_school(),
    update_school_base: update_school_base(),
    active_school: active_school(),
    deactive_school: deactive_school()
}*/

function exist_school() {
    return "select * from xrk_schools where schoolid = ? "
}

function select_school() {
    return "select * from xrk_schools  "
}

function select_school_active() {
    return "select * from xrk_schools where schoolactive = 1 "
}

function add_school() {
    return "insert into xrk_schools set  ? "
}

function delete_school() {
    return "delete from xrk_schools where schoolid =  ? "
}

function update_school_base() {
    return "update xrk_schools set schoolname = ?, schooladdress = ?, schoolleader = ?, schoolmobile = ? , schoolactive = ? where schoolid =  ? "
}

function active_school() {
    return "update xrk_schools SET schoolactive = 1 where schoolid = ? "
}

function deactive_school() {
    return "update xrk_schools SET schoolactive = 0 where schoolid = ? "
}

/**--schooladmins表 操作---**/
/*schooladmins:{
    exist_schooladmin: exist_schooladmin(),
    select_schooladmin_in_school: select_schooladmin_in_school(),
    select_schooladmin_in_school_active: select_schooladmin_in_school_active(),
    add_schooladmin: add_schooladmin(),
    update_schooladmin_base: update_schooladmin_base(),
    active_schooladmin: active_schooladmin(),
    deactive_schooladmin: deactive_schooladmin()
}*/

function exist_schooladmin() {
    return "select * from xrk_schooladmins where schooladminopenid = ? "
}

function select_schooladmin_in_school() {
    return "SELECT a.schooladminid , a.schooladminname , a.schooladminmobile , a.schooladminusex , a.schooladmindetails , a.schooladminopenid , a.schooladminactive , " 
            + "b.schoolid , b.schoolname , b.schooladdress , b.schoolleader , b.schoolmobile , b.schooldetails " 
            + "FROM xrk_schooladmins a " 
            + "LEFT JOIN xrk_schools b ON a.schoolid = b.schoolid " 
            + "WHERE b.schoolid = ? AND b.schoolactive = 1"

}

function select_schooladmin_in_school_active() {
    return "SELECT a.schooladminid , a.schooladminname , a.schooladminmobile , a.schooladminusex , a.schooladmindetails , a.schooladminopenid , a.schooladminactive , " 
            + "b.schoolid , b.schoolname , b.schooladdress , b.schoolleader , b.schoolmobile , b.schooldetails " 
            + "FROM xrk_schooladmins a " 
            + "LEFT JOIN xrk_schools b ON a.schoolid = b.schoolid " 
            + "WHERE b.schoolid = ? AND b.schoolactive = 1 AND a.schooladminactive = 1"
}

function add_schooladmin() {
    return "insert into xrk_schooladmins set  ? "
}

function update_schooladmin_base() {
    return "update xrk_schooladmins SET schooladminname = ?, schooladminmobile = ?, schooladminusex = ? , schooladmindetails = ? , schoolid = ? , schooladminactive = ? where schooladminid = ? "
}

function active_schooladmin() {
    return "update xrk_schooladmins SET schooladminactive = 1 where schooladminid = ? "
}

function deactive_schooladmin() {
    return "update xrk_schooladmins SET schooladminactive = 0 where schooladminid = ? "
}

/**--teachers表 操作---**/
/*teachers:{
    exist_teacher: exist_teacher(),
    select_teacher_in_school: select_teacher_in_school(),
    select_teacher_in_school_active: select_teacher_in_school_active(),
    add_teacher: add_teacher(),
    update_teacher_base: update_teacher_base(),
    active_teacher: active_teacher(),
    deactive_teacher: deactive_teacher()
}*/

function exist_teacher() {
    return "select * from xrk_teachers where teacheropenid = ?"
}

function select_teacher_in_school() {
    return "SELECT a.teacherid , a.teachername , a.teachermobile , a.teacherusex , a.teacherdetails , a.teacheractive , a.teacheropenid , a.teacheractive , " 
            + "b.schoolid , b.schoolname , b.schooladdress , b.schoolleader , b.schoolmobile , b.schooldetails , c.headimgurl " 
            + "FROM xrk_teachers a " 
            + "LEFT JOIN xrk_schools b ON a.schoolid = b.schoolid " 
            + "LEFT JOIN xrk_users c ON a.teacheropenid = c.openid " 
            + "WHERE a.schoolid = ? "
}

function select_teacher_in_school_active() {
    return "SELECT a.teacherid , a.teachername , a.teachermobile , a.teacherusex , a.teacherdetails , a.teacheractive , a.teacheropenid , " 
            + "b.schoolid , b.schoolname , b.schooladdress , b.schoolleader , b.schoolmobile , b.schooldetails , c.headimgurl " 
            + "FROM xrk_teachers a " 
            + "LEFT JOIN xrk_schools b ON a.schoolid = b.schoolid " 
            + "LEFT JOIN xrk_users c ON a.teacheropenid = c.openid " 
            + "WHERE a.schoolid = ? AND a.teacheractive = 1"
}

function add_teacher() {
    return "insert into xrk_teachers set  ? "
}

function update_teacher_base() {
    return "update xrk_teachers SET teachername = ?, teachermobile = ?, teacherusex = ? , teacherdetails = ?, schoolid = ? , teacheractive = ? where teacherid = ?  "
}

function active_teacher() {
    return "update xrk_teachers SET teacheractive = 1 where teacherid = ?  "
}

function deactive_teacher() {
    return "update xrk_teachers SET teacheractive = 0 where teacherid = ?  "
}

/**--students表 操作---**/

/*students:{
    exist_student: exist_student(),
    select_student: select_student(),
    select_student_by_class_openid: select_student_by_class_openid(),
    select_student_by_studentdetails_studentmobile: select_student_by_studentdetails_studentmobile(),
    select_student_in_class: select_student_in_class(),
    select_student_in_school: select_student_in_school(),
    add_student: add_student(),
    update_student_base: update_student_base(),
    update_student_times: update_student_times(),
    update_student_class: update_student_class(),
    delete_student: delete_student(),
    active_student: active_student(),
    deactive_student: deactive_student()
}*/

function exist_student() {
    return "select * from xrk_students where studentopenid = ? "
}

function select_student() {
    return "select a.studentid , a.studentname , a.studentmobile , a.studentusex , a.studentage , a.studentdetails , a.studenttimes , a.studentmaxtimes ,a.studentopenid , a.studentactive , " 
            + "b.classid , b.classname , b.classdate , b.classtime , b.classactive , b.classmaxnumusers , b.classnumusers , b.classdetails , " 
            + "c.schoolid , c.schoolname , c.schooladdress , c.schoolleader , c.schoolmobile , c.schooldetails , c.schoolactive , " 
            + "d.classcardid , d.classcardname , d.classcardprice , d.classcardactive , d.classcarddetails , "  
            + "e.courseid , e.coursename , e.coursedetails , e.courseactive , f.headimgurl " 
            + "FROM xrk_students a " 
            + "LEFT JOIN xrk_classes b ON a.classid = b.classid " 
            + "LEFT JOIN xrk_schools c ON a.schoolid = c.schoolid " 
            + "LEFT JOIN xrk_classcards d ON a.classcardid = d.classcardid " 
            + "LEFT JOIN xrk_courses e ON d.courseid = e.courseid " 
            + "LEFT JOIN xrk_users f ON a.studentopenid = f.openid " 
            + "where a.studentid = ? "
      
}

function select_student_by_class_openid(){
    return "select a.studentid , a.studentname , a.studentmobile , a.studentusex , a.studentage , a.studentdetails , a.studenttimes , a.studentmaxtimes ,a.studentopenid , a.studentactive , " 
            + "b.classid , b.classname , b.classdate , b.classtime , b.classactive , b.classmaxnumusers , b.classnumusers , b.classdetails , " 
            + "c.schoolid , c.schoolname , c.schooladdress , c.schoolleader , c.schoolmobile , c.schooldetails , c.schoolactive , " 
            + "d.classcardid , d.classcardname , d.classcardprice , d.classcardactive , d.classcarddetails , "  
            + "e.courseid , e.coursename , e.coursedetails , e.courseactive , f.headimgurl " 
            + "FROM xrk_students a " 
            + "JOIN xrk_classes b ON a.classid = b.classid " 
            + "LEFT JOIN xrk_schools c ON a.schoolid = c.schoolid " 
            + "LEFT JOIN xrk_classcards d ON a.classcardid = d.classcardid " 
            + "LEFT JOIN xrk_courses e ON d.courseid = e.courseid " 
            + "LEFT JOIN xrk_users f ON a.studentopenid = f.openid " 
            + "where a.classid = ? and a.studentopenid = ? "
}


function select_student_by_studentdetails_studentmobile(){
    return "select a.studentid , a.studentname , a.studentmobile , a.studentusex , a.studentage , a.studentdetails , a.studenttimes , a.studentmaxtimes ,a.studentopenid , a.studentactive " 
            + "FROM xrk_students a "  
            + "where a.studentdetails = ? and a.studentmobile = ? "
}

function select_student_in_class() {
    return "select a.studentid , a.studentname , a.studentmobile , a.studentusex , a.studentage , a.studentdetails , a.studenttimes , a.studentmaxtimes ,a.studentopenid , a.studentactive , " 
            + "b.classid , b.classname , b.classdate , b.classtime , b.classactive , b.classmaxnumusers , b.classnumusers , b.classdetails , " 
            + "c.schoolid , c.schoolname , c.schooladdress , c.schoolleader , c.schoolmobile , c.schooldetails , c.schoolactive , " 
            + "d.classcardid , d.classcardname , d.classcardprice , d.classcardactive , d.classcarddetails , " 
            + "e.courseid , e.coursename , e.coursedetails , e.courseactive , f.headimgurl " 
            + "FROM xrk_students a " 
            + "JOIN xrk_classes b ON a.classid = b.classid " 
            + "LEFT JOIN xrk_schools c ON a.schoolid = c.schoolid " 
            + "LEFT JOIN xrk_classcards d ON a.classcardid = d.classcardid " 
            + "LEFT JOIN xrk_courses e ON d.courseid = e.courseid " 
            + "LEFT JOIN xrk_users f ON a.studentopenid = f.openid " 
            + "where a.classid = ? "
}

function select_student_in_school() {
    return "select a.studentid , a.studentname , a.studentmobile , a.studentusex , a.studentage , a.studentdetails , a.studenttimes , a.studentmaxtimes ,a.studentopenid , a.studentactive , " 
            + "b.classid , b.classname , b.classdate , b.classtime , b.classactive , b.classmaxnumusers , b.classnumusers , b.classdetails , " 
            + "c.schoolid , c.schoolname , c.schooladdress , c.schoolleader , c.schoolmobile , c.schooldetails , c.schoolactive , " 
            + "d.classcardid , d.classcardname , d.classcardprice , d.classcardactive , d.classcarddetails , " 
            + "e.courseid , e.coursename , e.coursedetails , e.courseactive , f.headimgurl " 
            + "FROM xrk_students a " 
            + "LEFT JOIN xrk_classes b ON a.classid = b.classid " 
            + "JOIN xrk_schools c ON a.schoolid = c.schoolid " 
            + "LEFT JOIN xrk_classcards d ON a.classcardid = d.classcardid " 
            + "LEFT JOIN xrk_courses e ON d.courseid = e.courseid " 
            + "LEFT JOIN xrk_users f ON a.studentopenid = f.openid " 
            + "where a.schoolid = ? "
}

function add_student() {
    return "insert into xrk_students set  ? "
}

function update_student_base() {
    return "update xrk_students set studentname = ? , studentmobile = ? , studentusex = ? , studentage = ? , studentdetails = ? , classcardid = ? , classid = ? , schoolid = ? , studenttimes = ?, studentmaxtimes = ?, studentactive = ? where studentid = ? "
}

function update_student_times() {
    return "update xrk_students set studenttimes = ? where studentid = ? "
}

function update_student_class() {
    return "update xrk_students set classid = ? where studentid = ? "
}

function delete_student() {
    return "delete from xrk_students where studentid =  ? "
}

function active_student() {
    return "update xrk_students set studentactive = 1 where studentid = ? "
}

function deactive_student() {
    return "update xrk_students set studentactive = 0 where studentid = ? "
}

/**--courses表 操作---**/
/*courses:{
    select_course: select_course(),
    select_courses: select_courses(),
    select_active_courses: select_active_courses(),
    add_course: add_course(),
    delete_course: delete_course(),
    update_course_base: update_course_base(),
    active_course: active_course(),
    deactive_course: deactive_course()
}*/

function select_course() {
    return "select * from xrk_courses where courseid = ? " 
}

function select_courses() {
    return "select * from xrk_courses " 
}

function select_active_courses() {
    return "select * from xrk_courses where courseactive = 1 " 
}

function add_course() {
    return "insert into xrk_courses set  ? "
}

function delete_course() {
    return "delete from xrk_courses where courseid = ? "
}

function update_course_base() {
    return "update xrk_courses set coursename = ? , coursedetails = ? , courseactive = ? where courseid = ? "
}

function active_course() {
    return "update xrk_courses SET courseactive = 1 where courseid = ? "
}

function deactive_course() {
    return "update xrk_courses SET courseactive = 0 where courseid = ? "
}

/**--classes表 操作---**/

/*classes:{
    select_class: select_class(),
    select_class_active: select_class_active(),
    select_student_classes: select_student_classes(),
    select_teacher_classes: select_teacher_classes(),
    select_school_classes: select_school_classes(),
    select_school_classes_by_course: select_school_classes_by_course(),
    select_class_students: select_class_students(),
    select_school_students: select_school_students(),
    add_class: add_class(),
    delete_class: delete_class(),
    update_class_base: update_class_base(),
    update_class_numusers: update_class_numusers(),
    active_class: active_class(),
    deactive_class: deactive_class()
}*/

function select_class() {
    return "select a.classid , a.classname , a.classdate , a.classtime , a.classactive , a.classmaxnumusers , a.classnumusers , a.classdetails ,  "  
            + "b.schoolid , b.schoolname , b.schooladdress , b.schoolleader , b.schoolmobile , b.schooldetails , b.schoolactive , " 
            + "c.courseid , c.coursename , c.coursedetails , c.courseactive , " 
            + "d.teacherid , d.teachername , d.teachermobile , d.teacherusex , d.teacherdetails , d.teacheractive "
            + "FROM xrk_classes a " 
            + "LEFT JOIN xrk_schools b ON a.schoolid = b.schoolid " 
            + "LEFT JOIN xrk_courses c ON a.courseid = c.courseid " 
            + "LEFT JOIN xrk_teachers d ON a.teacherid = d.teacherid " 
            + "where a.classid = ? "
}

function select_class_active() {
    return "select a.classid , a.classname , a.classdate , a.classtime , a.classactive , a.classmaxnumusers , a.classnumusers , a.classdetails , "  
            + "b.schoolid , b.schoolname , b.schooladdress , b.schoolleader , b.schoolmobile , b.schooldetails , b.schoolactive , " 
            + "c.courseid , c.coursename , c.coursedetails , c.courseactive , " 
            + "d.teacherid , d.teachername , d.teachermobile , d.teacherusex , d.teacherdetails , d.teacheractive "
            + "FROM xrk_classes a " 
            + "JOIN xrk_schools b ON a.schoolid = b.schoolid " 
            + "LEFT JOIN xrk_courses c ON a.courseid = c.courseid " 
            + "LEFT JOIN xrk_teachers d ON a.teacherid = d.teacherid " 
            + "where a.classactive = 1 AND b.schoolactive = 1 "
}

function select_student_classes() {
    return "select a.studentid , a.studentname , a.studentmobile , a.studentusex , a.studentage , a.studentdetails , a.studenttimes , a.studentmaxtimes ,a.studentopenid , a.studentactive , " 
            + "b.classid , b.classname , b.classdate , b.classtime , b.classactive , b.classmaxnumusers , b.classnumusers , b.classdetails , " 
            + "c.schoolid , c.schoolname , c.schooladdress , c.schoolleader , c.schoolmobile , c.schooldetails , c.schoolactive , " 
            + "d.courseid , d.coursename , d.coursedetails , d.courseactive , " 
            + "e.teacherid , e.teachername , e.teachermobile , e.teacherusex , e.teacherdetails , e.teacheractive " 
            + "FROM xrk_students a " 
            + "JOIN xrk_classes b ON a.classid = b.classid " 
            + "LEFT JOIN xrk_schools c ON b.schoolid = c.schoolid " 
            + "LEFT JOIN xrk_courses d ON b.courseid = d.courseid " 
            + "LEFT JOIN xrk_teachers e ON b.teacherid = e.teacherid " 
            + "where a.studentopenid = ? "
}

function select_teacher_classes() {
    return "select a.classid , a.classname , a.classdate , a.classtime , a.classactive , a.classmaxnumusers , a.classnumusers , a.classdetails , "  
            + "b.schoolid , b.schoolname , b.schooladdress , b.schoolleader , b.schoolmobile , b.schooldetails , b.schoolactive , " 
            + "c.courseid , c.coursename , c.coursedetails , c.courseactive , " 
            + "d.teacherid , d.teachername , d.teachermobile , d.teacherusex , d.teacherdetails , d.teacheractive "
            + "FROM xrk_classes a " 
            + "LEFT JOIN xrk_schools b ON a.schoolid = b.schoolid " 
            + "LEFT JOIN xrk_courses c ON a.courseid = c.courseid " 
            + "JOIN xrk_teachers d ON a.teacherid = d.teacherid " 
            + "where a.teacherid = ? "
}

function select_school_classes() {
    return "select a.classid , a.classname , a.classdate , a.classtime , a.classactive , a.classmaxnumusers , a.classnumusers , a.classdetails , "  
            + "b.schoolid , b.schoolname , b.schooladdress , b.schoolleader , b.schoolmobile , b.schooldetails , b.schoolactive , " 
            + "c.courseid , c.coursename , c.coursedetails , c.courseactive , " 
            + "d.teacherid , d.teachername , d.teachermobile , d.teacherusex , d.teacherdetails , d.teacheractive "
            + "FROM xrk_classes a " 
            + "JOIN xrk_schools b ON a.schoolid = b.schoolid " 
            + "LEFT JOIN xrk_courses c ON a.courseid = c.courseid " 
            + "LEFT JOIN xrk_teachers d ON a.teacherid = d.teacherid " 
            + "where a.schoolid = ? "
}

function select_school_classes_by_course() {
    return "select a.classid , a.classname , a.classdate , a.classtime , a.classactive , a.classmaxnumusers , a.classnumusers , a.classdetails , "  
            + "b.schoolid , b.schoolname , b.schooladdress , b.schoolleader , b.schoolmobile , b.schooldetails , b.schoolactive , " 
            + "c.courseid , c.coursename , c.coursedetails , c.courseactive , " 
            + "d.teacherid , d.teachername , d.teachermobile , d.teacherusex , d.teacherdetails , d.teacheractive "
            + "FROM xrk_classes a " 
            + "JOIN xrk_schools b ON a.schoolid = b.schoolid " 
            + "JOIN xrk_courses c ON a.courseid = c.courseid " 
            + "LEFT JOIN xrk_teachers d ON a.teacherid = d.teacherid " 
            + "where a.courseid = ? and a.schoolid = ? "
}

function select_class_students() {
    return "select a.studentid , a.studentname , a.studentmobile , a.studentusex , a.studentage , a.studentdetails , a.studenttimes , a.studentmaxtimes , a.studentopenid , a.studentactive , " 
            + "b.classid , b.classname , b.classdate , b.classtime , b.classactive , b.classmaxnumusers , b.classnumusers , b.classdetails , " 
            + "c.schoolid , c.schoolname , c.schooladdress , c.schoolleader , c.schoolmobile , c.schooldetails , c.schoolactive , " 
            + "d.courseid , d.coursename , d.coursedetails , d.courseactive , " 
            + "e.teacherid , e.teachername , e.teachermobile , e.teacherusex , e.teacherdetails , e.teacheractive " 
            + "FROM xrk_students a " 
            + "JOIN xrk_classes b ON a.classid = b.classid " 
            + "LEFT JOIN xrk_schools c ON b.schoolid = c.schoolid " 
            + "LEFT JOIN xrk_courses d ON b.courseid = d.courseid " 
            + "LEFT JOIN xrk_teachers e ON b.teacherid = e.teacherid " 
            + "where b.classid = ? "
}

function select_school_students() {
    return "select a.studentid , a.studentname , a.studentmobile , a.studentusex , a.studentage , a.studentdetails , a.studenttimes , a.studentmaxtimes , a.studentopenid , a.studentactive , " 
            + "b.classid , b.classname , b.classdate , b.classtime , b.classactive , b.classmaxnumusers , b.classnumusers , b.classdetails , " 
            + "c.schoolid , c.schoolname , c.schooladdress , c.schoolleader , c.schoolmobile , c.schooldetails , c.schoolactive , " 
            + "d.courseid , d.coursename , d.coursedetails , d.courseactive , " 
            + "e.teacherid , e.teachername , e.teachermobile , e.teacherusex , e.teacherdetails , e.teacheractive " 
            + "FROM xrk_students a " 
            + "LEFT JOIN xrk_classes b ON a.classid = b.classid " 
            + "JOIN xrk_schools c ON b.schoolid = c.schoolid " 
            + "LEFT JOIN xrk_courses d ON b.courseid = d.courseid " 
            + "LEFT JOIN xrk_teachers e ON b.teacherid = e.teacherid " 
            + "where c.schoolid = ? "
}

function add_class() {
    return "insert into xrk_classes set  ? "
}

function delete_class() {
    return "delete from xrk_classes where classid = ? "
}

function update_class_base() {
    return "update xrk_classes set classname = ? , classdate = ? , classtime = ? , courseid = ? , classmaxnumusers = ? , classnumusers = ? , classdetails = ? , teacherid = ? , schoolid = ? , classactive = ? where classid = ? "
}

function update_class_numusers() {
    return "update xrk_classes SET classnumusers = ? where classid = ? "
}

function active_class() {
    return "update xrk_classes SET classactive = 1 where classid = ? "
}

function deactive_class() {
    return "update xrk_classes SET classactive = 0 where classid = ? "
}

/**--classcards表 操作---**/
/*classcards:{
    select_classcard: select_classcard(),
    select_classcard_by_course: select_classcard_by_course(),
    select_student_classcards: select_student_classcards(),
    select_class_students_classcards: select_class_students_classcards(),
    select_school_students_classcards: select_school_students_classcards(),
    add_classcard: add_classcard(),
    delete_classcard: delete_classcard(),
    update_classcard_base: update_classcard_base(),
    active_classcard: active_classcard(),
    deactive_classcard: deactive_classcard()
}*/

function select_classcard() {
    return "select a.classcardid , a.classcardname , a.classcardprice , a.classcarddetails , a.classcardtimes , a.classcardtime , a.classcardactive , " 
            + "b.courseid , b.coursename , b.coursedetails , b.courseactive "
            + "FROM xrk_classcards a " 
            + "LEFT JOIN xrk_courses b ON a.courseid = b.courseid "
}


function select_classcard_by_course() {
    return "select a.classcardid , a.classcardname , a.classcardprice , a.classcarddetails ,  a.classcardtimes , a.classcardtime , a.classcardactive , " 
            + "b.courseid , b.coursename , b.coursedetails , b.courseactive "
            + "FROM xrk_classcards a " 
            + "JOIN xrk_courses b ON a.courseid = b.courseid " 
            + "where a.courseid = ? "
}

function select_student_classcards() {
    return "select a.studentid , a.studentname , a.studentmobile , a.studentusex , a.studentage , a.studentdetails , a.studenttimes , a.studentmaxtimes , a.studentopenid , a.studentactive ," 
            + "b.classid , b.classname , b.classdate , b.classtime , b.classactive , b.classmaxnumusers , b.classnumusers , b.classdetails , " 
            + "c.schoolid , c.schoolname , c.schooladdress , c.schoolleader , c.schoolmobile , c.schooldetails , c.schoolactive , " 
            + "d.teacherid , d.teachername , d.teachermobile , d.teacherusex , d.teacherdetails , d.teacheractive , " 
            + "e.classcardid , e.classcardname , e.classcardprice , e.classcardtimes , e.classcardtime , e.classcarddetails , e.classcardactive , " 
            + "f.courseid , f.coursename , f.coursedetails , f.courseactive " 
            + "FROM xrk_students a " 
            + "LEFT JOIN xrk_classes b ON a.classid = b.classid " 
            + "LEFT JOIN xrk_schools c ON b.schoolid = c.schoolid " 
            + "LEFT JOIN xrk_teachers d ON b.teacherid = d.teacherid " 
            + "JOIN xrk_classcards e ON a.classcardid = e.classcardid " 
            + "LEFT JOIN xrk_courses f ON e.courseid = f.courseid " 
            + "where a.studentid = ? "
}

function select_class_students_classcards() {
    return "select a.studentid , a.studentname , a.studentmobile , a.studentusex , a.studentage , a.studentdetails , a.studenttimes , a.studentmaxtimes , a.studentopenid , a.studentactive , " 
            + "b.classid , b.classname , b.classdate , b.classtime , b.classactive , b.classmaxnumusers , b.classnumusers , b.classdetails , " 
            + "c.schoolid , c.schoolname , c.schooladdress , c.schoolleader , c.schoolmobile , c.schooldetails , c.schoolactive , " 
            + "d.teacherid , d.teachername , d.teachermobile , d.teacherusex , d.teacherdetails , d.teacheractive , " 
            + "e.classcardid , e.classcardname , e.classcardprice , e.classcardtimes , e.classcardtime , e.classcarddetails , e.classcardactive , " 
            + "f.courseid , f.coursename , f.coursedetails , f.courseactive " 
            + "FROM xrk_students a " 
            + "JOIN xrk_classes b ON a.classid = b.classid " 
            + "LEFT JOIN xrk_schools c ON b.schoolid = c.schoolid " 
            + "LEFT JOIN xrk_teachers d ON b.teacherid = d.teacherid " 
            + "JOIN xrk_classcards e ON a.classcardid = e.classcardid " 
            + "LEFT JOIN xrk_courses f ON e.courseid = f.courseid " 
            + "where b.classid = ? "
}

function select_school_students_classcards() {
    return "select a.studentid , a.studentname , a.studentmobile , a.studentusex , a.studentage , a.studentdetails , a.studenttimes , a.studentmaxtimes , a.studentopenid , a.studentactive , " 
            + "b.classid , b.classname , b.classdate , b.classtime , b.classactive , b.classmaxnumusers , b.classnumusers , b.classdetails , " 
            + "c.schoolid , c.schoolname , c.schooladdress , c.schoolleader , c.schoolmobile , c.schooldetails , c.schoolactive , " 
            + "d.teacherid , d.teachername , d.teachermobile , d.teacherusex , d.teacherdetails , d.teacheractive , " 
            + "e.classcardid , e.classcardname , e.classcardprice , e.classcardtimes , e.classcardtime , e.classcarddetails , e.classcardactive , " 
            + "f.courseid , f.coursename , f.coursedetails , f.courseactive " 
            + "FROM xrk_students a " 
            + "LEFT JOIN xrk_classes b ON a.classid = b.classid " 
            + "JOIN xrk_schools c ON b.schoolid = c.schoolid " 
            + "LEFT JOIN xrk_teachers d ON b.teacherid = d.teacherid " 
            + "JOIN xrk_classcards e ON a.classcardid = e.classcardid " 
            + "LEFT JOIN xrk_courses f ON e.courseid = f.courseid " 
            + "where c.schoolid = ? "
}

function add_classcard() {
    return "insert into xrk_classcards SET  ? "
}

function delete_classcard() {
    return "delete from xrk_classcards where classcardid = ? "
}

function update_classcard_base() {
    return "update xrk_classcards SET classcardname = ? , classcardprice = ? , classcardtimes = ? , classcardtime = ? , courseid = ? , classcarddetails = ? , classcardactive = ? where classcardid = ? "
}

function active_classcard() {
    return "update xrk_classcards SET classcardactive = 1 where classcardid = ? "
}

function deactive_classcard() {
    return "update xrk_classcards SET classcardactive = 0 where classcardid = ? "
}

/**--purchases表 操作---**/
/*purchases:{
    exist_purchase: exist_purchase(),
    select_purchase: select_purchase(),
    select_purchase_in_school: select_purchase_in_school(),
    select_purchase_in_school_active: select_purchase_in_school_active(),
    select_purchase_in_school_deactive: select_purchase_in_school_deactive(),
    add_purchase: add_purchase(),
    delete_purchase: delete_purchase(),
    update_purchase_base: update_purchase_base(),
    active_purchase: active_purchase(),
    deactive_purchase: deactive_purchase()
}*/

function exist_purchase() {
    return "select * from xrk_purchases where purchaseopenid = ?"
}

function select_purchase() {
    return "SELECT a.purchaseid , a.purchasename , a.purchasemobile , a.purchaseusex , a.purchaseage , a.purchasedetails , a.purchaseaddress , a.purchasedatatime , a.purchaseopenid , a.paydetails , a.paytime , a.purchaseactive , " 
            + "b.classcardid , b.classcardname , b.classcardprice , b.classcardactive , b.classcardtimes , b.classcardtime , b.classcarddetails , " 
            + "c.courseid , c.coursename , c.coursedetails , c.courseactive , " 
            + "d.schoolid , d.schoolname , d.schooladdress , d.schoolleader , d.schoolmobile , d.schooldetails , e.headimgurl " 
            + "FROM xrk_purchases a " 
            + "JOIN xrk_classcards b ON a.classcardid = b.classcardid " 
            + "LEFT JOIN xrk_courses c ON b.courseid = c.courseid " 
            + "LEFT JOIN xrk_schools d ON a.schoolid = d.schoolid " 
            + "LEFT JOIN xrk_users e ON a.purchaseopenid = e.openid " 
            + "WHERE a.purchaseopenid = ? "
}

function select_purchase_in_school() {
    return "SELECT a.purchaseid , a.purchasename , a.purchasemobile , a.purchaseusex , a.purchaseage , a.purchasedetails , a.purchaseaddress , a.purchasedatatime , a.purchaseopenid , a.paydetails , a.paytime , a.purchaseactive , " 
            + "b.classcardid , b.classcardname , b.classcardprice , b.classcardactive , b.classcardtimes , b.classcardtime , b.classcarddetails , " 
            + "c.courseid , c.coursename , c.coursedetails , c.courseactive , " 
            + "d.schoolid , d.schoolname , d.schooladdress , d.schoolleader , d.schoolmobile , d.schooldetails , e.headimgurl " 
            + "FROM xrk_purchases a " 
            + "LEFT JOIN xrk_classcards b ON a.classcardid = b.classcardid " 
            + "LEFT JOIN xrk_courses c ON b.courseid = c.courseid " 
            + "JOIN xrk_schools d ON a.schoolid = d.schoolid " 
            + "LEFT JOIN xrk_users e ON a.purchaseopenid = e.openid " 
            + "WHERE a.schoolid = ? "
}

function select_purchase_in_school_active() {
    return "SELECT a.purchaseid , a.purchasename , a.purchasemobile , a.purchaseusex , a.purchaseage , a.purchasedetails , a.purchaseaddress , a.purchasedatatime , a.purchaseopenid , a.paydetails , a.paytime , a.purchaseactive , " 
            + "b.classcardid , b.classcardname , b.classcardprice , b.classcardactive , b.classcardtimes , b.classcardtime , b.classcarddetails , " 
            + "c.courseid , c.coursename , c.coursedetails , c.courseactive , " 
            + "d.schoolid , d.schoolname , d.schooladdress , d.schoolleader , d.schoolmobile , d.schooldetails , e.headimgurl " 
            + "FROM xrk_purchases a " 
            + "LEFT JOIN xrk_classcards b ON a.classcardid = b.classcardid " 
            + "LEFT JOIN xrk_courses c ON b.courseid = c.courseid " 
            + "JOIN xrk_schools d ON a.schoolid = d.schoolid " 
            + "LEFT JOIN xrk_users e ON a.purchaseopenid = e.openid " 
            + "WHERE a.schoolid = ? AND a.purchaseactive = 1 "
}

function select_purchase_in_school_deactive() {
    return "SELECT a.purchaseid , a.purchasename , a.purchasemobile , a.purchaseusex , a.purchaseage , a.purchasedetails , a.purchaseaddress , a.purchasedatatime , a.purchaseopenid , a.paydetails , a.paytime , a.purchaseactive , " 
            + "b.classcardid , b.classcardname , b.classcardprice , b.classcardactive , b.classcardtimes , b.classcardtime , b.classcarddetails , " 
            + "c.courseid , c.coursename , c.coursedetails , c.courseactive , " 
            + "d.schoolid , d.schoolname , d.schooladdress , d.schoolleader , d.schoolmobile , d.schooldetails , e.headimgurl " 
            + "FROM xrk_purchases a " 
            + "LEFT JOIN xrk_classcards b ON a.classcardid = b.classcardid " 
            + "LEFT JOIN xrk_courses c ON b.courseid = c.courseid " 
            + "JOIN xrk_schools d ON a.schoolid = d.schoolid " 
            + "LEFT JOIN xrk_users e ON a.purchaseopenid = e.openid " 
            + "WHERE a.schoolid = ? AND a.purchaseactive = 0 "
}

function add_purchase() {
    return "insert into xrk_purchases set ? "
}

function delete_purchase() {
    return "delete from xrk_purchases where purchaseid = ? "
}

function update_purchase_base() {
    return "update xrk_purchases SET purchasename = ?, purchasemobile = ?, purchaseusex = ? , purchaseage = ? ,  purchasedetails = ?, purchaseaddress = ?, purchasedatatime = ?, schoolid = ?, classcardid = ?, paydetails = ?, purchaseactive = ? where purchaseid = ?  "
}

function active_purchase() {
    return "update xrk_purchases SET purchaseactive = 1, paytime = ?  where purchaseid = ?  "
}

function deactive_purchase() {
    return "update xrk_purchases SET purchaseactive = 0 where purchaseid = ?  "
}

//所有允许操作的SQL语句列表
module.exports = {
    users: {
        exist_user: exist_user(),
        select_user_subscribe: select_user_subscribe(),
        add_user: add_user(),
        update_user_subscribe: update_user_subscribe(),
        update_user_unsubscribe: update_user_unsubscribe()
    },
    schools:{
        exist_school: exist_school(),
        select_school: select_school(),
        select_school_active: select_school_active(),
        add_school: add_school(),
        delete_school: delete_school(),
        update_school_base: update_school_base(),
        active_school: active_school(),
        deactive_school: deactive_school()
    },
    schooladmins:{
        exist_schooladmin: exist_schooladmin(),
        select_schooladmin_in_school: select_schooladmin_in_school(),
        select_schooladmin_in_school_active: select_schooladmin_in_school_active(),
        add_schooladmin: add_schooladmin(),
        update_schooladmin_base: update_schooladmin_base(),
        active_schooladmin: active_schooladmin(),
        deactive_schooladmin: deactive_schooladmin()
    },
    teachers:{
        exist_teacher: exist_teacher(),
        select_teacher_in_school: select_teacher_in_school(),
        select_teacher_in_school_active: select_teacher_in_school_active(),
        add_teacher: add_teacher(),
        update_teacher_base: update_teacher_base(),
        active_teacher: active_teacher(),
        deactive_teacher: deactive_teacher()
    },
    students:{
        exist_student: exist_student(),
        select_student: select_student(),
        select_student_by_class_openid: select_student_by_class_openid(),
        select_student_by_studentdetails_studentmobile: select_student_by_studentdetails_studentmobile(),
        select_student_in_class: select_student_in_class(),
        select_student_in_school: select_student_in_school(),
        add_student: add_student(),
        update_student_base: update_student_base(),
        update_student_times: update_student_times(),
        update_student_class: update_student_class(),
        delete_student: delete_student(),
        active_student: active_student(),
        deactive_student: deactive_student()
    },
    courses:{
        select_course: select_course(),
        select_courses: select_courses(),
        select_active_courses: select_active_courses(),
        add_course: add_course(),
        delete_course: delete_course(),
        update_course_base: update_course_base(),
        active_course: active_course(),
        deactive_course: deactive_course()
    },
    classes:{
        select_class: select_class(),
        select_class_active: select_class_active(),
        select_student_classes: select_student_classes(),
        select_teacher_classes: select_teacher_classes(),
        select_school_classes: select_school_classes(),
        select_school_classes_by_course: select_school_classes_by_course(),
        select_class_students: select_class_students(),
        select_school_students: select_school_students(),
        add_class: add_class(),
        delete_class: delete_class(),
        update_class_base: update_class_base(),
        update_class_numusers: update_class_numusers(),
        active_class: active_class(),
        deactive_class: deactive_class()
    },
    classcards:{
        select_classcard: select_classcard(),
        select_classcard_by_course: select_classcard_by_course(),
        select_student_classcards: select_student_classcards(),
        select_class_students_classcards: select_class_students_classcards(),
        select_school_students_classcards: select_school_students_classcards(),
        add_classcard: add_classcard(),
        delete_classcard: delete_classcard(),
        update_classcard_base: update_classcard_base(),
        active_classcard: active_classcard(),
        deactive_classcard: deactive_classcard()
    },
    purchases:{
        exist_purchase: exist_purchase(),
        select_purchase: select_purchase(),
        select_purchase_in_school: select_purchase_in_school(),
        select_purchase_in_school_active: select_purchase_in_school_active(),
        select_purchase_in_school_deactive: select_purchase_in_school_deactive(),
        add_purchase: add_purchase(),
        update_purchase_base: update_purchase_base(),
        active_purchase: active_purchase(),
        deactive_purchase: deactive_purchase()
    }
}
