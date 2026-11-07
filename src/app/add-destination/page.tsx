"use client";

import React, { useState } from "react";
import { Save, Trash2 } from "lucide-react";

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

const emptyPackage: TravelPackage = {
  name: "",
  country: "",
  category: "Beach",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

// Shared field styling: soft gray fill, square corners, cyan focus, per mockup.
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

export default function AddDestinationPage() {
  const [formData, setFormData] = useState<TravelPackage>(emptyPackage); 
  const [submitted, setSubmitted] = useState(false);

  const update =
    (field: keyof TravelPackage) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement
      >,
    ) =>
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setFormData(emptyPackage);

    // Token Access kora ( lib folder er vitor function execute kora ache )
    const token = await getTokenFromClient()

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/add-destination`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    })

    const result = await res.json();
    // console.log('data', data)
  };



  return (
    <main className="bg-white px-4 pt-12 pb-20 md:px-12">
      <h1 className="font-display text-center text-4xl font-medium text-neutral-900 md:text-[44px]">
        Add New Travel Package
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-10 max-w-2xl border border-neutral-200 bg-white p-6 md:p-8"
      >
        {/* Destination Name */}
        <div>
          <FieldLabel htmlFor="name">Destination Name</FieldLabel>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={update("name")}
            placeholder="Bali Paradise"
            className={FIELD_CLASS}
          />
        </div>

        {/* Country + Category */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <FieldLabel htmlFor="country">Country</FieldLabel>
            <Input
              id="country"
              required
              value={formData.country}
              onChange={update("country")}
              placeholder="Indonesia"
              className={FIELD_CLASS}
            />
          </div>
          <div>
            <FieldLabel htmlFor="category">Category</FieldLabel>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  category: (value ?? "Beach") as Category,
                }))
              }
            >
              <SelectTrigger
                id="category"
                className={`${FIELD_CLASS} w-full`}
              >
                <SelectValue placeholder="Beach" />
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
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <FieldLabel htmlFor="price">Price (USD)</FieldLabel>
            <Input
              id="price"
              required
              type="number"
              min="0"
              value={formData.price}
              onChange={update("price")}
              placeholder="e.g., 1299"
              className={FIELD_CLASS}
            />
          </div>
          <div>
            <FieldLabel htmlFor="duration">Duration</FieldLabel>
            <Input
              id="duration"
              required
              value={formData.duration}
              onChange={update("duration")}
              placeholder="e.g., 7 Days/6 Nights"
              className={FIELD_CLASS}
            />
          </div>
        </div>

        {/* Departure Date */}
        <div className="mt-5">
          <FieldLabel htmlFor="departureDate">Departure Date</FieldLabel>
          <Input
            id="departureDate"
            required
            type="date"
            value={formData.departureDate}
            onChange={update("departureDate")}
            className={FIELD_CLASS}
          />
        </div>

        {/* Image URL */}
        <div className="mt-5">
          <FieldLabel htmlFor="imageUrl">Image URL</FieldLabel>
          <Input
            id="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={update("imageUrl")}
            placeholder="https://example.com/image.jpg"
            className={FIELD_CLASS}
          />
        </div>

        {/* Description */}
        <div className="mt-5">
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            id="description"
            required
            rows={5}
            value={formData.description}
            onChange={update("description")}
            placeholder="Describe the travel experience..."
            className="min-h-32 rounded-none border-neutral-200 bg-neutral-100 text-neutral-800 shadow-none focus-visible:border-[#00a6c0] focus-visible:ring-[#00a6c0]/25"
          />
        </div>

        {/* Actions */}
        <div className="mt-8 flex items-center justify-end gap-4">
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              setFormData(emptyPackage);
              setSubmitted(false);
            }}
            className="h-11 rounded-none border border-red-500 bg-white px-6 text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 />
            Cancel
          </Button>
          <Button
            type="submit"
            className="h-11 rounded-none bg-[#00a6c0] px-6 text-white hover:bg-[#0090aa]"
          >
            <Save />
            Add Travel Package
          </Button>
        </div>

        {submitted && (
          <p
            className="mt-4 text-right text-sm"
            role="status"
          >
            <span className="text-[#00a6c0]">
              Travel package added — check the console for the payload.
            </span>
          </p>
        )}
      </form>
    </main>
  );
}
