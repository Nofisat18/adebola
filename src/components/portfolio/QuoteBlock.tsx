 import { Quote } from 'lucide-react';
 
 interface QuoteBlockProps {
   quote: string;
   author?: string;
 }
 
 const QuoteBlock = ({ quote, author }: QuoteBlockProps) => {
   return (
     <div className="relative bg-secondary rounded-3xl p-8 md:p-12 lg:p-16">
       <Quote className="absolute top-8 left-8 h-12 w-12 text-primary/20" />
       <blockquote className="relative z-10">
         <p className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground leading-relaxed text-center">
           "{quote}"
         </p>
         {author && (
           <footer className="mt-6 text-center">
             <cite className="text-muted-foreground not-italic">{author}</cite>
           </footer>
         )}
       </blockquote>
     </div>
   );
 };
 
 export default QuoteBlock;