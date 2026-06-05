"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Eye, EyeOff, Zap, ArrowRight, Github, Loader2, Check } from "lucide-react";

const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Include at least one uppercase letter")
      .regex(/[0-9]/, "Include at least one number"),
    confirmPassword: z.string(),
    role: z.enum(["JOB_SEEKER", "STUDENT", "CAREER_SWITCHER", "PROFESSIONAL"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

const roles = [
  { value: "JOB_SEEKER", label: "🎯 Job Seeker", description: "Looking for my next role" },
  { value: "STUDENT", label: "🎓 Student", description: "About to enter the workforce" },
  { value: "CAREER_SWITCHER", label: "🔄 Career Switcher", description: "Changing industries" },
  { value: "PROFESSIONAL", label: "💼 Professional", description: "Advancing my career" },
];

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { role: "JOB_SEEKER" },
  });

  const selectedRole = watch("role");
  const password = watch("password");

  const passwordStrength = password
    ? [
        password.length >= 8,
        /[A-Z]/.test(password),
        /[0-9]/.test(password),
        /[^A-Za-z0-9]/.test(password),
      ]
    : [];

  const strengthLevel = passwordStrength.filter(Boolean).length;
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strengthLevel];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#10b981", "#10b981"][strengthLevel];

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error ?? "Failed to create account");
        return;
      }

      // Auto sign in after registration
      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInResult?.error) {
        toast.success("Account created! Please sign in.");
        router.push("/sign-in");
      } else {
        toast.success("Welcome to VibeCareer AI! 🚀");
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    setOauthLoading(provider);
    await signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="hero-glow hero-glow-primary opacity-20" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-[var(--shadow-glow)]">
              <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span
              className="font-bold text-xl"
              style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
            >
              Vibe<span className="gradient-text">Career</span>
            </span>
          </Link>
          <h1
            className="text-2xl font-black mb-2"
            style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}
          >
            Start your career journey
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Free forever • No credit card required
          </p>
        </div>

        {/* Card */}
        <div className="card p-8">
          {/* OAuth */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              id="signup-google"
              onClick={() => handleOAuth("google")}
              disabled={!!oauthLoading}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--border-default)] font-medium text-sm transition-all hover:bg-[var(--bg-muted)] disabled:opacity-50"
              style={{ color: "var(--text-primary)" }}
            >
              {oauthLoading === "google" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              Google
            </button>
            <button
              id="signup-github"
              onClick={() => handleOAuth("github")}
              disabled={!!oauthLoading}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--border-default)] font-medium text-sm transition-all hover:bg-[var(--bg-muted)] disabled:opacity-50"
              style={{ color: "var(--text-primary)" }}
            >
              {oauthLoading === "github" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Github className="w-4 h-4" />
              )}
              GitHub
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[var(--border-default)]" />
            <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>or</span>
            <div className="flex-1 h-px bg-[var(--border-default)]" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Role Selector */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-primary)" }}>
                I am a...
              </label>
              <div className="grid grid-cols-2 gap-2">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setValue("role", role.value as SignUpFormData["role"])}
                    className="p-3 rounded-xl border text-left transition-all"
                    style={{
                      background: selectedRole === role.value ? "rgba(124,58,237,0.08)" : "var(--bg-subtle)",
                      border: `1px solid ${selectedRole === role.value ? "var(--brand-primary)" : "var(--border-default)"}`,
                    }}
                  >
                    <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      {role.label}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {role.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="signup-name" className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>
                Full Name
              </label>
              <input
                id="signup-name"
                type="text"
                placeholder="Alex Johnson"
                autoComplete="name"
                {...register("name")}
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                style={{
                  background: "var(--bg-subtle)",
                  border: `1px solid ${errors.name ? "var(--danger)" : "var(--border-default)"}`,
                  color: "var(--text-primary)",
                }}
                onFocus={(e) => (e.target.style.borderColor = errors.name ? "var(--danger)" : "var(--brand-primary)")}
                onBlur={(e) => (e.target.style.borderColor = errors.name ? "var(--danger)" : "var(--border-default)")}
              />
              {errors.name && <p className="text-xs mt-1" style={{ color: "var(--danger)" }}>{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="signup-email" className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>
                Email
              </label>
              <input
                id="signup-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register("email")}
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                style={{
                  background: "var(--bg-subtle)",
                  border: `1px solid ${errors.email ? "var(--danger)" : "var(--border-default)"}`,
                  color: "var(--text-primary)",
                }}
                onFocus={(e) => (e.target.style.borderColor = errors.email ? "var(--danger)" : "var(--brand-primary)")}
                onBlur={(e) => (e.target.style.borderColor = errors.email ? "var(--danger)" : "var(--border-default)")}
              />
              {errors.email && <p className="text-xs mt-1" style={{ color: "var(--danger)" }}>{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="signup-password" className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>
                Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 8 characters"
                  autoComplete="new-password"
                  {...register("password")}
                  className="w-full px-4 py-3 pr-11 rounded-xl border text-sm outline-none transition-all"
                  style={{
                    background: "var(--bg-subtle)",
                    border: `1px solid ${errors.password ? "var(--danger)" : "var(--border-default)"}`,
                    color: "var(--text-primary)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = errors.password ? "var(--danger)" : "var(--brand-primary)")}
                  onBlur={(e) => (e.target.style.borderColor = errors.password ? "var(--danger)" : "var(--border-default)")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                  ) : (
                    <Eye className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                  )}
                </button>
              </div>
              {/* Password strength */}
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{
                          background: i <= strengthLevel ? strengthColor : "var(--border-default)",
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-medium" style={{ color: strengthColor }}>
                    {strengthLabel}
                  </p>
                </div>
              )}
              {errors.password && <p className="text-xs mt-1" style={{ color: "var(--danger)" }}>{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="signup-confirm-password" className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>
                Confirm Password
              </label>
              <input
                id="signup-confirm-password"
                type="password"
                placeholder="Confirm your password"
                autoComplete="new-password"
                {...register("confirmPassword")}
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                style={{
                  background: "var(--bg-subtle)",
                  border: `1px solid ${errors.confirmPassword ? "var(--danger)" : "var(--border-default)"}`,
                  color: "var(--text-primary)",
                }}
                onFocus={(e) => (e.target.style.borderColor = errors.confirmPassword ? "var(--danger)" : "var(--brand-primary)")}
                onBlur={(e) => (e.target.style.borderColor = errors.confirmPassword ? "var(--danger)" : "var(--border-default)")}
              />
              {errors.confirmPassword && <p className="text-xs mt-1" style={{ color: "var(--danger)" }}>{errors.confirmPassword.message}</p>}
            </div>

            {/* Terms */}
            <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
              By signing up, you agree to our{" "}
              <Link href="#" className="underline" style={{ color: "var(--brand-primary)" }}>Terms</Link>{" "}
              and{" "}
              <Link href="#" className="underline" style={{ color: "var(--brand-primary)" }}>Privacy Policy</Link>
            </p>

            {/* Submit */}
            <button
              id="signup-submit"
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-3 text-sm"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Create Free Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: "var(--text-muted)" }}>
            Already have an account?{" "}
            <Link href="/sign-in" className="font-semibold" style={{ color: "var(--brand-primary)" }}>
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
