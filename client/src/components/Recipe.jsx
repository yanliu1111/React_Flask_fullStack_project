import React from "react";
import { Card, Modal, Button } from "react-bootstrap";
const Recipe = ({ title, description, onClick }) => {
  return (
    <Card className="recipe">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variance="primary" onClick={onClick}>
          Update
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Recipe;
