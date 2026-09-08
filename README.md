# Samarth — Societal Innovation Collaboration Platform

> **SIH 2026 Project** — Connecting real-world community problems with the people and institutions capable of solving them.

Samarth is not a complaint box. It is a **problem-to-solution pipeline** that transforms unstructured citizen submissions into structured intelligence, matches them with capable institutions, and tracks the journey from identification to measurable impact.

**Core Flow:**
```
Community Need → Structured Challenge → Validation & AI Intelligence → Institutional Matching → Team Formation → Proposal → Development → Prototype → Pilot → Deployment → Impact
```

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Backend (Go)](#backend-go)
- [Frontend (Next.js)](#frontend-nextjs)
- [AI Worker (Python)](#ai-worker-python)
- [Database](#database)
- [Infrastructure](#infrastructure)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [MVP Scope](#mvp-scope)

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Backend** | Go (Gin/Echo) | Fast, single binary, great for APIs, your team has Go experience |
| **Frontend** | Next.js 14+ (React) | Server-side rendering, fast iteration, great for dashboards |
| **AI Worker** | Python (FastAPI) | Best ecosystem for LLM integration, embeddings, NLP |
| **Database** | PostgreSQL | Reliable relational DB, handles complex queries, free |
| **File Storage** | Local (dev) → S3-compatible (prod) | For images, videos, documents uploaded as evidence |
| **Cache** | Redis | Session storage, rate limiting, caching frequent queries |
| **Search** | PostgreSQL FTS (MVP) → Elasticsearch (later) | Full-text search for problems without extra infra |
| **Vector Search** | pgvector (MVP) → Pinecone/Weaviate (later) | For similarity detection of problems |
| **Container** | Docker + Docker Compose | Consistent dev environments across team members |
| **Background Jobs** | Go worker goroutines (MVP) → Redis queue (later) | AI processing, notifications, analytics |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                      FRONTEND                           │
│                   Next.js (React)                        │
│                                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │ Citizen  │ │  Admin   │ │   HEI    │ │Dashboard │   │
│  │   View   │ │  Panel   │ │  Portal  │ │          │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
└───────────────────────┬─────────────────────────────────┘
                        │ REST API
┌───────────────────────┴─────────────────────────────────┐
│                    BACKEND (Go)                          │
│                Modular Monolith                          │
│                                                          │
│  ┌─────┐ ┌─────┐ ┌───────┐ ┌────────┐ ┌──────────┐    │
│  │Auth │ │User │ │Problem│ │Matching│ │ Projects │    │
│  │     │ │ Org │ │Evidence│ │        │ │  Teams   │    │
│  └─────┘ └─────┘ └───────┘ └────────┘ └──────────┘    │
│  ┌──────────┐ ┌────────────┐ ┌──────────────┐          │
│  │Analytics │ │Notifications│ │   Shared     │          │
│  │          │ │            │ │ Types/Utils  │          │
│  └──────────┘ └────────────┘ └──────────────┘          │
└───────────────────────┬─────────────────────────────────┘
                        │ Internal API / Message Queue
┌───────────────────────┴─────────────────────────────────┐
│               AI WORKER (Python/FastAPI)                 │
│                                                          │
│  ┌───────────┐ ┌──────────┐ ┌────────────────────┐     │
│  │Categorize │ │ Summarize│ │ Similarity/Dedupe  │     │
│  │ Extract   │ │ Severity │ │ Match Scoring      │     │
│  └───────────┘ └──────────┘ └────────────────────┘     │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────┴─────────────────────────────────┐
│                    PostgreSQL                             │
│  ┌──────┐ ┌──────┐ ┌────────┐ ┌─────────┐ ┌────────┐  │
│  │Users │ │Probs │ │Projects│ │Matches  │ │Orgs    │  │
│  └──────┘ └──────┘ └────────┘ └─────────┘ └────────┘  │
│  + pgvector extension for similarity search              │
└─────────────────────────────────────────────────────────┘
```

**Why a Modular Monolith and not Microservices?**

For a student team building an SIH prototype, microservices would mean:
- 5+ separate deployment pipelines
- Network latency between services
- Complex debugging across services
- Distributed transactions
- Team overhead managing infrastructure instead of features

A modular monolith gives you:
- Single binary deployment
- Fast development
- Module boundaries that can become services later
- Easy debugging
- One `docker-compose up` and everything works

---

## Project Structure

```
Samarth-main/
│
├── README.md                          # This file
├── docker-compose.yml                 # One command to run everything
├── .env.example                       # Environment variables template
├── .gitignore
├── Makefile                           # Common dev commands (make run, make test, etc.)
│
├── backend/                           # Go backend — the core API server
│   ├── cmd/
│   │   └── server/
│   │       └── main.go                # Entry point — starts the server
│   │
│   ├── internal/
│   │   ├── config/
│   │   │   └── config.go             # Reads .env, loads app configuration
│   │   │
│   │   ├── database/
│   │   │   ├── connection.go          # PostgreSQL connection pool setup
│   │   │   └── migrations.go          # Run migrations on startup
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.go               # JWT verification, attaches user to request
│   │   │   ├── cors.go               # Cross-origin settings for frontend
│   │   │   ├── ratelimit.go          # Rate limiting
│   │   │   └── logger.go             # Request logging
│   │   │
│   │   ├── modules/                   # DOMAIN MODULES — each is self-contained
│   │   │   ├── auth/                  # Registration, login, tokens, password reset
│   │   │   ├── users/                 # User profiles, preferences
│   │   │   ├── organizations/         # HEIs, NGOs, government bodies, companies
│   │   │   ├── problems/              # Problem submissions, status, lifecycle
│   │   │   ├── evidence/              # File uploads, photos, videos, documents
│   │   │   ├── matching/              # Problem↔Institution matching + scoring
│   │   │   ├── projects/              # Project lifecycle, milestones, proposals
│   │   │   ├── teams/                 # Team formation, membership, roles
│   │   │   ├── analytics/             # Aggregated stats, dashboards, reports
│   │   │   └── notifications/         # In-app notifications, alerts
│   │   │
│   │   └── shared/                    # Code used across multiple modules
│   │       ├── types/
│   │       │   └── common.go          # Shared types: UUID, timestamps, pagination
│   │       ├── utils/
│   │       │   ├── helpers.go         # Utility functions (string, time, validation)
│   │       │   └── fileupload.go      # File upload to local disk / S3
│   │       ├── errors/
│   │       │   └── errors.go          # Standard error types across the app
│   │       └── response/
│   │           └── response.go        # Standard JSON response format
│   │
│   ├── migrations/                    # SQL migration files (numbered)
│   │   ├── 001_create_users.sql
│   │   ├── 002_create_organizations.sql
│   │   ├── 003_create_problems.sql
│   │   └── ...
│   │
│   ├── seeds/                         # Sample data for development
│   │   ├── users.sql
│   │   ├── organizations.sql
│   │   └── problems.sql
│   │
│   ├── go.mod                         # Go module definition
│   └── go.sum                         # Dependency checksums
│
├── frontend/                          # Next.js frontend
│   ├── src/
│   │   ├── app/                       # Pages (Next.js App Router)
│   │   │   ├── layout.tsx             # Root layout (navbar, sidebar)
│   │   │   ├── page.tsx               # Landing page
│   │   │   ├── auth/
│   │   │   │   ├── login/             # Login page
│   │   │   │   └── register/          # Registration page
│   │   │   ├── dashboard/             # Main dashboard (role-based)
│   │   │   ├── problems/
│   │   │   │   ├── new/               # Submit a new problem
│   │   │   │   └── [id]/              # View a specific problem
│   │   │   ├── matches/               # View match results
│   │   │   ├── projects/              # Project management
│   │   │   ├── admin/                 # Admin/government panel
│   │   │   └── hei/                   # HEI institution portal
│   │   │
│   │   ├── components/                # Reusable UI components
│   │   │   ├── common/                # Button, Card, Modal, Input, etc.
│   │   │   ├── layout/                # Navbar, Sidebar, Footer
│   │   │   ├── problems/              # ProblemCard, ProblemForm, ProblemList
│   │   │   ├── matches/               # MatchCard, MatchScore, MatchExplanation
│   │   │   ├── projects/              # ProjectCard, MilestoneTracker
│   │   │   ├── charts/                # Charts for dashboards
│   │   │   └── maps/                  # Map component for geographic view
│   │   │
│   │   ├── lib/
│   │   │   ├── api/
│   │   │   │   └── client.ts          # API client (fetch wrapper)
│   │   │   ├── auth/
│   │   │   │   └── provider.tsx       # Auth context/provider
│   │   │   └── utils/
│   │   │       └── helpers.ts         # Frontend utility functions
│   │   │
│   │   ├── hooks/                     # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useProblems.ts
│   │   │   └── useProjects.ts
│   │   │
│   │   └── types/                     # TypeScript type definitions
│   │       ├── user.ts
│   │       ├── problem.ts
│   │       ├── project.ts
│   │       └── api.ts
│   │
│   ├── public/
│   │   └── uploads/                   # Local file storage (dev)
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.js
│
├── ai-worker/                         # Python AI service — processes problem intelligence
│   ├── app/
│   │   ├── main.py                    # FastAPI app entry point
│   │   │
│   │   ├── api/
│   │   │   └── routes.py             # API endpoints the Go backend calls
│   │   │
│   │   ├── services/                  # AI business logic
│   │   │   ├── categorize.py          # Problem categorization using LLM
│   │   │   ├── summarize.py           # Problem summarization
│   │   │   ├── extract.py             # Entity/field extraction from text
│   │   │   ├── severity.py            # Severity/priority scoring
│   │   │   ├── similarity.py          # Vector similarity + duplicate detection
│   │   │   └── matching.py            # Match score calculation
│   │   │
│   │   ├── models/
│   │   │   ├── schemas.py            # Pydantic request/response models
│   │   │   └── prompts.py            # LLM prompt templates
│   │   │
│   │   └── utils/
│   │       ├── llm_client.py          # OpenAI/Anthropic API wrapper
│   │       ├── embeddings.py          # Text embedding generation
│   │       └── vector_store.py        # pgvector operations
│   │
│   ├── tests/
│   │   ├── test_categorize.py
│   │   ├── test_similarity.py
│   │   └── test_matching.py
│   │
│   ├── config/
│   │   └── settings.py               # Environment config for AI worker
│   │
│   ├── requirements.txt              # Python dependencies
│   └── Dockerfile
│
├── docs/                              # Project documentation
│   ├── ARCHITECTURE.md                # Detailed architecture decisions
│   ├── API.md                         # API endpoint reference
│   ├── DATABASE.md                    # ERD and schema documentation
│   ├── DOMAIN.md                      # Domain model documentation
│   ├── DEPLOYMENT.md                  # How to deploy
│   └── SIH-PITCH.md                  # SIH presentation talking points
│
└── scripts/                           # Helper scripts
    ├── setup.sh                       # One-time project setup
    ├── seed.sh                        # Populate database with sample data
    └── migrate.sh                     # Run database migrations
```

---

## Backend (Go)

### Module Structure

Each domain module follows a **3-layer architecture**:

```
modules/
└── problems/
    ├── handler/        # HTTP handlers — parses request, calls service, returns response
    │   └── handler.go
    ├── service/        # Business logic — the brain of the module
    │   └── service.go
    ├── repository/     # Database queries — only file that touches SQL
    │   └── repository.go
    └── model/          # Data structures — structs for DB rows and API requests
        └── model.go
```

**Why this separation?**

| Layer | Responsibility | Can change without affecting |
|-------|---------------|------------------------------|
| `handler` | HTTP parsing, validation, response formatting | Business logic, database |
| `service` | Business rules, orchestration, decisions | How HTTP works, how DB stores data |
| `repository` | SQL queries, data access | Business logic, HTTP layer |
| `model` | Data shapes | Business logic |

**Dependency flow:** `handler → service → repository`

A handler never queries the database directly. A repository never decides business rules.

### Inter-Module Communication

Modules communicate through their **service layer** — not by importing each other's repositories.

```go
// In problems/service/service.go
type ProblemService struct {
    repo     *repository.ProblemRepo
    matchSvc *matching.Service  // ← inject other module's service
}
```

### Why Go for the Backend?

1. **Speed** — Compiled, fast startup, low memory
2. **Simplicity** — One binary, no runtime dependencies
3. **Concurrency** — Goroutines handle many simultaneous requests easily
4. **Type safety** — Catch errors at compile time
5. **Your team knows Go** — No learning curve for core backend logic
6. **Easy to explain** — "We chose Go for performance and simplicity" is a strong interview answer

---

## Frontend (Next.js)

### Why Next.js?

1. **App Router** — Clean file-based routing that's easy to explain
2. **Server Components** — Faster initial page loads, better SEO
3. **TypeScript** — Shared types with backend API contracts
4. **Dashboard-friendly** — Rich component ecosystem (charts, tables, maps)
5. **Fast iteration** — Hot reload, great DX for rapid prototyping

### Page Structure

Each page in `src/app/` maps to a URL:

| Page | URL | Purpose |
|------|-----|---------|
| `page.tsx` | `/` | Landing page |
| `auth/login/` | `/auth/login` | Citizen/admin login |
| `auth/register/` | `/auth/register` | Registration |
| `dashboard/` | `/dashboard` | Role-based dashboard |
| `problems/new/` | `/problems/new` | Submit a new problem |
| `problems/[id]/` | `/problems/123` | View problem details |
| `matches/` | `/matches` | View AI match results |
| `projects/` | `/projects` | Project management |
| `admin/` | `/admin` | Admin/government panel |
| `hei/` | `/hei` | HEI institution portal |

---

## AI Worker (Python)

### Why a Separate Service?

The AI worker is a **separate Python process** because:

1. Python has the best AI/ML libraries (OpenAI SDK, sentence-transformers, etc.)
2. AI processing is **slow** — you don't want it blocking API responses
3. It can run on different hardware (GPU if needed later)
4. It can be scaled independently
5. Different team member can own it without touching Go code

### How It Communicates

```
Go Backend → HTTP POST → AI Worker → Process → Return results
```

The Go backend sends problem data to the AI worker and gets back structured intelligence. The AI worker does NOT directly access the database — it receives data, processes it, and returns results.

### AI Services Breakdown

| Service | What it does | Tool used |
|---------|-------------|-----------|
| `categorize.py` | Assigns categories to problems | LLM (GPT-4/Claude) |
| `summarize.py` | Creates structured summaries | LLM |
| `extract.py` | Extracts entities (location, people, orgs) | LLM + regex |
| `severity.py` | Scores problem severity | Rule-based + LLM |
| `similarity.py` | Finds similar/duplicate problems | Embeddings + pgvector |
| `matching.py` | Scores problem↔institution fit | Rule-based + embeddings |

**Key principle:** Use LLMs only where they add value. Use deterministic rules for scoring, matching formulas, and data transformations.

---

## Database

### Why PostgreSQL?

1. **Reliable** — Battle-tested for complex relational data
2. **JSON support** — Store flexible metadata alongside structured data
3. **pgvector extension** — Vector similarity search built into the database (no separate vector DB needed for MVP)
4. **Full-text search** — Built-in, no extra service needed
5. **Free and open source**
6. **Docker-friendly** — One line in docker-compose

### Core Entities (MVP)

```
users ──→ organizations (via org_members)
    │
    ├──→ problems (submitted by)
    │       ├──→ problem_evidence (uploads)
    │       ├──→ problem_status_history (audit trail)
    │       └──→ matches (matched with institutions)
    │               └──→ projects (if match accepted)
    │                       ├──→ project_members
    │                       ├──→ project_milestones
    │                       └──→ impact_metrics
    │
    └──→ notifications (for user)
```

Full database schema will be defined in Step 6 (Database Architecture).

---

## Infrastructure

### Docker Compose (Development)

```yaml
# docker-compose.yml runs everything locally:
services:
  postgres:    # Database
  redis:       # Cache (optional for MVP)
  backend:     # Go API server
  ai-worker:   # Python AI service
  frontend:    # Next.js dev server
```

**One command to start everything:** `docker-compose up`

### Why Docker?

- Every team member gets the **exact same** environment
- No "works on my machine" problems
- PostgreSQL, Redis setup is automatic
- New team member: clone → `docker-compose up` → done

---

## Getting Started

### Prerequisites

- Docker & Docker Compose
- Git
- Go 1.21+ (for backend development outside Docker)
- Node.js 18+ (for frontend development outside Docker)
- Python 3.11+ (for AI worker development outside Docker)

### Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/your-team/samarth.git
cd samarth

# 2. Copy environment template
cp .env.example .env

# 3. Start everything
docker-compose up

# 4. Run migrations
make migrate

# 5. Seed sample data
make seed

# 6. Open
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080
# AI Worker: http://localhost:8000
```

---

## Development Workflow

### Git Branching Strategy

```
main                  ← Production-ready code
├── develop           ← Integration branch
│   ├── feature/auth
│   ├── feature/problem-submission
│   ├── feature/ai-categorization
│   ├── feature/matching-engine
│   └── feature/hei-dashboard
```

### Rules

1. **Never push directly to `main`**
2. **Create a feature branch** from `develop` for every task
3. **Open a PR** to merge into `develop`
4. **At least 1 review** before merging
5. **Pull `develop` daily** to avoid merge conflicts

### Commit Convention

```
feat: add problem submission endpoint
fix: resolve duplicate detection false positive
docs: update API documentation
refactor: extract validation into shared module
test: add matching service unit tests
```

### Team Ownership (Suggested)

| Area | Developer | Branch prefix |
|------|-----------|---------------|
| Auth + Users | Developer 1 | `feature/auth-*` |
| Problems + Evidence | Developer 2 | `feature/problem-*` |
| AI Worker | Developer 3 | `feature/ai-*` |
| Matching + Projects | Developer 4 | `feature/match-*` |
| Frontend | Developer 5 | `feature/ui-*` |
| Admin + Analytics | Developer 6 | `feature/admin-*` |

### API Contract First

Before implementing, define the API contract in `docs/API.md`. This way:
- Frontend developer can build UI with mock data
- Backend developer implements the endpoint
- Both work in parallel

---

## MVP Scope

### What's IN the MVP

| Feature | Priority | Effort |
|---------|----------|--------|
| User registration & login | Must have | Low |
| Problem submission with evidence | Must have | Medium |
| AI categorization & summarization | Must have | Medium |
| Similarity/duplicate detection | Must have | Medium |
| Admin validation workflow | Must have | Medium |
| Institution capability profiles | Must have | Low |
| Problem↔Institution matching | Must have | High |
| Explainable match scores | Must have | Medium |
| Project creation & tracking | Must have | Medium |
| Basic dashboard | Must have | Medium |
| Impact metrics | Should have | Low |
| Geographic analytics | Should have | Medium |
| Notifications | Should have | Low |

### What's NOT in MVP (Future)

- Donations/payment processing
- Social feed/activity stream
- Native mobile apps
- Advanced knowledge graphs
- Real-time chat
- Video conferencing
- Government API integrations
- Multi-language support
- Advanced reporting/export

---

## Key Architectural Decisions

| Decision | Choice | Reasoning |
|----------|--------|-----------|
| Monolith vs Microservices | Modular Monolith | Faster to build, easier to demo, can extract later |
| Auth method | JWT tokens | Stateless, simple, works with any frontend |
| File uploads | Local → S3 later | Start simple, scale when needed |
| Similarity search | pgvector | One database, no extra infrastructure |
| AI processing | Separate Python service | Best AI libraries, doesn't slow down API |
| Caching | Redis (optional for MVP) | Can add later without changing code |
| Search | PostgreSQL full-text | No extra search engine needed for MVP |

---

## Questions & Contacts

**Project:** Samarth — Societal Innovation Collaboration Platform
**Team:** [Team Name]
**Mentor:** [Faculty Name]
**Institution:** [College Name]

---

*Built for SIH 2026 — Making societal problems solvable through intelligent collaboration.*
