"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileCode, AlertCircle, CheckCircle2, Loader2, Settings } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useProcessApk } from "@/lib/api/hooks"
import type { ProcessParameters } from "@/lib/types/api"

export default function ProcessPage() {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [parameters, setParameters] = useState<ProcessParameters>({
    dynamic_register: false,
    skip_synthetic: false,
    no_build: false,
    force_keep_libs: false,
    disable_signing: false,
  })

  const processApkMutation = useProcessApk()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.size > 50 * 1024 * 1024) {
        setError("File size must be less than 50MB")
        setFile(null)
        return
      }
      if (!selectedFile.name.endsWith(".apk")) {
        setError("Only .apk files are allowed")
        setFile(null)
        return
      }
      setFile(selectedFile)
      setError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setError(null)

    processApkMutation.mutate(
      { file, parameters },
      {
        onSuccess: () => {
          setFile(null)
          setParameters({
            dynamic_register: false,
            skip_synthetic: false,
            no_build: false,
            force_keep_libs: false,
            disable_signing: false,
          })
          setShowAdvanced(false)
        },
        onError: (error: Error) => {
          setError(error.message || "Failed to upload file. Please try again.")
        },
      },
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Process APK File</h1>
            <p className="text-muted-foreground text-lg">
              Upload your Android APK file to convert it to native C++ code with advanced obfuscation
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload APK</CardTitle>
                  <CardDescription>Select an APK file to process (max 50MB)</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="file">APK File</Label>
                      <div className="relative">
                        <Input
                          id="file"
                          type="file"
                          accept=".apk"
                          onChange={handleFileChange}
                          disabled={processApkMutation.isPending}
                          className="cursor-pointer"
                        />
                      </div>
                      {file && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <FileCode className="h-4 w-4" />
                          <span>{file.name}</span>
                          <span>({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="w-full"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        {showAdvanced ? "Hide" : "Show"} Advanced Options
                      </Button>

                      {showAdvanced && (
                        <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="dynamic_register"
                              checked={parameters.dynamic_register}
                              onCheckedChange={(checked) =>
                                setParameters({ ...parameters, dynamic_register: checked as boolean })
                              }
                            />
                            <Label htmlFor="dynamic_register" className="text-sm font-normal cursor-pointer">
                              Enable dynamic register processing
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="skip_synthetic"
                              checked={parameters.skip_synthetic}
                              onCheckedChange={(checked) =>
                                setParameters({ ...parameters, skip_synthetic: checked as boolean })
                              }
                            />
                            <Label htmlFor="skip_synthetic" className="text-sm font-normal cursor-pointer">
                              Skip synthetic method processing
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="no_build"
                              checked={parameters.no_build}
                              onCheckedChange={(checked) =>
                                setParameters({ ...parameters, no_build: checked as boolean })
                              }
                            />
                            <Label htmlFor="no_build" className="text-sm font-normal cursor-pointer">
                              Skip build process
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="force_keep_libs"
                              checked={parameters.force_keep_libs}
                              onCheckedChange={(checked) =>
                                setParameters({ ...parameters, force_keep_libs: checked as boolean })
                              }
                            />
                            <Label htmlFor="force_keep_libs" className="text-sm font-normal cursor-pointer">
                              Force keeping libraries
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="disable_signing"
                              checked={parameters.disable_signing}
                              onCheckedChange={(checked) =>
                                setParameters({ ...parameters, disable_signing: checked as boolean })
                              }
                            />
                            <Label htmlFor="disable_signing" className="text-sm font-normal cursor-pointer">
                              Disable APK signing
                            </Label>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="filter" className="text-sm">
                              Filter Content (max 10KB)
                            </Label>
                            <Textarea
                              id="filter"
                              placeholder="Enter filter content for processing..."
                              value={parameters.filter || ""}
                              onChange={(e) => setParameters({ ...parameters, filter: e.target.value })}
                              className="min-h-[100px] font-mono text-sm"
                              maxLength={10000}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="custom_loader" className="text-sm">
                              Custom Loader Configuration
                            </Label>
                            <Input
                              id="custom_loader"
                              placeholder="Enter custom loader config..."
                              value={parameters.custom_loader || ""}
                              onChange={(e) => setParameters({ ...parameters, custom_loader: e.target.value })}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="source_dir" className="text-sm">
                              Source Directory Path
                            </Label>
                            <Input
                              id="source_dir"
                              placeholder="Enter source directory path..."
                              value={parameters.source_dir || ""}
                              onChange={(e) => setParameters({ ...parameters, source_dir: e.target.value })}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="project_archive" className="text-sm">
                              Project Archive Path
                            </Label>
                            <Input
                              id="project_archive"
                              placeholder="Enter project archive path..."
                              value={parameters.project_archive || ""}
                              onChange={(e) => setParameters({ ...parameters, project_archive: e.target.value })}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {(error || processApkMutation.isError) && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error || processApkMutation.error?.message}</AlertDescription>
                      </Alert>
                    )}

                    {processApkMutation.isSuccess && processApkMutation.data && (
                      <Alert>
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertDescription>
                          Job created successfully! Job ID:{" "}
                          <span className="font-mono font-semibold">{processApkMutation.data.jobId}</span>
                          <br />
                          <Link
                            href={`/jobs?id=${processApkMutation.data.jobId}`}
                            className="text-primary hover:underline"
                          >
                            Track your job →
                          </Link>
                        </AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" disabled={!file || processApkMutation.isPending} className="w-full">
                      {processApkMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Process APK
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Processing Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">What happens during processing?</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>APK is decompiled and analyzed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Java/Kotlin code is converted to C++</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Advanced obfuscation is applied</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Native libraries are compiled</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>APK is repackaged and signed</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max File Size</span>
                    <span className="font-semibold">50 MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Allowed Format</span>
                    <span className="font-semibold">.apk</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rate Limit</span>
                    <span className="font-semibold">100 / 15min</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="text-muted-foreground">
                    Check out our documentation for detailed information about the API and processing options.
                  </p>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/docs">View Documentation</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
