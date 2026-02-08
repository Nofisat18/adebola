import { Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  title: string;
  image: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Tosin Olayiwola",
    title: "CEO, Smart Glass Africa, Fabmac",
    image: "/images/testimonial-tosin.jpg",
    quote: "I have had the pleasure of working closely with Adebola and can confidently say he has an excellent work ethic and a genuine get-the-job-done attitude. He is highly dependable, takes responsibility seriously, and consistently delivers tasks with focus and dedication. Spence also has a strong desire to learn and improve, always looking for better ways to achieve results. His hard work and commitment have contributed significantly to Smart Glass Africa's growth.",
  },
  {
    name: "OAP Ezekiel Onome",
    title: "CEO, Show Glass LLC",
    image: "/images/testimonial-ezekiel.jpg",
    quote: "Spence brings clarity to how brands communicate and shows up on camera in a way that feels natural and relatable. He's a superstar really.",
  },
  {
    name: "Toyosi Ajayi",
    title: "Founder, Stage Africa Media",
    image: "/images/testimonial-toyosi.jpg",
    quote: "Adebola thinks deeply about storytelling and knows how to shape messages so they land with the audience. He just knows how to connect with the people who should be watching.",
  },
  {
    name: "Mc Rhelax",
    title: "Corporate Host, Global Speaker, Hiptv Anchor",
    image: "/images/testimonial-rhelax.jpg",
    quote: "Adebola understands presence, timing, and how to hold attention on camera, which makes him valuable in media work. He's big on networking too. A real superstar.",
  },
];

const TestimonialSection = () => {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What People Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by leaders and brands who value dedication, authenticity, and results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="card-premium p-8 md:p-10 relative"
            >
              {/* Quote icon */}
              <div className="absolute -top-5 left-8 h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <Quote className="h-5 w-5 text-primary-foreground" />
              </div>

              {/* Quote text */}
              <blockquote className="text-foreground/90 leading-relaxed text-lg md:text-xl italic mb-8">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full overflow-hidden shrink-0 ring-2 ring-primary/20">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
