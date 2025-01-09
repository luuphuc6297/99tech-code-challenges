# Quiz Application Documentation

## Table of Contents
- [Tech Stack](#tech-stack)
- [Architecture & Design Patterns](#architecture--design-patterns)
- [System Components](#system-components)
- [WebSocket Authentication](#websocket-authentication)
- [Business Workflow](#business-workflow)
- [Folder Structure](#folder-structure)

## Tech Stack

### Backend Framework
- **NestJS**: Main backend framework providing:
  - Dependency Injection
  - Module-based architecture
  - Built-in support for TypeScript
  - Decorators for clean code organization
  - Built-in WebSocket support

### Database & Caching
- **MongoDB**: Primary database for:
  - User management
  - Quiz data storage
  - Session management
  - Leaderboard persistence

- **Redis**: Caching and real-time features:
  - Session state management
  - Pub/Sub for real-time updates
  - Rate limiting
  - Leaderboard caching
  - Temporary data storage

### Real-time Communication
- **Socket.IO**: Real-time bidirectional communication:
  - Quiz session management
  - Live participant updates
  - Real-time scoring
  - Instant leaderboard updates

### Authentication & Security
- **JWT (JSON Web Tokens)**: Authentication mechanism for:
  - User authentication
  - WebSocket connection security
  - API endpoint protection

### Monitoring & Metrics
- **Custom Metrics Service**: Application monitoring:
  - Performance tracking
  - Error logging
  - User activity monitoring
  - System health checks

## Architecture & Design Patterns

### Clean Architecture
The application follows Clean Architecture principles with layers:

1. **Presentation Layer**
   - Controllers
   - Gateways
   - DTOs

2. **Domain Layer**
   - Entities
   - Interfaces
   - Business Rules

3. **Application Layer**
   - Services
   - Use Cases
   - Business Logic

4. **Infrastructure Layer**
   - Database Implementations
   - External Services
   - Third-party Integrations

### Design Patterns

1. **Observer Pattern**
   - Implementation: `QuizEventObserver`
   - Purpose: Handle quiz events and notifications
   - Components:
     - `LeaderboardObserver`
     - `RedisObserver`

2. **Factory Pattern**
   - Implementation: `QuizSessionFactory`
   - Purpose: Create different types of quiz sessions
   - Variants:
     - `DefaultQuizSessionFactory`
     - `CompetitiveQuizSessionFactory`
     - `PracticeQuizSessionFactory`

3. **Strategy Pattern**
   - Implementation: `ScoringStrategy`
   - Purpose: Different scoring mechanisms
   - Variants:
     - `TimeBasedScoringStrategy`
     - `BonusPointsScoringStrategy`

4. **Command Pattern**
   - Implementation: Quiz Commands
   - Purpose: Encapsulate quiz operations
   - Examples:
     - `StartQuizSessionCommand`
     - `JoinQuizCommand`
     - `StartQuestionCommand`

5. **Singleton Pattern**
   - Implementation: Services
   - Purpose: Single instance management
   - Examples:
     - `RedisService`
     - `MetricsService`

## System Components

### WebSocket Gateway
- **Implementation**: `QuizGateway`
- **Purpose**: Handle real-time quiz interactions
- **Features**:
  - Session management
  - Real-time updates
  - Participant handling
  - Answer processing

### Redis Pub/Sub
- **Implementation**: `RedisService`
- **Purpose**: Scalable real-time communication
- **Features**:
  - Event broadcasting
  - State synchronization
  - Cross-instance communication

### Scalability Solutions

1. **Horizontal Scaling**
   - Multiple application instances
   - Redis for state sharing
   - Load balancer support

2. **Vertical Scaling**
   - Resource optimization
   - Efficient data structures
   - Caching strategies

### Advantages
- High availability
- Real-time performance
- Scalable architecture
- Fault tolerance

### Disadvantages
- Complex setup
- Additional infrastructure cost
- Potential consistency challenges
- Increased monitoring needs

## WebSocket Authentication

### Authentication Flow
1. **Initial Connection**
   ```typescript
   // Client-side
   const socket = io({
     auth: { token: 'JWT_TOKEN' }
   });
   ```

2. **Server Validation**
   ```typescript
   @WebSocketGateway()
   export class QuizGateway {
     async handleConnection(client: Socket) {
       const token = client.handshake.auth.token;
       // Validate JWT
     }
   }
   ```

3. **Middleware Protection**
   - JWT verification
   - Rate limiting
   - Connection management

### Security Measures
- Token-based authentication
- Connection timeouts
- Rate limiting
- Payload validation


## Folder Structure
```
src/
├── core/                           # Domain layer
│   ├── entities/                   # Business objects
│   │   ├── Quiz.ts
│   │   ├── Question.ts
│   │   ├── User.ts
│   │   └── Leaderboard.ts
│   ├── repositories/               # Repository interfaces
│   │   ├── IQuizRepository.ts
│   │   ├── IUserRepository.ts
│   │   └── ILeaderboardRepository.ts
│   └── interfaces/                 # Core business interfaces
│       ├── IQuizService.ts
│       └── IAuthService.ts
│
├── data/                          # Data layer
│   ├── repositories/              # Repository implementations
│   │   ├── MongoQuizRepository.ts
│   │   ├── MongoUserRepository.ts
│   │   └── MongoLeaderboardRepository.ts
│   ├── services/                  # External services
│   │   ├── RedisService.ts
│   │   ├── WebSocketService.ts
│   │   └── MetricsService.ts
│   └── strategies/                # Strategy pattern implementations
│       ├── scoring/
│       │   ├── IScoringStrategy.ts
│       │   └── TimeBasedStrategy.ts
│       └── session/
│           ├── ISessionStrategy.ts
│           └── RedisSessionStrategy.ts
│
├── application/                   # Application layer
│   ├── commands/                  # Command handlers
│   │   ├── quiz/
│   │   └── auth/
│   ├── queries/                   # Query handlers
│   │   ├── quiz/
│   │   └── leaderboard/
│   └── events/                    # Domain events
│       └── handlers/
│
├── presentation/                  # UI layer
│   ├── controllers/              # REST controllers
│   ├── gateways/                # WebSocket gateways
│   ├── dtos/                    # Data Transfer Objects
│   └── middlewares/             # Guards and interceptors
│
└── config/                       # Configuration
    ├── database/
    ├── websocket/
    └── redis/
```
This structure follows several key organizational principles:

1. **Modular Architecture**
   - Each module is self-contained with its own components
   - Clear separation of concerns
   - Easy to maintain and scale

2. **Feature-based Organization**
   - Modules are organized by feature (auth, quiz, user, etc.)
   - Each feature has its own set of controllers, services, and DTOs
   - Makes it easy to locate and modify feature-specific code

3. **Shared Resources**
   - Common code is placed in shared/ directory
   - Reusable utilities and services
   - Consistent patterns across modules

4. **Clean Architecture Principles**
   - Clear separation of business logic (services)
   - Data transfer objects (DTOs) for input validation
   - Domain entities for business rules
   - Infrastructure concerns separated (database, external services)

5. **Testing Structure**
   - Separate directories for unit and e2e tests
   - Follows same structure as source code
   - Easy to maintain test coverage

6. **Configuration Management**
   - Centralized configuration in config/
   - Environment-based settings
   - Easy to modify system-wide settings

This structure provides:
- High maintainability
- Clear code organization
- Easy scalability
- Good separation of concerns
- Efficient dependency management


# Redis Pub/Sub and WebSocket Authentication

## Overview

The system uses Redis Pub/Sub to enable communication between multiple server instances in a distributed system. This is crucial for scaling WebSocket applications horizontally.

## 1. Redis Pub/Sub Mechanism

### How It Works

#### Publishing Events
- When an event occurs on a server instance (e.g., quiz answer submission)
- Server publishes this event to specific Redis channels
- Each event contains metadata like timestamp, server ID, and event data

#### Subscribing to Events
- All server instances subscribe to relevant Redis channels
- When an event is published, all subscribers receive the message
- Each instance can filter out its own messages to avoid duplicate processing

### State Synchronization
- Maintains consistent state across all server instances
- Synchronizes:
  - Quiz states
  - User sessions
  - Leaderboard updates
  - Active connections

## 2. WebSocket Authentication

### Authentication Flow

#### Initial Connection
- Client attempts WebSocket connection with JWT token
- Load balancer routes to available server instance
- Server validates JWT token before accepting connection

#### Session Management
- Valid connections create a session in Redis
- Session includes:
  - User ID
  - Server ID
  - Connection timestamp
  - Client metadata

### Security Measures

#### Token Validation
- JWT verification on connection
- Token blacklist checking
- Regular token refresh

#### Session Security
- Unique session IDs
- Time-based session expiration
- Server-side session validation

## Error Handling and Recovery

### Server Failure
- Detection of failed server instances
- Identification of affected sessions
- Client notification for reconnection

### Session Recovery
- Automatic session transfer to active servers
- State restoration from Redis
- Seamless user experience maintenance

## Key Benefits

### Scalability
- Easy addition of new server instances
- Balanced load distribution
- Consistent performance under load

### Reliability
- Robust error handling
- Automatic recovery mechanisms
- Persistent session maintenance

### Real-time Performance
- Low latency communication
- Efficient message broadcasting
- Optimized state synchronization