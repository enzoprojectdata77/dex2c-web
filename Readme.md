# Dex2C Web

A modern web interface for the Dex2C APK-to-C++ conversion service. This application provides a comprehensive dashboard for uploading Android APK files, tracking conversion jobs, and managing the obfuscation and native code generation process.

## Overview

Dex2C Web is the frontend companion to the [Dex2C Backend](https://github.com/springmusk026/Dex2C-Backend), offering developers and security professionals an intuitive interface to transform Android applications into optimized native C++ code with advanced obfuscation techniques.

### Key Features

- **File Upload & Processing**: Drag-and-drop APK upload with real-time progress tracking and validation
- **Advanced Configuration**: Granular control over obfuscation parameters, build options, and signing preferences
- **Job Management**: Comprehensive job tracking with status monitoring, search, and filtering capabilities
- **Detailed Analytics**: View processing statistics, execution logs, and performance metrics
- **API Documentation**: Interactive documentation viewer for all available endpoints
- **Real-time Updates**: Automatic job status polling with optimized refresh intervals

## Technology Stack

This project is built with modern web technologies optimized for performance and developer experience:

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS v4
- **State Management**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form with validation

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.x or higher
- npm 9.x or higher (or yarn/pnpm equivalent)
- A running instance of [Dex2C Backend](https://github.com/springmusk026/Dex2C-Backend)

## Installation

Clone the repository and install dependencies:

```
git clone https://github.com/springmusk026/dex2c-web.git
cd dex2c-web
npm install
```

## Configuration

Create a `.env.local` file in the project root with the following environment variable:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

Replace the URL with your Dex2C Backend instance endpoint. The `NEXT_PUBLIC_` prefix ensures the variable is available in the browser.

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for the Dex2C Backend API | Yes | - |

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000` by default.

### Build for Production

Create an optimized production build:

```bash
npm run build
npm start
```

### Code Quality

Run linting and type checking:

```bash
npm run lint
npm run type-check
```

## Project Structure

```
dex2c-web/
├── app/                    # Next.js app directory
│   ├── docs/              # API documentation page
│   ├── jobs/              # Job tracking dashboard
│   ├── process/           # APK upload and processing
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Landing page
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── navigation.tsx    # Main navigation component
├── lib/                   # Core utilities and configurations
│   ├── api/              # API client and services
│   │   ├── client.ts     # Axios instance configuration
│   │   ├── services.ts   # API service functions
│   │   └── hooks.ts      # TanStack Query hooks
│   ├── types/            # TypeScript type definitions
│   │   └── api.ts        # API types from OpenAPI spec
│   └── providers/        # React context providers
└── public/               # Static assets
```

## Usage

### Processing an APK

1. Navigate to the **Process** page
2. Upload your APK file using the drag-and-drop interface or file picker
3. Configure processing options (optional):
   - Enable dynamic register obfuscation
   - Skip synthetic methods
   - Disable APK signing
   - Upload custom filter files
4. Submit the job and receive a job ID
5. Track progress on the **Jobs** page

### Monitoring Jobs

The Jobs dashboard provides comprehensive tracking:

- **Search**: Filter jobs by ID, filename, or status
- **Status Indicators**: Visual status badges (pending, processing, completed, failed)
- **Details View**: Expandable panels showing:
  - Job overview with timestamps and file sizes
  - Process information (stdout, stderr, command, duration)
  - Configuration parameters used
- **Actions**: Download processed files or cancel running jobs

### API Integration

The application uses a centralized API management system:

```typescript
// Example: Using the API hooks
import { useJobStatus } from '@/lib/api/hooks'

function JobDetails({ jobId }: { jobId: string }) {
  const { data, isLoading, error } = useJobStatus(jobId)
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return <div>Status: {data.status}</div>
}
```

All API types are automatically generated from the OpenAPI specification, ensuring type safety across the application.

## API Documentation

The integrated API documentation viewer provides detailed information about all available endpoints, including:

- Request/response schemas
- Authentication requirements
- Rate limiting policies
- Example requests and responses

Access the documentation at `/docs` when running the application.

## Architecture Decisions

### State Management

We use TanStack Query for server state management because it provides:

- Automatic background refetching
- Optimistic updates
- Request deduplication
- Built-in caching strategies

### Type Safety

All API types are derived from the OpenAPI specification, ensuring:

- Compile-time type checking
- Automatic IDE autocomplete
- Reduced runtime errors
- Self-documenting code

### Component Architecture

Components follow a clear separation of concerns:

- **Pages**: Route-level components that orchestrate data fetching
- **Components**: Presentational components focused on UI
- **Hooks**: Custom hooks for shared logic and API interactions
- **Services**: Pure functions for API communication

## Contributing

Contributions are welcome. Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes with clear, descriptive messages
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a Pull Request with a detailed description

### Code Style

- Follow the existing TypeScript and React patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure all types are properly defined
- Run linting before committing

## Related Projects

- [Dex2C Backend](https://github.com/springmusk026/Dex2C-Backend) - Server-side processing engine

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

For issues, questions, or contributions, please open an issue on GitHub or refer to the backend repository for API-related concerns.

