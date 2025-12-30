import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AppCapsule } from "@/components/AppCapsule";
import { useTeam, useFaqs } from "@/hooks/use-syde";
import { motion } from "framer-motion";
import { ChevronDown, Download, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const { data: team } = useTeam();
  const { data: faqs } = useFaqs();

  // Mock app data for the horizontal scroll
  const apps = [
    { name: "Delta", color: "bg-purple-500" },
    { name: "uYou+", color: "bg-red-500" },
    { name: "Enmity", color: "bg-blue-500" },
    { name: "Spotify++", color: "bg-green-500" },
    { name: "Esign", color: "bg-indigo-500" },
    { name: "Scarlet", color: "bg-orange-500" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10" />
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-lg md:text-xl font-medium text-primary mb-4 tracking-wide uppercase">
                The Future of Sideloading
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-9xl tracking-tight mb-8 text-white drop-shadow-2xl">
                <span className="font-light italic font-serif opacity-90">Just</span>{" "}
                <span className="font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/70">SYDE</span>{" "}
                <span className="font-normal opacity-90">It.</span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
                Discover, manage, and install iOS apps beyond the App Store. 
                Experience freedom with our curated collections and powerful repositories.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-200 transition-all flex items-center gap-2 shadow-xl shadow-white/10 hover:shadow-white/20 hover:-translate-y-1">
                  <Download className="w-5 h-5" />
                  Download IPA
                </button>
                <button className="px-8 py-4 rounded-full bg-white/10 text-white font-medium text-lg hover:bg-white/20 border border-white/10 transition-all backdrop-blur-sm flex items-center gap-2 hover:-translate-y-1">
                  Get Started <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* INSTALL APPS SECTION */}
        <section className="py-20 border-t border-white/5 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Install Any IPA</h2>
                <p className="text-muted-foreground">Browse our curated collection of popular tweaked apps.</p>
              </div>
              <a href="#" className="text-primary hover:text-accent transition-colors font-medium hidden md:block">
                View all apps →
              </a>
            </div>
            
            {/* Horizontal Scroll Area */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent z-10" />
              <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent z-10" />
              
              <div className="flex overflow-x-auto gap-6 pb-8 pt-4 px-4 snap-x hide-scrollbar">
                {apps.map((app, i) => (
                  <AppCapsule key={app.name} name={app.name} iconColor={app.color} delay={i * 0.1} />
                ))}
                {/* Duplicates to make scrolling feel longer */}
                {apps.map((app, i) => (
                  <AppCapsule key={`${app.name}-dup`} name={app.name} iconColor={app.color} delay={(i + apps.length) * 0.1} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: ShieldCheck, title: "Safe & Secure", desc: "Every app is scanned and verified before being listed." },
                { icon: Zap, title: "Lightning Fast", desc: "Optimized servers ensure your downloads are always speedy." },
                { icon: Globe, title: "Global Repos", desc: "Connect to community repositories to expand your library." }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="p-8 rounded-3xl glass-card hover:bg-white/5 transition-colors"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW TO INSTALL SECTION */}
        <section className="py-24 bg-gradient-to-b from-transparent to-black/40 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">How It Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Getting started with Syde is easier than you think. No computer required for most features.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                {[
                  { step: "01", title: "Download Syde", desc: "Get the configuration profile from our website." },
                  { step: "02", title: "Trust Profile", desc: "Go to Settings > General > VPN & Device Management." },
                  { step: "03", title: "Start Installing", desc: "Open Syde and browse thousands of apps." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-lg font-bold text-muted-foreground group-hover:border-primary group-hover:text-primary transition-colors bg-background">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative h-[600px] w-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden">
                 {/* Abstract Phone Mockup */}
                 <div className="w-[300px] h-[550px] bg-black border-8 border-gray-800 rounded-[3rem] shadow-2xl relative z-10 flex flex-col items-center justify-center overflow-hidden">
                    <div className="absolute top-0 w-40 h-6 bg-gray-800 rounded-b-xl z-20"></div>
                    <div className="w-full h-full bg-background relative p-6">
                      <div className="mt-12 space-y-4 opacity-50">
                        <div className="w-full h-32 bg-white/10 rounded-xl animate-pulse"></div>
                        <div className="w-full h-32 bg-white/10 rounded-xl animate-pulse delay-75"></div>
                        <div className="w-full h-32 bg-white/10 rounded-xl animate-pulse delay-150"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-primary rounded-xl mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary/50">S</div>
                          <p className="text-white font-bold">Syde Installed</p>
                        </div>
                      </div>
                    </div>
                 </div>
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
              </div>
            </div>
          </div>
        </section>

        {/* BEHIND SYDE (TEAM) */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-16">
              Behind <span className="text-primary">Syde</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {team && team.length > 0 ? (
                team.map((member) => (
                  <motion.div
                    key={member.id}
                    whileHover={{ y: -5 }}
                    className="p-8 rounded-3xl glass-card flex items-center gap-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 overflow-hidden flex-shrink-0 border-2 border-white/10">
                      {member.avatarUrl ? (
                        <img src={member.avatarUrl} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white/50">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{member.name}</h3>
                      <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
                      <p className="text-muted-foreground text-sm">{member.description}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <>
                  {/* Fallback Static Team if API empty */}
                  <div className="p-8 rounded-3xl glass-card flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-indigo-900 border-2 border-white/10 flex items-center justify-center text-2xl font-bold text-white">E</div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Exid</h3>
                      <p className="text-primary font-medium text-sm mb-2">Lead Developer</p>
                      <p className="text-muted-foreground text-sm">Building the core infrastructure.</p>
                    </div>
                  </div>
                  <div className="p-8 rounded-3xl glass-card flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-purple-900 border-2 border-white/10 flex items-center justify-center text-2xl font-bold text-white">D</div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Dyllie</h3>
                      <p className="text-primary font-medium text-sm mb-2">UI/UX Designer</p>
                      <p className="text-muted-foreground text-sm">Crafting the visual experience.</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="py-24 px-4 bg-black/20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs?.map((faq) => (
                <AccordionItem key={faq.id} value={`item-${faq.id}`} className="border border-white/10 rounded-xl px-4 data-[state=open]:bg-white/5 transition-colors">
                  <AccordionTrigger className="text-white hover:text-primary hover:no-underline text-lg font-medium py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base pb-4 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
              {!faqs?.length && (
                 <div className="text-center text-muted-foreground">Loading FAQs...</div>
              )}
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
