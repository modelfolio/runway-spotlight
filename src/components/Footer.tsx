const Footer = () => (
  <footer className="relative border-t border-border bg-background py-10 px-8 md:px-14">
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      {/* Zara-style logo wordmark */}
      <div>
        <p
          className="font-display font-medium text-foreground uppercase select-none"
          style={{ fontSize: "1.3rem", letterSpacing: "0.06em" }}
        >
          ALLIANCE
        </p>
        <p className="font-body font-light text-xs tracking-[0.38em] uppercase text-foreground/35 mt-1.5">
          Model & Artist Management · Est. 2019
        </p>
      </div>

      <p className="font-body font-light text-xs text-foreground/30 tracking-wide">
        © {new Date().getFullYear()} Alliance Talent Management.
      </p>
    </div>
  </footer>
);

export default Footer;
