"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Shield, Zap, Lock, Code2, FileCode, Cpu, ArrowRight, CheckCircle2, Loader2 } from "lucide-react"
import { useServiceInfo, useHealthStatus } from "@/lib/api/hooks"

export default function HomePage() {
  const { data: serviceInfo } = useServiceInfo()
  const { data: healthStatus } = useHealthStatus()

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <Badge variant="secondary" className="text-xs font-mono">
              {healthStatus?.status === "healthy" ? (
                <>
                  <CheckCircle2 className="h-3 w-3 mr-1 inline" />
                  Service Online - {serviceInfo?.version || "v1.0.0"}
                </>
              ) : (
                <>
                  <Loader2 className="h-3 w-3 mr-1 inline animate-spin" />
                  Checking Status...
                </>
              )}
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
              Transform Android Apps into <span className="text-primary">Native C++ Code</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Advanced obfuscation, intelligent filtering, and enterprise-grade security. Built for developers who
              demand the best in app protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link href="/process">
                  Start Processing <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/docs">View Documentation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise Features</h2>
            <p className="text-muted-foreground text-lg">Everything you need for production-grade APK processing</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <FileCode className="h-10 w-10 text-primary mb-2" />
                <CardTitle>APK to C++ Conversion</CardTitle>
                <CardDescription>
                  Transform Android applications into optimized native C++ code with advanced compilation techniques
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Advanced Obfuscation</CardTitle>
                <CardDescription>
                  String obfuscation, method protection, and code transformation to secure your applications
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Lock className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Intelligent Filtering</CardTitle>
                <CardDescription>
                  Custom protection rules with filter file support for granular control over processing
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Job Management</CardTitle>
                <CardDescription>
                  Complete job lifecycle with real-time status tracking and cancellation support
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Cpu className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Docker Ready</CardTitle>
                <CardDescription>
                  Complete containerization with all dependencies pre-installed for easy deployment
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Code2 className="h-10 w-10 text-primary mb-2" />
                <CardTitle>RESTful API</CardTitle>
                <CardDescription>
                  Clean, well-documented API with rate limiting and comprehensive error handling
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">Simple, powerful workflow in three steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold">Upload APK</h3>
              <p className="text-muted-foreground">
                Upload your Android APK file (up to 50MB) with optional processing parameters
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold">Process & Track</h3>
              <p className="text-muted-foreground">
                Our engine converts your APK to C++ with real-time status updates and progress tracking
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold">Download Result</h3>
              <p className="text-muted-foreground">
                Download your processed APK with native C++ code and enhanced security
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Built for Scale</h2>
              <p className="text-muted-foreground text-lg">
                Enterprise-grade architecture with MongoDB persistence, rate limiting, and comprehensive monitoring.
                Designed to handle production workloads.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>100 requests per 15 minutes rate limiting</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>MongoDB with Mongoose ODM for job persistence</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>CORS, Helmet security headers, and error handling</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Health checks, statistics, and comprehensive logging</span>
                </li>
              </ul>
            </div>

            <Card className="p-6">
              <CardHeader>
                <CardTitle className="font-mono text-sm text-muted-foreground">API Endpoint</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                  <div className="text-accent">POST</div>
                  <div className="text-foreground">/process</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max File Size</span>
                    <span className="font-semibold">50 MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rate Limit</span>
                    <span className="font-semibold">100 / 15min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Format</span>
                    <span className="font-semibold">.apk</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-primary text-primary-foreground border-0">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
              <p className="text-lg opacity-90">
                Start processing your APK files with enterprise-grade security and performance
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/process">Process Your First APK</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link href="/docs">Read the Docs</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xl font-bold">
                <Code2 className="h-6 w-6 text-primary" />
                <span>Dex2C</span>
              </div>
              <p className="text-sm text-muted-foreground">Enterprise-grade APK to C++ conversion platform</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/process" className="hover:text-foreground transition-colors">
                    Process APK
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="hover:text-foreground transition-colors">
                    Job Tracking
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="https://github.com/springmusk026/Dex2C-Backend"
                    className="hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-foreground transition-colors">
                    API Reference
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 Dex2C. Built by springmusk with fucking load of vibe coding.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
