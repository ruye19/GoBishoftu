"use client";

import { useState, useEffect } from "react";
import { Monitor, Moon, Sun, Globe, Palette, BarChart3, Users, Eye, TrendingUp, Settings, Save, RefreshCw, Download, Upload, Bell, Shield, Database, Zap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

/**
 * @typedef {"light" | "dark" | "system"} Theme
 * @typedef {"en" | "am" | "or"} Language
 */

// Mock API functions - TODO: Replace with real backend API calls
/**
 * TODO: Replace with real API endpoint
 * GET /api/settings
 * Headers: Authorization: Bearer <token>
 */
async function fetchSettings() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    general: {
      siteName: "GoBishoftu",
      siteDescription: "Discover the beauty and opportunities of Bishoftu, Ethiopia",
      contactEmail: "info@gobishoftu.com",
      contactPhone: "+251 11 433 0000",
      address: "Bishoftu, Ethiopia",
      defaultLanguage: "en",
      maintenanceMode: false,
    },
    theme: {
      mode: "light",
      primaryColor: "#3b82f6",
      accentColor: "#f59e0b",
      customCSS: "",
    },
    social: {
      facebook: "https://facebook.com/gobishoftu",
      twitter: "https://twitter.com/gobishoftu",
      instagram: "https://instagram.com/gobishoftu",
      linkedin: "https://linkedin.com/company/gobishoftu",
    },
    analytics: {
      googleAnalyticsId: "G-XXXXXXXXXX",
      enableTracking: true,
      enableHeatmaps: false,
      enableSessionRecording: false,
    },
    notifications: {
      emailNotifications: true,
      systemNotifications: true,
      marketingEmails: false,
    },
    security: {
      enableTwoFactor: false,
      sessionTimeout: 24,
      passwordMinLength: 8,
      enableCaptcha: true,
    },
    performance: {
      enableCaching: true,
      enableImageOptimization: true,
      enableLazyLoading: true,
      enableCDN: false,
    }
  };
}

/**
 * TODO: Replace with real API endpoint
 * PUT /api/settings
 * Headers: Authorization: Bearer <token>, Content-Type: application/json
 */
async function updateSettings(data) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  return { success: true, data };
}

/**
 * TODO: Replace with real API endpoint
 * GET /api/analytics/overview
 * Headers: Authorization: Bearer <token>
 */
async function fetchAnalytics() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    visitors: {
      total: 45892,
      thisMonth: 3247,
      lastMonth: 2891,
      growth: 12.3,
    },
    pageViews: {
      total: 127845,
      thisMonth: 8923,
      lastMonth: 7656,
      growth: 16.6,
    },
    bounceRate: {
      current: 32.4,
      target: 30.0,
    },
    avgSessionDuration: {
      current: "4:23",
      target: "5:00",
    },
    topPages: [
      { path: "/", views: 15678, title: "Home" },
      { path: "/explore", views: 8923, title: "Explore" },
      { path: "/investment", views: 3456, title: "Investment" },
      { path: "/accommodations", views: 2890, title: "Accommodations" },
    ],
    devices: {
      desktop: 58.2,
      mobile: 38.7,
      tablet: 3.1,
    },
    countries: [
      { country: "Ethiopia", visitors: 28456, percentage: 62.0 },
      { country: "United States", visitors: 8923, percentage: 19.4 },
      { country: "Kenya", visitors: 3456, percentage: 7.5 },
      { country: "United Kingdom", visitors: 2890, percentage: 6.3 },
      { country: "Canada", visitors: 2167, percentage: 4.8 },
    ]
  };
}

export default function DashboardSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (settings?.theme?.mode) {
      applyTheme(settings.theme.mode);
    }
  }, [settings?.theme?.mode]);

  const loadData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API calls
      const [settingsData, analyticsData] = await Promise.all([
        fetchSettings(),
        fetchAnalytics()
      ]);
      setSettings(settingsData);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error("Failed to load settings:", error);
      // TODO: Show error toast: "Failed to load settings"
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // TODO: Replace with actual API call
      await updateSettings(settings);
      // TODO: Show success toast: "Settings saved successfully"
      setSaveDialogOpen(true);
    } catch (error) {
      console.error("Failed to save settings:", error);
      // TODO: Show error toast: "Failed to save settings"
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call to reset settings
      await loadData();
      // TODO: Show success toast: "Settings reset to defaults"
      setResetDialogOpen(false);
    } catch (error) {
      console.error("Failed to reset settings:", error);
      // TODO: Show error toast: "Failed to reset settings"
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const applyTheme = (themeValue) => {
    const root = document.documentElement;
    if (themeValue === "dark") {
      root.classList.add("dark");
    } else if (themeValue === "light") {
      root.classList.remove("dark");
    } else if (themeValue === "system") {
      const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      if (systemPreference === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
    // Save to localStorage for persistence
    localStorage.setItem("theme", themeValue);
  };

  if (loading || !settings || !analytics) {
    return (
      <div className="p-6 lg:p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "theme", label: "Theme", icon: Palette },
    { id: "social", label: "Social", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "performance", label: "Performance", icon: Zap },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Manage your website configuration, appearance, and analytics.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => setResetDialogOpen(true)}
            className="gap-2 w-full sm:w-auto"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Reset to Defaults</span>
            <span className="sm:hidden">Reset</span>
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="gap-2 w-full sm:w-auto"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-6 sm:mb-8 border-b border-border overflow-x-auto">
        <nav className="flex space-x-2 sm:space-x-8 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap",
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="w-full max-w-full overflow-x-hidden">
        {/* General Settings */}
        {activeTab === "general" && (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-card rounded-xl p-4 sm:p-6 shadow-sm border border-border">
              <h2 className="text-lg font-semibold mb-4">Site Information</h2>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={settings.general.siteName}
                      onChange={(e) => updateSetting("general", "siteName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultLanguage">Default Language</Label>
                    <Select
                      value={settings.general.defaultLanguage}
                      onValueChange={(value) => updateSetting("general", "defaultLanguage", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="am">Amharic</SelectItem>
                        <SelectItem value="or">Oromo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.general.siteDescription}
                    onChange={(e) => updateSetting("general", "siteDescription", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-4 sm:p-6 shadow-sm border border-border">
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={settings.general.contactEmail}
                      onChange={(e) => updateSetting("general", "contactEmail", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      value={settings.general.contactPhone}
                      onChange={(e) => updateSetting("general", "contactPhone", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={settings.general.address}
                    onChange={(e) => updateSetting("general", "address", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-4 sm:p-6 shadow-sm border border-border">
              <h2 className="text-lg font-semibold mb-4">System Settings</h2>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <Label htmlFor="maintenanceMode" className="text-base">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Temporarily disable public access to your site
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  checked={settings.general.maintenanceMode}
                  onChange={(e) => updateSetting("general", "maintenanceMode", e.target.checked)}
                  className="h-4 w-4 mt-1"
                />
              </div>
            </div>
          </div>
        )}

        {/* Theme Settings */}
        {activeTab === "theme" && (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-card rounded-xl p-4 sm:p-6 shadow-sm border border-border">
              <h2 className="text-lg font-semibold mb-4">Appearance</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme Mode</Label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: "light", label: "Light", icon: Sun },
                      { value: "dark", label: "Dark", icon: Moon },
                      { value: "system", label: "System", icon: Monitor },
                    ].map((theme) => {
                      const Icon = theme.icon;
                      return (
                        <button
                          key={theme.value}
                          onClick={() => {
                            updateSetting("theme", "mode", theme.value);
                            // Apply theme immediately
                            applyTheme(theme.value);
                          }}
                          className={cn(
                            "flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border transition-colors text-sm",
                            settings.theme.mode === theme.value
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border hover:bg-muted"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{theme.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={settings.theme.primaryColor}
                        onChange={(e) => {
                          updateSetting("theme", "primaryColor", e.target.value);
                          // Apply color immediately
                          document.documentElement.style.setProperty('--primary', e.target.value);
                        }}
                        className="w-16 h-10 p-1 flex-shrink-0"
                      />
                      <Input
                        value={settings.theme.primaryColor}
                        onChange={(e) => {
                          updateSetting("theme", "primaryColor", e.target.value);
                          document.documentElement.style.setProperty('--primary', e.target.value);
                        }}
                        placeholder="#3b82f6"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="accentColor"
                        type="color"
                        value={settings.theme.accentColor}
                        onChange={(e) => {
                          updateSetting("theme", "accentColor", e.target.value);
                          document.documentElement.style.setProperty('--accent', e.target.value);
                        }}
                        className="w-16 h-10 p-1 flex-shrink-0"
                      />
                      <Input
                        value={settings.theme.accentColor}
                        onChange={(e) => {
                          updateSetting("theme", "accentColor", e.target.value);
                          document.documentElement.style.setProperty('--accent', e.target.value);
                        }}
                        placeholder="#f59e0b"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customCSS">Custom CSS</Label>
                  <Textarea
                    id="customCSS"
                    value={settings.theme.customCSS}
                    onChange={(e) => updateSetting("theme", "customCSS", e.target.value)}
                    placeholder="Add custom CSS styles..."
                    rows={6}
                    className="font-mono text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Social Settings */}
        {activeTab === "social" && (
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
              <h2 className="text-lg font-semibold mb-4">Social Media Links</h2>
              <div className="space-y-4">
                {[
                  { key: "facebook", label: "Facebook", icon: Facebook },
                  { key: "twitter", label: "Twitter", icon: Twitter },
                  { key: "instagram", label: "Instagram", icon: Instagram },
                  { key: "linkedin", label: "LinkedIn", icon: Linkedin },
                ].map((social) => {
                  const Icon = social.icon;
                  return (
                    <div key={social.key} className="space-y-2">
                      <Label htmlFor={social.key} className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {social.label}
                      </Label>
                      <Input
                        id={social.key}
                        value={settings.social[social.key]}
                        onChange={(e) => updateSetting("social", social.key, e.target.value)}
                        placeholder={`https://${social.key}.com/gobishoftu`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Overview */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Visitors</p>
                    <p className="text-2xl font-bold text-foreground">{analytics.visitors.total.toLocaleString()}</p>
                    <p className="text-sm text-green-600">+{analytics.visitors.growth}%</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Page Views</p>
                    <p className="text-2xl font-bold text-foreground">{analytics.pageViews.total.toLocaleString()}</p>
                    <p className="text-sm text-green-600">+{analytics.pageViews.growth}%</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Bounce Rate</p>
                    <p className="text-2xl font-bold text-foreground">{analytics.bounceRate.current}%</p>
                    <p className="text-sm text-muted-foreground">Target: {analytics.bounceRate.target}%</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Session</p>
                    <p className="text-2xl font-bold text-foreground">{analytics.avgSessionDuration.current}</p>
                    <p className="text-sm text-muted-foreground">Target: {analytics.avgSessionDuration.target}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Top Pages */}
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
              <h2 className="text-lg font-semibold mb-4">Top Pages</h2>
              <div className="space-y-3">
                {analytics.topPages.map((page, index) => (
                  <div key={page.path} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground w-6">#{index + 1}</span>
                      <div>
                        <p className="font-medium">{page.title}</p>
                        <p className="text-sm text-muted-foreground">{page.path}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{page.views.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">views</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analytics Settings */}
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
              <h2 className="text-lg font-semibold mb-4">Analytics Settings</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                  <Input
                    id="googleAnalyticsId"
                    value={settings.analytics.googleAnalyticsId}
                    onChange={(e) => updateSetting("analytics", "googleAnalyticsId", e.target.value)}
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableTracking">Enable Tracking</Label>
                      <p className="text-sm text-muted-foreground">
                        Collect visitor analytics and usage data
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      id="enableTracking"
                      checked={settings.analytics.enableTracking}
                      onChange={(e) => updateSetting("analytics", "enableTracking", e.target.checked)}
                      className="h-4 w-4"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableHeatmaps">Enable Heatmaps</Label>
                      <p className="text-sm text-muted-foreground">
                        Visualize user interaction patterns
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      id="enableHeatmaps"
                      checked={settings.analytics.enableHeatmaps}
                      onChange={(e) => updateSetting("analytics", "enableHeatmaps", e.target.checked)}
                      className="h-4 w-4"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableSessionRecording">Enable Session Recording</Label>
                      <p className="text-sm text-muted-foreground">
                        Record user sessions for analysis
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      id="enableSessionRecording"
                      checked={settings.analytics.enableSessionRecording}
                      onChange={(e) => updateSetting("analytics", "enableSessionRecording", e.target.checked)}
                      className="h-4 w-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Settings */}
        {activeTab === "notifications" && (
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
              <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive important updates via email
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    checked={settings.notifications.emailNotifications}
                    onChange={(e) => updateSetting("notifications", "emailNotifications", e.target.checked)}
                    className="h-4 w-4"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="systemNotifications">System Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Show in-app notifications
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="systemNotifications"
                    checked={settings.notifications.systemNotifications}
                    onChange={(e) => updateSetting("notifications", "systemNotifications", e.target.checked)}
                    className="h-4 w-4"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketingEmails">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive promotional content and updates
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="marketingEmails"
                    checked={settings.notifications.marketingEmails}
                    onChange={(e) => updateSetting("notifications", "marketingEmails", e.target.checked)}
                    className="h-4 w-4"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {activeTab === "security" && (
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
              <h2 className="text-lg font-semibold mb-4">Security Configuration</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableTwoFactor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for admin accounts
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="enableTwoFactor"
                    checked={settings.security.enableTwoFactor}
                    onChange={(e) => updateSetting("security", "enableTwoFactor", e.target.checked)}
                    className="h-4 w-4"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      min={1}
                      max={168}
                      value={settings.security.sessionTimeout}
                      onChange={(e) => updateSetting("security", "sessionTimeout", parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passwordMinLength">Min Password Length</Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      min={6}
                      max={32}
                      value={settings.security.passwordMinLength}
                      onChange={(e) => updateSetting("security", "passwordMinLength", parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableCaptcha">Enable CAPTCHA</Label>
                    <p className="text-sm text-muted-foreground">
                      Protect forms from automated submissions
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="enableCaptcha"
                    checked={settings.security.enableCaptcha}
                    onChange={(e) => updateSetting("security", "enableCaptcha", e.target.checked)}
                    className="h-4 w-4"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Performance Settings */}
        {activeTab === "performance" && (
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
              <h2 className="text-lg font-semibold mb-4">Performance Optimization</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableCaching">Enable Caching</Label>
                    <p className="text-sm text-muted-foreground">
                      Cache static assets for faster loading
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="enableCaching"
                    checked={settings.performance.enableCaching}
                    onChange={(e) => updateSetting("performance", "enableCaching", e.target.checked)}
                    className="h-4 w-4"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableImageOptimization">Image Optimization</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically optimize and compress images
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="enableImageOptimization"
                    checked={settings.performance.enableImageOptimization}
                    onChange={(e) => updateSetting("performance", "enableImageOptimization", e.target.checked)}
                    className="h-4 w-4"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableLazyLoading">Lazy Loading</Label>
                    <p className="text-sm text-muted-foreground">
                      Load images and content as needed
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="enableLazyLoading"
                    checked={settings.performance.enableLazyLoading}
                    onChange={(e) => updateSetting("performance", "enableLazyLoading", e.target.checked)}
                    className="h-4 w-4"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableCDN">Content Delivery Network</Label>
                    <p className="text-sm text-muted-foreground">
                      Serve assets through CDN for global performance
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="enableCDN"
                    checked={settings.performance.enableCDN}
                    onChange={(e) => updateSetting("performance", "enableCDN", e.target.checked)}
                    className="h-4 w-4"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit/View Dialog */}
      <Dialog
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
      >
        <DialogContent className="w-full max-w-sm sm:max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Settings Saved</DialogTitle>
            <DialogDescription>
              Your settings have been successfully saved and applied to the website.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setSaveDialogOpen(false)}>
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reset Confirmation Dialog */}
      <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <AlertDialogContent className="w-full max-w-sm sm:max-w-md mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>Reset to Defaults?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset all settings to their default values. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset}>
              Reset Settings
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
