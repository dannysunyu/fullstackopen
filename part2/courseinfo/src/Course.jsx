const Header = ({ name }) => {
  return (<h2>{name}</h2>);
};

const Content = (props) => {
  return (
    <div>
      {
        props.parts.map((part) => {
          return (
            <Part
              key={part.id}
              name={part.name}
              exercises={part.exercises}
            />
          );
        })
      }
    </div>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Course = ({ course }) => {
  const sum = course.parts.map(part => part.exercises).reduce((a, b) => a + b, 0);
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <h3>total of {sum} exercises</h3>
    </>
  );
};

export default Course;