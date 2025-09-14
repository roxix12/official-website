import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { useToast } from '../../../components/ui/Toast';
// import { sendContactEmail } from '../../../services/emailSender';
import { notifyConsultationBooking } from '../../../services/notificationService';

const ConsultationBooking = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredField, setHoveredField] = useState(null);
  const sectionRef = useRef(null);
  const { show } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectDetails: '',
    budget: '',
    timeline: ''
  });

  // Initialize particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      speed: 0.05 + Math.random() * 0.1,
      direction: Math.random() * Math.PI * 2,
      opacity: 0.1 + Math.random() * 0.3,
    }));
    setParticles(newParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + Math.cos(particle.direction) * particle.speed) % 100,
        y: (particle.y + Math.sin(particle.direction) * particle.speed) % 100,
        direction: particle.direction + 0.001,
      })));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  // Track mouse position
  const handleMouseMove = (e) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    }
  };

  const serviceOptions = [
    { 
      value: 'discovery', 
      label: 'Free Discovery Call', 
      duration: '30 min',
      description: 'Perfect for initial project discussion and requirements gathering',
      icon: 'Search',
      color: '#10B981',
      price: 'Free'
    },
    { 
      value: 'consultation', 
      label: 'Strategy Consultation', 
      duration: '60 min',
      description: 'In-depth project planning session with technical roadmap',
      icon: 'Lightbulb',
      color: '#3B82F6',
      price: '$150'
    },
    { 
      value: 'audit', 
      label: 'Website Audit', 
      duration: '90 min',
      description: 'Comprehensive site analysis with optimization recommendations',
      icon: 'Shield',
      color: '#8B5CF6',
      price: '$300'
    },
    { 
      value: 'workshop', 
      label: 'Technical Workshop', 
      duration: '2 hours',
      description: 'Hands-on problem-solving session with implementation guidance',
      icon: 'Wrench',
      color: '#F59E0B',
      price: '$500'
    }
  ];

  const timeSlots = [
    { value: '9am', label: '9:00 AM EST', available: true },
    { value: '11am', label: '11:00 AM EST', available: true },
    { value: '2pm', label: '2:00 PM EST', available: false },
    { value: '4pm', label: '4:00 PM EST', available: true },
    { value: '6pm', label: '6:00 PM EST', available: true }
  ];

  const budgetOptions = [
    { value: 'under-5k', label: 'Under $5,000', icon: 'DollarSign' },
    { value: '5k-15k', label: '$5,000 - $15,000', icon: 'DollarSign' },
    { value: '15k-30k', label: '$15,000 - $30,000', icon: 'DollarSign' },
    { value: 'over-30k', label: 'Over $30,000', icon: 'DollarSign' },
    { value: 'discuss', label: "Let's discuss", icon: 'MessageCircle' }
  ];

  const timelineOptions = [
    { value: 'asap', label: 'ASAP', icon: 'Zap' },
    { value: '1-month', label: 'Within 1 month', icon: 'Calendar' },
    { value: '2-3-months', label: '2-3 months', icon: 'Calendar' },
    { value: '3-6-months', label: '3-6 months', icon: 'Calendar' },
    { value: 'flexible', label: 'Flexible timeline', icon: 'Clock' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Email service temporarily disabled for development
      console.log('📧 Consultation email would be sent:', {
        form: 'consultation-booking',
        to: 'cdwburhan@gmail.com',
        subject: `Consultation request: ${selectedService || 'General'}`,
        service: serviceOptions.find(s => s.value === selectedService)?.label || 'General',
        time: selectedTime,
        ...formData,
      });

      // Send notification email to admin (async, don't block success)
      try {
        await notifyConsultationBooking({
          service: serviceOptions.find(s => s.value === selectedService)?.label || 'General',
          time: selectedTime,
          ...formData
        });
        console.log('📧 Admin notification sent for consultation booking');
      } catch (notificationError) {
        console.error('⚠️ Failed to send admin notification (booking still submitted):', notificationError);
        // Don't fail the booking if notification fails
      }
      
      show({ 
        type: 'success', 
        title: 'Consultation booked successfully!', 
        message: "I'll confirm your booking within 24 hours and send you a calendar invite." 
      });
      
      // Reset form
      setFormData({ name: '', email: '', company: '', phone: '', projectDetails: '', budget: '', timeline: '' });
      setSelectedService('');
      setSelectedTime('');
      
    } catch (err) {
      show({ 
        type: 'error', 
        title: 'Booking failed', 
        message: 'Please try again later or email me directly at contact@codewithburhan.com' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedServiceData = serviceOptions.find(s => s.value === selectedService);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-blue-400"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Dynamic Background Gradient */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #3B82F640 0%, transparent 70%)`,
        }}
        animate={{
          opacity: hoveredField ? 0.4 : 0.2,
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full mb-8"
            animate={{
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.3)",
                "0 0 40px rgba(6, 182, 212, 0.4)",
                "0 0 20px rgba(59, 130, 246, 0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Icon name="Calendar" size={20} className="mr-2 text-blue-400" />
            <span className="text-blue-300 font-medium">START YOUR JOURNEY</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Book Your </span>
            <motion.span
              className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Consultation
            </motion.span>
          </h2>

          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Ready to transform your digital presence? Let's discuss your vision and create a{' '}
            <motion.span
              className="text-blue-400 font-semibold"
              animate={{ color: ["#60A5FA", "#06B6D4", "#60A5FA"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              partnership plan
            </motion.span>
            {' '}that drives real results.
          </motion.p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Service Selection */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 md:mb-8">Choose Your Consultation</h3>
              
              <div className="space-y-4 mb-8">
                {serviceOptions.map((service, index) => (
                  <motion.div
                    key={service.value}
                    className={`relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border cursor-pointer transition-all duration-300 ${
                      selectedService === service.value
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-white/20 bg-white/5 hover:border-blue-400/50'
                    }`}
                    onClick={() => setSelectedService(service.value)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    animate={{
                      boxShadow: selectedService === service.value
                        ? `0 15px 30px ${service.color}30`
                        : "0 5px 15px rgba(0,0,0,0.2)",
                    }}
                  >
                    {/* Selection indicator */}
                    <AnimatePresence>
                      {selectedService === service.value && (
                        <motion.div
                          className="absolute top-4 right-4 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Icon name="Check" size={14} className="text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <motion.div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${service.color}, ${service.color}CC)`,
                        }}
                        animate={{
                          boxShadow: selectedService === service.value
                            ? `0 0 20px ${service.color}60`
                            : `0 0 10px ${service.color}30`,
                        }}
                      >
                        <Icon name={service.icon} size={16} className="text-white sm:w-5 sm:h-5" />
                      </motion.div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-base sm:text-lg font-semibold text-white">{service.label}</h4>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                            <span className="text-xs sm:text-sm text-gray-400">{service.duration}</span>
                            <span 
                              className="text-lg font-bold"
                              style={{ color: service.color }}
                            >
                              {service.price}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Time Slots */}
              <AnimatePresence>
                {selectedService && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-8"
                  >
                    <h4 className="text-xl font-semibold text-white mb-4">Select Time</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {timeSlots.map((slot) => (
                        <motion.button
                          key={slot.value}
                          onClick={() => slot.available && setSelectedTime(slot.value)}
                          disabled={!slot.available}
                          className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                            selectedTime === slot.value
                              ? 'bg-blue-500 text-white'
                              : slot.available
                                ? 'bg-white/10 text-gray-300 hover:bg-white/20'
                                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                          }`}
                          whileHover={slot.available ? { scale: 1.05 } : {}}
                          whileTap={slot.available ? { scale: 0.95 } : {}}
                        >
                          {slot.label}
                          {!slot.available && (
                            <div className="text-xs text-red-400 mt-1">Unavailable</div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Selected Service Summary */}
              <AnimatePresence>
                {selectedServiceData && selectedTime && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-6 rounded-2xl border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm"
                  >
                    <h4 className="text-lg font-semibold text-white mb-3">Booking Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Service:</span>
                        <span className="text-white">{selectedServiceData.label}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Duration:</span>
                        <span className="text-white">{selectedServiceData.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Time:</span>
                        <span className="text-white">{timeSlots.find(t => t.value === selectedTime)?.label}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-gray-400">Price:</span>
                        <span style={{ color: selectedServiceData.color }}>{selectedServiceData.price}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-white mb-8">Your Information</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onMouseEnter={() => setHoveredField('name')}
                    onMouseLeave={() => setHoveredField(null)}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onMouseEnter={() => setHoveredField('email')}
                    onMouseLeave={() => setHoveredField(null)}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </motion.div>
                </div>

                {/* Company & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onMouseEnter={() => setHoveredField('company')}
                    onMouseLeave={() => setHoveredField(null)}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your company name"
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onMouseEnter={() => setHoveredField('phone')}
                    onMouseLeave={() => setHoveredField(null)}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="+1 (555) 123-4567"
                    />
                  </motion.div>
                </div>

                {/* Budget & Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onMouseEnter={() => setHoveredField('budget')}
                    onMouseLeave={() => setHoveredField(null)}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Project Budget
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select budget range</option>
                      {budgetOptions.map((option) => (
                        <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onMouseEnter={() => setHoveredField('timeline')}
                    onMouseLeave={() => setHoveredField(null)}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select timeline</option>
                      {timelineOptions.map((option) => (
                        <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                </div>

                {/* Project Details */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onMouseEnter={() => setHoveredField('details')}
                  onMouseLeave={() => setHoveredField(null)}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell me about your project, goals, and any specific requirements..."
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit"
                    variant="default" 
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-4 relative overflow-hidden group"
                    disabled={!selectedService || !selectedTime || isSubmitting}
                    animate={{
                      boxShadow: selectedService && selectedTime && !isSubmitting
                        ? ["0 0 20px rgba(59, 130, 246, 0.4)", "0 0 40px rgba(59, 130, 246, 0.6)", "0 0 20px rgba(59, 130, 246, 0.4)"]
                        : "0 5px 15px rgba(0,0,0,0.3)",
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {/* Animated Background */}
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span>Booking...</span>
                        </>
                      ) : (
                        <>
                          <Icon name="Calendar" size={20} />
                          <span>Book My Consultation</span>
                        </>
                      )}
                    </span>
                  </Button>
                </motion.div>

                <motion.p 
                  className="text-xs text-gray-400 text-center leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  I'll confirm your booking within 24 hours and send you a calendar invite with all the details.
                  <br />
                  <span className="text-blue-400">Free discovery calls include a project estimate.</span>
                </motion.p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationBooking;