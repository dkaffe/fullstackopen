const Course = ({ course }) => {
  const totalAmountOfExercises = course.parts.reduce((acc, n) => {
    return acc + n.exercises
  }, 0)

  return (
    <div>
      <h1>{course.name}</h1>
      <ul>
        {course.parts.map((course) => {
          return (
          <li key={course.id}>{course.name} {course.exercises}</li>
          )
        })}
      </ul>
      <p>Total amount of exercises: {totalAmountOfExercises}</p>
    </div>
  )
}

export default Course