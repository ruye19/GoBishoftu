"use client";

import { useState } from "react";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
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
  const [accommodations, setAccommodations] = useState(() => initialData);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [mode, setMode] = useState(
    /** @type {"add" | "edit" | "view"} */ ("add"),
  );
  const [activeId, setActiveId] = useState(/** @type {string | null} */ (null));

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

  function openAdd() {
    setMode("add");
    setActiveId(null);
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
    setDialogOpen(true);
  }

  /** @param {Accommodation} accommodation */
  function openEdit(accommodation) {
    setMode("edit");
    setActiveId(accommodation.id);
    setForm({
      name_en: accommodation.translations.en?.name ?? "",
      description_en: accommodation.translations.en?.description ?? "",
      name_am: accommodation.translations.am?.name ?? "",
      description_am: accommodation.translations.am?.description ?? "",
      name_om: accommodation.translations.or?.name ?? "", // or: .or?
      description_om: accommodation.translations.or?.description ?? "",
      type: accommodation.type ?? "Hotel",
      location: accommodation.location ?? "",
      rating: accommodation.rating ?? 0,
      pricePerNight: accommodation.pricePerNight ?? 0,
      image: accommodation.image ?? "",
      amenitiesText: accommodation.amenities?.join(", ") ?? "",
      bookingUrl: accommodation.bookingUrl ?? "",
      status: accommodation.status ?? "Draft",
    });

    setDialogOpen(true);
  }

  function openView(accommodation) {
    setMode("view");
    setActiveId(accommodation.id);
    setForm({
      name_en: accommodation.translations.en?.name ?? "",
      description_en: accommodation.translations.en?.description ?? "",
      name_am: accommodation.translations.am?.name ?? "",
      description_am: accommodation.translations.am?.description ?? "",
      name_om: accommodation.translations.or?.name ?? "", // or: .or?
      description_om: accommodation.translations.or?.description ?? "",
      type: accommodation.type ?? "Hotel",
      location: accommodation.location ?? "",
      rating: accommodation.rating ?? 0,
      pricePerNight: accommodation.pricePerNight ?? 0,
      image: accommodation.image ?? "",
      amenitiesText: accommodation.amenities?.join(", ") ?? "",
      bookingUrl: accommodation.bookingUrl ?? "",
      status: accommodation.status ?? "Draft",
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
        type: next.type,
        location: next.location.trim(),
        rating: next.rating,
        pricePerNight: next.pricePerNight,
        image: next.image.trim(),
        status: next.status,
        bookingUrl: next.bookingUrl.trim(),
        amenities,
        updatedAtISO: new Date().toISOString(),
        translations: {
          en: {
            name: next.name_en.trim(),
            description: next.description_en.trim(),
          },
          am: {
            name: next.name_am.trim(),
            description: next.description_am.trim(),
          },
          or: {
            name: next.name_or.trim(),
            description: next.description_or.trim(),
          },
        },
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
              type: next.type,
              location: next.location.trim(),
              rating: next.rating,
              pricePerNight: next.pricePerNight,
              image: next.image.trim(),
              status: next.status,
              bookingUrl: next.bookingUrl.trim(),
              amenities,
              updatedAtISO: new Date().toISOString(),
              translations: {
                en: {
                  name: next.name_en.trim(),
                  description: next.description_en.trim(),
                },
                am: {
                  name: next.name_am.trim(),
                  description: next.description_am.trim(),
                },
                or: {
                  name: next.name_or.trim(),
                  description: next.description_or.trim(),
                },
              },
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

        {/* Scrollable container */}
        {/* Table for Desktop */}
        <div className="hidden md:block p-6 overflow-x-auto">
          <table className="w-full min-w-[700px]">
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
                    {/* the break point */}
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
                              This is a mock UI action (local state only).
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

      {/* Cards for Mobile */}
      <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 max-w-full">
        {accommodations.map((item) => (
          <div
            key={item.id}
            className="border border-border rounded-xl p-4 shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
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
            <p className="text-sm text-muted-foreground">Type: {item.type}</p>
            <p className="text-sm text-muted-foreground">
              Location: {item.location}
            </p>
            <p className="text-sm text-muted-foreground">
              Price / Night: ${item.pricePerNight}
            </p>
            <div className="flex justify-end gap-2 mt-2">
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
                      the list. This is a mock UI action (local state only).
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
      </div>

      {/* Add/Edit Dialog */}
      {/* Add/Edit Dialog */}
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
                      {["Hotel", "Guest House", "Resort", "Lodge"].map((t) => (
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
                      {STATUS_OPTIONS.map((s) => (
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
