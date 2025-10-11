"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
            <p className="text-muted-foreground text-lg">Complete reference for the Dex2C API endpoints and schemas</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-base">Endpoints</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <a
                    href="#service-info"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Service Info
                  </a>
                  <a href="#health" className="block text-muted-foreground hover:text-foreground transition-colors">
                    Health Check
                  </a>
                  <a href="#process" className="block text-muted-foreground hover:text-foreground transition-colors">
                    Process APK
                  </a>
                  <a href="#status" className="block text-muted-foreground hover:text-foreground transition-colors">
                    Job Status
                  </a>
                  <a href="#download" className="block text-muted-foreground hover:text-foreground transition-colors">
                    Download
                  </a>
                  <a href="#cancel" className="block text-muted-foreground hover:text-foreground transition-colors">
                    Cancel Job
                  </a>
                  <a href="#cleanup" className="block text-muted-foreground hover:text-foreground transition-colors">
                    Cleanup Job
                  </a>
                  <a href="#stats" className="block text-muted-foreground hover:text-foreground transition-colors">
                    Statistics
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                  <CardDescription>
                    The Dex2C API provides endpoints for processing APK files with rate limiting and file size
                    restrictions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Base URL</h4>
                    <code className="bg-muted px-3 py-1 rounded text-sm">https://api.dex2c.com/</code>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Rate Limiting</h4>
                    <p className="text-sm text-muted-foreground">100 requests per 15 minutes</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">File Size Limit</h4>
                    <p className="text-sm text-muted-foreground">Maximum 50MB per APK file</p>
                  </div>
                </CardContent>
              </Card>

              {/* Service Info */}
              <Card id="service-info">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Get Service Information</CardTitle>
                    <Badge variant="secondary">GET</Badge>
                  </div>
                  <CardDescription className="font-mono text-xs">/</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Response</h4>
                    <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                      {`{
  "service": "DCC API",
  "version": "1.0.0",
  "status": "running",
  "endpoints": {
    "health": "GET /health"
  },
  "documentation": "string"
}`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Health Check */}
              <Card id="health">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Health Check</CardTitle>
                    <Badge variant="secondary">GET</Badge>
                  </div>
                  <CardDescription className="font-mono text-xs">/health</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Get the current health status of the service including uptime and memory usage
                  </p>
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Response</h4>
                    <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                      {`{
  "status": "healthy",
  "service": "DCC API",
  "version": "1.0.0",
  "timestamp": "2025-01-10T12:00:00Z",
  "uptime": 3600,
  "environment": "production",
  "memory": {
    "used": 256,
    "total": 512,
    "unit": "MB"
  }
}`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Process APK */}
              <Card id="process">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Process APK File</CardTitle>
                    <Badge>POST</Badge>
                  </div>
                  <CardDescription className="font-mono text-xs">/process</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Upload and process an APK file. Returns a job ID for tracking the processing status.
                  </p>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Request Body</h4>
                    <p className="text-xs text-muted-foreground mb-2">multipart/form-data</p>
                    <div className="bg-muted p-4 rounded-lg text-sm space-y-2">
                      <div>
                        <code className="text-primary">file</code>{" "}
                        <span className="text-muted-foreground">(required)</span>
                        <p className="text-xs text-muted-foreground mt-1">
                          APK file to process (max 50MB, .apk extension)
                        </p>
                      </div>
                      <div>
                        <code className="text-primary">parameters</code>{" "}
                        <span className="text-muted-foreground">(optional)</span>
                        <p className="text-xs text-muted-foreground mt-1">Processing parameters object</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Response (200)</h4>
                    <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                      {`{
  "success": true,
  "jobId": "job_abc123",
  "message": "Processing initiated",
  "downloadUrl": "/download/job_abc123",
  "inputSize": 15728640,
  "outputSize": 18874368
}`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Error Responses</h4>
                    <Tabs defaultValue="400">
                      <TabsList>
                        <TabsTrigger value="400">400</TabsTrigger>
                        <TabsTrigger value="429">429</TabsTrigger>
                        <TabsTrigger value="500">500</TabsTrigger>
                      </TabsList>
                      <TabsContent value="400">
                        <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                          {`{
  "success": false,
  "error": "Invalid request"
}`}
                        </pre>
                      </TabsContent>
                      <TabsContent value="429">
                        <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                          {`{
  "success": false,
  "error": "Too many requests"
}`}
                        </pre>
                      </TabsContent>
                      <TabsContent value="500">
                        <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                          {`{
  "success": false,
  "error": "Internal server error"
}`}
                        </pre>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>

              {/* Job Status */}
              <Card id="status">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Get Job Status</CardTitle>
                    <Badge variant="secondary">GET</Badge>
                  </div>
                  <CardDescription className="font-mono text-xs">/status/{`{job_id}`}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Retrieve the current status and details of a processing job
                  </p>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Path Parameters</h4>
                    <div className="bg-muted p-4 rounded-lg text-sm">
                      <code className="text-primary">job_id</code>{" "}
                      <span className="text-muted-foreground">(required)</span>
                      <p className="text-xs text-muted-foreground mt-1">Job identifier returned from /process</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Response (200)</h4>
                    <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                      {`{
  "jobId": "job_abc123",
  "status": "completed",
  "originalFilename": "myapp.apk",
  "inputSize": 15728640,
  "outputSize": 18874368,
  "parameters": {},
  "processInfo": {
    "returnCode": 0,
    "stdout": "Processing completed",
    "stderr": "",
    "command": "dex2c process",
    "startTime": "2025-01-10T10:30:00Z",
    "endTime": "2025-01-10T10:35:00Z",
    "duration": 300
  },
  "createdAt": "2025-01-10T10:30:00Z",
  "updatedAt": "2025-01-10T10:35:00Z"
}`}
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Status Values</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">pending</Badge>
                        <span className="text-muted-foreground">Job is queued</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">processing</Badge>
                        <span className="text-muted-foreground">Job is being processed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>completed</Badge>
                        <span className="text-muted-foreground">Job completed successfully</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive">failed</Badge>
                        <span className="text-muted-foreground">Job failed with error</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive">timeout</Badge>
                        <span className="text-muted-foreground">Job exceeded time limit</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Download */}
              <Card id="download">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Download Processed File</CardTitle>
                    <Badge variant="secondary">GET</Badge>
                  </div>
                  <CardDescription className="font-mono text-xs">/download/{`{job_id}`}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">Download the processed APK file for a completed job</p>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Path Parameters</h4>
                    <div className="bg-muted p-4 rounded-lg text-sm">
                      <code className="text-primary">job_id</code>{" "}
                      <span className="text-muted-foreground">(required)</span>
                      <p className="text-xs text-muted-foreground mt-1">Job identifier for completed job</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Response (200)</h4>
                    <p className="text-sm text-muted-foreground">
                      Binary APK file (application/vnd.android.package-archive)
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Cancel Job */}
              <Card id="cancel">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Cancel Job</CardTitle>
                    <Badge variant="destructive">DELETE</Badge>
                  </div>
                  <CardDescription className="font-mono text-xs">/jobs/{`{job_id}`}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">Cancel a pending or processing job</p>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Response (200)</h4>
                    <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                      {`{
  "success": true,
  "message": "Job cancelled successfully"
}`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Cleanup */}
              <Card id="cleanup">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Cleanup Job</CardTitle>
                    <Badge variant="destructive">DELETE</Badge>
                  </div>
                  <CardDescription className="font-mono text-xs">/jobs/{`{job_id}`}/cleanup</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">Remove job data and associated files</p>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Response (200)</h4>
                    <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                      {`{
  "success": true,
  "message": "Job cleaned up successfully"
}`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Statistics */}
              <Card id="stats">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Get Statistics</CardTitle>
                    <Badge variant="secondary">GET</Badge>
                  </div>
                  <CardDescription className="font-mono text-xs">/stats</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">Retrieve overall job statistics</p>

                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Response (200)</h4>
                    <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                      {`{
  "totalJobs": 150,
  "activeJobs": 5,
  "completedJobs": 120,
  "failedJobs": 25
}`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
