import { Github, Instagram, Twitter, MessageCircle } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur-lg pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4 cursor-pointer">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center">
                <span className="font-bold text-white">S</span>
              </div>
              <span className="font-bold text-xl text-white">Syde</span>
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Discover and install iOS apps beyond the App Store. 
              The most advanced sideloading experience for your device.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="/guides" className="text-muted-foreground hover:text-primary transition-colors">Guides</Link></li>
              <li><Link href="/#faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Status</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Community</h3>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Twitter className="w-5 h-5" />} label="Twitter" />
              <SocialLink href="#" icon={<Instagram className="w-5 h-5" />} label="Instagram" />
              <SocialLink href="#" icon={<Github className="w-5 h-5" />} label="GitHub" />
              <SocialLink href="#" icon={<MessageCircle className="w-5 h-5" />} label="Discord" />
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Syde. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Made with ❤️ by the Syde Team</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a 
      href={href} 
      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1"
      aria-label={label}
    >
      {icon}
    </a>
  );
}
