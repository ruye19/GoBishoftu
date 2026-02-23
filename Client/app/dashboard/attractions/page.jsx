"use client";

import { useState, useEffect } from "react";
import { Eye, Pencil, Plus, Trash2, Search, Filter, MapPin, Star, Clock, Users, Shield, Compass } from "lucide-react";
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
 * @typedef {"Published" | "Draft"} AttractionStatus
 *
 * @typedef AttractionType
 * @property {Object} translations
 * @property {string} translations.en
 * @property {string} translations.am
 * @property {string} translations.or
 *
 * @typedef AttractionTranslations
 * @property {Object} en
 * @property {string} en.name
 * @property {string} en.description
 * @property {string} en.details
 * @property {Object} am
 * @property {string} am.name
 * @property {string} am.description
 * @property {string} am.details
 * @property {Object} or
 * @property {string} or.name
 * @property {string} or.description
 * @property {string} or.details
 *
 * @typedef Attraction
 * @property {string} id
 * @property {string} slug
 * @property {AttractionType} type
 * @property {string} image
 * @property {string} location
 * @property {AttractionStatus} status
 * @property {string[]} amenities
 * @property {string|null} contact
 * @property {AttractionTranslations} translations
 * @property {string} updatedAtISO
 */

function createId() {
  if (typeof crypto !== "undefined" && crypto?.randomUUID)
    return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/** @param {AttractionStatus} status */
function statusPillClasses(status) {
  if (status === "Published") return "bg-primary/10 text-primary";
  return "bg-muted text-muted-foreground";
}

const STATUS_OPTIONS = /** @type {const} */ (["Published", "Draft"]);
const ATTRACTION_TYPES = /** @type {const} */ ([
  "Natural Wonder",
  "Cultural Site", 
  "Travel Agent",
  "Historical Place",
  "Religious Site",
  "Recreational Area"
]);

// Mock API functions - TODO: Replace with real backend API calls
/**
 * TODO: Replace with real API endpoint
 * GET /api/attractions
 * Headers: Authorization: Bearer <token>
 */
async function fetchAttractions() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    {
      id: createId(),
      slug: "lake-hora",
      type: {
        translations: {
          en: "Natural Wonder",
          am: "ተፈጥሮ ምርጥ ቦታ",
          or: "Mucaa Uumamaa"
        }
      },
      image: "/lakkk.jpg",
      location: "Central Bishoftu",
      status: "Published",
      amenities: ["Scenic Views", "Cultural Events", "Photography Spot"],
      contact: null,
      translations: {
        en: {
          name: "Lake Hora",
          description: "Crater lake surrounded by resorts and cultural sites, famous for hosting annual cultural and religious events (Irreecha).",
          details: "Lake Hora is one of the most famous lakes in Bishoftu, hosting traditional and cultural festivals."
        },
        am: {
          name: "ሐይቁ ሆራ",
          description: "ባህላዊ ቦታዎችና ሪዞርቶች የተሸፈነ ክረትር ሐይቅ፣ እንዲሁም አመታዊ ባህላዊ እና ሃይማኖታዊ ክስተቶችን የሚያካትት።",
          details: "ሐይቁ ሆራ በቢሾፍቱ ውስጥ ከፍተኛ ታዋቂ ሐይቅ ነው። ባህላዊ እና ባህላዊ ክስተቶችን ይያዛል።"
        },
        or: {
          name: "Lake Hora",
          description: "Laga crater kan naannoo resort fi bakka aadaa waliin qabdu, ayyaana aadaa fi amantii waggaa tokko tokkoof beekamtu.",
          details: "Laga Hora Bishoftu keessatti beekamtuudha, ayyaana aadaa fi aadaa biyya keessa ni qabdi."
        }
      },
      updatedAtISO: new Date().toISOString(),
    },
    {
      id: createId(),
      slug: "lake-babogaya",
      type: {
        translations: {
          en: "Natural Wonder",
          am: "ተፈጥሮ ምርጥ ቦታ",
          or: "Mucaa Uumamaa"
        }
      },
      image: "/lake babogaya.jpg",
      location: "North Bishoftu",
      status: "Published",
      amenities: ["Water Activities", "Resort Access"],
      contact: null,
      translations: {
        en: {
          name: "Lake Babogaya",
          description: "Popular lakeside area with resorts and water activities.",
          details: "Beautiful crater lake perfect for recreation and relaxation."
        },
        am: {
          name: "ሐይቁ ባቦጋያ",
          description: "በሪዞርቶች እና የውሃ እንቅስቃሴዎች የተደጋገመ የሐይቅ ዳርቻ ቦታ።",
          details: "ለመዝናኛ እና ለመስማማት የሚስማማ ውበስ ክረትር ሐይቅ።"
        },
        or: {
          name: "Lake Babogaya",
          description: "Naannoo lakee resortii fi hojiiwwan bishaanii waliin beekamu.",
          details: "Laga crater kan sirnaa fi deebii'uuf gaariidhaan."
        }
      },
      updatedAtISO: new Date().toISOString(),
    },
    {
      id: createId(),
      slug: "cultural-tour",
      type: {
        translations: {
          en: "Cultural Site",
          am: "የባህል ቦታ",
          or: "Bakka Aadaa"
        }
      },
      image: "/local-market-cultural-tour.jpg",
      location: "Bishoftu Market Area",
      status: "Draft",
      amenities: ["Guided Tours", "Cultural Experience"],
      contact: "info@bishoftuculturaltours.com",
      translations: {
        en: {
          name: "Local Market Cultural Tour",
          description: "Guided visit through local markets with authentic Oromo culture.",
          details: "Experience authentic Oromo culture, traditional markets, and local craftsmanship."
        },
        am: {
          name: "የአካባቢ ገበያ ባህላዊ ጉብኝት",
          description: "ከኦሮሞ ባህል ጋር በአካባቢ ገበያዎች የሚደረግ መሪያ ጉብኝት።",
          details: "እውነተኛ የኦሮሞ ባህል፣ ባህላዊ ገበያዎች እና የአካባቢ ሥራዎችን ይሞክሩ።"
        },
        or: {
          name: "Local Market Cultural Tour",
          description: "Ykn aadaa Oromoo waliin galmaa'aa maarkitiiwwan hordofa.",
          details: "Aadaa Oromoo dhugaatii, maarkitiiwwan aadaa fi hojiiwwan naannoo hordofa."
        }
      },
      updatedAtISO: new Date().toISOString(),
    }
  ];
}

/**
 * TODO: Replace with real API endpoint
 * POST /api/attractions
 * Headers: Authorization: Bearer <token>, Content-Type: application/json
 */
async function createAttraction(data) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  return { id: createId(), ...data };
}

/**
 * TODO: Replace with real API endpoint
 * PUT /api/attractions/:id
 * Headers: Authorization: Bearer <token>, Content-Type: application/json
 */
async function updateAttraction(id, data) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  return { id, ...data };
}

/**
 * TODO: Replace with real API endpoint
 * DELETE /api/attractions/:id
 * Headers: Authorization: Bearer <token>
 */
async function deleteAttractionApi(id) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  return { success: true };
}

export default function DashboardAttractionsPage() {
  /** @type {[Attraction[], Function]} */
  const [attractions, setAttractions] = useState([]);
  const [filteredAttractions, setFilteredAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState(
    /** @type {"add" | "edit" | "view"} */ ("add"),
  );
  const [activeId, setActiveId] = useState(/** @type {string | null} */ (null));

  const [form, setForm] = useState({
    slug: "",
    type_en: "Natural Wonder",
    type_am: "ተፈጥሮ ምርጥ ቦታ",
    type_or: "Mucaa Uumamaa",
    location: "",
    image: "",
    amenitiesText: "",
    contact: "",
    status: /** @type {AttractionStatus} */ ("Draft"),
    name_en: "",
    description_en: "",
    details_en: "",
    name_am: "",
    description_am: "",
    details_am: "",
    name_or: "",
    description_or: "",
    details_or: "",
  });

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterAttractions();
  }, [attractions, searchTerm, filterType, filterStatus]);

  const loadData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const data = await fetchAttractions();
      setAttractions(data);
    } catch (error) {
      console.error("Failed to load attractions:", error);
      // TODO: Show error toast: "Failed to load attractions"
    } finally {
      setLoading(false);
    }
  };

  const filterAttractions = () => {
    let filtered = attractions;

    // Search across name fields in all languages
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.translations.en.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.translations.am.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.translations.or.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (filterType !== "All") {
      filtered = filtered.filter(item => item.type.translations.en === filterType);
    }

    // Filter by status
    if (filterStatus !== "All") {
      filtered = filtered.filter(item => item.status === filterStatus);
    }

    setFilteredAttractions(filtered);
  };

  // Stats calculations
  const stats = {
    total: attractions.length,
    published: attractions.filter(a => a.status === "Published").length,
    draft: attractions.filter(a => a.status === "Draft").length,
    naturalWonders: attractions.filter(a => a.type.translations.en === "Natural Wonder").length,
    culturalSites: attractions.filter(a => a.type.translations.en === "Cultural Site").length,
    travelAgents: attractions.filter(a => a.type.translations.en === "Travel Agent").length,
  };

  function openAdd() {
    setMode("add");
    setActiveId(null);
    setForm({
      slug: "",
      type_en: "Natural Wonder",
      type_am: "ተፈጥሮ ምርጥ ቦታ",
      type_or: "Mucaa Uumamaa",
      location: "",
      image: "",
      amenitiesText: "",
      contact: "",
      status: "Draft",
      name_en: "",
      description_en: "",
      details_en: "",
      name_am: "",
      description_am: "",
      details_am: "",
      name_or: "",
      description_or: "",
      details_or: "",
    });
    setDialogOpen(true);
  }

  /** @param {Attraction} attraction */
  function openEdit(attraction) {
    setMode("edit");
    setActiveId(attraction.id);
    setForm({
      slug: attraction.slug || "",
      type_en: attraction.type.translations.en || "Natural Wonder",
      type_am: attraction.type.translations.am || "ተፈጥሮ ምርጥ ቦታ",
      type_or: attraction.type.translations.or || "Mucaa Uumamaa",
      location: attraction.location || "",
      image: attraction.image || "",
      amenitiesText: attraction.amenities?.join(", ") || "",
      contact: attraction.contact || "",
      status: attraction.status || "Draft",
      name_en: attraction.translations.en.name || "",
      description_en: attraction.translations.en.description || "",
      details_en: attraction.translations.en.details || "",
      name_am: attraction.translations.am.name || "",
      description_am: attraction.translations.am.description || "",
      details_am: attraction.translations.am.details || "",
      name_or: attraction.translations.or.name || "",
      description_or: attraction.translations.or.description || "",
      details_or: attraction.translations.or.details || "",
    });
    setDialogOpen(true);
  }

  /** @param {Attraction} attraction */
  function openView(attraction) {
    setMode("view");
    setActiveId(attraction.id);
    setForm({
      slug: attraction.slug || "",
      type_en: attraction.type.translations.en || "Natural Wonder",
      type_am: attraction.type.translations.am || "ተፈጥሮ ምርጥ ቦታ",
      type_or: attraction.type.translations.or || "Mucaa Uumamaa",
      location: attraction.location || "",
      image: attraction.image || "",
      amenitiesText: attraction.amenities?.join(", ") || "",
      contact: attraction.contact || "",
      status: attraction.status || "Draft",
      name_en: attraction.translations.en.name || "",
      description_en: attraction.translations.en.description || "",
      details_en: attraction.translations.en.details || "",
      name_am: attraction.translations.am.name || "",
      description_am: attraction.translations.am.description || "",
      details_am: attraction.translations.am.details || "",
      name_or: attraction.translations.or.name || "",
      description_or: attraction.translations.or.description || "",
      details_or: attraction.translations.or.details || "",
    });
    setDialogOpen(true);
  }

  function resetDialog() {
    setDialogOpen(false);
    setActiveId(null);
    setMode("add");
    setForm({
      slug: "",
      type_en: "Natural Wonder",
      type_am: "ተፈጥሮ ምርጥ ቦታ",
      type_or: "Mucaa Uumamaa",
      location: "",
      image: "",
      amenitiesText: "",
      contact: "",
      status: "Draft",
      name_en: "",
      description_en: "",
      details_en: "",
      name_am: "",
      description_am: "",
      details_am: "",
      name_or: "",
      description_or: "",
      details_or: "",
    });
  }

  /**
   * CRUD operations - TODO: Replace with real API calls
   */
  const addAttraction = async (data) => {
    try {
      // TODO: Replace with actual API call
      const newAttraction = await createAttraction(data);
      setAttractions(prev => [newAttraction, ...prev]);
      // TODO: Show success toast: "Attraction created successfully"
    } catch (error) {
      console.error("Failed to create attraction:", error);
      // TODO: Show error toast: "Failed to create attraction"
    }
  };

  const updateAttraction = async (id, data) => {
    try {
      // TODO: Replace with actual API call
      const updatedAttraction = await updateAttraction(id, data);
      setAttractions(prev => prev.map(item => 
        item.id === id ? updatedAttraction : item
      ));
      // TODO: Show success toast: "Attraction updated successfully"
    } catch (error) {
      console.error("Failed to update attraction:", error);
      // TODO: Show error toast: "Failed to update attraction"
    }
  };

  const deleteAttraction = async (id) => {
    try {
      // TODO: Replace with actual API call
      await deleteAttractionApi(id);
      setAttractions(prev => prev.filter(item => item.id !== id));
      // TODO: Show success toast: "Attraction deleted successfully"
    } catch (error) {
      console.error("Failed to delete attraction:", error);
      // TODO: Show error toast: "Failed to delete attraction"
    }
  };

  function handleSubmit(event) {
    event.preventDefault();

    if (mode === "view") return;

    const payload = {
      slug: form.slug.trim() || form.name_en.toLowerCase().replace(/\s+/g, '-'),
      type: {
        translations: {
          en: form.type_en,
          am: form.type_am,
          or: form.type_or,
        }
      },
      location: form.location.trim(),
      image: form.image.trim(),
      amenities: form.amenitiesText ? form.amenitiesText.split(',').map(a => a.trim()).filter(a => a) : [],
      contact: form.contact.trim() || null,
      status: form.status,
      translations: {
        en: {
          name: form.name_en.trim(),
          description: form.description_en.trim(),
          details: form.details_en.trim(),
        },
        am: {
          name: form.name_am.trim(),
          description: form.description_am.trim(),
          details: form.details_am.trim(),
        },
        or: {
          name: form.name_or.trim(),
          description: form.description_or.trim(),
          details: form.details_or.trim(),
        }
      },
      updatedAtISO: new Date().toISOString(),
    };

    if (!payload.translations.en.name.trim() || !payload.location.trim()) {
      // TODO: Show error toast: "Please fill in required fields"
      return;
    }

    if (mode === "add") {
      addAttraction(payload);
      resetDialog();
      return;
    }

    if (mode === "edit" && activeId) {
      updateAttraction(activeId, payload);
      resetDialog();
    }
  }

  const dialogTitle = (() => {
    if (mode === "add") return "Add Attraction";
    if (mode === "edit") return "Edit Attraction";
    return "Attraction Details";
  })();

  const dialogDescription = (() => {
    if (mode === "add") return "Create a new attraction entry (mock).";
    if (mode === "edit") return "Update the attraction details (mock).";
    return "Preview how this attraction appears in the admin system (mock).";
  })();

  const readOnly = mode === "view";

  return (
    <section className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Attractions</h1>
          <p className="text-muted-foreground">
            Manage key sites and experiences shown on the public Explore page.
          </p>
        </div>

        <Button className="gap-2" onClick={openAdd}>
          <Plus className="h-4 w-4" />
          Add Attraction
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Attractions</p>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Published</p>
              <p className="text-2xl font-bold text-green-600">{stats.published}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-green-600" />
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
              <p className="text-sm text-muted-foreground">Travel Agents</p>
              <p className="text-2xl font-bold text-blue-600">{stats.travelAgents}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
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
              placeholder="Search attractions by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              {ATTRACTION_TYPES.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
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
            Attraction List
          </h2>
          <p className="text-sm text-muted-foreground">
            {filteredAttractions.length} item{filteredAttractions.length === 1 ? "" : "s"}
            {filteredAttractions.length !== attractions.length && ` (filtered from ${attractions.length})`}
          </p>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Location</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredAttractions.map((item) => (
                  <tr key={item.id} className="align-middle">
                    <td className="py-4">
                      <div>
                        <div className="font-medium text-foreground">
                          {item.translations.en.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.translations.am.name}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs",
                        item.type.translations.en === "Natural Wonder" ? "bg-secondary/20 text-secondary" :
                        item.type.translations.en === "Cultural Site" ? "bg-accent/20 text-accent" :
                        item.type.translations.en === "Travel Agent" ? "bg-blue-100 text-blue-700" :
                        "bg-primary/20 text-primary"
                      )}>
                        {item.type.translations.en}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">
                      {item.location}
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
                          aria-label={`View ${item.translations.en.name}`}
                        >
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(item)}
                          aria-label={`Edit ${item.translations.en.name}`}
                        >
                          <Pencil className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              aria-label={`Delete ${item.translations.en.name}`}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete attraction?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This will remove <b>{item.translations.en.name}</b> from the
                                list. This is a mock UI action (local state only).
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteAttraction(item.id)}
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

                {filteredAttractions.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-10 text-center text-sm text-muted-foreground"
                    >
                      {loading ? "Loading..." : 
                       attractions.length === 0 ? "No attractions yet. Click 'Add Attraction' to create one." :
                       "No attractions match your filters."}
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
        {filteredAttractions.map((item) => (
          <div key={item.id} className="bg-card rounded-xl p-4 shadow-sm border border-border">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-foreground">
                {item.translations.en.name}
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
              Type: {item.type.translations.en}
            </p>
            <p className="text-sm text-muted-foreground mb-3">
              Location: {item.location}
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
                    <AlertDialogTitle>Delete attraction?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will remove <b>{item.translations.en.name}</b> from
                      the list. This is a mock UI action (local state only).
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteAttraction(item.id)}
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

        {filteredAttractions.length === 0 && (
          <div className="text-center py-10 text-sm text-muted-foreground">
            {loading ? "Loading..." : 
             attractions.length === 0 ? "No attractions yet. Click 'Add Attraction' to create one." :
             "No attractions match your filters."}
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
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    value={form.slug}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    placeholder="lake-hora"
                    disabled={readOnly}
                  />
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
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, location: e.target.value }))
                  }
                  placeholder="Central Bishoftu"
                  disabled={readOnly}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={form.image}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, image: e.target.value }))
                  }
                  placeholder="/lakkk.jpg"
                  disabled={readOnly}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">Contact (optional)</Label>
                <Input
                  id="contact"
                  value={form.contact}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, contact: e.target.value }))
                  }
                  placeholder="info@example.com"
                  disabled={readOnly}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amenities">Amenities (comma-separated)</Label>
                <Input
                  id="amenities"
                  value={form.amenitiesText}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, amenitiesText: e.target.value }))
                  }
                  placeholder="Scenic Views, Cultural Events, Photography Spot"
                  disabled={readOnly}
                />
              </div>
            </section>

            {/* ===== Type Translations ===== */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Type Translations</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="type_en">Type (English)</Label>
                  <Select
                    value={form.type_en}
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, type_en: value }))
                    }
                    disabled={readOnly}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {ATTRACTION_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type_am">Type (Amharic)</Label>
                  <Input
                    id="type_am"
                    value={form.type_am}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, type_am: e.target.value }))
                    }
                    placeholder="ተፈጥሮ ምርጥ ቦታ"
                    disabled={readOnly}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type_or">Type (Oromo)</Label>
                  <Input
                    id="type_or"
                    value={form.type_or}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, type_or: e.target.value }))
                    }
                    placeholder="Mucaa Uumamaa"
                    disabled={readOnly}
                  />
                </div>
              </div>
            </section>

            {/* ===== English Content ===== */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">English Content</h2>
              <div className="space-y-2">
                <Label htmlFor="name_en">Name *</Label>
                <Input
                  id="name_en"
                  value={form.name_en}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name_en: e.target.value }))
                  }
                  placeholder="Lake Hora"
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
                  placeholder="Crater lake surrounded by resorts and cultural sites..."
                  disabled={readOnly}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="details_en">Details</Label>
                <Textarea
                  id="details_en"
                  value={form.details_en}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      details_en: e.target.value,
                    }))
                  }
                  placeholder="Additional details about this attraction..."
                  disabled={readOnly}
                />
              </div>
            </section>

            {/* ===== Amharic Content ===== */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Amharic Content</h2>
              <div className="space-y-2">
                <Label htmlFor="name_am">Name *</Label>
                <Input
                  id="name_am"
                  value={form.name_am}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name_am: e.target.value }))
                  }
                  placeholder="ሐይቁ ሆራ"
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
                  placeholder="ባህላዊ ቦታዎችና ሪዞርቶች የተሸፈነ ክረትር ሐይቅ..."
                  disabled={readOnly}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="details_am">Details</Label>
                <Textarea
                  id="details_am"
                  value={form.details_am}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      details_am: e.target.value,
                    }))
                  }
                  placeholder="ተጨማሪ ዝርዝሮች ስለዚህ መስህብ ቦታ..."
                  disabled={readOnly}
                />
              </div>
            </section>

            {/* ===== Oromo Content ===== */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Oromo Content</h2>
              <div className="space-y-2">
                <Label htmlFor="name_or">Name *</Label>
                <Input
                  id="name_or"
                  value={form.name_or}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name_or: e.target.value }))
                  }
                  placeholder="Lake Hora"
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
                  placeholder="Laga crater kan naannoo resort fi bakka aadaa waliin qabdu..."
                  disabled={readOnly}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="details_or">Details</Label>
                <Textarea
                  id="details_or"
                  value={form.details_or}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      details_or: e.target.value,
                    }))
                  }
                  placeholder="Ibsa dabalataa sirna kana..."
                  disabled={readOnly}
                />
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
                  disabled={!form.name_en.trim() || !form.location.trim()}
                >
                  {mode === "add" ? "Add Attraction" : "Save Changes"}
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
