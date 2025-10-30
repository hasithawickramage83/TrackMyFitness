import { useState } from "react";
import { Activity } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Dumbbell, Clock } from "lucide-react";
import { format } from "date-fns";

interface ActivityCardProps {
  activity: Activity;
  onEdit: (activity: Activity) => void;
  onDelete: (id: number) => void;
}

const getStatusVariant = (status: Activity["status"]) => {
  switch (status) {
    case "planned":
      return "warning";
    case "in progress":
      return "default";
    case "completed":
      return "success";
    default:
      return "outline";
  }
};

const activityIcons: Record<string, any> = {
  Workout: Dumbbell,
  Walking: Clock,
  Swimming: Clock,
  Running: Clock,
  Cycling: Clock,
};

export const ActivityCard = ({ activity, onEdit, onDelete }: ActivityCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(activity.id);
  };

  const Icon = activityIcons[activity.activity_type] || Dumbbell;

  return (
    <Card className="group hover:border-primary/50 transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="p-2 rounded-lg bg-accent">
              <Icon className="h-5 w-5 text-accent-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-1">{activity.activity_type}</h3>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={getStatusVariant(activity.status)}>
                  {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(activity.timestamp), "MMM dd, yyyy 'at' h:mm a")}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" onClick={() => onEdit(activity)} disabled={isDeleting}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDelete} disabled={isDeleting}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
