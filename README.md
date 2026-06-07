

# Campus Student Management Microservices

Campus Student Management Microservices is an academic project developed for the **Software Development Engineering** module at **Abdelhamid Mehri University - Constantine 2**.

The project was created by **Redouane Haddad**.

## Description

This project is a multi-service campus management system designed to manage students, courses, universities, and intelligent student assistance through an AI chatbot.

The system is based on a microservices architecture, where each service handles a specific part of the application. The services communicate through REST APIs, GraphQL, and an API Gateway.

## Main Objective

The main objective of this project is to build a complete campus management system using modern web and backend technologies.

The application allows users to manage students, courses, student-course relationships, universities, and AI-based text processing features such as translation and summarization.

## Technologies Used

- Spring Boot
- Django
- React
- Node.js
- GraphQL
- Spring Cloud Gateway
- MySQL / PostgreSQL
- Transformers AI Library

## Main Components

### Student Service

The Student Service manages students and universities.

It provides features such as adding, updating, deleting, listing, and searching students. It also allows students to be associated with universities.

### Course Service

The Course Service manages courses and student-course relationships.

It provides features such as adding, updating, deleting, listing, and searching courses. It also handles course schedules and student enrollment in courses.

### AI Chatbot Service

The AI Chatbot Service provides intelligent assistance features.

It supports text translation and text summarization using AI-based tools.

### API Gateway

The API Gateway centralizes incoming requests and routes them to the appropriate service.

It simplifies communication between the frontend and the backend services.

### GraphQL Service

The GraphQL Service allows the frontend to request only the required data.

It helps combine data from multiple services, such as students and their associated courses, in a single query.

### Frontend

The frontend is built with React.

It provides an interactive user interface for managing students, courses, and chatbot interactions. It also supports dynamic search, filtering, forms, and navigation between pages.

## Features

- Student management
- Course management
- University association
- Student-course enrollment
- Dynamic search and filtering
- REST API communication
- GraphQL data fetching
- API Gateway routing
- AI text translation
- AI text summarization
- React-based web interface

## Project Type

Academic mini-project  
Master 1 - Data Science and Intelligent Systems  
Software Development Engineering  
Abdelhamid Mehri University - Constantine 2

## Author

Redouane Haddad
```
