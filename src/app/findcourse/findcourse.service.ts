export class FindCourseService
{
  selectCourse: string;

  setUserSelected(course: string)
  {
    this.selectCourse = course;
  }

  getUserSelected()
  {
    return this.selectCourse;
  }
}
