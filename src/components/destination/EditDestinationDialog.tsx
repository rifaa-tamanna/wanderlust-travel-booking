"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { PencilLine, Save } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useRouter } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const CATEGORIES = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
  "Wildlife",
] as const;

type Category = (typeof CATEGORIES)[number];

type TravelPackage = {
  name: string;
  country: string;
  category: Category;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};

// Shared field styling: soft gray fill, square corners, cyan focus — matches
// the rest of the site's forms (add-destination page).
const FIELD_CLASS =
  "h-10 rounded-none border-neutral-200 bg-neutral-100 text-neutral-800 shadow-none focus-visible:border-[#00a6c0] focus-visible:ring-[#00a6c0]/25";
const LABEL_CLASS = "text-sm font-medium text-neutral-900 mb-2 block";

function FieldLabel({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor: string;
}) {
  return (
    <Label htmlFor={htmlFor} className={LABEL_CLASS}>
      {children}
    </Label>
  );
}

type EditDestinationDialogProps = {
  destinationId: string;
};

export function EditDestinationDialog({
  destinationId,
}: EditDestinationDialogProps) {
  const [formData, setFormData] = useState<TravelPackage | null>(null);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load existing destination data every time the dialog opens.
  const loadDestination = async () => {
    setFetching(true);
    setError("");
    setSuccess("");

    // Token Access ( lib er vitor token access function execute kora ache )
    const token = await getTokenFromClient()

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL}/destinations/${destinationId}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        },
      );

      if (!res.ok) {
        throw new Error("Failed to load destination.");
      }

      const data = await res.json();
      const destination = data.destination ?? data;

      setFormData({
        name: destination.name ?? "",
        country: destination.country ?? "",
        category: CATEGORIES.includes(destination.category)
          ? destination.category
          : "Beach",
        price: String(destination.price ?? ""),
        duration: destination.duration ?? "",
        departureDate: destination.departureDate
          ? String(destination.departureDate).slice(0, 10)
          : "",
        imageUrl: destination.imageUrl ?? "",
        description: destination.description ?? "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setFetching(false);
    }
  };

  // Handle input changes.
  const update = (field: keyof TravelPackage) => {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => prev && { ...prev, [field]: event.target.value });
    };
  };

  // Persist changes with PATCH.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData || loading) return;

    setLoading(true);
    setError("");
    setSuccess("");

    // Token Access ( lib er vitor token access function execute kora ache )
    const token = await getTokenFromClient()

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_URL}/destinations/${destinationId}`,
        {
          method: "PATCH",
          headers: { 
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            ...formData,
            price: Number(formData.price),
          }),
        },
      );

      const data = await res.json();
      if (data.modifiedCount > 0) {
        console.log("User deleted successfully");
        router.refresh();
      }

      console.log("data", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to update destination.");
      }

      setSuccess("Destination updated successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) {
          void loadDestination();
        } else {
          setError("");
          setSuccess("");
        }
      }}
    >
      <DialogTrigger
        render={
          <Button
            title="Edit destination"
            className="h-10 rounded-md border border-neutral-300 bg-white px-5 text-sm text-neutral-700 hover:bg-neutral-100"
          />
        }
      >
        <PencilLine />
        Edit
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] w-full overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Destination</DialogTitle>
          <DialogDescription>
            Update the travel package details, then save your changes.
          </DialogDescription>
        </DialogHeader>

        {fetching ? (
          <p className="py-8 text-center text-sm text-neutral-500">
            Loading destination...
          </p>
        ) : !formData ? (
          error ? (
            <p role="alert" className="py-8 text-center text-sm text-red-600">
              {error}
            </p>
          ) : null
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Destination Name */}
            <div>
              <FieldLabel htmlFor="edit-name">Destination Name</FieldLabel>
              <Input
                id="edit-name"
                required
                value={formData.name}
                onChange={update("name")}
                placeholder="Bali Paradise"
                className={FIELD_CLASS}
              />
            </div>

            {/* Country + Category */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <FieldLabel htmlFor="edit-country">Country</FieldLabel>
                <Input
                  id="edit-country"
                  required
                  value={formData.country}
                  onChange={update("country")}
                  placeholder="Indonesia"
                  className={FIELD_CLASS}
                />
              </div>
              <div>
                <FieldLabel htmlFor="edit-category">Category</FieldLabel>
                <Select
                  value={formData.category}
                  onValueChange={(value) => {
                    setFormData(
                      (prev) =>
                        prev && {
                          ...prev,
                          category: (value ?? "Beach") as Category,
                        },
                    );
                  }}
                >
                  <SelectTrigger
                    id="edit-category"
                    className={`${FIELD_CLASS} w-full`}
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price + Duration */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <FieldLabel htmlFor="edit-price">Price (USD)</FieldLabel>
                <Input
                  id="edit-price"
                  required
                  type="number"
                  min="0"
                  step="any"
                  value={formData.price}
                  onChange={update("price")}
                  placeholder="e.g., 1299"
                  className={FIELD_CLASS}
                />
              </div>
              <div>
                <FieldLabel htmlFor="edit-duration">Duration</FieldLabel>
                <Input
                  id="edit-duration"
                  required
                  value={formData.duration}
                  onChange={update("duration")}
                  placeholder="e.g., 7 Days/6 Nights"
                  className={FIELD_CLASS}
                />
              </div>
            </div>

            {/* Departure Date */}
            <div>
              <FieldLabel htmlFor="edit-departureDate">
                Departure Date
              </FieldLabel>
              <Input
                id="edit-departureDate"
                required
                type="date"
                value={formData.departureDate}
                onChange={update("departureDate")}
                className={FIELD_CLASS}
              />
            </div>

            {/* Image URL */}
            <div>
              <FieldLabel htmlFor="edit-imageUrl">Image URL</FieldLabel>
              <Input
                id="edit-imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={update("imageUrl")}
                placeholder="https://example.com/image.jpg"
                className={FIELD_CLASS}
              />
            </div>

            {/* Description */}
            <div>
              <FieldLabel htmlFor="edit-description">Description</FieldLabel>
              <Textarea
                id="edit-description"
                required
                rows={5}
                value={formData.description}
                onChange={update("description")}
                placeholder="Describe the travel experience..."
                className="min-h-32 rounded-none border-neutral-200 bg-neutral-100 text-neutral-800 shadow-none focus-visible:border-[#00a6c0] focus-visible:ring-[#00a6c0]/25"
              />
            </div>

            {/* Status messages */}
            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}
            {success && (
              <p role="status" className="text-sm text-[#00a6c0]">
                {success}
              </p>
            )}

            {/* Actions */}
            <DialogFooter className="gap-3 border-t pt-5">
              <DialogClose
                render={
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-md"
                  />
                }
              >
                Cancel
              </DialogClose>
              <DialogClose
                render={
                  <Button
                    type="submit"
                    disabled={loading || fetching || !formData}
                    className="rounded-none bg-[#00a6c0] text-white hover:bg-[#0090aa]"
                  >
                    <Save />
                    {loading ? "Updating..." : "Update Destination"}
                  </Button>
                }
              >
                Cancel
              </DialogClose>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EditDestinationDialog;
