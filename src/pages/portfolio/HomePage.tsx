 import { Link } from 'react-router-dom';
 import { ArrowRight, Play } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import SectionHeader from '@/components/portfolio/SectionHeader';
 import IconGrid from '@/components/portfolio/IconGrid';
 import CTASection from '@/components/portfolio/CTASection';
 import profileData from '@/data/profile.json';
 
 const HomePage = () => {
   return (
     <div className="min-h-screen">
       {/* Hero Section */}
       <section className="min-h-screen flex items-center pt-20">
         <div className="container-wide">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
             {/* Left: Text */}
             <div className="order-2 lg:order-1 animate-fade-in-up">
               <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6">
                 {profileData.title}
               </h1>
               <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
                 {profileData.subtitle}
               </p>
               <div className="flex flex-wrap gap-4">
                 <Button asChild variant="hero" size="lg">
                   <Link to="/videos">
                     <Play className="h-5 w-5 mr-1" fill="currentColor" />
                     View Video Portfolio
                   </Link>
                 </Button>
                 <Button asChild variant="outline" size="lg">
                   <Link to="/campaigns">
                     View Campaign Work
                     <ArrowRight className="h-5 w-5 ml-1" />
                   </Link>
                 </Button>
               </div>
             </div>
 
             {/* Right: Image */}
             <div className="order-1 lg:order-2 animate-blur-in">
               <div className="relative">
                 <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
                 <img
                   src={profileData.heroImage}
                   alt={profileData.name}
                   className="relative w-full aspect-[4/5] object-cover rounded-3xl shadow-elevated"
                 />
               </div>
             </div>
           </div>
         </div>
       </section>
 
       {/* Who Am I Section */}
       <section className="section-padding bg-secondary">
         <div className="container-wide">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
             <div>
               <SectionHeader 
                 title="Who Am I" 
                 subtitle="A creative strategist who turns brand messages into audience connections."
               />
               <p className="text-muted-foreground leading-relaxed mb-6">
                 {profileData.bio}
               </p>
               <Button asChild variant="default">
                 <Link to="/spokesperson">
                   Learn More About Me
                   <ArrowRight className="h-4 w-4 ml-1" />
                 </Link>
               </Button>
             </div>
             <div className="relative">
               <img
                 src={profileData.lifestyleImage}
                 alt="Lifestyle"
                 className="w-full aspect-square object-cover rounded-3xl shadow-card"
               />
             </div>
           </div>
         </div>
       </section>
 
       {/* What I Do Section */}
       <section className="section-padding">
         <div className="container-wide">
           <SectionHeader 
             title="What I Do" 
             subtitle="Full-service content creation and brand representation."
             centered
           />
           <IconGrid />
         </div>
       </section>
 
       {/* CTA Section */}
       <CTASection
         title="Ready to Elevate Your Brand?"
         description="Let's create content that resonates with your audience and drives real results."
         buttonText="Get in Touch"
         buttonLink="/contact"
       />
     </div>
   );
 };
 
 export default HomePage;