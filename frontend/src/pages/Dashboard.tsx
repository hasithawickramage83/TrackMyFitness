import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { Activity } from "@/types";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { ActivityForm } from "@/components/activities/ActivityForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, LogOut, Filter, Activity as ActivityIcon } from "lucide-react";

const Dashboard = () => {
  const { user, token, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusFilter, setStatusFilter] = useState<Activity["status"] | "all">("all");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (token) {
      fetchActivities();
    }
  }, [token]);

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredActivities(activities);
    } else {
      setFilteredActivities(activities.filter((a) => a.status === statusFilter));
    }
  }, [statusFilter, activities]);

  const fetchActivities = async () => {
    if (!token) return;
    try {
      const data = await api.activities.getAll(token);
      setActivities(data);
      setFilteredActivities(data);
    } catch (error) {
      toast.error("Failed to fetch activities");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddActivity = () => {
    setEditingActivity(null);
    setIsFormOpen(true);
  };

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity);
    setIsFormOpen(true);
  };

  const handleDeleteActivity = async (id: number) => {
    if (!token) return;
    try {
      await api.activities.delete(token, id);
      setActivities(activities.filter((a) => a.id !== id));
      toast.success("Activity deleted successfully");
    } catch (error) {
      toast.error("Failed to delete activity");
    }
  };

  const handleSubmitActivity = async (data: { activity_type: string; status: Activity["status"] }) => {
    if (!token || !user) return;
    setIsSubmitting(true);

    try {
      const payload = {
        user: user.username,
        activity_type: data.activity_type,
        status: data.status,
      };

      if (editingActivity) {
        const updated = await api.activities.update(token, editingActivity.id, payload);
        setActivities(activities.map((a) => (a.id === editingActivity.id ? updated : a)));
        toast.success("Activity updated successfully");
      } else {
        const created = await api.activities.create(token, payload);
        setActivities([created, ...activities]);
        toast.success("Activity created successfully");
      }
      setIsFormOpen(false);
      setEditingActivity(null);
    } catch (error) {
      toast.error(editingActivity ? "Failed to update activity" : "Failed to create activity");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const stats = {
    total: activities.length,
    planned: activities.filter((a) => a.status === "planned").length,
    inProgress: activities.filter((a) => a.status === "in progress").length,
    completed: activities.filter((a) => a.status === "completed").length,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--gradient-hero)]">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                <ActivityIcon className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">FitTrack</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user?.username}!</p>
              </div>
            </div>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <div className="bg-card p-6 rounded-lg shadow-[var(--shadow-card)] border">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Activities</h3>
            <p className="text-3xl font-bold text-primary">{stats.total}</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-[var(--shadow-card)] border">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Planned</h3>
            <p className="text-3xl font-bold text-[hsl(var(--warning))]">{stats.planned}</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-[var(--shadow-card)] border">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">In Progress</h3>
            <p className="text-3xl font-bold text-primary">{stats.inProgress}</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-[var(--shadow-card)] border">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Completed</h3>
            <p className="text-3xl font-bold text-[hsl(var(--success))]">{stats.completed}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Your Activities</h2>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Badge
                variant={statusFilter === "all" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setStatusFilter("all")}
              >
                All ({stats.total})
              </Badge>
              <Badge
                variant={statusFilter === "planned" ? "warning" : "outline"}
                className="cursor-pointer"
                onClick={() => setStatusFilter("planned")}
              >
                Planned ({stats.planned})
              </Badge>
              <Badge
                variant={statusFilter === "in progress" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setStatusFilter("in progress")}
              >
                In Progress ({stats.inProgress})
              </Badge>
              <Badge
                variant={statusFilter === "completed" ? "success" : "outline"}
                className="cursor-pointer"
                onClick={() => setStatusFilter("completed")}
              >
                Completed ({stats.completed})
              </Badge>
            </div>
          </div>
          <Button onClick={handleAddActivity}>
            <Plus className="h-4 w-4 mr-2" />
            Add Activity
          </Button>
        </div>

        {filteredActivities.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg border shadow-[var(--shadow-card)]">
            <ActivityIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {statusFilter === "all" ? "No activities yet" : `No ${statusFilter} activities`}
            </h3>
            <p className="text-muted-foreground mb-4">
              {statusFilter === "all"
                ? "Start tracking your fitness journey by adding your first activity"
                : `Try a different filter or add a new activity`}
            </p>
            {statusFilter === "all" && (
              <Button onClick={handleAddActivity}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Activity
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onEdit={handleEditActivity}
                onDelete={handleDeleteActivity}
              />
            ))}
          </div>
        )}
      </main>

      <ActivityForm
        activity={editingActivity}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingActivity(null);
        }}
        onSubmit={handleSubmitActivity}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default Dashboard;
