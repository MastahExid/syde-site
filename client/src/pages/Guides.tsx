import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useGuides } from "@/hooks/use-syde";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { BookOpen, ChevronRight } from "lucide-react";

export default function Guides() {
  const { data: guides, isLoading } = useGuides();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow pt-32 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Installation <span className="text-gradient-primary">Guides</span>
            </motion.h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about sideloading, troubleshooting, and getting the most out of Syde.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 rounded-3xl bg-white/5 border border-white/10"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {guides?.map((guide, i) => (
                <motion.div
                  key={guide.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/guides/${guide.slug}`} className="block h-full group">
                    <article className="h-full p-8 rounded-3xl glass-card hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 flex flex-col">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white mb-6 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      
                      <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                        {guide.title}
                      </h2>
                      
                      <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                        {guide.excerpt}
                      </p>
                      
                      <div className="flex items-center text-sm font-bold text-white group-hover:translate-x-2 transition-transform">
                        Read Guide <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
              
              {!guides?.length && (
                 <div className="col-span-full text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                    <p className="text-muted-foreground text-lg">No guides found. Check back later!</p>
                 </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
