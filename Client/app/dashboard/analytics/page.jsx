"use client";

import { useState, useEffect } from "react";
import { 
  Users, Eye, TrendingUp, BarChart3, Calendar, Download, 
  Filter, Globe, Smartphone, Monitor, Tablet, ArrowUp, 
  ArrowDown, Clock, MousePointer, Target, Activity 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Mock API functions - TODO: Replace with real backend API calls
/**
 * TODO: Replace with real API endpoint
 * GET /api/analytics/detailed
 * Headers: Authorization: Bearer <token>
 */
async function fetchDetailedAnalytics(dateRange = "30d") {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const generateMockData = (days) => {
    const data = [];
    const now = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split('T')[0],
        visitors: Math.floor(Math.random() * 500) + 100,
        pageViews: Math.floor(Math.random() * 2000) + 500,
        bounceRate: Math.random() * 20 + 25,
        avgSessionDuration: Math.floor(Math.random() * 180) + 120,
      });
    }
    return data;
  };

  return {
    overview: {
      totalVisitors: 45892,
      totalPageViews: 127845,
      avgBounceRate: 32.4,
      avgSessionDuration: "4:23",
      newVsReturning: { new: 68.5, returning: 31.5 },
    },
    traffic: {
      sources: [
        { source: "Organic Search", visitors: 18456, percentage: 40.2, trend: "up" },
        { source: "Direct", visitors: 12890, percentage: 28.1, trend: "up" },
        { source: "Social Media", visitors: 8923, percentage: 19.4, trend: "down" },
        { source: "Referral", visitors: 3456, percentage: 7.5, trend: "up" },
        { source: "Email", visitors: 2167, percentage: 4.8, trend: "stable" },
      ],
      devices: {
        desktop: { visitors: 26745, percentage: 58.2 },
        mobile: { visitors: 17789, percentage: 38.7 },
        tablet: { visitors: 1358, percentage: 3.1 },
      },
      browsers: [
        { browser: "Chrome", visitors: 28456, percentage: 62.0 },
        { browser: "Safari", visitors: 8923, percentage: 19.4 },
        { browser: "Firefox", visitors: 3456, percentage: 7.5 },
        { browser: "Edge", visitors: 2890, percentage: 6.3 },
        { browser: "Other", visitors: 2167, percentage: 4.8 },
      ],
      countries: [
        { country: "Ethiopia", visitors: 28456, percentage: 62.0, flag: "🇪🇹" },
        { country: "United States", visitors: 8923, percentage: 19.4, flag: "🇺🇸" },
        { country: "Kenya", visitors: 3456, percentage: 7.5, flag: "🇰🇪" },
        { country: "United Kingdom", visitors: 2890, percentage: 6.3, flag: "🇬🇧" },
        { country: "Canada", visitors: 2167, percentage: 4.8, flag: "🇨🇦" },
      ],
    },
    content: {
      topPages: [
        { path: "/", title: "Home", views: 15678, uniqueVisitors: 8923, avgTimeOnPage: "2:34", bounceRate: 28.5 },
        { path: "/explore", title: "Explore", views: 8923, uniqueVisitors: 5678, avgTimeOnPage: "3:12", bounceRate: 24.3 },
        { path: "/investment", title: "Investment", views: 3456, uniqueVisitors: 2345, avgTimeOnPage: "4:56", bounceRate: 19.8 },
        { path: "/accommodations", title: "Accommodations", views: 2890, uniqueVisitors: 1987, avgTimeOnPage: "3:45", bounceRate: 26.7 },
        { path: "/attractions", title: "Attractions", views: 2345, uniqueVisitors: 1654, avgTimeOnPage: "2:89", bounceRate: 31.2 },
      ],
      exitPages: [
        { path: "/", exits: 3456, percentage: 23.4 },
        { path: "/explore", exits: 2345, percentage: 15.9 },
        { path: "/investment", exits: 1890, percentage: 12.8 },
        { path: "/accommodations", exits: 1567, percentage: 10.6 },
        { path: "/attractions", exits: 1234, percentage: 8.4 },
      ],
    },
    engagement: {
      events: [
        { event: "Page View", count: 127845, uniqueUsers: 45892 },
        { event: "Button Click", count: 8923, uniqueUsers: 3456 },
        { event: "Form Submit", count: 1234, uniqueUsers: 890 },
        { event: "Video Play", count: 567, uniqueUsers: 234 },
        { event: "Download", count: 234, uniqueUsers: 123 },
      ],
      conversions: {
        totalConversions: 1234,
        conversionRate: 2.7,
        goals: [
          { goal: "Contact Form", conversions: 456, rate: 3.2 },
          { goal: "Investment Inquiry", conversions: 234, rate: 5.6 },
          { goal: "Newsletter Signup", conversions: 789, rate: 8.9 },
          { goal: "Booking Request", conversions: 123, rate: 2.1 },
        ],
      },
    },
    timeline: dateRange === "7d" ? generateMockData(7) : dateRange === "30d" ? generateMockData(30) : generateMockData(90),
  };
}

export default function DashboardAnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState("visitors");

  useEffect(() => {
    loadAnalytics();
  }, [dateRange]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const data = await fetchDetailedAnalytics(dateRange);
      setAnalytics(data);
    } catch (error) {
      console.error("Failed to load analytics:", error);
      // TODO: Show error toast: "Failed to load analytics"
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    // TODO: Implement actual data export
    const dataStr = JSON.stringify(analytics, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `analytics-${dateRange}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading || !analytics) {
    return (
      <div className="p-6 lg:p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-muted rounded-xl"></div>
            ))}
          </div>
          <div className="h-64 bg-muted rounded-xl"></div>
        </div>
      </div>
    );
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <ArrowDown className="h-4 w-4 text-red-600" />;
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  const getDeviceIcon = (device) => {
    switch (device) {
      case "desktop":
        return <Monitor className="h-4 w-4" />;
      case "mobile":
        return <Smartphone className="h-4 w-4" />;
      case "tablet":
        return <Tablet className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Monitor your website performance and user behavior.
          </p>
        </div>

        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={exportData} className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.overview.totalVisitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.overview.totalPageViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +8.2% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.overview.avgBounceRate}%</div>
            <p className="text-xs text-muted-foreground">
              -2.1% from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Session</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.overview.avgSessionDuration}</div>
            <p className="text-xs text-muted-foreground">
              +18s from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your visitors come from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.traffic.sources.map((source) => (
                <div key={source.source} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-primary rounded-full" />
                    <span className="font-medium">{source.source}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {source.visitors.toLocaleString()} visitors
                    </span>
                    <span className="text-sm font-medium w-12 text-right">
                      {source.percentage}%
                    </span>
                    {getTrendIcon(source.trend)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New vs Returning</CardTitle>
            <CardDescription>Visitor type breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">New Visitors</span>
                  <span className="text-sm">{analytics.overview.newVsReturning.new}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${analytics.overview.newVsReturning.new}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Returning Visitors</span>
                  <span className="text-sm">{analytics.overview.newVsReturning.returning}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-secondary h-2 rounded-full" 
                    style={{ width: `${analytics.overview.newVsReturning.returning}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Devices and Browsers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Devices</CardTitle>
            <CardDescription>Visitor device breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(analytics.traffic.devices).map(([device, data]) => (
                <div key={device} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getDeviceIcon(device)}
                    <span className="font-medium capitalize">{device}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {data.visitors.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium w-12 text-right">
                      {data.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Browsers</CardTitle>
            <CardDescription>Visitor browser breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.traffic.browsers.map((browser) => (
                <div key={browser.browser} className="flex items-center justify-between">
                  <span className="font-medium">{browser.browser}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {browser.visitors.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium w-12 text-right">
                      {browser.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Top Pages</CardTitle>
          <CardDescription>Most visited pages on your site</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-muted-foreground">
                  <th className="pb-3">Page</th>
                  <th className="pb-3">Views</th>
                  <th className="pb-3">Unique Visitors</th>
                  <th className="pb-3">Avg Time on Page</th>
                  <th className="pb-3">Bounce Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {analytics.content.topPages.map((page) => (
                  <tr key={page.path}>
                    <td className="py-3">
                      <div>
                        <div className="font-medium">{page.title}</div>
                        <div className="text-sm text-muted-foreground">{page.path}</div>
                      </div>
                    </td>
                    <td className="py-3 text-sm">{page.views.toLocaleString()}</td>
                    <td className="py-3 text-sm">{page.uniqueVisitors.toLocaleString()}</td>
                    <td className="py-3 text-sm">{page.avgTimeOnPage}</td>
                    <td className="py-3 text-sm">{page.bounceRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Countries */}
      <Card>
        <CardHeader>
          <CardTitle>Top Countries</CardTitle>
          <CardDescription>Visitor geographic distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.traffic.countries.map((country) => (
              <div key={country.country} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{country.flag}</span>
                  <span className="font-medium">{country.country}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    {country.visitors.toLocaleString()} visitors
                  </span>
                  <span className="text-sm font-medium w-12 text-right">
                    {country.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
