interface Tool {
  name: string;
  logo: string;
}

const tools: Tool[] = [
  { name: "CapCut", logo: "/images/tools/capcut.svg" },
  { name: "Canva", logo: "/images/tools/canva.svg" },
  { name: "Meta Business Suite", logo: "/images/tools/meta.svg" },
  { name: "TikTok", logo: "/images/tools/tiktok.svg" },
  { name: "Instagram", logo: "/images/tools/instagram.svg" },
  { name: "Google Workspace", logo: "/images/tools/google.svg" },
  { name: "Trello", logo: "/images/tools/trello.svg" },
  { name: "PowerPoint", logo: "/images/tools/powerpoint.svg" },
];

const ToolsGrid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {tools.map((tool) => (
        <div 
          key={tool.name}
          className="card-premium p-4 flex items-center gap-3"
        >
          <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0 p-1.5">
            <img 
              src={tool.logo} 
              alt={tool.name} 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-medium text-foreground text-sm">{tool.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ToolsGrid;