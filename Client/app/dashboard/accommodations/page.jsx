"use client";

import { useState } from "react";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";

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
 * @property {string} name
 * @property {string} type
 * @property {string} location
 * @property {number} rating
 * @property {number} pricePerNight
 * @property {string} image
 * @property {string} description
 * @property {string[]} amenities
 * @property {string} bookingUrl
 * @property {AccommodationStatus} status
 * @property {string} updatedAtISO
 */

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
  /** @type {[Accommodation[], Function]} */
  const [accommodations, setAccommodations] = useState(() => [
    {
      id: createId(),
      name: "Bishoftu Luxury Resort",
      type: "Resort",
      rating: 4.8,
      pricePerNight: 250,
      image: "/lake bishoftu.jpg",
      description:
        "Premium resort with world-class amenities and stunning views of the Rift Valley.",
      amenities: ["Pool", "Spa", "WiFi", "Restaurant", "Gym"],
      bookingUrl: "https://www.booking.com",
      location: "Bishoftu",
      status: "Published",
      updatedAtISO: new Date().toISOString(),
    },
    {
      id: createId(),
      name: "Bishoftu Luxury Hotel",
      type: "Hotel",
      rating: 4.4,
      pricePerNight: 80,
      image: "/ivy.jpg",
      description:
        "Welcoming guest house with local charm and warm hospitality.",
      amenities: ["WiFi", "Breakfast", "Parking", "Garden"],
      bookingUrl: "https://www.booking.com",
      location: "Bishoftu",
      status: "Published",
      updatedAtISO: new Date().toISOString(),
    },
    {
      id: createId(),
      name: "Kuriftu Resort & Spa",
      type: "Resort",
      rating: 4.6,
      pricePerNight: 180,
      image: "/kuriftu resort.jpg",
      description:
        "Eco-friendly lodge perfect for explorers seeking authentic experiences.",
      amenities: ["WiFi", "Restaurant", "Tour Desk", "Garden", "Parking"],
      bookingUrl: "https://www.booking.com",
      location: "Bishoftu",
      status: "Published",
      updatedAtISO: new Date().toISOString(),
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState(
    /** @type {"add" | "edit" | "view"} */ ("add"),
  );
  const [activeId, setActiveId] = useState(/** @type {string | null} */ (null));

  const [form, setForm] = useState({
    name: "",
    type: "Hotel",
    location: "",
    rating: 0,
    pricePerNight: 0,
    image: "",
    description: "",
    amenitiesText: "",
    bookingUrl: "",
    status: /** @type {AccommodationStatus} */ ("Draft"),
  });

  function openAdd() {
    setMode("add");
    setActiveId(null);
    setForm({
      name: "",
      type: "Hotel",
      location: "",
      rating: 0,
      pricePerNight: 0,
      image: "",
      description: "",
      amenitiesText: "",
      bookingUrl: "",
      status: "Draft",
    });
    setDialogOpen(true);
  }

  /** @param {Accommodation} accommodation */
  function openEdit(accommodation) {
    setMode("edit");
    setActiveId(accommodation.id);
    setForm({
      name: accommodation.name,
      type: accommodation.type,
      location: accommodation.location,
      rating: accommodation.rating,
      pricePerNight: accommodation.pricePerNight,
      image: accommodation.image,
      description: accommodation.description,
      amenitiesText: accommodation.amenities.join(", "),
      bookingUrl: accommodation.bookingUrl,
      status: accommodation.status,
    });
    setDialogOpen(true);
  }

  /** @param {Accommodation} accommodation */
  function openView(accommodation) {
    setMode("view");
    setActiveId(accommodation.id);
    setForm({
      name: accommodation.name,
      location: accommodation.location,
      type: accommodation.type,
      rating: accommodation.rating,
      pricePerNight: accommodation.pricePerNight,
      image: accommodation.image,
      description: accommodation.description,
      amenitiesText: accommodation.amenities.join(", "),
      bookingUrl: accommodation.bookingUrl,
      status: accommodation.status,
    });
    setDialogOpen(true);
  }

  function resetDialog() {
    setDialogOpen(false);
    setActiveId(null);
    setMode("add");
    setForm({
      name: "",
      type: "Hotel",
      location: "",
      rating: 0,
      pricePerNight: 0,
      image: "",
      description: "",
      amenitiesText: "",
      bookingUrl: "",
      status: "Draft",
    });
  }

  /**
   * These functions are intentionally small and isolated so swapping them
   * with backend API calls later is straightforward.
   */
  function addAccommodation(next) {
    const amenities =
      next.amenitiesText
        ?.split(",")
        .map((a) => a.trim())
        .filter(Boolean) ?? [];

    setAccommodations((prev) => [
      {
        id: createId(),
        name: next.name.trim(),
        type: next.type,
        location: next.location.trim(),
        rating: next.rating,
        pricePerNight: next.pricePerNight,
        image: next.image,
        description: next.description.trim(),
        amenities,
        bookingUrl: next.bookingUrl.trim(),
        status: next.status,
        updatedAtISO: new Date().toISOString(),
      },
      ...prev,
    ]);
  }

  function updateAccommodation(id, next) {
    const amenities =
      next.amenitiesText
        ?.split(",")
        .map((a) => a.trim())
        .filter(Boolean) ?? [];

    setAccommodations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              name: next.name.trim(),
              type: next.type,
              location: next.location.trim(),
              rating: next.rating,
              pricePerNight: next.pricePerNight,
              image: next.image,
              description: next.description.trim(),
              amenities,
              bookingUrl: next.bookingUrl.trim(),
              status: next.status,
              updatedAtISO: new Date().toISOString(),
            }
          : item,
      ),
    );
  }

  function deleteAccommodation(id) {
    setAccommodations((prev) => prev.filter((item) => item.id !== id));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (mode === "view") return;

    const payload = {
      name: form.name,
      type: form.type,
      location: form.location,
      rating: form.rating,
      pricePerNight: form.pricePerNight,
      image: form.image,
      description: form.description,
      amenitiesText: form.amenitiesText,
      bookingUrl: form.bookingUrl,
      status: form.status,
    };

    if (!payload.name.trim() || !payload.location.trim()) return;

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

  const dialogTitle = (() => {
    if (mode === "add") return "Add Accommodation";
    if (mode === "edit") return "Edit Accommodation";
    return "Accommodation Details";
  })();

  const dialogDescription = (() => {
    if (mode === "add") return "Create a new accommodation entry (mock).";
    if (mode === "edit") return "Update the accommodation details (mock).";
    return "Preview how this listing looks in the admin system (mock).";
  })();

  const readOnly = mode === "view";

  return (
    <section className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Accommodations</h1>
          <p className="text-muted-foreground">
            Manage the same accommodations visitors see on the public site.
          </p>
        </div>

        <Button className="gap-2" onClick={openAdd}>
          <Plus className="w-4 h-4" />
          Add Accommodation
        </Button>
      </div>

      {/* Table/Card */}
      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">
            Accommodation List
          </h2>
          <p className="text-sm text-muted-foreground">
            {accommodations.length} item{accommodations.length === 1 ? "" : "s"}
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
                  <th className="pb-3 font-medium">Price / Night</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {accommodations.map((item) => (
                  <tr key={item.id} className="align-middle">
                    <td className="py-4 font-medium text-foreground">
                      {item.name}
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
                          aria-label={`View ${item.name}`}
                        >
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(item)}
                          aria-label={`Edit ${item.name}`}
                        >
                          <Pencil className="w-4 h-4 text-muted-foreground" />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              aria-label={`Delete ${item.name}`}
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
                                This will remove <b>{item.name}</b> from the
                                list. This is a mock UI action (local state
                                only).
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

                {accommodations.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-10 text-center text-sm text-muted-foreground"
                    >
                      No accommodations yet. Click “Add Accommodation” to create
                      one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(v) => {
          setDialogOpen(v);
          if (!v) resetDialog();
        }}
      >
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Basic info */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Accommodation Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g. Kuriftu Resort & Spa"
                  autoFocus={!readOnly}
                  disabled={readOnly}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, location: e.target.value }))
                  }
                  placeholder="e.g. Bishoftu / Lake Bishoftu"
                  disabled={readOnly}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>Type</Label>
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
                    {["Hotel", "Guest House", "Resort", "Lodge"].map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

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

            {/* Media & links */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={form.image}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, image: e.target.value }))
                  }
                  placeholder="/lake-bishoftu.jpg"
                  disabled={readOnly}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bookingUrl">Booking Link</Label>
                <Input
                  id="bookingUrl"
                  value={form.bookingUrl}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      bookingUrl: e.target.value,
                    }))
                  }
                  placeholder="https://www.booking.com/..."
                  disabled={readOnly}
                />
              </div>
            </div>

            {/* Description & amenities */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Short description visitors will see."
                disabled={readOnly}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amenities">Services / Amenities</Label>
              <Input
                id="amenities"
                value={form.amenitiesText}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    amenitiesText: e.target.value,
                  }))
                }
                placeholder="Pool, WiFi, Restaurant, Spa..."
                disabled={readOnly}
              />
              <p className="text-xs text-muted-foreground">
                Separate items with commas. These map to the badges on the
                public accommodations page.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    status: /** @type {AccommodationStatus} */ (value),
                  }))
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

            <DialogFooter className="gap-2 sm:gap-0">
              <Button type="button" variant="outline" onClick={resetDialog}>
                {readOnly ? "Close" : "Cancel"}
              </Button>
              {!readOnly && (
                <Button
                  type="submit"
                  disabled={!form.name.trim() || !form.location.trim()}
                >
                  {mode === "add" ? "Add Accommodation" : "Save Changes"}
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
