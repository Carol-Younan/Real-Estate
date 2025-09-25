import bg from '../assets/bg.jpg';
import './Career.css';

function Career() {
  return (
    <div className='CareerPage'>
      <div className='CareerHead'>
        <img src={bg} alt="Career Background" />
      </div>

      <div className='CareerContent'>
        <h1 className='CareerHeadText'>Career</h1>
        <h4>Why to join us?</h4>
        <p>
          Joining Red Sea Construction and Development means more than working for one of Egypt’s
          largest engineering and construction Company. We’ve built our business on a passion for
          excellence. We have a flexible approach in all that we do and believe that our employees
          can only put the client first by collaborating with one another.
        </p>
      </div>
    </div>
  );
}

export default Career;
