import React from "react";
import { motion } from "framer-motion";

const features = [
  { title: "Report", desc: "Quickly report pollution with photo & location." },
  { title: "Track", desc: "See the status of reports in real-time." },
  { title: "Act", desc: "Workers and admins coordinate clean-ups." },
];

export default function Features() {
  return (
    <motion.section
      className="container mx-auto px-4 mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {features.map((f, i) => (
        <motion.div
          key={i}
          className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="font-semibold text-xl mb-2">{f.title}</h3>
          <p className="text-gray-600 text-sm">{f.desc}</p>
        </motion.div>
      ))}
    </motion.section>
  );
}
