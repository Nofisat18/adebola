import { useState } from 'react';
import SectionHeader from '@/components/portfolio/SectionHeader';
import VideoCard from '@/components/portfolio/VideoCard';
import CTASection from '@/components/portfolio/CTASection';
import { cn } from '@/lib/utils';
import videosData from '@/data/videos.json';
import type { VideoData } from '@/types/portfolio';

const typedVideosData = videosData as VideoData;

const VideosPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredVideos = activeCategory === 'All'
    ? typedVideosData.videos
    : typedVideosData.videos.filter(video => video.category === activeCategory);

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="section-padding pb-8">
        <div className="container-wide">
          <SectionHeader
            title="Content Showcase"
            subtitle="A showcase of brand storytelling, UGC content, and on-camera work across diverse industries."
            centered
          />

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {typedVideosData.categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="pb-16">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No videos found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Like What You See?"
        description="Let's discuss how I can create compelling video content for your brand."
        buttonText="Start a Project"
        buttonLink="/contact"
      />
    </div>
  );
};

export default VideosPage;