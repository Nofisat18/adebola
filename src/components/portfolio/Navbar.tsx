 import { useState } from 'react';
 import { Link, useLocation } from 'react-router-dom';
 import { Menu, X } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { cn } from '@/lib/utils';
 
 const navLinks = [
   { href: '/', label: 'Home' },
   { href: '/videos', label: 'Video Portfolio' },
   { href: '/campaigns', label: 'Campaigns' },
   { href: '/spokesperson', label: 'Spokesperson' },
   { href: '/process', label: 'Creative Process' },
   { href: '/metrics', label: 'Metrics' },
   { href: '/contact', label: 'Contact' },
 ];
 
 const Navbar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const location = useLocation();
 
   return (
     <nav className="fixed top-0 left-0 right-0 z-50 glass">
       <div className="container-wide">
         <div className="flex items-center justify-between h-16 md:h-20">
           {/* Logo */}
           <Link to="/" className="text-xl font-bold text-primary">
             Portfolio
           </Link>
 
           {/* Desktop Navigation */}
           <div className="hidden lg:flex items-center gap-1">
             {navLinks.map((link) => (
               <Link
                 key={link.href}
                 to={link.href}
                 className={cn(
                   "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                   location.pathname === link.href
                     ? "bg-primary text-primary-foreground"
                     : "text-muted-foreground hover:text-foreground hover:bg-muted"
                 )}
               >
                 {link.label}
               </Link>
             ))}
           </div>
 
           {/* Mobile Menu Button */}
           <Button
             variant="ghost"
             size="icon"
             className="lg:hidden"
             onClick={() => setIsOpen(!isOpen)}
           >
             {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
           </Button>
         </div>
 
         {/* Mobile Navigation */}
         {isOpen && (
           <div className="lg:hidden pb-4 animate-fade-in">
             <div className="flex flex-col gap-1">
               {navLinks.map((link) => (
                 <Link
                   key={link.href}
                   to={link.href}
                   onClick={() => setIsOpen(false)}
                   className={cn(
                     "px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                     location.pathname === link.href
                       ? "bg-primary text-primary-foreground"
                       : "text-muted-foreground hover:text-foreground hover:bg-muted"
                   )}
                 >
                   {link.label}
                 </Link>
               ))}
             </div>
           </div>
         )}
       </div>
     </nav>
   );
 };
 
 export default Navbar;