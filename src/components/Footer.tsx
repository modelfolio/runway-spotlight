const Footer = () => (
  <footer className="border-t border-border py-12 px-6">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="font-display text-xl font-bold text-primary tracking-wider">ÉLITE</p>
      <p className="font-body text-sm text-muted-foreground">
        © {new Date().getFullYear()} Élite Models. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
