import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Activity, Dumbbell, TrendingUp, Target } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-[var(--gradient-hero)]">
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary text-primary-foreground">
              <Activity className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold">FitTrack</h1>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button onClick={() => navigate("/register")}>Get Started</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <section className="text-center py-20">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              Track Your Fitness
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Journey Today
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay motivated and achieve your fitness goals with our comprehensive activity tracking system. Log
              workouts, monitor progress, and celebrate your achievements.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button size="lg" onClick={() => navigate("/register")}>
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
                Sign In
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-8 rounded-lg border shadow-[var(--shadow-card)] text-center">
              <div className="inline-flex p-4 rounded-full bg-accent mb-4">
                <Dumbbell className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Log Activities</h3>
              <p className="text-muted-foreground">
                Track workouts, walking, swimming, and more. Keep a detailed record of all your fitness activities.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border shadow-[var(--shadow-card)] text-center">
              <div className="inline-flex p-4 rounded-full bg-accent mb-4">
                <TrendingUp className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Monitor Progress</h3>
              <p className="text-muted-foreground">
                Update activity status from planned to in progress to completed. Watch your progress unfold.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border shadow-[var(--shadow-card)] text-center">
              <div className="inline-flex p-4 rounded-full bg-accent mb-4">
                <Target className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reach Goals</h3>
              <p className="text-muted-foreground">
                Set targets and achieve them. Manage your activities efficiently with easy editing and deletion.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
