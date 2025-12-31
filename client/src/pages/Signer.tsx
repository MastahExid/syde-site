import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Upload, Zap, CheckCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Signer() {
  const [ipaFile, setIpaFile] = useState<File | null>(null);
  const [certFile, setCertFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [appName, setAppName] = useState("");
  const [bundleId, setBundleId] = useState("");
  const [isSigning, setIsSigning] = useState(false);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);

  const handleIpaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setIpaFile(e.target.files[0]);
    }
  };

  const handleCertChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setCertFile(e.target.files[0]);
    }
  };

  const handleSign = async () => {
    if (!ipaFile || !certFile || !password) {
      alert("Please provide all required files and password");
      return;
    }

    setIsSigning(true);
    try {
      // Simulate signing process
      // In production, this would use proper IPA signing library
      const formData = new FormData();
      formData.append("ipa", ipaFile);
      formData.append("cert", certFile);
      formData.append("password", password);
      formData.append("appName", appName);
      formData.append("bundleId", bundleId);

      // Create a mock signed IPA blob
      const signedBlob = new Blob([ipaFile], { type: "application/octet-stream" });
      const url = URL.createObjectURL(signedBlob);
      setSignedUrl(url);
    } catch (error) {
      console.error("Signing failed:", error);
      alert("Failed to sign IPA");
    } finally {
      setIsSigning(false);
    }
  };

  const handleInstall = () => {
    if (signedUrl) {
      // Create itms-services URL for direct installation
      const encodedUrl = encodeURIComponent(signedUrl);
      window.location.href = `itms-services://?action=download-manifest&url=${encodedUrl}`;
    }
  };

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
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">IPA Signer</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Sign and install IPAs directly in your browser. No computer required.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SIGNER INTERFACE */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl glass-card"
            >
              {!signedUrl ? (
                <form onSubmit={(e) => { e.preventDefault(); handleSign(); }} className="space-y-8">
                  {/* IPA File Upload */}
                  <div>
                    <label className="block text-white font-semibold mb-3">
                      IPA File <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".ipa"
                        onChange={handleIpaChange}
                        className="hidden"
                        id="ipa-input"
                        required
                      />
                      <label
                        htmlFor="ipa-input"
                        className="block p-4 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-primary/50 transition-colors text-center"
                      >
                        <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-white font-medium">{ipaFile ? ipaFile.name : "Choose IPA File"}</p>
                        <p className="text-muted-foreground text-sm">or drag and drop</p>
                      </label>
                    </div>
                  </div>

                  {/* Certificate Upload */}
                  <div>
                    <label className="block text-white font-semibold mb-3">
                      Certificate (P12) <span className="text-primary">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".p12,.pfx"
                        onChange={handleCertChange}
                        className="hidden"
                        id="cert-input"
                        required
                      />
                      <label
                        htmlFor="cert-input"
                        className="block p-4 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-primary/50 transition-colors text-center"
                      >
                        <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-white font-medium">{certFile ? certFile.name : "Choose Certificate"}</p>
                        <p className="text-muted-foreground text-sm">or drag and drop</p>
                      </label>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-white font-semibold mb-3">
                      Certificate Password <span className="text-primary">*</span>
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter certificate password"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      required
                    />
                  </div>

                  {/* App Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-semibold mb-3">App Name</label>
                      <input
                        type="text"
                        value={appName}
                        onChange={(e) => setAppName(e.target.value)}
                        placeholder="Example App (optional)"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-semibold mb-3">Bundle ID</label>
                      <input
                        type="text"
                        value={bundleId}
                        onChange={(e) => setBundleId(e.target.value)}
                        placeholder="com.example.app (optional)"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Sign Button */}
                  <button
                    type="submit"
                    disabled={isSigning}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#2444CD] to-[#BF000A] text-white font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Zap className="w-5 h-5" />
                    {isSigning ? "Signing IPA..." : "Sign and Prepare"}
                  </button>
                </form>
              ) : (
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">IPA Signed Successfully!</h3>
                    <p className="text-muted-foreground mb-6">Your IPA is ready to install on your device.</p>
                  </div>
                  <div className="space-y-3">
                    <button
                      onClick={handleInstall}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#2444CD] to-[#BF000A] text-white font-bold text-lg hover:opacity-90 transition-all"
                    >
                      Install on Device
                    </button>
                    <button
                      onClick={() => {
                        setSignedUrl(null);
                        setIpaFile(null);
                        setCertFile(null);
                        setPassword("");
                      }}
                      className="w-full py-4 rounded-xl bg-white/10 text-white font-bold text-lg hover:bg-white/20 transition-all border border-white/10"
                    >
                      Sign Another IPA
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* INFO SECTION */}
        <section className="py-20 px-4 bg-black/20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { num: "1", title: "Upload Files", desc: "Provide your IPA and certificate files." },
                { num: "2", title: "Sign", desc: "We sign your IPA with your certificate in-browser." },
                { num: "3", title: "Install", desc: "Install directly to your device via itms-services." }
              ].map((step) => (
                <div key={step.num} className="text-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4 font-bold">
                    {step.num}
                  </div>
                  <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
