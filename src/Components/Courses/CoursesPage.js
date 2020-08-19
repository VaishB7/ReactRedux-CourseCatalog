import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import propTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";

class CoursesPage extends React.Component {
  //const {courses, authors, actions} = this.props;

  state = {
    //instead of a constructor, i am using a class field
    redirectToAddCoursePage: false,
  };
  componentDidMount() {
    if (this.props.courses.length === 0) {
      //or if(courses.length === 0) if destructured
      this.props.actions
        .loadCourses() // returns a promise
        .catch((error) => {
          alert("Loading courses failed" + error);
        });
    }

    if (this.props.authors.length === 0) {
      this.props.actions
        .loadAuthors() // returns a promise
        .catch((error) => {
          alert("Loading authors failed" + error);
        });
    }
  }

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-course"
          onClick={() => this.setState({ redirectToAddCoursePage: true })}
        >
          Add Course
        </button>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: propTypes.array.isRequired,
  //dispatch: propTypes.func.isRequired,
  // ALTERNATIVE 1:   createCourse: propTypes.func.isRequired,
  actions: propTypes.object.isRequired,
  authors: propTypes.array.isRequired,
};
/* ALTERNATIVE 2
const mapDispatchToProps = {
  createCourse: courseActions.createCourse,
  //When declared as an object, each property is automatically bound to dispatch
};
*/

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    },
  };
}

/* ALTERNATIVE 1:
function mapDispatchToProps(dispatch) {
  return {
    createCourse: (course) => dispatch(courseActions.createCourse(course)),
  };
}
*/

function mapStateToProps(state) {
  //This fn determines what part of the state we expose to the componenets via props
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
  };
  //be specific, request only the data that your component needs.
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
//connect returns a fn which then uses the CoursesPage as parameters
//2 fn calls
