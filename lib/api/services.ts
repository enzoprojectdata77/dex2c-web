import { apiClient } from "./client"
import type {
  ServiceInfo,
  HealthStatus,
  ProcessResponse,
  JobStatus,
  JobStats,
  SuccessResponse,
  ProcessRequest,
} from "../types/api"

export const apiServices = {
  // Get service information
  getServiceInfo: async (): Promise<ServiceInfo> => {
    const { data } = await apiClient.get<ServiceInfo>("/")
    return data
  },

  // Get health status
  getHealthStatus: async (): Promise<HealthStatus> => {
    const { data } = await apiClient.get<HealthStatus>("/health")
    return data
  },

  // Process APK file
  processApk: async (request: ProcessRequest): Promise<ProcessResponse> => {
    const formData = new FormData()
    formData.append("file", request.file)
    if (request.parameters) {
      formData.append("parameters", JSON.stringify(request.parameters))
    }

    const { data } = await apiClient.post<ProcessResponse>("/process", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return data
  },

  // Get job status
  getJobStatus: async (jobId: string): Promise<JobStatus> => {
    const { data } = await apiClient.get<JobStatus>(`/status/${jobId}`)
    return data
  },

  // Download processed file
  downloadFile: async (jobId: string): Promise<Blob> => {
    const { data } = await apiClient.get(`/download/${jobId}`, {
      responseType: "blob",
    })
    return data
  },

  // Cancel job
  cancelJob: async (jobId: string): Promise<SuccessResponse> => {
    const { data } = await apiClient.delete<SuccessResponse>(`/jobs/${jobId}`)
    return data
  },

  // Cleanup job
  cleanupJob: async (jobId: string): Promise<SuccessResponse> => {
    const { data } = await apiClient.delete<SuccessResponse>(`/jobs/${jobId}/cleanup`)
    return data
  },

  // Get job statistics
  getJobStats: async (): Promise<JobStats> => {
    const { data } = await apiClient.get<JobStats>("/stats")
    return data
  },
}
