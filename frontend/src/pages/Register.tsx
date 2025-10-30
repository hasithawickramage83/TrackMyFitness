import { RegisterForm } from "@/components/auth/RegisterForm";
import { Activity } from "lucide-react";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--gradient-hero)]">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="p-3 rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-button)]">
            <Activity className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              FitTrack
            </h1>
            <p className="text-muted-foreground mt-2">Your personal fitness companion</p>
          </div>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
