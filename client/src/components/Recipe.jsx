import React from "react";
import { Card, Modal, Button } from "react-bootstrap";
const Recipe = ({ title, description, onClick, onDelete }) => {
  return (
    <Card className="recipe">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary" onClick={onClick}>
          Update
        </Button>{" "}
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Recipe;
