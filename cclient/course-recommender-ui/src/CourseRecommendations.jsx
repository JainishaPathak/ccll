import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CourseRecommendations = () => {
  const [subject, setSubject] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:9000/private/api/gen/${subject}/budget/${budget}/duration/${duration}`);
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Course Recommendations</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formSubject">
          <Form.Label>Subject:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBudget">
          <Form.Label>Budget:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formDuration">
          <Form.Label>Duration:</Form.Label>
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
      {recommendations.map((recommendation, index) => (
        <Card key={index} className="my-4">
          <Card.Header>{recommendation.subject}</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Course Name:</strong> {recommendation.details.course_name}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Description:</strong> {recommendation.details.course_description}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Duration:</strong> {recommendation.details.course_duration}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Rating:</strong> {recommendation.details.average_rating}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Popular Reviews:</strong>
              <ul>
                {recommendation.details.popular_reviews.map((review, i) => (
                  <li key={i}>{review}</li>
                ))}
              </ul>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Course Link:</strong>{' '}
              <a href={recommendation.details.course_link} target="_blank" rel="noopener noreferrer">
                {recommendation.details.course_link}
              </a>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Instructor Name:</strong> {recommendation.details.instructor_name}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      ))}
    </div>
  );
};

export default CourseRecommendations;