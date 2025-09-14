import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const CalendarBooking = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTimezone, setSelectedTimezone] = useState('UTC-5');
  const [consultationType, setConsultationType] = useState('');

  const consultationTypes = [
    { value: 'discovery', label: 'Discovery Call (30 min) - Free' },
    { value: 'technical', label: 'Technical Consultation (60 min) - $150' },
    { value: 'strategy', label: 'Strategy Session (90 min) - $250' },
    { value: 'audit', label: 'Website Audit (45 min) - $200' }
  ];

  const timezones = [
    { value: 'UTC-8', label: 'Pacific Time (UTC-8)' },
    { value: 'UTC-7', label: 'Mountain Time (UTC-7)' },
    { value: 'UTC-6', label: 'Central Time (UTC-6)' },
    { value: 'UTC-5', label: 'Eastern Time (UTC-5)' },
    { value: 'UTC+0', label: 'GMT (UTC+0)' },
    { value: 'UTC+1', label: 'Central European Time (UTC+1)' },
    { value: 'UTC+5:30', label: 'India Standard Time (UTC+5:30)' }
  ];

  const availableDates = [
    { value: '2025-01-15', label: 'Wednesday, Jan 15' },
    { value: '2025-01-16', label: 'Thursday, Jan 16' },
    { value: '2025-01-17', label: 'Friday, Jan 17' },
    { value: '2025-01-20', label: 'Monday, Jan 20' },
    { value: '2025-01-21', label: 'Tuesday, Jan 21' },
    { value: '2025-01-22', label: 'Wednesday, Jan 22' }
  ];

  const availableTimes = [
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' }
  ];

  const handleBooking = () => {
    // Simulate booking process
    alert(`Consultation booked for ${selectedDate} at ${selectedTime} (${selectedTimezone})`);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Book a <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Consultation</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Skip the back-and-forth emails. Schedule a direct conversation to discuss your project in detail and get expert guidance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative group bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60 border border-cyan-400/20 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-cyan-500/5 hover:border-cyan-400/40 transition-all duration-300"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative">
              <h3 className="text-2xl font-bold mb-6 text-white">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Schedule Your Session
                </span>
              </h3>
            
            <div className="space-y-6">
              <Select
                label="Consultation Type"
                placeholder="Choose consultation type"
                options={consultationTypes}
                value={consultationType}
                onChange={setConsultationType}
                required
              />

              <Select
                label="Your Timezone"
                placeholder="Select your timezone"
                options={timezones}
                value={selectedTimezone}
                onChange={setSelectedTimezone}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Available Date"
                  placeholder="Choose date"
                  options={availableDates}
                  value={selectedDate}
                  onChange={setSelectedDate}
                  required
                />

                <Select
                  label="Available Time"
                  placeholder="Choose time"
                  options={availableTimes}
                  value={selectedTime}
                  onChange={setSelectedTime}
                  required
                />
              </div>

              <Button
                variant="default"
                size="lg"
                fullWidth
                iconName="Calendar"
                iconPosition="left"
                className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white hover:from-cyan-500 hover:to-purple-500 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 border border-cyan-400/30"
                onClick={handleBooking}
                disabled={!consultationType || !selectedDate || !selectedTime}
              >
                Book Consultation
              </Button>
            </div>
            </div>
          </motion.div>

          {/* Consultation Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  What to Expect
                </span>
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                    <Icon name="MessageSquare" size={20} className="text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-white">Detailed Discussion</h4>
                    <p className="text-gray-300">
                      We'll dive deep into your project requirements, goals, and challenges to create a clear roadmap.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                    <Icon name="Target" size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-white">Strategic Guidance</h4>
                    <p className="text-gray-300">
                      Get expert advice on technology choices, implementation approach, and best practices.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                    <Icon name="FileText" size={20} className="text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-white">Actionable Plan</h4>
                    <p className="text-gray-300">
                      Leave with a clear understanding of next steps, timeline, and investment required.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                    <Icon name="Shield" size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-white">No Pressure</h4>
                    <p className="text-gray-300">
                      Discovery calls are completely free with no obligation to move forward.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/60 via-gray-800/50 to-gray-900/60 border border-cyan-400/20 rounded-lg p-6 backdrop-blur-sm">
              <h4 className="font-semibold mb-3 flex items-center text-white">
                <Icon name="Clock" size={16} className="mr-2 text-cyan-400" />
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Preparation Tips
                </span>
              </h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Have your current website/store ready to review</li>
                <li>• Prepare a list of specific challenges you're facing</li>
                <li>• Think about your ideal timeline and budget range</li>
                <li>• Consider your target audience and business goals</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CalendarBooking;