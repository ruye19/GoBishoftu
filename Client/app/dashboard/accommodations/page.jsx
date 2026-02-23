"use client";

import { useState, useEffect } from "react";
import { Eye, Pencil, Plus, Trash2, Search, Filter, Star, MapPin, Hotel } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import initialData from "@/data/accommodations.json";

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
 * @typedef {"Published" | "Draft"} AccommodationStatus
 *
 * @typedef Accommodation
 * @property {string} id
 * @property {string} type
 * @property {string} location
 * @property {number} rating
 * @property {number} pricePerNight
 * @property {string} image
 * @property {string[]} amenities
 * @property {string} bookingUrl
 * @property {AccommodationStatus} status
 * @property {string} updatedAtISO
 * @property {string} createdAtISO
 * @property {string} createdBy
 * @property {Object} translations - Multi-language support matching public site
 * @property {Object} translations.en - English translations
 * @property {string} translations.en.name
 * @property {string} translations.en.description
 * @property {Object} translations.am - Amharic translations
 * @property {string} translations.am.name
 * @property {string} translations.am.description
 * @property {Object} translations.or - Oromo translations
 * @property {string} translations.or.name
 * @property {string} translations.or.description
 */

// ============================================================================
// BACKEND INTEGRATION NOTES
// ============================================================================
// TODO: Replace with API calls when backend is implemented
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
//
// TODO: Replace mock API functions with actual backend calls:
// - GET /api/accommodations - Fetch all accommodations
// - POST /api/accommodations - Create new accommodation
// - PUT /api/accommodations/:id - Update accommodation
// - DELETE /api/accommodations/:id - Delete accommodation
// - POST /api/accommodations/upload - Upload image files
//
// TODO: Add authentication/authorization:
// - Import auth context: const { user, token } = useAuth();
// - Add Authorization header: headers: { 'Authorization': `Bearer ${token}` }
// - Add user permissions check for CRUD operations
//
// TODO: Add error handling and loading states:
// - Import toast/notification system
// - Add proper error messages from API responses
// - Add loading spinners for async operations
// ============================================================================

// TODO: Replace with actual API functions
const mockApi = {
  // GET /api/accommodations
  fetchAccommodations: async () => {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/accommodations`, {
    //   headers: { 'Authorization': `Bearer ${token}` }
    // });
    // if (!response.ok) throw new Error('Failed to fetch accommodations');
    // return response.json();
    
    // Mock data for now
    return new Promise(resolve => {
      setTimeout(() => resolve(initialData), 100);
    });
  },

  // POST /api/accommodations
  createAccommodation: async (data) => {
    // TODO: Replace with actual API call
    // const formData = new FormData();
    // if (data.imageFile) {
    //   formData.append('image', data.imageFile);
    // }
    // formData.append('data', JSON.stringify({
    //   type: data.type,
    //   location: data.location,
    //   rating: data.rating,
    //   pricePerNight: data.pricePerNight,
    //   amenities: data.amenities,
    //   bookingUrl: data.bookingUrl,
    //   status: data.status,
    //   translations: data.translations
    // }));
    // 
    // const response = await fetch(`${API_BASE_URL}/accommodations`, {
    //   method: 'POST',
    //   headers: { 'Authorization': `Bearer ${token}` },
    //   body: formData
    // });
    // if (!response.ok) throw new Error('Failed to create accommodation');
    // return response.json();
    
    // Mock creation
    const newItem = {
      id: createId(),
      type: data.type,
      location: data.location,
      rating: data.rating,
      pricePerNight: data.pricePerNight,
      image: data.image || "/placeholder.svg",
      amenities: data.amenities || [],
      bookingUrl: data.bookingUrl,
      status: data.status,
      createdAtISO: new Date().toISOString(),
      updatedAtISO: new Date().toISOString(),
      createdBy: 'admin', // TODO: Get from auth context
      translations: {
        en: {
          name: data.name_en,
          description: data.description_en,
        },
        am: {
          name: data.name_am,
          description: data.description_am,
        },
        or: {
          name: data.name_or,
          description: data.description_or,
        },
      },
    };
    return newItem;
  },

  // PUT /api/accommodations/:id
  updateAccommodation: async (id, data) => {
    // TODO: Replace with actual API call (similar to create but with PUT method)
    // const response = await fetch(`${API_BASE_URL}/accommodations/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Authorization': `Bearer ${token}` },
    //   body: formData
    // });
    // if (!response.ok) throw new Error('Failed to update accommodation');
    // return response.json();
    
    // Mock update
    return {
      id,
      type: data.type,
      location: data.location,
      rating: data.rating,
      pricePerNight: data.pricePerNight,
      image: data.image || "/placeholder.svg",
      amenities: data.amenities || [],
      bookingUrl: data.bookingUrl,
      status: data.status,
      updatedAtISO: new Date().toISOString(),
      translations: {
        en: {
          name: data.name_en,
          description: data.description_en,
        },
        am: {
          name: data.name_am,
          description: data.description_am,
        },
        or: {
          name: data.name_or,
          description: data.description_or,
        },
      },
    };
  },

  // DELETE /api/accommodations/:id
  deleteAccommodation: async (id) => {
    // TODO: Replace with actual API call
    // const response = await fetch(`${API_BASE_URL}/accommodations/${id}`, {
    //   method: 'DELETE',
    //   headers: { 'Authorization': `Bearer ${token}` }
    // });
    // if (!response.ok) throw new Error('Failed to delete accommodation');
    
    // Mock deletion
    return { success: true };
  }
};

function createId() {
  if (typeof crypto !== "undefined" && crypto?.randomUUID)
    return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/** @param {AccommodationStatus} status */
function statusPillClasses(status) {
  if (status === "Published") return "bg-primary/10 text-primary";
  return "bg-muted text-muted-foreground";
}

const STATUS_OPTIONS = /** @type {const} */ (["Published", "Draft"]);

export default function DashboardAccommodationsPage() {
  // State management
  /** @type {[Accommodation[], Function]} */
  const [accommodations, setAccommodations] = useState([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState(
    /** @type {"add" | "edit" | "view"} */ ("add"),
  );
  const [activeId, setActiveId] = useState(/** @type {string | null} */ (null));

  // Form state - matches public site structure
  const [form, setForm] = useState({
    name_en: "",
    description_en: "",
    name_am: "",
    description_am: "",
    name_or: "",
    description_or: "",
    type: "Hotel",
    location: "",
    rating: 0,
    pricePerNight: 0,
    image: "",
    imageFile: null,
    amenitiesText: "",
    bookingUrl: "",
    status: "Draft",
  });

  // Load accommodations on component mount
  useEffect(() => {
    loadAccommodations();
  }, []);

  // Filter accommodations when search or filters change
  useEffect(() => {
    filterAccommodations();
  }, [accommodations, searchQuery, selectedType, selectedStatus]);

  // API Functions
  const loadAccommodations = async () => {
    try {
      setLoading(true);
      const data = await mockApi.fetchAccommodations();
      setAccommodations(data);
    } catch (error) {
      console.error('Error loading accommodations:', error);
      // TODO: Show error toast/notification
    } finally {
      setLoading(false);
    }
  };

  const filterAccommodations = () => {
    let filtered = accommodations;

    // Search filter - searches across all languages
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.translations.en.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.translations.am.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.translations.or.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Type filter
    if (selectedType !== "all") {
      filtered = filtered.filter(item => item.type === selectedType);
    }

    // Status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter(item => item.status === selectedStatus);
    }

    setFilteredAccommodations(filtered);
  };

  // CRUD Operations
  const addAccommodation = async (data) => {
    try {
      const amenities = data.amenitiesText
        ?.split(",")
        .map((a) => a.trim())
        .filter(Boolean) ?? [];

      const newItem = await mockApi.createAccommodation({
        ...data,
        amenities
      });
      
      setAccommodations([...accommodations, newItem]);
      // TODO: Show success toast/notification
    } catch (error) {
      console.error('Error creating accommodation:', error);
      // TODO: Show error toast/notification
    }
  };

  const updateAccommodation = async (id, data) => {
    try {
      const amenities = data.amenitiesText
        ?.split(",")
        .map((a) => a.trim())
        .filter(Boolean) ?? [];

      const updatedItem = await mockApi.updateAccommodation(id, {
        ...data,
        amenities
      });
      
      setAccommodations(accommodations.map(item => 
        item.id === id ? updatedItem : item
      ));
      // TODO: Show success toast/notification
    } catch (error) {
      console.error('Error updating accommodation:', error);
      // TODO: Show error toast/notification
    }
  };

  const deleteAccommodation = async (id) => {
    try {
      await mockApi.deleteAccommodation(id);
      setAccommodations(accommodations.filter(item => item.id !== id));
      // TODO: Show success toast/notification
    } catch (error) {
      console.error('Error deleting accommodation:', error);
      // TODO: Show error toast/notification
    }
  };

  // Dialog functions
  function openAdd() {
    setMode("add");
    setActiveId(null);
    resetForm();
    setDialogOpen(true);
  }

  function openEdit(item) {
    setMode("edit");
    setActiveId(item.id);
    setForm({
      name_en: item.translations.en.name || "",
      description_en: item.translations.en.description || "",
      name_am: item.translations.am.name || "",
      description_am: item.translations.am.description || "",
      name_or: item.translations.or.name || "",
      description_or: item.translations.or.description || "",
      type: item.type || "Hotel",
      location: item.location || "",
      rating: item.rating || 0,
      pricePerNight: item.pricePerNight || 0,
      image: item.image || "",
      imageFile: null,
      amenitiesText: item.amenities?.join(", ") || "",
      bookingUrl: item.bookingUrl || "",
      status: item.status || "Draft",
    });
    setDialogOpen(true);
  }

  function openView(item) {
    setMode("view");
    setActiveId(item.id);
    setForm({
      name_en: item.translations.en.name || "",
      description_en: item.translations.en.description || "",
      name_am: item.translations.am.name || "",
      description_am: item.translations.am.description || "",
      name_or: item.translations.or.name || "",
      description_or: item.translations.or.description || "",
      type: item.type || "Hotel",
      location: item.location || "",
      rating: item.rating || 0,
      pricePerNight: item.pricePerNight || 0,
      image: item.image || "",
      imageFile: null,
      amenitiesText: item.amenities?.join(", ") || "",
      bookingUrl: item.bookingUrl || "",
      status: item.status || "Draft",
    });
    setDialogOpen(true);
  }

  function resetForm() {
    setForm({
      name_en: "",
      description_en: "",
      name_am: "",
      description_am: "",
      name_or: "",
      description_or: "",
      type: "Hotel",
      location: "",
      rating: 0,
      pricePerNight: 0,
      image: "",
      imageFile: null,
      amenitiesText: "",
      bookingUrl: "",
      status: "Draft",
    });
    setActiveId(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (mode === "view") return;

    const payload = {
      name_en: form.name_en,
      description_en: form.description_en,
      name_am: form.name_am,
      description_am: form.description_am,
      name_or: form.name_or,
      description_or: form.description_or,
      type: form.type,
      location: form.location,
      rating: form.rating,
      pricePerNight: form.pricePerNight,
      image: form.image,
      amenitiesText: form.amenitiesText,
      bookingUrl: form.bookingUrl,
      status: form.status,
    };

    if (!payload.name_en.trim() || !payload.location.trim()) {
      // TODO: Show validation error toast/notification
      return;
    }

    if (mode === "add") {
      addAccommodation(payload);
      resetDialog();
      return;
    }

    if (mode === "edit" && activeId) {
      updateAccommodation(activeId, payload);
      resetDialog();
    }
  }

  function resetDialog() {
    setDialogOpen(false);
    resetForm();
  }

  // Constants
  const types = ["Hotel", "Resort", "Guest House", "Lodge"];
  const statuses = ["Published", "Draft"];

  const dialogTitle = (() => {
    if (mode === "add") return "Add Accommodation";
    if (mode === "edit") return "Edit Accommodation";
    return "Accommodation Details";
  })();

  const dialogDescription = (() => {
    if (mode === "add") return "Create a new accommodation with multi-language support.";
    if (mode === "edit") return "Update accommodation information and translations.";
    return "View accommodation details.";
  })();

  const readOnly = mode === "view";

  return (
    <section className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Accommodations</h1>
          <p className="text-muted-foreground">
            Manage hotels, resorts, guest houses, and lodges with multi-language support
          </p>
        </div>
        <Button className="gap-2" onClick={openAdd}>
          <Plus className="w-4 h-4" />
          Add Accommodation
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search accommodations (name, location, type)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-card p-4 rounded-lg border space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">{accommodations.length}</p>
            </div>
            <Hotel className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Published</p>
              <p className="text-2xl font-bold">
                {accommodations.filter(item => item.status === 'Published').length}
              </p>
            </div>
            <Star className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Draft</p>
              <p className="text-2xl font-bold">
                {accommodations.filter(item => item.status === 'Draft').length}
              </p>
            </div>
            <MapPin className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
              <p className="text-2xl font-bold">
                {accommodations.length > 0 
                  ? (accommodations.reduce((sum, item) => sum + item.rating, 0) / accommodations.length).toFixed(1)
                  : '0'
                }
              </p>
            </div>
            <Star className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-8">
          <p>Loading accommodations...</p>
        </div>
      ) : (
        <>
          {/* Table for Desktop */}
          <div className="bg-card rounded-xl shadow-card overflow-hidden hidden md:block">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">
                Accommodation List ({filteredAccommodations.length} items)
              </h2>
            </div>

            <div className="p-6 overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="text-left text-sm text-muted-foreground">
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Location</th>
                    <th className="pb-3 font-medium">Price / Night</th>
                    <th className="pb-3 font-medium">Rating</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredAccommodations.map((item) => (
                    <tr key={item.id}>
                      <td className="py-4 font-medium text-foreground">
                        {item.translations.en.name}
                      </td>
                      <td className="py-4 text-sm text-muted-foreground">
                        {item.type}
                      </td>
                      <td className="py-4 text-sm text-muted-foreground">
                        {item.location}
                      </td>
                      <td className="py-4 text-sm text-muted-foreground">
                        ${item.pricePerNight}
                      </td>
                      <td className="py-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{item.rating}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span
                          className={cn(
                            "text-xs px-2 py-1 rounded-full",
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
                            <Eye className="w-4 h-4 text-muted-foreground" />
                          </Button>

                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => openEdit(item)}
                            aria-label={`Edit ${item.translations.en.name}`}
                          >
                            <Pencil className="w-4 h-4 text-muted-foreground" />
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                aria-label={`Delete ${item.translations.en.name}`}
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete accommodation?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will remove{" "}
                                  <b>{item.translations.en.name}</b> from the list.
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteAccommodation(item.id)}
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

                  {filteredAccommodations.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-10 text-center text-sm text-muted-foreground"
                      >
                        {searchQuery || selectedType !== "all" || selectedStatus !== "all"
                          ? "No accommodations found matching your criteria."
                          : "No accommodations yet. Click 'Add Accommodation' to create one."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cards for Mobile */}
          <div className="md:hidden space-y-4">
            {filteredAccommodations.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-xl border p-4 shadow-sm"
              >
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
                
                <div className="space-y-1 mb-3">
                  <p className="text-sm text-muted-foreground">Type: {item.type}</p>
                  <p className="text-sm text-muted-foreground">Location: {item.location}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Price: ${item.pricePerNight}/night
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm">{item.rating}</span>
                    </div>
                  </div>
                </div>
                
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
                        <AlertDialogTitle>Delete accommodation?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will remove <b>{item.translations.en.name}</b> from
                          the list. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteAccommodation(item.id)}
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

            {filteredAccommodations.length === 0 && (
              <div className="text-center py-8 text-sm text-muted-foreground">
                {searchQuery || selectedType !== "all" || selectedStatus !== "all"
                  ? "No accommodations found matching your criteria."
                  : "No accommodations yet. Click 'Add Accommodation' to create one."}
              </div>
            )}
          </div>
        </>
      )}

      {/* Add/Edit/View Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(v) => {
          setDialogOpen(v);
          if (!v) resetDialog();
        }}
      >
        <DialogContent className="w-full max-w-sm sm:max-w-[520px] p-4 max-h-[90vh] overflow-y-auto">
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
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={form.type}
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, type: value }))
                    }
                    disabled={readOnly}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
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
                      {statuses.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* ===== Price & Rating ===== */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Price & Rating</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Price per Night (USD)</Label>
                  <Input
                    id="price"
                    type="number"
                    min={0}
                    value={form.pricePerNight}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        pricePerNight: Number(e.target.value) || 0,
                      }))
                    }
                    disabled={readOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    type="number"
                    min={0}
                    max={5}
                    step={0.1}
                    value={form.rating}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        rating: Number(e.target.value) || 0,
                      }))
                    }
                    disabled={readOnly}
                  />
                </div>
              </div>
            </section>

            {/* ===== Images ===== */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Images</h2>
              <div className="space-y-2">
                <Label htmlFor="image">Upload Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setForm((prev) => ({ ...prev, imageFile: file }));
                  }}
                  disabled={readOnly}
                />
                {form.imageFile && (
                  <img
                    src={URL.createObjectURL(form.imageFile)}
                    alt="Preview"
                    className="mt-2 h-32 w-full object-cover rounded-md"
                  />
                )}
              </div>
            </section>

            {/* ===== Location ===== */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Location</h2>
              <Input
                id="location"
                value={form.location}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, location: e.target.value }))
                }
                placeholder="Bishoftu / Lake Bishoftu"
                disabled={readOnly}
              />
            </section>

            {/* ===== English Content ===== */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">English Content</h2>
              <div className="space-y-2">
                <Label htmlFor="name_en">Title</Label>
                <Input
                  id="name_en"
                  value={form.name_en}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name_en: e.target.value }))
                  }
                  placeholder="Bishoftu Luxury Resort"
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
                  placeholder="Premium resort with world-class amenities..."
                  disabled={readOnly}
                />
              </div>
            </section>

            {/* ===== Amharic Content ===== */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Amharic Content</h2>
              <div className="space-y-2">
                <Label htmlFor="name_am">Title</Label>
                <Input
                  id="name_am"
                  value={form.name_am}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name_am: e.target.value }))
                  }
                  placeholder="ቢሾፍቱ የቅንጦት ሪዞርት"
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
                  placeholder="የዓለም ደረጃ አገልግሎቶች..."
                  disabled={readOnly}
                />
              </div>
            </section>

            {/* ===== Oromo Content ===== */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">Oromo Content</h2>
              <div className="space-y-2">
                <Label htmlFor="name_om">Title</Label>
                <Input
                  id="name_om"
                  value={form.name_om}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name_om: e.target.value }))
                  }
                  placeholder="Bishooftuu Luxury Resort"
                  disabled={readOnly}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description_om">Description</Label>
                <Textarea
                  id="description_om"
                  value={form.description_om}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description_om: e.target.value,
                    }))
                  }
                  placeholder="Resortii sadarkaa addunyaa kan tajaajila gaarii..."
                  disabled={readOnly}
                />
              </div>
            </section>

            {/* ===== Footer Buttons ===== */}
            <div className="flex justify-end gap-3 mt-4">
              <Button type="button" variant="outline" onClick={resetDialog}>
                {readOnly ? "Close" : "Cancel"}
              </Button>
              {!readOnly && <Button type="submit">Save</Button>}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
