"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { MouseSpotlightTracker } from "@/components/shared/MouseSpotlightTracker";
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    setLoading(true);
    // Simulate sending message
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Message sent successfully!");
    }, 1500);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden spotlight-grid dot-matrix" style={{ background: "var(--bg-base)" }}>
      <MouseSpotlightTracker />
      <LandingNavbar />

      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-lg max-w-xl mx-auto mb-10" style={{ color: "var(--text-secondary)" }}>
              Have questions about VibeCareer AI or want to connect with the developer? We are here to help.
            </p>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border border-[var(--border-default)] shadow-[var(--shadow-lg)] group mb-12"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-transparent to-transparent z-10 opacity-40" />
              <img
                src="/images/contact_hero.png"
                alt="Contact VibeCareer AI"
                className="w-full h-[200px] md:h-[300px] object-cover transition-transform duration-700 group-hover:scale-103"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
            {/* Developer Contact Cards */}
            <div className="md:col-span-2 flex flex-col gap-6">
              <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
                Developer Info
              </h2>
              
              <div className="card p-6 flex items-start gap-4 hover:border-[var(--brand-strong)] transition-all">
                <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-600 shrink-0 border border-violet-500/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>Email Address</h4>
                  <a href="mailto:ramoliadk@gmail.com" className="text-sm hover:text-[var(--brand-primary)] transition-colors" style={{ color: "var(--text-muted)" }}>
                    ramoliadk@gmail.com
                  </a>
                </div>
              </div>

              <div className="card p-6 flex items-start gap-4 hover:border-[var(--brand-strong)] transition-all">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-500/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>Mobile Connection</h4>
                  <a href="tel:+919909945734" className="text-sm hover:text-[var(--brand-primary)] transition-colors" style={{ color: "var(--text-muted)" }}>
                    +91 9909945734
                  </a>
                </div>
              </div>

              <div className="card p-6 flex items-start gap-4 hover:border-[var(--brand-strong)] transition-all">
                <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-600 shrink-0 border border-pink-500/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>Location</h4>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Gujarat, India
                  </p>
                </div>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-3 mt-4">
                <a
                  href="https://github.com/Dhruvil4625"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl border border-[var(--border-default)] flex items-center justify-center transition-all hover:border-[var(--brand-primary)] hover:bg-[var(--bg-muted)]"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
                </a>
                <a
                  href="https://www.linkedin.com/in/dhruvil-ramolia-3b9026266"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl border border-[var(--border-default)] flex items-center justify-center transition-all hover:border-[var(--brand-primary)] hover:bg-[var(--bg-muted)]"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3">
              <div className="card p-8 md:p-10 relative overflow-hidden">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 flex flex-col items-center gap-4"
                  >
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
                    <h3 className="text-2xl font-bold" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>Message Sent!</h3>
                    <p className="text-sm max-w-sm" style={{ color: "var(--text-muted)" }}>
                      Thank you for reaching out. The developer will get back to you at your email address as soon as possible.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setFormState({ name: "", email: "", subject: "", message: "" }); }}
                      className="btn-primary mt-6 text-xs"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "Outfit, sans-serif", color: "var(--text-primary)" }}>
                      Send a Message
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>Name *</label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                          placeholder="Your Name"
                          style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>Email *</label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                          placeholder="your.email@example.com"
                          style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>Subject</label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all"
                        placeholder="Subject of message"
                        style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }}
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>Message *</label>
                      <textarea
                        id="contact-message"
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all resize-none"
                        placeholder="Type your message here..."
                        style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-default)", color: "var(--text-primary)" }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full py-3 text-sm mt-2 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
