import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Download as DownloadIcon, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Download() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow pt-32">
        {/* HERO SECTION */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10" />
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Download Syde</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                Get the latest version of Syde IPA. Choose your preferred sideloading method below.
              </p>
            </motion.div>
          </div>
        </section>

        {/* DOWNLOAD OPTIONS */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { 
                  title: "Direct Download", 
                  desc: "Download the IPA file directly to your device and install using your preferred sideloading app.",
                  action: "Download IPA",
                  icon: DownloadIcon
                },
                { 
                  title: "Sign & Install", 
                  desc: "Use our in-browser signer to sign your IPA with your certificate and install directly.",
                  action: "Go to Signer",
                  icon: ArrowRight
                }
              ].map((option, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="p-8 rounded-3xl glass-card hover:bg-white/5 transition-colors"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mb-6">
                    <option.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{option.title}</h3>
                  <p className="text-muted-foreground mb-8">{option.desc}</p>
                  <button className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:opacity-90 transition-all">
                    {option.action}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* LATEST VERSION INFO */}
            <div className="mt-16 p-8 rounded-3xl glass-card border-2 border-primary/20">
              <h3 className="text-xl font-bold text-white mb-4">Latest Release</h3>
              <p className="text-muted-foreground mb-4">Version 1.0.0</p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Discover and browse iOS apps</li>
                <li>✓ Add custom repositories</li>
                <li>✓ Download IPAs directly</li>
                <li>✓ Compatible with iOS 14+</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
