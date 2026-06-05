"use client";

import { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Eye, EyeOff, Zap, ArrowRight, Github, Loader2 } from "lucide-react";

const signInSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type SignInFormData = z.infer<typeof signInSchema>;

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [showPassword, setShowPassword] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      if (error === "OAuthAccountNotLinked") {
        toast.error(
          "An account with this email already exists using a different sign-in method. Please sign in with your password, or try again as it is now linked."
        );
      } else {
        toast.error("Authentication failed. Please try again.");
      }
    }
  }, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Welcome back!");
      router.push("/dashboard");
      router.refresh();
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    setOauthLoading(provider);
    try {
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch {
      toast.error("OAuth sign in failed. Please try again.");
      setOauthLoading(null);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Background decorations */}
      <div className="hero-glow hero-glow-primary opacity-20" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
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
            Welcome back
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Sign in to continue your career journey
          </p>
        </div>

        {/* Card */}
        <div className="card p-8">
          {/* OAuth buttons */}
          <div className="flex flex-col gap-3 mb-6">
            <button
              id="signin-google"
              onClick={() => handleOAuth("google")}
              disabled={!!oauthLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-[var(--border-default)] font-medium text-sm transition-all hover:bg-[var(--bg-muted)] hover:border-[var(--border-strong)] disabled:opacity-50"
              style={{ color: "var(--text-primary)" }}
            >
              {oauthLoading === "google" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              Continue with Google
            </button>

            <button
              id="signin-github"
              onClick={() => handleOAuth("github")}
              disabled={!!oauthLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-[var(--border-default)] font-medium text-sm transition-all hover:bg-[var(--bg-muted)] hover:border-[var(--border-strong)] disabled:opacity-50"
              style={{ color: "var(--text-primary)" }}
            >
              {oauthLoading === "github" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Github className="w-5 h-5" />
              )}
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[var(--border-default)]" />
            <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              or
            </span>
            <div className="flex-1 h-px bg-[var(--border-default)]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label
                htmlFor="signin-email"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "var(--text-primary)" }}
              >
                Email
              </label>
              <input
                id="signin-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                {...register("email")}
                className="w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none"
                style={{
                  background: "var(--bg-subtle)",
                  border: `1px solid ${errors.email ? "var(--danger)" : "var(--border-default)"}`,
                  color: "var(--text-primary)",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = errors.email ? "var(--danger)" : "var(--brand-primary)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = errors.email ? "var(--danger)" : "var(--border-default)")
                }
              />
              {errors.email && (
                <p className="text-xs mt-1" style={{ color: "var(--danger)" }}>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="signin-password"
                  className="block text-sm font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs font-medium"
                  style={{ color: "var(--brand-primary)" }}
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="signin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="w-full px-4 py-3 pr-11 rounded-xl border text-sm transition-all outline-none"
                  style={{
                    background: "var(--bg-subtle)",
                    border: `1px solid ${errors.password ? "var(--danger)" : "var(--border-default)"}`,
                    color: "var(--text-primary)",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = errors.password
                      ? "var(--danger)"
                      : "var(--brand-primary)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = errors.password
                      ? "var(--danger)"
                      : "var(--border-default)")
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                  ) : (
                    <Eye className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs mt-1" style={{ color: "var(--danger)" }}>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              id="signin-submit"
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full py-3 mt-2 text-sm"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Sign up link */}
          <p className="text-center text-sm mt-6" style={{ color: "var(--text-muted)" }}>
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-semibold"
              style={{ color: "var(--brand-primary)" }}
            >
              Create one free
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center animate-pulse" style={{ background: "var(--bg-base)" }}>
        <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-primary)]" />
      </div>
    }>
      <SignInForm />
    </Suspense>
  );
}
