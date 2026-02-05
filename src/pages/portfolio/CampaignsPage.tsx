 import SectionHeader from '@/components/portfolio/SectionHeader';
 import CampaignCard from '@/components/portfolio/CampaignCard';
 import CTASection from '@/components/portfolio/CTASection';
 import campaignsData from '@/data/campaigns.json';
 import type { CampaignData } from '@/types/portfolio';
 
 const typedCampaignsData = campaignsData as CampaignData;
 
 const CampaignsPage = () => {
   return (
     <div className="min-h-screen pt-24">
       {/* Header */}
       <section className="section-padding pb-8">
         <div className="container-wide">
           <SectionHeader
             title="Campaign Work"
             subtitle="Featured brand collaborations showcasing strategic content creation and spokesperson services."
             centered
           />
         </div>
       </section>
 
       {/* Campaigns Grid */}
       <section className="pb-16">
         <div className="container-wide">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {typedCampaignsData.campaigns.map((campaign) => (
               <CampaignCard key={campaign.id} campaign={campaign} />
             ))}
           </div>
         </div>
       </section>
 
       {/* CTA */}
       <CTASection
         title="Ready for Your Campaign?"
         description="Let's create content that drives engagement and builds lasting brand connections."
         buttonText="Discuss Your Campaign"
         buttonLink="/contact"
       />
     </div>
   );
 };
 
 export default CampaignsPage;