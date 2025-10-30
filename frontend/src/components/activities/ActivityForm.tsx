import { useState, useEffect } from "react";
import { Activity } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ActivityFormProps {
  activity?: Activity | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { activity_type: string; status: Activity["status"] }) => void;
  isLoading: boolean;
}

const activityTypes = ["Workout", "Walking", "Swimming", "Running", "Cycling", "Yoga", "Other"];
const statusOptions: Activity["status"][] = ["planned", "in progress", "completed"];

export const ActivityForm = ({ activity, isOpen, onClose, onSubmit, isLoading }: ActivityFormProps) => {
  const [activityType, setActivityType] = useState("");
  const [status, setStatus] = useState<Activity["status"]>("planned");

  useEffect(() => {
    if (activity) {
      setActivityType(activity.activity_type);
      setStatus(activity.status);
    } else {
      setActivityType("");
      setStatus("planned");
    }
  }, [activity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ activity_type: activityType, status });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{activity ? "Edit Activity" : "Add New Activity"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="activity_type">Activity Type</Label>
            <Select value={activityType} onValueChange={setActivityType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select activity type" />
              </SelectTrigger>
              <SelectContent>
                {activityTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value) => setStatus(value as Activity["status"])} required>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1" disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? "Saving..." : activity ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
