import {
  Database,
  WandSparkles,
  Eye,
  Pencil,
  Trash2,
  UserSearch,
  RefreshCw,
  Shield,
  ArrowRight,
} from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="h-full bg-background text-on-surface relative overflow-hidden">
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-10">

        {/* HERO */}
        <section className="text-center mb-10">
          <p className="text-primary uppercase tracking-[0.3em] text-xs font-bold mb-4">
            Legal Transparency
          </p>

          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6">
            Privacy Policy
          </h1>

          <p className="text-on-surface-variant max-w-2xl mx-auto text-sm sm:text-lg leading-relaxed">
            At E_Book_Store, we believe your literary preferences are personal.
            This policy outlines how we curate, protect, and respect your digital footprint.
          </p>

          <div className="mt-6 flex justify-center items-center gap-2 text-primary/70 text-sm">
            <span>📅</span>
            <span>Last Updated: January 24, 2026</span>
          </div>
        </section>

        {/* CONTENT */}
        <div className="space-y-14">

          {/* DATA COLLECTION */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-outline-variant/30"></div>
              <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                <Database size={20} /> Data Collection
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 md:gap-6 mb-8">
              <div className="bg-surface-container-low p-4 md:p-6 rounded-xl border-l-4 border-primary/30">
                <h3 className="font-bold mb-2">Account Information</h3>
                <p className="text-sm text-on-surface-variant">
                  When you register, we collect your name, email, and billing preferences.
                </p>
              </div>

              <div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-primary/30">
                <h3 className="font-bold mb-2">Reading Patterns</h3>
                <p className="text-sm text-on-surface-variant">
                  We track genres and bookmarks to improve recommendations.
                </p>
              </div>
            </div>

            {/* Quote */}
            <div className="bg-surface-container-high p-6 rounded-2xl border border-outline-variant/20 italic text-on-surface-variant">
              &quot;We never sell your personal reading data to third-party advertisers.
              Your library is a sanctuary.&quot;
            </div>
          </section>

          {/* DATA USAGE */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-outline-variant/30"></div>
              <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                <WandSparkles size={20} /> Data Usage
              </h2>
            </div>

            <div className="space-y-8">

              <div className="flex gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full">
                  <UserSearch className="text-primary" size={18} />
                </div>
                <div>
                  <h3 className="font-bold">Personalized Recommendations</h3>
                  <p className="text-sm text-on-surface-variant">
                    We suggest books based on your reading behavior.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full">
                  <RefreshCw className="text-primary" size={18} />
                </div>
                <div>
                  <h3 className="font-bold">Cross-Device Sync</h3>
                  <p className="text-sm text-on-surface-variant">
                    Your progress is synced across devices securely.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full">
                  <Shield className="text-primary" size={18} />
                </div>
                <div>
                  <h3 className="font-bold">Platform Security</h3>
                  <p className="text-sm text-on-surface-variant">
                    Helps detect fraud and protect content.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* USER RIGHTS */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-outline-variant/30"></div>
              <h2 className="text-2xl font-bold text-primary">
                User Rights
              </h2>
            </div>

            <div className="bg-surface-container rounded-2xl border border-outline-variant/20 overflow-hidden grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-outline-variant/20">
              <div className="p-4 md:p-6 hover:bg-white/5 transition">
                <Eye className="text-primary mb-3" />
                <h4 className="font-bold mb-2">Right to Access</h4>
                <p className="text-sm text-on-surface-variant">
                  Request your personal data anytime.
                </p>
              </div>

              <div className="p-4 md:p-6 hover:bg-white/5 transition">
                <Pencil className="text-primary mb-3" />
                <h4 className="font-bold mb-2">Right to Rectify</h4>
                <p className="text-sm text-on-surface-variant">
                  Update your information anytime.
                </p>
              </div>

              <div className="p-4 md:p-6 hover:bg-white/5 transition">
                <Trash2 className="text-primary mb-3" />
                <h4 className="font-bold mb-2">Right to Erase</h4>
                <p className="text-sm text-on-surface-variant">
                  Request account deletion.
                </p>
              </div>

            </div>
          </section>

      
        </div>
      </main>
    </div>
  );
}