# RBAC Authentication System Workflow

```mermaid
graph TD
    %% Client-side Components
    subgraph Frontend [Frontend - React Application]
        A[Login Page] --> |Authentication| B[Auth Context]
        C[Register Page] --> |User Creation| B
        B --> |State Management| D[Protected Routes]
        D --> E[Dashboard]
        D --> F[Profile]
        E --> |User Management| G[UserList Component]
    end

    %% Server-side Components
    subgraph Backend [Backend - Node.js/Express]
        H[Auth Routes] --> |JWT| I[Auth Controller]
        J[User Routes] --> |Middleware| K[User Controller]
        L[Auth Middleware] --> |Validation| M[Role Authorization]
    end

    %% Database
    subgraph Database [MongoDB]
        N[User Collection]
    end

    %% Cross-component Interactions
    B <--> |API Calls| H
    G <--> |CRUD Operations| J
    I <--> |Data Operations| N
    K <--> |Data Operations| N

    %% Authentication Flow
    A --> |Login Request| H
    C --> |Register Request| H
    H --> |Generate Token| I
    I --> |Validate| L
    L --> |Check Permissions| M

    %% Session Management
    B --> |4min Timeout| O[Session Manager]
    O --> |Auto Logout| A

    %% Role-based Access
    M --> |Super Admin| P[Full Access]
    M --> |Admin| Q[View Users]
    M --> |User| R[Profile Only]

    %% Styling
    classDef frontend fill:#e1f5fe,stroke:#01579b
    classDef backend fill:#e8f5e9,stroke:#1b5e20
    classDef database fill:#fce4ec,stroke:#880e4f
    classDef auth fill:#fff3e0,stroke:#e65100

    class A,B,C,D,E,F,G frontend
    class H,I,J,K,L,M backend
    class N database
    class O,P,Q,R auth
```

## Workflow Description

### Frontend Flow

1. **Authentication**

   - Users can login or register through dedicated pages
   - AuthContext manages authentication state and session
   - Protected routes ensure authenticated access

2. **User Interface**
   - Dashboard displays user management for admin roles
   - Profile page for user information updates
   - Role-based component rendering

### Backend Flow

1. **API Routes**

   - Authentication routes handle login/register
   - User routes manage CRUD operations
   - Protected routes require JWT validation

2. **Middleware**
   - JWT verification for protected routes
   - Role-based access control
   - Session timeout management

### Database Flow

1. **User Management**
   - Store user credentials and profiles
   - Maintain role associations
   - Handle data persistence

### Security Features

1. **Authentication**

   - JWT-based authentication
   - Password hashing with bcrypt
   - Email validation for Gmail

2. **Authorization**

   - Role-based access control
   - Permission validation
   - Protected route middleware

3. **Session Management**
   - 4-minute session timeout
   - Automatic logout
   - Activity-based session refresh
