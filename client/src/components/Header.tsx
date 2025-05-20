import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LangSwitcher from "@/components/ui/LangSwitcher";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`bg-white fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="font-bold text-2xl font-heading">
              <span className="text-primary">Centre D'Imagerie</span>{" "}
              <span className="text-secondary">Benameur</span>
            </div>
          </div>
        </Link>

        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden"
          aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-primary" />
          ) : (
            <Menu className="h-6 w-6 text-primary" />
          )}
        </Button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-dark font-medium">
          <NavLink href="/" label="Accueil" />
          <NavLink href="/services" label="Services" />
          <NavLink href="/temoignages" label="Témoignages" />
          <NavLink href="/contact" label="Contact" />
          <NavLink href="/rendez-vous" label="📅 Rendez-vous" />
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="bg-white py-4 shadow-inner md:hidden">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <NavLink href="/" label="Accueil" />
            <NavLink href="/services" label="Services" />
            <NavLink href="/temoignages" label="Témoignages" />
            <NavLink href="/contact" label="Contact" />
            <NavLink href="/rendez-vous" label="📅 Rendez-vous" />
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
      <div className={`hover:text-primary transition-colors cursor-pointer ${isActive ? 'text-primary font-semibold' : ''}`}>
        {label}
      </div>
    </Link>
  );
}
