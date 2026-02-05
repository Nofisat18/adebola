 import { useState } from 'react';
 import { Play, X } from 'lucide-react';
 import { Video } from '@/types/portfolio';
 import { Badge } from '@/components/ui/badge';
 import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
 import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
 
 interface VideoCardProps {
   video: Video;
 }
 
 const VideoCard = ({ video }: VideoCardProps) => {
   const [isOpen, setIsOpen] = useState(false);
 
   return (
     <>
       <div 
         className="group card-premium overflow-hidden cursor-pointer"
         onClick={() => setIsOpen(true)}
       >
         {/* Thumbnail */}
         <div className="relative aspect-video overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent z-10" />
           <img
             src={video.thumbnail}
             alt={video.title}
             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
           />
           {/* Play Button */}
           <div className="absolute inset-0 flex items-center justify-center z-20">
             <div className="h-16 w-16 rounded-full bg-background/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
               <Play className="h-7 w-7 text-primary ml-1" fill="currentColor" />
             </div>
           </div>
           {/* Content Type Badge */}
           <Badge className="absolute top-4 left-4 z-20 bg-primary text-primary-foreground">
             {video.contentType}
           </Badge>
         </div>
 
         {/* Content */}
         <div className="p-5">
           <p className="text-sm font-medium text-primary mb-1">{video.brand}</p>
           <h3 className="text-lg font-semibold text-foreground mb-2">{video.title}</h3>
           <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{video.description}</p>
           <div className="flex items-center gap-2">
             <span className="text-xs text-muted-foreground">Skill:</span>
             <Badge variant="secondary" className="text-xs">
               {video.skillDemonstrated}
             </Badge>
           </div>
         </div>
       </div>
 
       {/* Video Modal */}
       <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogContent className="max-w-4xl p-0 overflow-hidden">
           <VisuallyHidden>
             <DialogTitle>{video.title}</DialogTitle>
           </VisuallyHidden>
           <button
             onClick={() => setIsOpen(false)}
             className="absolute top-4 right-4 z-50 h-10 w-10 rounded-full bg-background/90 flex items-center justify-center hover:bg-background transition-colors"
           >
             <X className="h-5 w-5" />
           </button>
           <div className="aspect-video">
             <iframe
               src={video.videoUrl}
               className="w-full h-full"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowFullScreen
             />
           </div>
         </DialogContent>
       </Dialog>
     </>
   );
 };
 
 export default VideoCard;