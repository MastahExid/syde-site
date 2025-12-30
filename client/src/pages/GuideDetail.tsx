import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useGuide } from "@/hooks/use-syde";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";

export default function GuideDetail() {
  const [, params] = useRoute("/guides/:slug");
  const slug = params?.slug || "";
  const { data: guide, isLoading } = useGuide(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white animate-pulse">Loading guide...</div>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-bold text-white">404</h1>
        <p className="text-muted-foreground">Guide not found</p>
        <Link href="/guides" className="text-primary hover:underline">Back to Guides</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow pt-32 px-4 pb-20">
        <article className="max-w-4xl mx-auto">
          <Link href="/guides" className="inline-flex items-center text-muted-foreground hover:text-white mb-8 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Guides
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {guide.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-12 border-b border-white/10 pb-8">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-primary" />
                <span>Updated recently</span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2 text-primary" />
                <span>Syde Team</span>
              </div>
            </div>

            <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-primary prose-strong:text-white prose-code:text-accent prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10">
               {/* 
                 In a real app, you'd use a Markdown renderer here.
                 For this output, we'll just display text content with whitespace preserved.
               */}
               <div className="whitespace-pre-wrap leading-relaxed text-gray-300">
                 {guide.content}
               </div>
            </div>
          </motion.div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
