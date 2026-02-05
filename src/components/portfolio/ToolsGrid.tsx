 import { 
   Scissors, 
   Palette, 
   BarChart3, 
   Smartphone, 
   FolderOpen, 
   CheckSquare,
   Presentation,
   type LucideIcon
 } from 'lucide-react';
 
 interface Tool {
   icon: LucideIcon;
   name: string;
 }
 
 const tools: Tool[] = [
   { icon: Scissors, name: "CapCut" },
   { icon: Palette, name: "Canva" },
   { icon: BarChart3, name: "Meta Business Suite" },
   { icon: Smartphone, name: "TikTok & Instagram" },
   { icon: FolderOpen, name: "Google Workspace" },
   { icon: CheckSquare, name: "Trello" },
   { icon: Presentation, name: "PowerPoint" },
 ];
 
 const ToolsGrid = () => {
   return (
     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
       {tools.map((tool) => {
         const Icon = tool.icon;
         return (
           <div 
             key={tool.name}
             className="card-premium p-4 flex items-center gap-3"
           >
             <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
               <Icon className="h-5 w-5 text-primary" />
             </div>
             <span className="font-medium text-foreground text-sm">{tool.name}</span>
           </div>
         );
       })}
     </div>
   );
 };
 
 export default ToolsGrid;