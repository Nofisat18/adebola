 import { Metric } from '@/types/portfolio';
 
 interface MetricCardProps {
   metric: Metric;
 }
 
 const MetricCard = ({ metric }: MetricCardProps) => {
   return (
     <div className="card-premium p-6 md:p-8 text-center">
       <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
         {metric.value}
       </div>
       <h3 className="text-lg font-semibold text-foreground mb-2">
         {metric.title}
       </h3>
       <p className="text-sm text-muted-foreground leading-relaxed">
         {metric.description}
       </p>
       {metric.screenshot && (
         <div className="mt-4 rounded-lg overflow-hidden border border-border">
           <img
             src={metric.screenshot}
             alt={`${metric.title} analytics`}
             className="w-full h-auto"
           />
         </div>
       )}
     </div>
   );
 };
 
 export default MetricCard;