import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiServices } from "./services"
import type { ProcessRequest } from "../types/api"

// Query keys
export const queryKeys = {
  serviceInfo: ["serviceInfo"] as const,
  health: ["health"] as const,
  jobStatus: (jobId: string) => ["jobStatus", jobId] as const,
  jobStats: ["jobStats"] as const,
}

// Service info hook
export function useServiceInfo() {
  return useQuery({
    queryKey: queryKeys.serviceInfo,
    queryFn: apiServices.getServiceInfo,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Health status hook
export function useHealthStatus() {
  return useQuery({
    queryKey: queryKeys.health,
    queryFn: apiServices.getHealthStatus,
    refetchInterval: 30000, // Refetch every 30 seconds
  })
}

// Job status hook
export function useJobStatus(jobId: string | null) {
  return useQuery({
    queryKey: queryKeys.jobStatus(jobId || ""),
    queryFn: () => apiServices.getJobStatus(jobId!),
    enabled: !!jobId,
    refetchInterval: (data) => {
      // Stop refetching if job is completed, failed, or timeout
      if (data?.status === "completed" || data?.status === "failed" || data?.status === "timeout") {
        return false
      }
      return 3000 // Refetch every 3 seconds for active jobs
    },
  })
}

// Job stats hook
export function useJobStats() {
  return useQuery({
    queryKey: queryKeys.jobStats,
    queryFn: apiServices.getJobStats,
    refetchInterval: 10000, // Refetch every 10 seconds
  })
}

// Process APK mutation
export function useProcessApk() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: ProcessRequest) => apiServices.processApk(request),
    onSuccess: () => {
      // Invalidate job stats to refresh the data
      queryClient.invalidateQueries({ queryKey: queryKeys.jobStats })
    },
  })
}

// Download file mutation
export function useDownloadFile() {
  return useMutation({
    mutationFn: (jobId: string) => apiServices.downloadFile(jobId),
    onSuccess: (blob, jobId) => {
      // Create download link
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `processed_${jobId}.apk`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    },
  })
}

// Cancel job mutation
export function useCancelJob() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (jobId: string) => apiServices.cancelJob(jobId),
    onSuccess: (_, jobId) => {
      // Invalidate job status and stats
      queryClient.invalidateQueries({ queryKey: queryKeys.jobStatus(jobId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.jobStats })
    },
  })
}

// Cleanup job mutation
export function useCleanupJob() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (jobId: string) => apiServices.cleanupJob(jobId),
    onSuccess: (_, jobId) => {
      // Invalidate job status and stats
      queryClient.invalidateQueries({ queryKey: queryKeys.jobStatus(jobId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.jobStats })
    },
  })
}
