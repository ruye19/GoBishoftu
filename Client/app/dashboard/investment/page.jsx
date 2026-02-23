"use client";

import { useState, useEffect } from "react";
import { Eye, Pencil, Plus, Trash2, Search, Filter, Building2, Hotel, Home, Store, TrendingUp, Shield, Users, Briefcase, MapPin, DollarSign, Clock, CheckCircle2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

/**
 * @typedef {"Active" | "Draft" | "Closed"} InvestmentStatus
 *
 * @typedef InvestmentTranslations
 * @property {Object} en
 * @property {string} en.title
 * @property {string} en.description
 * @property {string} en.investment
 * @property {string} en.roi
 * @property {string} en.timeline
 * @property {Object} am
 * @property {string} am.title
 * @property {string} am.description
 * @property {string} am.investment
 * @property {string} am.roi
 * @property {string} am.timeline
 * @property {Object} or
 * @property {string} or.title
 * @property {string} or.description
 * @property {string} or.investment
 * @property {string} or.roi
 * @property {string} or.timeline
 *
 * @typedef Investment
 * @property {string} id
 * @property {string} category
 * @property {InvestmentTranslations} translations
 * @property {string} image
 * @property {boolean} featured
 * @property {InvestmentStatus} status
 * @property {string} updatedAtISO
 */

function createId() {
  if (typeof crypto !== "undefined" && crypto?.randomUUID)
    return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/** @param {InvestmentStatus} status */
function statusPillClasses(status) {
  if (status === "Active") return "bg-primary/10 text-primary";
  if (status === "Closed") return "bg-muted text-muted-foreground line-through";
  return "bg-muted text-muted-foreground";
}

const STATUS_OPTIONS = /** @type {const} */ (["Active", "Draft", "Closed"]);
const INVESTMENT_CATEGORIES = /** @type {const} */ ([
  "hospitality",
  "real-estate", 
  "retail-services",
  "agriculture",
  "technology",
  "manufacturing"
]);

// Mock API functions - TODO: Replace with real backend API calls
/**
 * TODO: Replace with real API endpoint
 * GET /api/investments
 * Headers: Authorization: Bearer <token>
 */
async function fetchInvestments() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    {
      id: createId(),
      category: "hospitality",
      translations: {
        en: {
          title: "Lakeview Resort Development",
          description: "Prime lakefront property perfect for a 5-star resort with stunning views of Lake Bishoftu.",
          investment: "$2.5M",
          roi: "18-22% annually",
          timeline: "18-24 months"
        },
        am: {
          title: "የሀዳሪው የሪዞርት ልማት",
          description: "የቢሾፉቱ ሀዳር ውስጥ ያለ የእስር የሚሆን ንብረት ለ5-ኮከብ ሪዞርት በጣም የሚልክ እይታዎች ጋር።",
          investment: "$2.5M",
          roi: "በዓመት 18-22%",
          timeline: "18-24 ወራት"
        },
        or: {
          title: "Harina Rizoortii Dhaabbii",
          description: "Bakka harina Bishoftu addunyaa guutuuf kan 5-koqii rizoortii hojjechuu danda'u addunyaa guutuuf.",
          investment: "$2.5M",
          roi: "waggaa 18-22%",
          timeline: "18-24 ji'a"
        }
      },
      image: "/luxury-resort-hotel.jpg",
      featured: true,
      status: "Active",
      updatedAtISO: new Date().toISOString(),
    },
    {
      id: createId(),
      category: "real-estate",
      translations: {
        en: {
          title: "Commercial Complex",
          description: "Mixed-use development in the heart of Bishoftu with retail, office, and residential spaces.",
          investment: "$1.8M",
          roi: "12-15% annually",
          timeline: "24-30 months"
        },
        am: {
          title: "የንግድ ውስጥ ኮምፕሌክስ",
          description: "በቢሾፉቱ ማእከል ውስጥ የሚገኘ የተለያዩ አገልግሎቶች ኮምፕሌክስ ከማሸጫ፣ ቢሮ እና የመኖሪያ ቦታዎች ጋር።",
          investment: "$1.8M",
          roi: "በዓመት 12-15%",
          timeline: "24-30 ወራት"
        },
        or: {
          title: "Kompleeksii Bizineessii",
          description: "Dhaabbii adda adda Bishoftu keessatti qophii, kattoo, fi mana jiraatoo waliin.",
          investment: "$1.8M",
          roi: "waggaa 12-15%",
          timeline: "24-30 ji'a"
        }
      },
      image: "/placeholder.svg",
      featured: true,
      status: "Active",
      updatedAtISO: new Date().toISOString(),
    },
    {
      id: createId(),
      category: "agriculture",
      translations: {
        en: {
          title: "Agro-tourism Farm Experience",
          description: "Organic farm with farm-stay experiences, local produce, and educational tourism programs.",
          investment: "$600K",
          roi: "16-20% annually",
          timeline: "12-18 months"
        },
        am: {
          title: "የእርሻ ቱሪዝም ፍቃድ",
          description: "ኦርጋኒክ እርሻ ከቤተሰብ መቆይያ ፍቃዶች፣ የአካባቢ ምርቶች እና የትምህርት ቱሪዝም ፕሮግራሞች።",
          investment: "$600K",
          roi: "በዓመት 16-20%",
          timeline: "12-18 ወራት"
        },
        or: {
          title: "Agro-tourism Farm Experience",
          description: "Farma orgaanikii waan duraanii fi piroogiraamii tooriizimii barachisaa.",
          investment: "$600K",
          roi: "waggaa 16-20%",
          timeline: "12-18 ji'a"
        }
      },
      image: "/placeholder.svg",
      featured: false,
      status: "Draft",
      updatedAtISO: new Date().toISOString(),
    }
  ];
}

/**
 * TODO: Replace with real API endpoint
 * POST /api/investments
 * Headers: Authorization: Bearer <token>, Content-Type: application/json
 */
async function createInvestment(data) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  return { id: createId(), ...data };
}

/**
 * TODO: Replace with real API endpoint
 * PUT /api/investments/:id
 * Headers: Authorization: Bearer <token>, Content-Type: application/json
 */
async function updateInvestment(id, data) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  return { id, ...data };
}

/**
 * TODO: Replace with real API endpoint
 * DELETE /api/investments/:id
 * Headers: Authorization: Bearer <token>
 */
async function deleteInvestmentApi(id) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  return { success: true };
}

export default function DashboardInvestmentPage() {
  /** @type {[Investment[], Function]} */
  const [investments, setInvestments] = useState([]);
  const [filteredInvestments, setFilteredInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState(
    /** @type {"add" | "edit" | "view"} */ ("add"),
  );
  const [activeId, setActiveId] = useState(
    /** @type {string | null} */ (null),
  );

  const [form, setForm] = useState({
    category: "hospitality",
    image: "",
    featured: false,
    status: /** @type {InvestmentStatus} */ ("Draft"),
    title_en: "",
    description_en: "",
    investment_en: "",
    roi_en: "",
    timeline_en: "",
    title_am: "",
    description_am: "",
    investment_am: "",
    roi_am: "",
    timeline_am: "",
    title_or: "",
    description_or: "",
    investment_or: "",
    roi_or: "",
    timeline_or: "",
  });

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterInvestments();
  }, [investments, searchTerm, filterCategory, filterStatus]);

  const loadData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const data = await fetchInvestments();
      setInvestments(data);
    } catch (error) {
      console.error("Failed to load investments:", error);
      // TODO: Show error toast: "Failed to load investments"
    } finally {
      setLoading(false);
    }
  };

  const filterInvestments = () => {
    let filtered = investments;

    // Search across title fields in all languages
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.translations.en.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.translations.am.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.translations.or.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (filterCategory !== "All") {
      filtered = filtered.filter(item => item.category === filterCategory);
    }

    // Filter by status
    if (filterStatus !== "All") {
      filtered = filtered.filter(item => item.status === filterStatus);
    }

    setFilteredInvestments(filtered);
  };

  // Stats calculations
  const stats = {
    total: investments.length,
    active: investments.filter(i => i.status === "Active").length,
    draft: investments.filter(i => i.status === "Draft").length,
    featured: investments.filter(i => i.featured).length,
    hospitality: investments.filter(i => i.category === "hospitality").length,
    realEstate: investments.filter(i => i.category === "real-estate").length,
  };

  function openAdd() {
    setMode("add");
    setActiveId(null);
    setForm({
      category: "hospitality",
      image: "",
      featured: false,
      status: "Draft",
      title_en: "",
      description_en: "",
      investment_en: "",
      roi_en: "",
      timeline_en: "",
      title_am: "",
      description_am: "",
      investment_am: "",
      roi_am: "",
      timeline_am: "",
      title_or: "",
      description_or: "",
      investment_or: "",
      roi_or: "",
      timeline_or: "",
    });
    setDialogOpen(true);
  }

  /** @param {Investment} investment */
  function openEdit(investment) {
    setMode("edit");
    setActiveId(investment.id);
    setForm({
      category: investment.category || "hospitality",
      image: investment.image || "",
      featured: investment.featured || false,
      status: investment.status || "Draft",
      title_en: investment.translations.en.title || "",
      description_en: investment.translations.en.description || "",
      investment_en: investment.translations.en.investment || "",
      roi_en: investment.translations.en.roi || "",
      timeline_en: investment.translations.en.timeline || "",
      title_am: investment.translations.am.title || "",
      description_am: investment.translations.am.description || "",
      investment_am: investment.translations.am.investment || "",
      roi_am: investment.translations.am.roi || "",
      timeline_am: investment.translations.am.timeline || "",
      title_or: investment.translations.or.title || "",
      description_or: investment.translations.or.description || "",
      investment_or: investment.translations.or.investment || "",
      roi_or: investment.translations.or.roi || "",
      timeline_or: investment.translations.or.timeline || "",
    });
    setDialogOpen(true);
  }

  /** @param {Investment} investment */
  function openView(investment) {
    setMode("view");
    setActiveId(investment.id);
    setForm({
      category: investment.category || "hospitality",
      image: investment.image || "",
      featured: investment.featured || false,
      status: investment.status || "Draft",
      title_en: investment.translations.en.title || "",
      description_en: investment.translations.en.description || "",
      investment_en: investment.translations.en.investment || "",
      roi_en: investment.translations.en.roi || "",
      timeline_en: investment.translations.en.timeline || "",
      title_am: investment.translations.am.title || "",
      description_am: investment.translations.am.description || "",
      investment_am: investment.translations.am.investment || "",
      roi_am: investment.translations.am.roi || "",
      timeline_am: investment.translations.am.timeline || "",
      title_or: investment.translations.or.title || "",
      description_or: investment.translations.or.description || "",
      investment_or: investment.translations.or.investment || "",
      roi_or: investment.translations.or.roi || "",
      timeline_or: investment.translations.or.timeline || "",
    });
    setDialogOpen(true);
  }

  function resetDialog() {
    setDialogOpen(false);
    setActiveId(null);
    setMode("add");
    setForm({
      category: "hospitality",
      image: "",
      featured: false,
      status: "Draft",
      title_en: "",
      description_en: "",
      investment_en: "",
      roi_en: "",
      timeline_en: "",
      title_am: "",
      description_am: "",
      investment_am: "",
      roi_am: "",
      timeline_am: "",
      title_or: "",
      description_or: "",
      investment_or: "",
      roi_or: "",
      timeline_or: "",
    });
  }

  /**
   * CRUD operations - TODO: Replace with real API calls
   */
  const addInvestment = async (data) => {
    try {
      // TODO: Replace with actual API call
      const newInvestment = await createInvestment(data);
      setInvestments(prev => [newInvestment, ...prev]);
      // TODO: Show success toast: "Investment created successfully"
    } catch (error) {
      console.error("Failed to create investment:", error);
      // TODO: Show error toast: "Failed to create investment"
    }
  };

  const updateInvestment = async (id, data) => {
    try {
      // TODO: Replace with actual API call
      const updatedInvestment = await updateInvestment(id, data);
      setInvestments(prev => prev.map(item => 
        item.id === id ? updatedInvestment : item
      ));
      // TODO: Show success toast: "Investment updated successfully"
    } catch (error) {
      console.error("Failed to update investment:", error);
      // TODO: Show error toast: "Failed to update investment"
    }
  };

  const deleteInvestment = async (id) => {
    try {
      // TODO: Replace with actual API call
      await deleteInvestmentApi(id);
      setInvestments(prev => prev.filter(item => item.id !== id));
      // TODO: Show success toast: "Investment deleted successfully"
    } catch (error) {
      console.error("Failed to delete investment:", error);
      // TODO: Show error toast: "Failed to delete investment"
    }
  };

  function handleSubmit(event) {
    event.preventDefault();

    if (mode === "view") return;

    const payload = {
      category: form.category,
      image: form.image.trim(),
      featured: form.featured,
      status: form.status,
      translations: {
        en: {
          title: form.title_en.trim(),
          description: form.description_en.trim(),
          investment: form.investment_en.trim(),
          roi: form.roi_en.trim(),
          timeline: form.timeline_en.trim(),
        },
        am: {
          title: form.title_am.trim(),
          description: form.description_am.trim(),
          investment: form.investment_am.trim(),
          roi: form.roi_am.trim(),
          timeline: form.timeline_am.trim(),
        },
        or: {
          title: form.title_or.trim(),
          description: form.description_or.trim(),
          investment: form.investment_or.trim(),
          roi: form.roi_or.trim(),
          timeline: form.timeline_or.trim(),
        }
      },
      updatedAtISO: new Date().toISOString(),
    };

    if (!payload.translations.en.title.trim()) {
      // TODO: Show error toast: "Please fill in required fields"
      return;
    }

    if (mode === "add") {
      addInvestment(payload);
      resetDialog();
      return;
    }

    if (mode === "edit" && activeId) {
      updateInvestment(activeId, payload);
      resetDialog();
    }
  }

  const dialogTitle = (() => {
    if (mode === "add") return "Add Investment Opportunity";
    if (mode === "edit") return "Edit Investment Opportunity";
    return "Investment Details";
  })();

  const dialogDescription = (() => {
    if (mode === "add")
      return "Capture a new investment opportunity for Bishoftu (mock data only).";
    if (mode === "edit")
      return "Refine headline figures and positioning before publishing.";
    return "Review the full investment profile as decision-makers will see it.";
  })();

  const readOnly = mode === "view";

  return (
    <section className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Investment Opportunities</h1>
          <p className="text-muted-foreground">
            Curate investment-ready projects with clear capital needs and returns.
          </p>
        </div>

        <Button className="gap-2" onClick={openAdd}>
          <Plus className="h-4 w-4" />
          Add Investment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Opportunities</p>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Draft</p>
              <p className="text-2xl font-bold text-orange-600">{stats.draft}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Featured</p>
              <p className="text-2xl font-bold text-blue-600">{stats.featured}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search investments by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              {INVESTMENT_CATEGORIES.map(category => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              {STATUS_OPTIONS.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table for Desktop */}
      <div className="hidden sm:block overflow-hidden rounded-xl bg-card shadow-card">
        <div className="flex items-center justify-between border-b border-border p-6">
          <h2 className="font-display text-lg font-semibold">
            Investment Pipeline
          </h2>
          <p className="text-sm text-muted-foreground">
            {filteredInvestments.length} opportunity{filteredInvestments.length === 1 ? "" : "ies"}
            {filteredInvestments.length !== investments.length && ` (filtered from ${investments.length})`}
          </p>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">Title</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Investment</th>
                  <th className="pb-3 font-medium">ROI</th>
                  <th className="pb-3 font-medium">Timeline</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredInvestments.map((item) => (
                  <tr key={item.id} className="align-middle">
                    <td className="py-4">
                      <div>
                        <div className="font-medium text-foreground">
                          {item.translations.en.title}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.translations.am.title}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs",
                        item.category === "hospitality" ? "bg-blue-100 text-blue-700" :
                        item.category === "real-estate" ? "bg-green-100 text-green-700" :
                        item.category === "retail-services" ? "bg-purple-100 text-purple-700" :
                        item.category === "agriculture" ? "bg-yellow-100 text-yellow-700" :
                        "bg-primary/20 text-primary"
                      )}>
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1).replace('-', ' ')}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">
                      {item.translations.en.investment}
                    </td>
                    <td className="py-4 text-sm text-green-600 font-medium">
                      {item.translations.en.roi}
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">
                      {item.translations.en.timeline}
                    </td>
                    <td className="py-4">
                      <span
                        className={cn(
                          "rounded-full px-2 py-1 text-xs",
                          statusPillClasses(item.status),
                        )}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex justify-end gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => openView(item)}
                          aria-label={`View ${item.translations.en.title}`}
                        >
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(item)}
                          aria-label={`Edit ${item.translations.en.title}`}
                        >
                          <Pencil className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              aria-label={`Delete ${item.translations.en.title}`}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Remove investment?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This will remove <b>{item.translations.en.title}</b> from the
                                pipeline. This is a mock UI action (local state only).
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteInvestment(item.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredInvestments.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-10 text-center text-sm text-muted-foreground"
                    >
                      {loading ? "Loading..." : 
                       investments.length === 0 ? "No investment opportunities yet. Click 'Add Investment' to capture one." :
                       "No investments match your filters."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Cards for Mobile */}
      <div className="sm:hidden space-y-4">
        {filteredInvestments.map((item) => (
          <div key={item.id} className="bg-card rounded-xl p-4 shadow-sm border border-border">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-foreground">
                {item.translations.en.title}
              </h3>
              <span
                className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  statusPillClasses(item.status),
                )}
              >
                {item.status}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-1">
              Category: {item.category.charAt(0).toUpperCase() + item.category.slice(1).replace('-', ' ')}
            </p>
            <p className="text-sm text-muted-foreground mb-1">
              Investment: {item.translations.en.investment}
            </p>
            <p className="text-sm text-green-600 font-medium mb-3">
              ROI: {item.translations.en.roi}
            </p>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => openView(item)}
              >
                <Eye className="w-4 h-4 text-muted-foreground" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => openEdit(item)}
              >
                <Pencil className="w-4 h-4 text-muted-foreground" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="button" variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remove investment?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove <b>{item.translations.en.title}</b> from
                      the pipeline. This is a mock UI action (local state only).
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteInvestment(item.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}

        {filteredInvestments.length === 0 && (
          <div className="text-center py-10 text-sm text-muted-foreground">
            {loading ? "Loading..." : 
             investments.length === 0 ? "No investment opportunities yet. Click 'Add Investment' to capture one." :
             "No investments match your filters."}
          </div>
        )}
      </div>

      {/* Add/Edit/View Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(v) => {
          setDialogOpen(v);
          if (!v) resetDialog();
        }}
      >
        <DialogContent className="w-full max-w-sm sm:max-w-[640px] p-4 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ===== General Info ===== */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">General Info</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={form.category}
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, category: value }))
                    }
                    disabled={readOnly}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {INVESTMENT_CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={form.status}
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, status: value }))
                    }
                    disabled={readOnly}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={form.image}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, image: e.target.value }))
                  }
                  placeholder="/luxury-resort-hotel.jpg"
                  disabled={readOnly}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, featured: e.target.checked }))
                  }
                  disabled={readOnly}
                />
                <Label htmlFor="featured">Featured opportunity</Label>
              </div>
            </section>

            {/* ===== English Content ===== */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">English Content</h2>
              <div className="space-y-2">
                <Label htmlFor="title_en">Title *</Label>
                <Input
                  id="title_en"
                  value={form.title_en}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title_en: e.target.value }))
                  }
                  placeholder="Lakeview Resort Development"
                  disabled={readOnly}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description_en">Description</Label>
                <Textarea
                  id="description_en"
                  value={form.description_en}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description_en: e.target.value,
                    }))
                  }
                  placeholder="Prime lakefront property perfect for a 5-star resort..."
                  disabled={readOnly}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="investment_en">Investment</Label>
                  <Input
                    id="investment_en"
                    value={form.investment_en}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, investment_en: e.target.value }))
                    }
                    placeholder="$2.5M"
                    disabled={readOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roi_en">ROI</Label>
                  <Input
                    id="roi_en"
                    value={form.roi_en}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, roi_en: e.target.value }))
                    }
                    placeholder="18-22% annually"
                    disabled={readOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline_en">Timeline</Label>
                  <Input
                    id="timeline_en"
                    value={form.timeline_en}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, timeline_en: e.target.value }))
                    }
                    placeholder="18-24 months"
                    disabled={readOnly}
                  />
                </div>
              </div>
            </section>

            {/* ===== Amharic Content ===== */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Amharic Content</h2>
              <div className="space-y-2">
                <Label htmlFor="title_am">Title *</Label>
                <Input
                  id="title_am"
                  value={form.title_am}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title_am: e.target.value }))
                  }
                  placeholder="የሀዳሪው የሪዞርት ልማት"
                  disabled={readOnly}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description_am">Description</Label>
                <Textarea
                  id="description_am"
                  value={form.description_am}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description_am: e.target.value,
                    }))
                  }
                  placeholder="የቢሾፉቱ ሀዳር ውስጥ ያለ የእስር የሚሆን ንብረት..."
                  disabled={readOnly}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="investment_am">Investment</Label>
                  <Input
                    id="investment_am"
                    value={form.investment_am}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, investment_am: e.target.value }))
                    }
                    placeholder="$2.5M"
                    disabled={readOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roi_am">ROI</Label>
                  <Input
                    id="roi_am"
                    value={form.roi_am}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, roi_am: e.target.value }))
                    }
                    placeholder="በዓመት 18-22%"
                    disabled={readOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline_am">Timeline</Label>
                  <Input
                    id="timeline_am"
                    value={form.timeline_am}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, timeline_am: e.target.value }))
                    }
                    placeholder="18-24 ወራት"
                    disabled={readOnly}
                  />
                </div>
              </div>
            </section>

            {/* ===== Oromo Content ===== */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Oromo Content</h2>
              <div className="space-y-2">
                <Label htmlFor="title_or">Title *</Label>
                <Input
                  id="title_or"
                  value={form.title_or}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title_or: e.target.value }))
                  }
                  placeholder="Harina Rizoortii Dhaabbii"
                  disabled={readOnly}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description_or">Description</Label>
                <Textarea
                  id="description_or"
                  value={form.description_or}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description_or: e.target.value,
                    }))
                  }
                  placeholder="Bakka harina Bishoftu addunyaa guutuuf..."
                  disabled={readOnly}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="investment_or">Investment</Label>
                  <Input
                    id="investment_or"
                    value={form.investment_or}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, investment_or: e.target.value }))
                    }
                    placeholder="$2.5M"
                    disabled={readOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roi_or">ROI</Label>
                  <Input
                    id="roi_or"
                    value={form.roi_or}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, roi_or: e.target.value }))
                    }
                    placeholder="waggaa 18-22%"
                    disabled={readOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline_or">Timeline</Label>
                  <Input
                    id="timeline_or"
                    value={form.timeline_or}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, timeline_or: e.target.value }))
                    }
                    placeholder="18-24 ji'a"
                    disabled={readOnly}
                  />
                </div>
              </div>
            </section>

            {/* ===== Footer Buttons ===== */}
            <div className="flex justify-end gap-3 mt-4">
              <Button type="button" variant="outline" onClick={resetDialog}>
                {readOnly ? "Close" : "Cancel"}
              </Button>
              {!readOnly && (
                <Button
                  type="submit"
                  disabled={!form.title_en.trim()}
                >
                  {mode === "add" ? "Add Investment" : "Save Changes"}
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}

