"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "motion/react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  message: z.string().min(10, "Message is too short"),
});

type FormData = z.infer<typeof formSchema>;

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Submission failed");
      setSubmitStatus("success");
      reset();
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4 sm:px-6 bg-background">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="mx-auto max-w-6xl"
      >
        <motion.div variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <div>
            <h2 className="font-[family-name:var(--font-mono)] text-4xl md:text-5xl font-bold tracking-tight text-ltx-black mb-4">Get in Touch</h2>
            <p className="text-ltx-muted mb-8">Have a project in mind? Let&apos;s talk about bringing it to life.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate aria-label="Contact form">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-2">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  {...register("name")}
                  disabled={isSubmitting}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  aria-invalid={errors.name ? true : undefined}
                  className="w-full px-4 py-3 rounded-xl border border-ltx-rule bg-ltx-alt/50 text-sm text-ltx-black placeholder:text-ltx-muted/60 focus:outline-none focus:border-ltx-studio focus:ring-2 focus:ring-ltx-studio/20 transition disabled:opacity-50"
                  autoComplete="name"
                />
                {errors.name && <p id="name-error" className="text-xs text-red-500 mt-1" role="alert">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...register("email")}
                  disabled={isSubmitting}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  aria-invalid={errors.email ? true : undefined}
                  className="w-full px-4 py-3 rounded-xl border border-ltx-rule bg-ltx-alt/50 text-sm text-ltx-black placeholder:text-ltx-muted/60 focus:outline-none focus:border-ltx-studio focus:ring-2 focus:ring-ltx-studio/20 transition disabled:opacity-50"
                  autoComplete="email"
                />
                {errors.email && <p id="email-error" className="text-xs text-red-500 mt-1" role="alert">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-2">Message</label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder="Tell me about your project..."
                  {...register("message")}
                  disabled={isSubmitting}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  aria-invalid={errors.message ? true : undefined}
                  className="w-full px-4 py-3 rounded-xl border border-ltx-rule bg-ltx-alt/50 text-sm text-ltx-black placeholder:text-ltx-muted/60 focus:outline-none focus:border-ltx-studio focus:ring-2 focus:ring-ltx-studio/20 transition disabled:opacity-50 resize-none"
                  autoComplete="off"
                />
                {errors.message && <p id="message-error" className="text-xs text-red-500 mt-1" role="alert">{errors.message.message}</p>}
              </div>

              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 rounded-xl bg-green-50 border border-green-200" role="alert">
                    <p className="text-sm font-semibold text-green-800">Message sent!</p>
                    <p className="text-xs text-green-600 mt-1">Thank you. I&apos;ll respond within 24-48 hours.</p>
                  </motion.div>
                )}
                {submitStatus === "error" && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 rounded-xl bg-red-50 border border-red-200" role="alert">
                    <p className="text-sm font-semibold text-red-800">Submission failed</p>
                    <p className="text-xs text-red-600 mt-1">{errorMessage}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-ltx-studio text-white text-sm font-semibold hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Direct Contact Info */}
          <div className="flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-3">Email</h3>
                <a href="mailto:hiya@creativecontext.studio" className="text-base sm:text-lg font-medium text-ltx-black hover:text-ltx-studio transition-colors break-all">
                  hiya@creativecontext.studio
                </a>
              </div>
              <div>
                <h3 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-3">Location</h3>
                <p className="text-lg font-medium text-ltx-black">Remote / Atlanta / Brooklyn</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold tracking-widest uppercase text-ltx-muted mb-3">Connect</h3>
                <div className="flex gap-4">
                  <a href="https://linkedin.com/in/jamesmckay" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-ltx-muted hover:text-ltx-studio transition-colors">LinkedIn</a>
                  <a href="https://github.com/jamesmckay" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-ltx-muted hover:text-ltx-studio transition-colors">GitHub</a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
