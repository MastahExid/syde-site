import { motion } from "framer-motion";

interface AppCapsuleProps {
  name: string;
  iconColor: string;
  delay?: number;
}

export function AppCapsule({ name, iconColor, delay = 0 }: AppCapsuleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="flex-shrink-0 w-32 md:w-40 flex flex-col items-center gap-3 p-4 rounded-2xl glass-card cursor-pointer group"
    >
      <div 
        className={`w-16 h-16 md:w-20 md:h-20 rounded-[22%] ${iconColor} shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center justify-center text-2xl font-bold text-white`}
      >
        {name.charAt(0)}
      </div>
      <span className="text-sm font-medium text-white/90 truncate w-full text-center">{name}</span>
      <button className="px-4 py-1 rounded-full bg-white/10 text-xs font-medium text-white group-hover:bg-primary group-hover:text-white transition-colors w-full">
        Get
      </button>
    </motion.div>
  );
}
