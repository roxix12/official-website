import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const MentorshipSection = () => {
  const [selectedPlan, setSelectedPlan] = useState(1); // Default to 1-on-1 plan

  const mentorshipPlans = [
    {
      id: 0,
      name: 'Community Access',
      price: 'Free',
      duration: 'Forever',
      description: 'Join our growing community of developers',
      color: 'from-gray-500 to-gray-600',
      bgColor: 'bg-gray-500/10',
      borderColor: 'border-gray-500/30',
      features: [
        'Access to Discord Community',
        'Weekly Group Q&A Sessions',
        'Free Resource Library',
        'Peer-to-Peer Learning',
        'Job Board Access'
      ],
      limitations: [
        'No 1-on-1 Support',
        'Limited Resources',
        'Community Support Only'
      ]
    },
    {
      id: 1,
      name: '1-on-1 Mentorship',
      price: '$199',
      duration: 'per month',
      description: 'Personal guidance tailored to your goals',
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      popular: true,
      features: [
        '4 Hours of 1-on-1 Time Monthly',
        'Personalized Learning Path',
        'Code Review & Feedback',
        'Career Guidance',
        'Project Planning Help',
        'Resume & Portfolio Review',
        'Interview Preparation',
        'Priority Community Support'
      ],
      bonuses: [
        'Free Project Audit',
        'LinkedIn Profile Optimization',
        'Networking Introductions'
      ]
    },
    {
      id: 2,
      name: 'Intensive Bootcamp',
      price: '$499',
      duration: 'per month',
      description: 'Accelerated program for serious learners',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      features: [
        '12 Hours of 1-on-1 Time Monthly',
        'Weekly Project Assignments',
        'Live Code Review Sessions',
        'Real Client Project Experience',
        'Advanced Technical Topics',
        'Industry Best Practices',
        'Deployment & DevOps Training',
        'Job Placement Assistance'
      ],
      bonuses: [
        'Portfolio Project Development',
        'Client Referrals',
        'Freelancing Guidance',
        'Lifetime Community Access'
      ]
    }
  ];

  const communityStats = [
    {
      number: '500+',
      label: 'Active Members',
      icon: 'Users',
      description: 'Developers from around the world'
    },
    {
      number: '25+',
      label: 'Countries',
      icon: 'Globe',
      description: 'Global community reach'
    },
    {
      number: '95%',
      label: 'Success Rate',
      icon: 'TrendingUp',
      description: 'Members achieving their goals'
    },
    {
      number: '200+',
      label: 'Hours of Content',
      icon: 'BookOpen',
      description: 'Tutorials and resources'
    }
  ];

  const currentPlan = mentorshipPlans[selectedPlan];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Mentorship & <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Learning</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Accelerate your development journey with personalized guidance and proven methodologies.
          </p>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {communityStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-gray-800/50 border border-gray-700/50 rounded-2xl"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name={stat.icon} size={24} className="text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-sm font-semibold text-gray-300 mb-1">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Plan Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center mb-12 space-y-2 sm:space-y-0 sm:space-x-4"
        >
          {mentorshipPlans.map((plan, index) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(index)}
              className={`relative px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                selectedPlan === index
                  ? `bg-gradient-to-r ${plan.color} text-white shadow-lg`
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                  Popular
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Icon 
                  name={plan.id === 0 ? 'Users' : plan.id === 1 ? 'User' : 'Zap'} 
                  size={20} 
                />
                <span>{plan.name}</span>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Plan Details */}
        <motion.div
          key={selectedPlan}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 gap-12"
        >
          {/* Plan Info */}
          <div className={`${currentPlan.bgColor} border ${currentPlan.borderColor} rounded-2xl p-8`}>
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{currentPlan.name}</h3>
              <p className="text-gray-300 mb-6">{currentPlan.description}</p>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="text-4xl sm:text-5xl font-bold text-white">{currentPlan.price}</div>
                <div className="text-gray-400">
                  <div className="text-sm">Billed</div>
                  <div className="font-semibold">{currentPlan.duration}</div>
                </div>
              </div>
              <Link to="/contact-multi-channel-collaboration-hub">
                <Button
                  size="lg"
                  className={`bg-gradient-to-r ${currentPlan.color} text-white hover:scale-105 shadow-lg transition-all duration-300 w-full sm:w-auto`}
                >
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  {currentPlan.price === 'Free' ? 'Join Community' : 'Get Started'}
                </Button>
              </Link>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-bold text-white mb-4">What's Included:</h4>
              <div className="space-y-3">
                {currentPlan.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg"
                  >
                    <Icon name="Check" size={20} className="text-green-400 mt-0.5" />
                    <span className="text-gray-300 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {currentPlan.bonuses && (
              <div>
                <h4 className="text-xl font-bold text-white mb-4">Bonus Features:</h4>
                <div className="space-y-3">
                  {currentPlan.bonuses.map((bonus, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (currentPlan.features.length + index) * 0.05 }}
                      className="flex items-start space-x-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg"
                    >
                      <Icon name="Star" size={20} className="text-yellow-400 mt-0.5" />
                      <span className="text-gray-300 font-medium">{bonus}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {currentPlan.limitations && (
              <div>
                <h4 className="text-lg font-bold text-gray-400 mb-4">Limitations:</h4>
                <div className="space-y-3">
                  {currentPlan.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-900/50 rounded-lg">
                      <Icon name="X" size={20} className="text-gray-500 mt-0.5" />
                      <span className="text-gray-500">{limitation}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-gradient-to-r from-cyan-900/20 to-purple-900/20 rounded-2xl p-8 border border-cyan-800/30"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Level Up Your Skills?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join hundreds of developers who have accelerated their careers through personalized mentorship and community support.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/contact-multi-channel-collaboration-hub">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white hover:from-cyan-500 hover:to-purple-500 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-cyan-400/30"
              >
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Start Your Journey
              </Button>
            </Link>
            <Link to="/blog-tutorials-insights">
              <Button
                variant="outline"
                size="lg"
                className="border-cyan-600/50 text-cyan-300 hover:bg-cyan-900/20 hover:border-cyan-500"
              >
                <Icon name="BookOpen" size={20} className="mr-2" />
                Browse Free Resources
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MentorshipSection;