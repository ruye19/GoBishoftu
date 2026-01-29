export function Footer() {
  return (
    <footer className="bg-foreground/5 border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                🌿
              </div>
              <span className="font-bold text-foreground">goBishoftu</span>
            </div>
            <p className="text-sm text-foreground/70">
              Discover the beauty and culture of Bishoftu through luxury
              experiences and authentic exploration.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>
                <a href="/" className="hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/accommodations"
                  className="hover:text-primary transition-colors"
                >
                  Accommodations
                </a>
              </li>
              <li>
                <a
                  href="/explore"
                  className="hover:text-primary transition-colors"
                >
                  Explore
                </a>
              </li>
              <li>
                <a
                  href="/investment"
                  className="hover:text-primary transition-colors"
                >
                  Investment
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>Email: info@gobisoftu.com</li>
              <li>Phone: +251 (0) 114 300 100</li>
              <li>Bishoftu, Ethiopia</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8">
          <p className="text-center text-sm text-foreground/60">
            © {new Date().getFullYear()} goBishoftu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
