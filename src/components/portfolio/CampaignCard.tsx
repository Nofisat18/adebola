 import { useState } from 'react';
 import { Play, ExternalLink, X } from 'lucide-react';
 import { Campaign } from '@/types/portfolio';
 import { Badge } from '@/components/ui/badge';
 import { Button } from '@/components/ui/button';
 import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
 import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
 
 interface CampaignCardProps {
   campaign: Campaign;
 }
 
 const CampaignCard = ({ campaign }: CampaignCardProps) => {
   const [isVideoOpen, setIsVideoOpen] = useState(false);
 
   return (
     <>
       <div className="group card-premium overflow-hidden">
         {/* Image */}
         <div className="relative aspect-[4/3] overflow-hidden">
           <img
             src={campaign.image}
             alt={campaign.name}
             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
           />
           {campaign.videoUrl && (
             <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <Button
                 variant="secondary"
                 size="icon"
                 className="h-14 w-14"
                 onClick={(e) => {
                   e.stopPropagation();
                   setIsVideoOpen(true);
                 }}
               >
                 <Play className="h-6 w-6 ml-0.5" fill="currentColor" />
               </Button>
             </div>
           )}
         </div>
 
         {/* Content */}
         <div className="p-5">
           <div className="flex items-start justify-between gap-4 mb-3">
             <h3 className="text-xl font-semibold text-foreground">{campaign.name}</h3>
             <Badge variant="outline">{campaign.campaignType}</Badge>
           </div>
           
           <div className="space-y-2 text-sm">
             <div className="flex items-start gap-2">
               <span className="text-muted-foreground shrink-0">Content:</span>
               <span className="text-foreground">{campaign.contentProduced}</span>
             </div>
             <div className="flex items-start gap-2">
               <span className="text-muted-foreground shrink-0">Focus:</span>
               <Badge variant="secondary">{campaign.focusSkill}</Badge>
             </div>
           </div>
 
           {campaign.videoUrl && (
             <Button
               variant="ghost"
               size="sm"
               className="mt-4 text-primary"
               onClick={() => setIsVideoOpen(true)}
             >
               <Play className="h-4 w-4 mr-1" />
               Watch Video
               <ExternalLink className="h-3 w-3 ml-1" />
             </Button>
           )}
         </div>
       </div>
 
       {/* Video Modal */}
       {campaign.videoUrl && (
         <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
           <DialogContent className="max-w-4xl p-0 overflow-hidden">
             <VisuallyHidden>
               <DialogTitle>{campaign.name} Video</DialogTitle>
             </VisuallyHidden>
             <button
               onClick={() => setIsVideoOpen(false)}
               className="absolute top-4 right-4 z-50 h-10 w-10 rounded-full bg-background/90 flex items-center justify-center hover:bg-background transition-colors"
             >
               <X className="h-5 w-5" />
             </button>
             <div className="aspect-video">
               <iframe
                 src={campaign.videoUrl}
                 className="w-full h-full"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                 allowFullScreen
               />
             </div>
           </DialogContent>
         </Dialog>
       )}
     </>
   );
 };
 
 export default CampaignCard;