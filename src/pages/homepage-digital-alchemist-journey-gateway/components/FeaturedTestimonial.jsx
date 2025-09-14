import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FeaturedTestimonial = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const testimonial = {
    id: 1,
    client: {
      name: "Sarah Mitchell",
      title: "Founder & CEO",
      company: "EcoLiving Essentials",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b619?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80",
      location: "Portland, Oregon"
    },
    project: {
      type: "Shopify Store Development",
      duration: "3 months",
      year: "2019",
      results: {
        revenue: "+340%",
        conversion: "+125%",
        traffic: "+280%"
      }
    },
    quote: {
      short: "Cdw didn\'t just build us a website - he transformed our entire business. His dedication and expertise turned our small eco-friendly startup into a thriving online business.",
      full: `When I first contacted Cdw, I was running a small eco-friendly products business from my garage with just a basic website that barely worked. I had big dreams but limited budget and technical knowledge.

From our very first conversation, Cdw understood not just what I needed technically, but what I was trying to achieve as a business owner. He didn't just quote me a price and disappear - he became a true partner in my success.

The Shopify store he built wasn't just beautiful (though it absolutely was), it was strategically designed to convert visitors into customers. Every element had a purpose, from the product photography guidelines he provided to the checkout flow optimization.

But what impressed me most was his commitment to my success beyond the project completion. He provided training, ongoing support, and even helped me understand my analytics so I could make informed decisions.

Within 6 months of launch, we went from $2,000/month to over $8,000/month in revenue. Today, three years later, we're a six-figure business with customers in 15 countries. None of this would have been possible without Cdw's expertise and genuine care for our success.

He proved that determination and authentic partnership can overcome any technical challenge. I've recommended him to dozens of other business owners, and every single one has had the same transformative experience.`
    },
    tags: ["First Client", "Shopify Expert", "Long-term Partnership", "Mentorship"]
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium mb-4">
              <Icon name="Star" size={16} />
              <span>Featured Success Story</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Where It All <span className="gradient-text">Began</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The first client testimonial that validated the journey from borrowed computer to digital transformation expert.
            </p>
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-neon transition-all duration-500"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 p-8 border-b border-border">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                {/* Client Info */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image
                      src={testimonial?.client?.avatar}
                      alt={testimonial?.client?.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-accent/30"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                      <Icon name="CheckCircle" size={14} className="text-black" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {testimonial?.client?.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {testimonial?.client?.title} at {testimonial?.client?.company}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <Icon name="MapPin" size={12} className="mr-1" />
                      {testimonial?.client?.location}
                    </p>
                  </div>
                </div>

                {/* Project Results */}
                <div className="flex-1 grid grid-cols-3 gap-4 md:ml-auto">
                  {Object.entries(testimonial?.project?.results)?.map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-2xl font-bold text-accent">{value}</div>
                      <div className="text-xs text-muted-foreground capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {testimonial?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full border border-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="p-8">
              {/* Quote Icon */}
              <div className="mb-6">
                <Icon name="Quote" size={48} className="text-accent/30" />
              </div>

              {/* Quote Text */}
              <div className="space-y-4">
                <blockquote className="text-lg md:text-xl leading-relaxed text-foreground">
                  "{isExpanded ? testimonial?.quote?.full : testimonial?.quote?.short}"
                </blockquote>

                {/* Expand/Collapse Button */}
                <motion.button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-flex items-center space-x-2 text-accent hover:text-accent/80 transition-colors duration-200 text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{isExpanded ? 'Read Less' : 'Read Full Story'}</span>
                  <Icon 
                    name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="transition-transform duration-200"
                  />
                </motion.button>
              </div>

              {/* Project Details */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <div className="text-muted-foreground mb-1">Project Type</div>
                    <div className="font-medium">{testimonial?.project?.type}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Duration</div>
                    <div className="font-medium">{testimonial?.project?.duration}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Year Completed</div>
                    <div className="font-medium">{testimonial?.project?.year}</div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-8 p-6 bg-accent/5 rounded-xl border border-accent/20">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      Ready for your transformation story?
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Join Sarah and 150+ other successful business owners who chose authentic partnership.
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Award" size={16} className="text-accent" />
                    <span>Verified Shopify Expert</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-accent" />
                <span>150+ Businesses Transformed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={16} className="text-electric-gold" />
                <span>98% Client Satisfaction</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Globe" size={16} className="text-neon-purple" />
                <span>25+ Countries Served</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTestimonial;