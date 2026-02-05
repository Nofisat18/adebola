 import SectionHeader from '@/components/portfolio/SectionHeader';
 import QuoteBlock from '@/components/portfolio/QuoteBlock';
 import ProcessSteps from '@/components/portfolio/ProcessSteps';
 import ToolsGrid from '@/components/portfolio/ToolsGrid';
 import CTASection from '@/components/portfolio/CTASection';
 
 const ProcessPage = () => {
   return (
     <div className="min-h-screen pt-24">
       {/* Header */}
       <section className="section-padding pb-8">
         <div className="container-wide">
           <SectionHeader
             title="My Creative Flow"
             subtitle="A blend of creativity and strategy that delivers results."
             centered
           />
         </div>
       </section>
 
       {/* Quote Block */}
       <section className="pb-16">
         <div className="container-narrow">
           <QuoteBlock
             quote="I like to experiment with new ideas, but keep them grounded in data and audience insight. Every piece of content should have a clear purpose and a distinct flavor."
           />
         </div>
       </section>
 
       {/* Process Steps */}
       <section className="section-padding bg-secondary">
         <div className="container-wide">
           <h3 className="text-2xl font-bold text-foreground text-center mb-12">
             The Process
           </h3>
           <ProcessSteps />
         </div>
       </section>
 
       {/* Favorite Tools */}
       <section className="section-padding">
         <div className="container-wide">
           <h3 className="text-2xl font-bold text-foreground text-center mb-8">
             Favorite Tools
           </h3>
           <div className="max-w-3xl mx-auto">
             <ToolsGrid />
           </div>
         </div>
       </section>
 
       {/* CTA */}
       <CTASection
         title="Let's Create Something Great"
         description="Ready to bring your brand vision to life with strategic, creative content."
         buttonText="Start Your Project"
         buttonLink="/contact"
       />
     </div>
   );
 };
 
 export default ProcessPage;