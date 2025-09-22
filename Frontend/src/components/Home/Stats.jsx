import React from "react";
import { motion } from "framer-motion";

const stats = [
  { label: "Reports Filed", value: 500 },
  { label: "Clean-Up Drives", value: 200 },
  { label: "Volunteers", value: 1000 },
];

export default function Stats() {
  return (
    <motion.section
      className="container mx-auto px-4 mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {stats.map((s, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <motion.h3
            className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2"
          >
            {s.value}+
          </motion.h3>
          <p className="text-gray-600">{s.label}</p>
        </div>
      ))}
    </motion.section>
  );
}
