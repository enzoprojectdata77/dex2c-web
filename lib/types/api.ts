export type JobStatusType = "pending" | "processing" | "completed" | "failed" | "timeout"

export interface ServiceInfo {
  service: string
  version: string
  status: string
  endpoints: {
    health: string
  }
  documentation?: string
}

export interface HealthStatus {
  status: string
  service: string
  version: string
  timestamp: string
  uptime: number
  environment: string
  memory: {
    used: number
    total: number
    unit: string
  }
}

export interface ProcessResponse {
  success: boolean
  jobId: string
  message: string
  downloadUrl: string
  inputSize: number
  outputSize: number
}

export interface JobInfo {
  jobId: string
  status: JobStatusType
  originalFilename: string
  inputSize: number
  outputSize?: number
  parameters?: Record<string, unknown>
  error?: string
  processInfo?: {
    returnCode: number
    stdout: string
    stderr: string
    command: string
    startTime: string
    endTime: string
    duration: number
  }
  createdAt: string
  updatedAt: string
}

export interface JobStatus {
  jobId: string
  status: JobStatusType
  originalFilename: string
  inputSize: number
  outputSize?: number
  parameters?: Record<string, unknown>
  error?: string
  processInfo?: {
    returnCode: number
    stdout: string
    stderr: string
    command: string
    startTime: string
    endTime: string
    duration: number
  }
  createdAt: string
  updatedAt: string
}

export interface JobStats {
  totalJobs: number
  statusBreakdown : [
    { _id: JobStatusType; count: number }
  ],
  activeProcesses: number
}

export interface SuccessResponse {
  success: boolean
  message: string
}

export interface ErrorResponse {
  success: false
  error: string
}

export interface ProcessParameters {
  dynamic_register?: boolean
  skip_synthetic?: boolean
  no_build?: boolean
  force_keep_libs?: boolean
  disable_signing?: boolean
  filter?: string
  custom_loader?: string
  source_dir?: string
  project_archive?: string
}

export interface ProcessRequest {
  file: File
  parameters?: ProcessParameters
}
