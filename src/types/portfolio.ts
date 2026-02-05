 export interface Profile {
   name: string;
   title: string;
   subtitle: string;
   heroImage: string;
   lifestyleImage: string;
   spokespersonImage: string;
   bio: string;
   email: string;
   socials: {
     instagram: string;
     tiktok: string;
     linkedin: string;
   };
 }
 
 export interface Video {
   id: string;
   title: string;
   brand: string;
   category: string;
   thumbnail: string;
   videoUrl: string;
   contentType: string;
   description: string;
   skillDemonstrated: string;
 }
 
 export interface VideoData {
   categories: string[];
   videos: Video[];
 }
 
 export interface Campaign {
   id: string;
   name: string;
   image: string;
   campaignType: string;
   contentProduced: string;
   focusSkill: string;
   videoUrl: string | null;
 }
 
 export interface CampaignData {
   campaigns: Campaign[];
 }
 
 export interface Metric {
   id: string;
   title: string;
   value: string;
   description: string;
   screenshot: string;
 }
 
 export interface MetricData {
   metrics: Metric[];
 }
 
 export interface ContactFormData {
   name: string;
   email: string;
   company: string;
   projectType: string;
   message: string;
 }