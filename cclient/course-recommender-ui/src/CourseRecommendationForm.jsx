import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CourseRecommendationForm = ({ onSubmit }) => {
  const [subject, setSubject] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ subject, budget, duration });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formSubject">
        <Form.Label>Subject</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBudget">
        <Form.Label>Budget</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formDuration">
        <Form.Label>Duration</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Get Recommendations
      </Button>
    </Form>
  );
};

export default CourseRecommendationForm;