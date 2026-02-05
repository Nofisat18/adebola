 import { ArrowRight } from 'lucide-react';
 
 const steps = [
   { number: "01", title: "Ideation", description: "Brainstorming creative concepts" },
   { number: "02", title: "Audience Insight", description: "Understanding your target market" },
   { number: "03", title: "Content Creation", description: "Crafting compelling content" },
   { number: "04", title: "Campaign Launch", description: "Strategic distribution" },
   { number: "05", title: "Analyze & Refine", description: "Data-driven optimization" },
 ];
 
 const ProcessSteps = () => {
   return (
     <div className="relative">
       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-4">
         {steps.map((step, index) => (
           <div key={step.number} className="flex items-center gap-4">
             <div className="flex flex-col items-center text-center flex-1">
               <div className="h-16 w-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-3">
                 {step.number}
               </div>
               <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
               <p className="text-xs text-muted-foreground">{step.description}</p>
             </div>
             {index < steps.length - 1 && (
               <ArrowRight className="hidden md:block h-6 w-6 text-muted-foreground shrink-0" />
             )}
           </div>
         ))}
       </div>
     </div>
   );
 };
 
 export default ProcessSteps;