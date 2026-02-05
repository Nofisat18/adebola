 import { 
   Target, 
   BookOpen, 
   Video, 
   Camera, 
   FileText, 
   MessageSquare,
   type LucideIcon
 } from 'lucide-react';
 
 interface IconItem {
   icon: LucideIcon;
   title: string;
   description?: string;
 }
 
 const services: IconItem[] = [
   {
     icon: Target,
     title: "Social Media Strategy",
     description: "Data-driven content planning and audience growth"
   },
   {
     icon: BookOpen,
     title: "Brand Storytelling",
     description: "Compelling narratives that connect with audiences"
   },
   {
     icon: Video,
     title: "On-Camera Representation",
     description: "Professional spokesperson and presenter services"
   },
   {
     icon: Camera,
     title: "UGC Campaign Content",
     description: "Authentic user-generated style content creation"
   },
   {
     icon: FileText,
     title: "Scriptwriting",
     description: "Engaging scripts for video and audio content"
   },
   {
     icon: MessageSquare,
     title: "Campaign Messaging",
     description: "Clear, impactful brand communication"
   },
 ];
 
 const IconGrid = () => {
   return (
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       {services.map((service, index) => {
         const Icon = service.icon;
         return (
           <div 
             key={service.title}
             className="card-premium p-6 text-center"
             style={{ animationDelay: `${index * 100}ms` }}
           >
             <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
               <Icon className="h-7 w-7 text-primary" />
             </div>
             <h3 className="text-lg font-semibold text-foreground mb-2">
               {service.title}
             </h3>
             {service.description && (
               <p className="text-sm text-muted-foreground">
                 {service.description}
               </p>
             )}
           </div>
         );
       })}
     </div>
   );
 };
 
 export default IconGrid;