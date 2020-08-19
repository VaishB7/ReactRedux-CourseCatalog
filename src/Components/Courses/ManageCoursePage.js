import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import propTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../tools/mockData";

//import { bindActionCreators } from "redux";

/*

class ManageCoursePage extends React.Component {
  componentDidMount() {
    if (this.props.courses.length === 0) {
      this.props.actions.loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }

    if (this.props.authors.length === 0) {
      this.props.actions.loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }

  render() {
    return <h2>Manage Course</h2>;
  }
}

*/

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  history,
  ...props
  /*do not use course bcoz of destcuture conflict
  use the rest operator. So this says, "Assign any props ,
  I haven't destructured on the left to a variable called props"*/
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  //this will hold any errors after we run validation.

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }, [props.course]); //if you put [], it will only run once, like component did mount.
  // Only runs once when the component mounts

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    //saveCourse returns a promise
    saveCourse(course).then(() => {
      history.push("/courses");
    });
  }

  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
}

ManageCoursePage.propTypes = {
  courses: propTypes.array.isRequired,
  loadCourses: propTypes.func.isRequired,
  loadAuthors: propTypes.func.isRequired,
  authors: propTypes.array.isRequired,
  course: propTypes.object.isRequired,
  saveCourse: propTypes.func.isRequired,
  history: propTypes.object.isRequired,
  //Any component loaded via the react <Route> gets the history passes in on props from react router.
};

export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
} //these fns are called selectors.

/*
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    },
  }; OR
}*/

//object method
const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
  saveCourse: courseActions.saveCourse,
};

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    courses: state.courses,
    authors: state.authors,
    course,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
