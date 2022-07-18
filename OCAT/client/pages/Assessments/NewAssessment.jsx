import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {
  const { formState: { errors }, handleSubmit, register, watch } = useForm();

  const questions = [
    {
      question: `question 1`,
      choices: [{ text: `c1`, score: 1 }, { text: `c2`, score: 0 }],
    },
  ];
  // create a form that utilizes the "onSubmit" function to send data to OCAT/client/services/AssessmentService.js and
  // then onto the OCAT/server/routes/AssessmentAPI express API
  const onSubmit = async (data) => {

    let RiskScore = 0;

    // Calculating Risk Score
    if (data.question1 === `yes`)
    { RiskScore++; }
    if (data.question2 === `3+`)
    { RiskScore++; }
    if (data.question3 === `10+`)
    { RiskScore++; }
    if (data.question4 === `no`)
    { RiskScore++; }
    if (data.question5 === `yes`)
    { RiskScore++; }

    const now = new Date();

    const assessmentData = {
      cat_name: data.name,
      cat_date_of_birth: data.dateOfBirth,
      score: RiskScore,
      risk_level: RiskScore < 2 ? `Low` : RiskScore < 4 ? `Medium` : ` High`,
      created_at: now,
      deleted_at: null,
    };

    { await AssessmentService.submit(assessmentData); }
  };

  return <Form onSubmit={handleSubmit(onSubmit)}>

    <Form.Group className="mb-3 form-select">
      <Form.Label>Instrument</Form.Label>
      <Form.Control type="text" placeholder="Enter cat instrument" className='form-select-input'
        {...register(`Instrument`, { required: true })} />
    </Form.Group>

    <Form.Group className="mb-3 form-select">
      <Form.Label>Cat Name</Form.Label>
      <Form.Control type="text" placeholder="Enter cat name" className='form-select-input'
        {...register(`name`, { required: true })} />
    </Form.Group>

    <Form.Group className="mb-3 form-select">
      <Form.Label>Cat Date of Birth</Form.Label>
      <Form.Control type="date" placeholder="Enter cat date of birth" className='form-select-input'
        {...register(`dateOfBirth`, { required: true })} />
    </Form.Group>

    <Form.Group>
      <Form.Label>Previous contact with the Cat Judicial System</Form.Label>

      <div className="form-check">
        <label>
          <input
            {...register(`question1`, { required: true })}
            type="radio"
            name="question1"
            value="yes"
            className="form-check-input"
          />{` `}
          Yes
        </label>
      </div>

      <div className="form-check">
        <label >
          <input
            {...register(`question1`, { required: true })}
            type="radio"
            name="question1"
            value="no"
            className="form-check-input"
          />{` `}
          No
        </label>
      </div>
    </Form.Group>

    <Form.Group>
      <Form.Label>Physical altercations with other cats</Form.Label>

      <div className="form-check">
        <label >
          <input
            {...register(`question2`, { required: true })}
            type="radio"
            name="question2"
            value="3+"
            className="form-check-input"
          />{` `}
          3+ altercations
        </label>
      </div>
      <div className="form-check">
        <label >
          <input
            {...register(`question2`, { required: true })}
            type="radio"
            name="question2"
            value="0-3"
            className="form-check-input"
          />{` `}
          0-3 altercations
        </label>
      </div>

    </Form.Group>

    <Form.Group>
      <Form.Label>Physical altercations with owner (scratching, biting, etc...)</Form.Label>
      <div className="form-check">
        <label >
          <input
            {...register(`question3`, { required: true })}
            type="radio"
            name="question3"
            value="10+"
            className="form-check-input"
          />{` `}
          10+ altercations
        </label>
      </div>

      <div className="form-check">
        <label >
          <input
            {...register(`question3`, { required: true })}
            type="radio"
            name="question3"
            value="0-10"
            className="form-check-input"
          />{` `}
          0-10 altercations
        </label>
      </div>
    </Form.Group>

    <Form.Group>
      <Form.Label>Plays well with dogs</Form.Label>

      <div className="form-check">
        <label>
          <input
            {...register(`question4`, { required: true })}
            type="radio"
            name="question4"
            value="no"
            className="form-check-input"
          />{` `}
          No
        </label>
      </div>

      <div className="form-check">
        <label>
          <input
            {...register(`question4`, { required: true })}
            type="radio"
            name="question4"
            value="yes"
            className="form-check-input"
          />{` `}
          Yes
        </label>
      </div>
    </Form.Group>

    <Form.Group>
      <Form.Label>Hisses at strangers</Form.Label>
      <div className="form-check">
        <label>
          <input
            {...register(`question5`, { required: true })}
            type="radio"
            name="question5"
            value="yes"
            className="form-check-input"
          />{` `}
          Yes
        </label>
      </div>

      <div className="form-check">
        <label >
          <input
            {...register(`question5`, { required: true })}
            type="radio"
            name="question5"
            value="no"
            className="form-check-input"
          />{` `}
          No
        </label>
      </div>
    </Form.Group>

    <Button variant="primary" type="submit">Submit</Button>
  </Form>;
};
