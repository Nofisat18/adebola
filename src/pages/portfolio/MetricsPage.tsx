 import SectionHeader from '@/components/portfolio/SectionHeader';
 import MetricCard from '@/components/portfolio/MetricCard';
 import CTASection from '@/components/portfolio/CTASection';
 import metricsData from '@/data/metrics.json';
 import type { MetricData } from '@/types/portfolio';
 
 const typedMetricsData = metricsData as MetricData;
 
 const MetricsPage = () => {
   return (
     <div className="min-h-screen pt-24">
       {/* Header */}
       <section className="section-padding pb-8">
         <div className="container-wide">
           <SectionHeader
             title="Results That Matter"
             subtitle="Real performance metrics from brand collaborations and content campaigns."
             centered
           />
         </div>
       </section>
 
       {/* Metrics Grid */}
       <section className="pb-16">
         <div className="container-wide">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {typedMetricsData.metrics.map((metric) => (
               <MetricCard key={metric.id} metric={metric} />
             ))}
           </div>
         </div>
       </section>
 
       {/* CTA */}
       <CTASection
         title="Ready for Results?"
         description="Let's create content that moves the needle for your brand."
         buttonText="Let's Talk Numbers"
         buttonLink="/contact"
       />
     </div>
   );
 };
 
 export default MetricsPage;