import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LangSwitcher from "@/components/LangSwitcher";
import clsx from "clsx";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={clsx(
        "bg-white fixed w-full z-50 transition-all duration-300",
        isScrolled && "shadow-md"
      )}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" aria-label="Accueil - Centre D'Imagerie Benameur">
          <a className="flex items-center space-x-2 cursor-pointer">
            <div className="font-bold text-2xl font-heading">
              <span className="text-primary">Centre D'Imagerie</span>{" "}
              <span className="text-secondary">Benameur</span>
            </div>
          </a>
        </Link>

        {/* Desktop Navigation + Lang Switcher */}
        <nav className="hidden md:flex items-center space-x-8 text-dark font-medium" role="navigation" aria-label="Menu principal">
          <NavLink href="/" label="Accueil" />
          <NavLink href="/services" label="Services" />
          <NavLink href="/temoignages" label="Témoignages" />
          <NavLink href="/contact" label="Contact" />
          <NavLink href="/rendez-vous" label="📅 Rendez-vous" />
          <LangSwitcher />
        </nav>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden"
          aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-primary" />
          ) : (
            <Menu className="h-6 w-6 text-primary" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav
          id="mobile-navigation"
          className="bg-white py-4 shadow-inner md:hidden"
          role="navigation"
          aria-label="Menu principal mobile"
        >
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <NavLink href="/" label="Accueil" />
            <NavLink href="/services" label="Services" />
            <NavLink href="/temoignages" label="Témoignages" />
            <NavLink href="/contact" label="Contact" />
            <NavLink href="/rendez-vous" label="📅 Rendez-vous" />
            <LangSwitcher />
          </div>
        </nav>
      )}
    </header>
  );
}

interface NavLinkProps {
  href: string;
  label: string;
}

function NavLink({ href, label }: NavLinkProps) {
  const [location] = useLocation();
  const isActive = location === href;

  return (
    <Link href={href}>
      <a
        className={`hover:text-primary transition-colors cursor-pointer ${
          isActive ? "text-primary font-semibold" : ""
        }`}
      >
        {label}
      </a>
    </Link>
  );
}
