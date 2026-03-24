import {
  UserCheck,
  ShoppingCart,
  Copyright,
  CheckCircle,
} from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-on-surface relative overflow-hidden">
       <main className="relative z-10 mx-auto px-4 sm:px-6 lg:px-24">

        {/* HERO */}
        <section className="mb-8 md:mb-14">
          <span className="text-primary text-lg font-bold tracking-[0.2em] uppercase block mb-4">
            Legal Documentation
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Terms of Service
          </h1>

          <p className="text-on-surface-variant text-sm sm:text-base max-w-2xl leading-relaxed">
            Welcome to E_Book_Store. These terms govern your use of our digital
            gallery and purchase of curated literature. Please read them carefully.
          </p>

          <div className="mt-4 flex gap-2 text-xs text-outline">
            <span>Last Updated: January 24, 2026</span>
            <span>•</span>
            <span>Effective Immediately</span>
          </div>
        </section>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10 md:mb-20">
          
          {/* Card 1 */}
          <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/20 hover:border-primary/40 transition">
            <UserCheck size={36} className="text-primary mb-4" />
            <h3 className="font-bold mb-1">Membership</h3>
            <p className="text-sm text-on-surface-variant">
              Guidelines for account creation and user responsibilities.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/20 hover:border-primary/40 transition">
            <ShoppingCart size={36} className="text-primary mb-4" />
            <h3 className="font-bold mb-1">Purchases</h3>
            <p className="text-sm text-on-surface-variant">
              Rules surrounding digital transactions and access.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-surface-container p-6 rounded-xl border border-outline-variant/20 hover:border-primary/40 transition">
            <Copyright size={36} className="text-primary mb-4" />
            <h3 className="font-bold mb-1">Intellectual Property</h3>
            <p className="text-sm text-on-surface-variant">
              Ownership rights and content usage restrictions.
            </p>
          </div>
        </div>

        {/* SECTIONS */}
        <div className="space-y-10 md:space-y-20 px-4 sm:px-8 md:px-10">

          {/* SECTION 01 */}
          <section className="relative">
            <span className="absolute -left-6 sm:-left-10 top-0 text-[80px] font-extrabold text-primary/10 select-none">
              01
            </span>

            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6">
              Membership & Eligibility
            </h2>

            <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
              By accessing E_Book_Store, you represent that you are at least 18
              years of age or possess legal parental consent. To access certain
              features, you must register for an account.
            </p>

            {/* Note */}
            <div className="bg-surface-container-high p-4 rounded-lg border-l-4 border-primary mb-6">
              <p className="text-xs italic text-on-surface-variant">
                Note: You are solely responsible for maintaining the confidentiality
                of your account credentials.
              </p>
            </div>

            {/* List */}
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="text-primary w-4 h-4" />
                Accounts must be personal and non-transferable.
              </li>

              <li className="flex items-center gap-2">
                <CheckCircle className="text-primary w-4 h-4" />
                We reserve the right to suspend accounts.
              </li>
            </ul>
          </section>

          {/* SECTION 02 */}
          <section className="relative">
            <span className="absolute -left-6 sm:-left-10 top-0 text-[80px] font-extrabold text-primary/10 select-none">
              02
            </span>

            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6">
              Purchases & Digital Access
            </h2>

            <p className="text-sm text-on-surface-variant mb-6">
              All purchases are digital content. Upon successful payment, we grant
              access to your purchased material.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold">Pricing and Payments</h4>
                <p className="text-xs text-on-surface-variant">
                  Prices may change without notice.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">Refund Policy</h4>
                <p className="text-xs text-on-surface-variant">
                  All sales are final for digital goods.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 03 */}
          <section className="relative">
            <span className="absolute -left-6 sm:-left-10 top-0 text-[80px] font-extrabold text-primary/10 select-none">
              03
            </span>

            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6">
              Intellectual Property Rights
            </h2>

            <p className="text-sm text-on-surface-variant mb-6">
              All content is protected by copyright laws and intellectual property rights.
            </p>

            <div className="bg-surface-container-high p-6 rounded-xl border border-outline-variant/20">
              <h4 className="font-semibold mb-3">Prohibited Actions</h4>

              <ul className="space-y-2 text-xs text-on-surface-variant">
                <li>• Distribution via file-sharing networks</li>
                <li>• Commercial resale of assets</li>
                <li>• Modification of content</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}