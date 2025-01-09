# Clean Architecture Resource Management API

## Overview

This project is a RESTful API built with Clean Architecture principles and a modular approach. It provides a robust foundation for managing resources with proper separation of concerns, maintainability, and scalability.

### Purpose
- Demonstrate Clean Architecture implementation in Node.js
- Showcase modular design patterns
- Provide a production-ready API boilerplate
- Implement best practices for enterprise applications

### Modules
- **Resource Module**: Core module for managing resources with CRUD operations
- **Auth Module**: Handles authentication and authorization
- **Infrastructure**: Manages technical concerns (caching, database, etc.)
- **Shared**: Contains common utilities and middleware

### Tech Stack
- **Node.js & TypeScript**: Type safety and modern JavaScript features
- **Express.js**: Lightweight and flexible web framework
- **MongoDB**: Document database for flexible schema design
- **Redis**: In-memory caching for performance optimization
- **TypeDI**: Dependency injection for better modularity
- **JWT**: Stateless authentication
- **Docker**: Containerization and deployment
- **Jest**: Testing framework
- **Swagger**: API documentation

## Project Structure
```
src/
├── config/                 # Application configuration
├── core/                  # Enterprise business rules
│   ├── domain/           # Business entities and interfaces
│   └── usecases/         # Application business rules
├── infrastructure/        # External interfaces
│   ├── container/        # Dependency injection setup
│   ├── database/         # Database models and connections
│   ├── repositories/     # Data access implementations
│   └── services/         # External service implementations
├── modules/              # Feature modules
│   ├── auth/            # Authentication module
│   └── resource/        # Resource management module
└── shared/              # Shared utilities
    ├── errors/          # Error handling
    ├── middlewares/     # Express middlewares
    └── utils/           # Common utilities
```

## Architecture Components

### Core Concepts

#### Entities vs Models
- **Entities**: Core business objects independent of persistence layer
  - Contain business logic and validation rules
  - Framework agnostic
  - Example: `ResourceEntity`

- **Models**: Database schema definitions
  - Handle data persistence
  - Framework specific (Mongoose)
  - Example: `ResourceModel`

#### Services vs Use Cases
- **Services**: 
  - Single responsibility operations
  - Reusable business logic
  - Framework agnostic
  - Example: `ResourceService` (validation, enrichment)

- **Use Cases**:
  - Complex business flows
  - Orchestrate multiple services
  - Implement specific business requirements
  - Example: `CreateResourceUseCase` (validation + persistence + enrichment)

#### Repositories
- Abstract data access layer
- Hide persistence implementation details
- Enable easy switching between data sources
- Example: `MongoDBResourceRepository`

#### DTOs (Data Transfer Objects)
- Define data shapes for API requests/responses
- Validate input data
- Example: `CreateResourceDTO`

#### Validators
- Input validation rules
- Request sanitization
- Example: `validateResource`

## Extensibility

### Additional Services
1. **WebSocket Service**
   - Real-time updates
   - Event broadcasting

2. **Message Broker**
   - Event-driven architecture
   - Async processing
   - Supported brokers: RabbitMQ, Kafka

3. **Monitoring**
   - Prometheus metrics
   - Grafana dashboards
   - Performance monitoring

4. **Advanced Logging**
   - Centralized logging (ELK Stack)
   - Log aggregation
   - Error tracking

## Getting Started

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- MongoDB
- Redis

### Installation
```bash
# Clone repository
git clone <repository-url>

# Install dependencies
pnpm install

# Setup environment
cp .env.example .env
```

### Running the Application

#### Development
```bash
# Start development server
pnpm dev

# Run tests
pnpm test

# Run linter
pnpm lint
```

#### Docker
```bash
# Build and start containers
docker-compose up --build

# Stop containers
docker-compose down
```

## API Documentation

### Resource Endpoints

#### Create Resource
- **POST** `/api/v1/resources`
- **Auth**: Required (Admin)
- **Input**:
  ```json
  {
    "name": "string",
    "description": "string"
  }
  ```
- **Output**:
  ```json
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "createdAt": "date",
    "updatedAt": "date",
    "metadata": {
      "version": "number",
      "lastModified": "date"
    }
  }
  ```

#### Get Resource
- **GET** `/api/v1/resources/:id`
- **Auth**: Not Required
- **Output**: Resource object

#### Update Resource
- **PUT** `/api/v1/resources/:id`
- **Auth**: Required (Admin)
- **Input**: Partial Resource object
- **Output**: Updated Resource object

#### Delete Resource
- **DELETE** `/api/v1/resources/:id`
- **Auth**: Required (Admin)
- **Output**: 204 No Content

#### List Resources
- **GET** `/api/v1/resources`
- **Auth**: Not Required
- **Query Parameters**:
  - `name`: Filter by name
  - `page`: Page number
  - `limit`: Items per page
  - `sortBy`: Sort field
  - `sortOrder`: asc/desc
- **Output**: Array of Resource objects

### Auth Endpoints

#### Register
- **POST** `/api/v1/auth/register`
- **Input**: 
  ```json
  {
    "email": "string",
    "password": "string",
    "confirmPassword": "string"
  }
  ```
- **Output**: User object with token

#### Login
- **POST** `/api/v1/auth/login`
- **Input**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Output**: User object with token 