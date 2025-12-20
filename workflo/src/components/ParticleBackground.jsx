import React from "react";
import { motion } from "framer-motion";

const ParticleBackground = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 -z-10 pointer-events-none"
    >

      <div
        className="
          absolute inset-0
          bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),
              linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)]
           bg-size-[48px_48px]
        "
      />


      <div className="absolute opacity-50 inset-0 bg-linear-to-br from-zinc-500 via-white/90 to-zinc-450" />
    </motion.div>
  );
};

export default ParticleBackground;
