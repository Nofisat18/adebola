 import { useState } from 'react';
 import { Send, Instagram, Mail, CheckCircle, Linkedin } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Textarea } from '@/components/ui/textarea';
 import { Label } from '@/components/ui/label';
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from '@/components/ui/select';
 import SectionHeader from '@/components/portfolio/SectionHeader';
 import profileData from '@/data/profile.json';
 import { useToast } from '@/hooks/use-toast';
 
 const TikTokIcon = () => (
   <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
     <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
   </svg>
 );
 
 const projectTypes = [
   "Brand Campaign",
   "Spokesperson Role",
   "UGC Content",
   "Social Media Strategy",
   "Video Production",
   "Other",
 ];
 
 const ContactPage = () => {
   const { toast } = useToast();
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isSubmitted, setIsSubmitted] = useState(false);
   const [formData, setFormData] = useState({
     name: '',
     email: '',
     company: '',
     projectType: '',
     message: '',
   });
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsSubmitting(true);
 
     // Simulate API call
     await new Promise(resolve => setTimeout(resolve, 1500));
 
     // In a real app, you'd send to an API endpoint
     console.log('Form submitted:', formData);
 
     setIsSubmitting(false);
     setIsSubmitted(true);
     toast({
       title: "Message sent!",
       description: "Thanks for reaching out. I'll get back to you soon.",
     });
   };
 
   const handleChange = (field: string, value: string) => {
     setFormData(prev => ({ ...prev, [field]: value }));
   };
 
   if (isSubmitted) {
     return (
       <div className="min-h-screen pt-24 flex items-center justify-center">
         <div className="text-center max-w-md mx-auto px-4">
           <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
             <CheckCircle className="h-10 w-10 text-primary" />
           </div>
           <h1 className="text-3xl font-bold text-foreground mb-4">Message Sent!</h1>
           <p className="text-muted-foreground mb-8">
             Thanks for reaching out. I'll review your message and get back to you within 24-48 hours.
           </p>
           <Button onClick={() => setIsSubmitted(false)} variant="outline">
             Send Another Message
           </Button>
         </div>
       </div>
     );
   }
 
   return (
     <div className="min-h-screen pt-24">
       {/* Header */}
       <section className="section-padding pb-8">
         <div className="container-narrow">
           <SectionHeader
             title="Let's Work Together"
             subtitle="Available for campaigns, spokesperson roles, and creator partnerships."
             centered
           />
         </div>
       </section>
 
       {/* Contact Form & Social Links */}
       <section className="pb-16">
         <div className="container-narrow">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
             {/* Form */}
             <div className="lg:col-span-2">
               <form onSubmit={handleSubmit} className="card-premium p-6 md:p-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <Label htmlFor="name">Name *</Label>
                     <Input
                       id="name"
                       placeholder="Your name"
                       value={formData.name}
                       onChange={(e) => handleChange('name', e.target.value)}
                       required
                       className="rounded-xl"
                     />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="email">Email *</Label>
                     <Input
                       id="email"
                       type="email"
                       placeholder="your@email.com"
                       value={formData.email}
                       onChange={(e) => handleChange('email', e.target.value)}
                       required
                       className="rounded-xl"
                     />
                   </div>
                 </div>
 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                   <div className="space-y-2">
                     <Label htmlFor="company">Brand / Company</Label>
                     <Input
                       id="company"
                       placeholder="Your company name"
                       value={formData.company}
                       onChange={(e) => handleChange('company', e.target.value)}
                       className="rounded-xl"
                     />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="projectType">Project Type</Label>
                     <Select
                       value={formData.projectType}
                       onValueChange={(value) => handleChange('projectType', value)}
                     >
                       <SelectTrigger className="rounded-xl">
                         <SelectValue placeholder="Select project type" />
                       </SelectTrigger>
                       <SelectContent>
                         {projectTypes.map((type) => (
                           <SelectItem key={type} value={type}>
                             {type}
                           </SelectItem>
                         ))}
                       </SelectContent>
                     </Select>
                   </div>
                 </div>
 
                 <div className="mt-6 space-y-2">
                   <Label htmlFor="message">Message *</Label>
                   <Textarea
                     id="message"
                     placeholder="Tell me about your project..."
                     value={formData.message}
                     onChange={(e) => handleChange('message', e.target.value)}
                     required
                     rows={6}
                     className="rounded-xl resize-none"
                   />
                 </div>
 
                 <Button
                   type="submit"
                   variant="hero"
                   size="lg"
                   className="w-full mt-6"
                   disabled={isSubmitting}
                 >
                   {isSubmitting ? (
                     "Sending..."
                   ) : (
                     <>
                       Send Message
                       <Send className="h-4 w-4 ml-2" />
                     </>
                   )}
                 </Button>
               </form>
             </div>
 
             {/* Social Links */}
              <div className="space-y-6">
                <div className="card-premium p-6">
                  <h3 className="font-semibold text-foreground mb-4">Connect With Me</h3>
                  <div className="space-y-3">
                    <a
                      href={profileData.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      <Instagram className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Instagram</span>
                    </a>
                    <a
                      href={profileData.socials.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      <TikTokIcon />
                      <span className="text-sm font-medium">TikTok</span>
                    </a>
                    <a
                      href={profileData.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      <Linkedin className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">LinkedIn</span>
                    </a>
                    <a
                      href={`mailto:${profileData.email}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      <Mail className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">{profileData.email}</span>
                    </a>
                  </div>
                </div>
 
               <div className="card-premium p-6">
                 <h3 className="font-semibold text-foreground mb-2">Response Time</h3>
                 <p className="text-sm text-muted-foreground">
                   I typically respond within 24-48 hours. For urgent inquiries, please reach out via Instagram DM.
                 </p>
               </div>
             </div>
           </div>
         </div>
       </section>
     </div>
   );
 };
 
 export default ContactPage;