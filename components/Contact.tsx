"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { getCloudinaryVideoSources } from "@/lib/cloudinary";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [showVideo, setShowVideo] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormState({ name: "", email: "", company: "", message: "" });
        
        // Show video after content fades out completely
        setTimeout(() => {
          setShowVideo(true);
          
          // Reset everything after 5 seconds
          setTimeout(() => {
            setShowVideo(false);
            setTimeout(() => {
              setSubmitStatus("idle");
            }, 1200); // Wait for video to fade out before resetting form
          }, 5000);
        }, 600); // Wait for content to fade out
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:pt-0 lg:pb-16 relative overflow-hidden">
      {/* Video Overlay */}
      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            preload="metadata"
            width={1920}
            height={1080}
            style={{ aspectRatio: '16/9' }}
          >
            {process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
              ? getCloudinaryVideoSources('paintbomb_doepnb', {
                  quality: 'auto',
                  format: 'auto',
                  fetchFormat: 'auto',
                  videoCodec: 'auto',
                }).map((source, index) => (
                  <source key={index} src={source.src} type={source.type} />
                ))
              : <source src="/paintbomb.mp4" type="video/mp4" />
            }
          </video>
          
          {/* Success Message Overlay */}
          <div className="relative z-10 text-center space-y-4 px-4"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
          >
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white flex flex-wrap justify-center gap-3">
              {["Your", "Vision", "Matters!"].map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-xl md:text-2xl text-gray-200"
            >
              {["We'll", "reach", "out", "within", "24", "hours", "to", "bring", "it", "to", "life."].map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Desktop Version */}
      <div className="hidden lg:block max-w-6xl mx-auto w-full pl-28 lg:pl-32 pr-6 lg:pr-8">
        <div className="grid grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            animate={{ 
              opacity: submitStatus === "success" ? 0 : 1,
              x: 0,
              transition: { duration: submitStatus === "success" ? 0.5 : 2.4, ease: "easeInOut" }
            }}
            className="space-y-6 md:space-y-7"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
              Let's Build
              <br />
              <span className="text-gray-500">Something Great</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              Have a project in mind? We'd love to hear about it. Drop us a message
              and we'll get back to you within 24 hours.
            </p>
            <div className="space-y-4 pt-2 md:pt-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-800 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Email</p>
                  <p className="text-white text-sm md:text-base">hello@savvydigital.ae</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-800 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Location</p>
                  <p className="text-white text-sm md:text-base">DIFC Dubai</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            animate={{ 
              opacity: submitStatus === "success" ? 0 : 1,
              x: 0,
              transition: { duration: submitStatus === "success" ? 0.5 : 2.4, ease: "easeInOut" }
            }}
          >
            {/* Form - Fades out on success */}
            <form
              name="contact"
              method="POST"
              action="/__forms.html"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-6 w-full"
            >
              {/* Hidden fields for Netlify */}
              <input type="hidden" name="form-name" value="contact" />
              <p hidden>
                <label>
                  Don't fill this out: <input name="bot-field" />
                </label>
              </p>

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-xs md:text-sm text-gray-400 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base bg-transparent border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs md:text-sm text-gray-400 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base bg-transparent border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300"
                  placeholder="john@example.com"
                />
              </div>

              {/* Company Field */}
              <div>
                <label htmlFor="company" className="block text-xs md:text-sm text-gray-400 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formState.company}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base bg-transparent border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300"
                  placeholder="Your Company"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-xs md:text-sm text-gray-400 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base bg-transparent border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 md:px-8 md:py-4 text-sm md:text-base bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {/* Status Messages */}
              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-400 text-sm"
                >
                  ✗ Something went wrong. Please try again.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Mobile Version - Completely Redesigned */}
      <div className="lg:hidden max-w-xl mx-auto w-full px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          animate={{ 
            opacity: submitStatus === "success" ? 0 : 1,
            transition: { duration: submitStatus === "success" ? 0.5 : 2.4, ease: "easeInOut" }
          }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Let's Create
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Something Amazing
            </span>
          </h2>
          <p className="text-gray-400 text-sm">
            Ready to bring your vision to life? Let's talk.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          animate={{ 
            opacity: submitStatus === "success" ? 0 : 1,
            transition: { duration: submitStatus === "success" ? 0.5 : 2.4, ease: "easeInOut" }
          }}
          className="grid grid-cols-2 gap-3 mb-8"
        >
          <div className="p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-sm border border-white/10 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-white/5 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-xs text-gray-500 mb-1">Email</p>
            <p className="text-xs text-white font-medium">hello@savvydigital.ae</p>
          </div>
          
          <div className="p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-sm border border-white/10 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-white/5 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-xs text-gray-500 mb-1">Location</p>
            <p className="text-xs text-white font-medium">DIFC Dubai</p>
          </div>
        </motion.div>

        {/* Form - Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          animate={{ 
            opacity: submitStatus === "success" ? 0 : 1,
            y: 0,
            transition: { duration: submitStatus === "success" ? 0.5 : 2.4, ease: "easeInOut" }
          }}
        >
          <form
            name="contact"
            method="POST"
            action="/__forms.html"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>
              Don't fill this out: <input name="bot-field" />
            </label>
          </p>

          {/* Name */}
          <div>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
              placeholder="Your Name *"
              className="w-full px-4 py-3 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors duration-300"
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              placeholder="Email Address *"
              className="w-full px-4 py-3 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors duration-300"
            />
          </div>

          {/* Company */}
          <div>
            <input
              type="text"
              id="company"
              name="company"
              value={formState.company}
              onChange={handleChange}
              placeholder="Company (Optional)"
              className="w-full px-4 py-3 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors duration-300"
            />
          </div>

          {/* Message */}
          <div>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Tell us about your project *"
              className="w-full px-4 py-3 text-sm bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors duration-300 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-4 text-sm bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {/* Error Message Only */}
          {submitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center"
            >
              ✗ Something went wrong. Please try again.
            </motion.div>
          )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}

