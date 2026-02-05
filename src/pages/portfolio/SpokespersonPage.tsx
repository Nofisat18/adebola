 import { Check } from 'lucide-react';
 import SectionHeader from '@/components/portfolio/SectionHeader';
 import CTASection from '@/components/portfolio/CTASection';
 import profileData from '@/data/profile.json';
 
 const strengths = [
   "On-camera delivery",
   "Simplifying technical products",
   "Audience retention storytelling",
   "Tone adaptability",
   "Brand message alignment",
 ];
 
 const industries = [
   { name: "Tech & Modern Living", emoji: "💻" },
   { name: "Fashion & Lifestyle", emoji: "👗" },
   { name: "Travel & Hospitality", emoji: "✈️" },
   { name: "Retail & Consumer Goods", emoji: "🛍️" },
   { name: "Tourism & Public Sector", emoji: "🏛️" },
   { name: "Creator Tools & Platforms", emoji: "🎬" },
 ];
 
 const SpokespersonPage = () => {
   return (
     <div className="min-h-screen pt-24">
       {/* Header with Image */}
       <section className="section-padding pb-8">
         <div className="container-wide">
           <div className="max-w-3xl mx-auto text-center mb-12">
             <div className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden shadow-elevated">
               <img
                 src={profileData.spokespersonImage}
                 alt={profileData.name}
                 className="w-full h-full object-cover"
               />
             </div>
             <SectionHeader
               title="Spokesperson Services"
               subtitle="Professional on-camera representation that brings your brand message to life with authenticity and impact."
               centered
             />
           </div>
         </div>
       </section>
 
       {/* Two Column Layout */}
       <section className="pb-16">
         <div className="container-wide">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
             {/* Left: Strengths */}
             <div className="card-premium p-8">
               <h3 className="text-2xl font-bold text-foreground mb-6">My Strengths</h3>
               <ul className="space-y-4">
                 {strengths.map((strength) => (
                   <li key={strength} className="flex items-center gap-3">
                     <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                       <Check className="h-4 w-4 text-primary" />
                     </div>
                     <span className="text-foreground font-medium">{strength}</span>
                   </li>
                 ))}
               </ul>
             </div>
 
             {/* Right: Industries */}
             <div className="card-premium p-8">
               <h3 className="text-2xl font-bold text-foreground mb-6">Industry Suitability</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {industries.map((industry) => (
                   <div 
                     key={industry.name}
                     className="flex items-center gap-3 p-4 rounded-xl bg-secondary"
                   >
                     <span className="text-2xl">{industry.emoji}</span>
                     <span className="text-foreground font-medium text-sm">{industry.name}</span>
                   </div>
                 ))}
               </div>
             </div>
           </div>
         </div>
       </section>
 
       {/* CTA */}
       <CTASection
         title="Need a Brand Spokesperson?"
         description="I bring your brand's voice to life with authentic, engaging on-camera presence."
         buttonText="Book a Consultation"
         buttonLink="/contact"
       />
     </div>
   );
 };
 
 export default SpokespersonPage;