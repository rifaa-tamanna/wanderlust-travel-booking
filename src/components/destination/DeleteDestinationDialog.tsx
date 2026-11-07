"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

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
import { Button } from "@/components/ui/button";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

type DeleteDestinationDialogProps = {
  id: string;
  destinationName?: string;
};

export function DeleteDestinationDialog({
  id,
  destinationName,
}: DeleteDestinationDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDeleteDestination = async () => {
    setDeleting(true);
    setError("");

    // Token Access ( lib er vitor token access function execute kora ache )
    const token = await getTokenFromClient()

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/destinations/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error(`Failed to delete destination (${res.status}).`);
      }

      setOpen(false);
      router.push("/destinations");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="outline"
            title="Delete destination"
            className="h-10 rounded-md border-red-500 bg-white px-5 text-sm text-red-500 hover:bg-red-50 hover:text-red-600"
          />
        }
      >
        <Trash2 />
        Delete
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this destination?</AlertDialogTitle>
          <AlertDialogDescription>
            {destinationName
              ? `"${destinationName}" will be permanently deleted from our servers. This action cannot be undone.`
              : "This destination will be permanently deleted from our servers. This action cannot be undone."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={deleting}
            onClick={handleDeleteDestination}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            {deleting ? "Deleting..." : "Yes, delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteDestinationDialog;
