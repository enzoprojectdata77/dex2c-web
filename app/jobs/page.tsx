"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Download,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Trash2,
  Terminal,
  Info,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useJobStats, useJobStatus, useDownloadFile, useCleanupJob } from "@/lib/api/hooks"
import type { JobStatusType } from "@/lib/types/api"

function getStatusIcon(status: JobStatusType) {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-4 w-4" />
    case "processing":
    case "pending":
      return <Loader2 className="h-4 w-4 animate-spin" />
    case "failed":
      return <XCircle className="h-4 w-4" />
    case "timeout":
      return <Clock className="h-4 w-4" />
  }
}

function getStatusVariant(status: JobStatusType): "default" | "secondary" | "destructive" {
  switch (status) {
    case "completed":
      return "default"
    case "processing":
    case "pending":
      return "secondary"
    case "failed":
    case "timeout":
      return "destructive"
  }
}

export default function JobsPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [trackedJobId, setTrackedJobId] = useState<string | null>(null)

  const { data: stats, isLoading: statsLoading } = useJobStats()
  const { data: jobStatus, isLoading: jobLoading } = useJobStatus(trackedJobId)
  const downloadMutation = useDownloadFile()
  const cleanupMutation = useCleanupJob()

  useEffect(() => {
    const jobId = searchParams.get("id")
    if (jobId) {
      setTrackedJobId(jobId)
      setSearchQuery(jobId)
    }
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setTrackedJobId(searchQuery.trim())
    }
  }

  const handleDownload = (jobId: string) => {
    downloadMutation.mutate(jobId)
  }

  const handleCleanup = (jobId: string) => {
    cleanupMutation.mutate(jobId, {
      onSuccess: () => {
        if (trackedJobId === jobId) {
          setTrackedJobId(null)
          setSearchQuery("")
        }
      },
    })
  }

  const formatFileSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2) + " MB"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`
    }
    return `${seconds}s`
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Job Tracking</h1>
            <p className="text-muted-foreground text-lg">Monitor and manage your APK processing jobs</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter job ID to track..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Jobs</CardDescription>
                  <CardTitle className="text-3xl">
                    {statsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : (stats?.totalJobs ?? 0)}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Completed</CardDescription>
                  <CardTitle className="text-3xl text-primary">
                    {statsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : (stats?.statusBreakdown.find(item => item._id === "completed")?.count ?? 0)}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Active</CardDescription>
                  <CardTitle className="text-3xl text-accent">
                    {statsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : (stats?.statusBreakdown.find(item => item._id === "processing")?.count ?? 0)}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Failed</CardDescription>
                  <CardTitle className="text-3xl text-destructive">
                    {statsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : (stats?.statusBreakdown.find(item => item._id === "failed")?.count ?? 0)}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>

            <div className="space-y-4">
              {!trackedJobId ? (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>Enter a job ID above to track its status.</AlertDescription>
                </Alert>
              ) : jobLoading ? (
                <Card>
                  <CardContent className="py-12 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </CardContent>
                </Card>
              ) : jobStatus ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg font-mono">{jobStatus.jobId}</CardTitle>
                          <Badge variant={getStatusVariant(jobStatus.status)} className="gap-1">
                            {getStatusIcon(jobStatus.status)}
                            {jobStatus.status}
                          </Badge>
                        </div>
                        <CardDescription>{jobStatus.originalFilename}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {jobStatus.status === "completed" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownload(jobStatus.jobId)}
                            disabled={downloadMutation.isPending}
                          >
                            {downloadMutation.isPending ? (
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Download className="h-4 w-4 mr-2" />
                            )}
                            Download
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCleanup(jobStatus.jobId)}
                          disabled={cleanupMutation.isPending}
                        >
                          {cleanupMutation.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="overview">
                          <Info className="h-4 w-4 mr-2" />
                          Overview
                        </TabsTrigger>
                        <TabsTrigger value="process" disabled={!jobStatus.processInfo}>
                          <Terminal className="h-4 w-4 mr-2" />
                          Process Info
                        </TabsTrigger>
                        <TabsTrigger value="parameters" disabled={!jobStatus.parameters}>
                          <Info className="h-4 w-4 mr-2" />
                          Parameters
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-4">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground mb-1">Input Size</div>
                            <div className="font-semibold">{formatFileSize(jobStatus.inputSize)}</div>
                          </div>
                          {jobStatus.outputSize && (
                            <div>
                              <div className="text-muted-foreground mb-1">Output Size</div>
                              <div className="font-semibold">{formatFileSize(jobStatus.outputSize)}</div>
                            </div>
                          )}
                          <div>
                            <div className="text-muted-foreground mb-1">Created</div>
                            <div className="font-semibold">{formatDate(jobStatus.createdAt)}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground mb-1">Updated</div>
                            <div className="font-semibold">{formatDate(jobStatus.updatedAt)}</div>
                          </div>
                        </div>
                        {jobStatus.error && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{jobStatus.error}</AlertDescription>
                          </Alert>
                        )}
                      </TabsContent>

                      <TabsContent value="process" className="space-y-4">
                        {jobStatus.processInfo && (
                          <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <Card>
                                <CardHeader className="pb-3">
                                  <CardDescription>Return Code</CardDescription>
                                  <CardTitle className="text-2xl font-mono">
                                    {jobStatus.processInfo.returnCode}
                                  </CardTitle>
                                </CardHeader>
                              </Card>
                              {jobStatus.processInfo.duration && (
                                <Card>
                                  <CardHeader className="pb-3">
                                    <CardDescription>Duration</CardDescription>
                                    <CardTitle className="text-2xl">
                                      {formatDuration(jobStatus.processInfo.duration)}
                                    </CardTitle>
                                  </CardHeader>
                                </Card>
                              )}
                            </div>

                            {jobStatus.processInfo.command && (
                              <div className="space-y-2">
                                <div className="text-sm font-semibold">Command</div>
                                <div className="p-3 bg-muted rounded-lg font-mono text-sm overflow-x-auto">
                                  {jobStatus.processInfo.command}
                                </div>
                              </div>
                            )}

                            {jobStatus.processInfo.startTime && (
                              <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <div className="text-muted-foreground mb-1">Start Time</div>
                                  <div className="font-semibold">{formatDate(jobStatus.processInfo.startTime)}</div>
                                </div>
                                {jobStatus.processInfo.endTime && (
                                  <div>
                                    <div className="text-muted-foreground mb-1">End Time</div>
                                    <div className="font-semibold">{formatDate(jobStatus.processInfo.endTime)}</div>
                                  </div>
                                )}
                              </div>
                            )}

                            {jobStatus.processInfo.stdout && (
                              <div className="space-y-2">
                                <div className="text-sm font-semibold">Standard Output</div>
                                <div className="p-3 bg-muted rounded-lg font-mono text-xs overflow-x-auto max-h-64 overflow-y-auto">
                                  <pre className="whitespace-pre-wrap">{jobStatus.processInfo.stdout}</pre>
                                </div>
                              </div>
                            )}

                            {jobStatus.processInfo.stderr && (
                              <div className="space-y-2">
                                <div className="text-sm font-semibold text-destructive">Standard Error</div>
                                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg font-mono text-xs overflow-x-auto max-h-64 overflow-y-auto">
                                  <pre className="whitespace-pre-wrap text-destructive">
                                    {jobStatus.processInfo.stderr}
                                  </pre>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </TabsContent>

                      <TabsContent value="parameters" className="space-y-4">
                        {jobStatus.parameters && (
                          <div className="p-4 bg-muted rounded-lg">
                            <pre className="text-sm font-mono overflow-x-auto">
                              {JSON.stringify(jobStatus.parameters, null, 2)}
                            </pre>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ) : (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>Job not found. Please check the job ID and try again.</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
