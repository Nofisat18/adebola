 import { Link } from 'react-router-dom';
 import { ArrowRight } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 
 interface CTASectionProps {
   title: string;
   description: string;
   buttonText: string;
   buttonLink: string;
 }
 
 const CTASection = ({ title, description, buttonText, buttonLink }: CTASectionProps) => {
   return (
     <section className="section-padding bg-secondary">
       <div className="container-narrow text-center">
         <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
           {title}
         </h2>
         <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
           {description}
         </p>
         <Button asChild variant="hero" size="lg">
           <Link to={buttonLink}>
             {buttonText}
             <ArrowRight className="h-5 w-5 ml-2" />
           </Link>
         </Button>
       </div>
     </section>
   );
 };
 
 export default CTASection;