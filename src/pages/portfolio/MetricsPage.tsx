import { Award } from 'lucide-react';
import SectionHeader from '@/components/portfolio/SectionHeader';
import MetricCard from '@/components/portfolio/MetricCard';
import CTASection from '@/components/portfolio/CTASection';
import metricsData from '@/data/metrics.json';
import type { MetricData } from '@/types/portfolio';

const typedMetricsData = metricsData as MetricData;

const MetricsPage = () => {
  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="section-padding pb-8">
        <div className="container-wide">
          <SectionHeader
            title="Results That Matter"
            subtitle="Real performance metrics from brand collaborations and content campaigns."
            centered
          />
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="pb-16">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {typedMetricsData.metrics.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>
        </div>
      </section>

      {/* Recognition Certificate Section */}
      <section className="section-padding bg-secondary">
        <div className="container-wide">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Award className="h-4 w-4" />
              Recognition
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Certified Excellence
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Recognized for outstanding contributions in video content creation.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="card-premium p-4 md:p-6 overflow-hidden">
              <img
                src="/images/certificate-pureworker.jpg"
                alt="PureWorker Video Content Creator Certificate - Awarded to Awotayo Adebola Damilola"
                className="w-full h-auto rounded-xl shadow-soft"
              />
              <div className="mt-4 text-center">
                <h3 className="font-semibold text-foreground">Video Content Creator</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  PureWorker - July to November 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready for Results?"
        description="Let's create content that moves the needle for your brand."
        buttonText="Let's Talk Numbers"
        buttonLink="/contact"
      />
    </div>
  );
};

export default MetricsPage;