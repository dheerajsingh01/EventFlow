// src/components/PricingSection.jsx
import { motion } from 'framer-motion';

const pricingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const PricingSection = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={pricingVariants}
          className="text-center mb-12"
        >
          <motion.h2 variants={cardVariants} className="text-3xl font-bold text-slate-800 mb-4">
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p variants={cardVariants} className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. No hidden fees, just great features.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={pricingVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          <motion.div variants={cardVariants}>
            <div className="bg-white rounded-xl shadow-sm p-8 h-full flex flex-col hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-indigo-600 mb-2">Free</h3>
              <p className="text-slate-600 mb-6">Basic features for individuals</p>
              <div className="text-4xl font-bold text-slate-800 mb-6">$0<span className="text-lg font-normal text-slate-500">/month</span></div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Create up to 3 events</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">50 attendees per event</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Basic analytics</span>
                </li>
              </ul>
              <button className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
                Get Started
              </button>
            </div>
          </motion.div>

          <motion.div variants={cardVariants}>
            <div className="bg-white rounded-xl shadow-sm p-8 h-full flex flex-col border-2 border-indigo-600 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-bold text-indigo-600">Enterprise</h3>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  Coming Soon
                </span>
              </div>
              <p className="text-slate-600 mb-6">Advanced tools for teams</p>
              <div className="text-4xl font-bold text-slate-800 mb-6">Custom</div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Unlimited events</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">1000+ attendees</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Priority support</span>
                </li>
              </ul>
              <button className="w-full py-3 px-6 bg-white hover:bg-slate-50 text-indigo-600 font-medium rounded-lg border-2 border-indigo-600 transition-colors">
                Contact Sales
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;