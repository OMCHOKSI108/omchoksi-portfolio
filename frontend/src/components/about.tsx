"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-16"
        >
          About & Bio
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6">
              AI & Machine Learning Engineer and Cloude enthusiastic
            </h3>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
              I'm Om Choksi — an AI & Machine Learning engineer focused on building deployable, production-ready intelligence systems. I specialize in transforming raw datasets into scalable ML products through end-to-end engineering, including data pipelines, model architecture, evaluation, and deployment.
            </p>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
              My work spans ML model development, deep learning, computer vision, NLP, LLM-powered automation, full-stack ML application deployment, and data storytelling for business decisions. I believe AI is only successful when people — not just models — can use it.
            </p>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              I work with curiosity, speed, and product-thinking: every project I build must solve a real problem and make someone's workflow better. When I'm not building AI systems, you can find me researching new architectures, competing in ML challenges, or exploring the intersection of AI with cybersecurity and autonomous systems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="w-full h-96 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://via.placeholder.com/400x384/6366f1/ffffff?text=Profile"
                alt="Om Choksi"
                width={400}
                height={384}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}