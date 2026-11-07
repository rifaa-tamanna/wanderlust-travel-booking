"use client";

import EditDestinationDialog from "@/components/destination/EditDestinationDialog";
import { DeleteDestinationDialog } from "@/components/destination/DeleteDestinationDialog";

export function DestinationActions({
  destinationId,
  destinationName,
}: {
  destinationId: string;
  destinationName?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <EditDestinationDialog destinationId={destinationId} />
      <DeleteDestinationDialog id={destinationId} destinationName={destinationName} />
    </div>
  );
}
