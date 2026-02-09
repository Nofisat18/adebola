import { useState } from 'react';
import { Metric } from '@/types/portfolio';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { TrendingUp, ZoomIn } from 'lucide-react';

interface MetricCardProps {
  metric: Metric;
}

const MetricCard = ({ metric }: MetricCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="card-premium overflow-hidden group">
        {/* Metric Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              {metric.title}
            </span>
          </div>
          <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
            {metric.value}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {metric.description}
          </p>
        </div>

        {/* Screenshot in Phone Mockup */}
        {metric.screenshot && (
          <div 
            className="px-6 pb-6 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <div className="relative rounded-2xl overflow-hidden bg-foreground/5 border border-border group-hover:border-primary/30 transition-all duration-300">
              {/* Phone-style top bar */}
              <div className="bg-foreground/90 px-4 py-1.5 flex items-center justify-center gap-1">
                <div className="w-12 h-1 rounded-full bg-foreground/30" />
              </div>
              <img
                src={metric.screenshot}
                alt={`${metric.title} analytics`}
                className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/90 rounded-full p-2">
                  <ZoomIn className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Screenshot Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg p-2 bg-foreground/95">
          <VisuallyHidden>
            <DialogTitle>{metric.title} Analytics</DialogTitle>
          </VisuallyHidden>
          <img
            src={metric.screenshot}
            alt={`${metric.title} analytics`}
            className="w-full h-auto rounded-lg"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MetricCard;