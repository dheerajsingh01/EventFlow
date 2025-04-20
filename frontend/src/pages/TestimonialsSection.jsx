// src/components/TestimonialsSection.jsx
import { motion } from 'framer-motion';

const testimonialsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const testimonialVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const testimonials = [
  {
    id: 1,
    quote: "EventFlow has completely transformed how we organize our community events. The platform is intuitive and our attendees love it!",
    name: "Sarah Johnson",
    role: "Community Manager",
    avatar: "https://i.pravatar.cc/150?img=32"
  },
  {
    id: 2,
    quote: "As a small business owner, I needed an easy way to manage workshops. EventFlow saved me hours of admin work.",
    name: "Michael Chen",
    role: "Small Business Owner",
    avatar: "https://i.pravatar.cc/150?img=12"
  },
  {
    id: 3,
    quote: "The analytics features helped us understand our attendees better, leading to more successful events.",
    name: "Emma Rodriguez",
    role: "Event Coordinator",
    avatar: "https://i.pravatar.cc/150?img=45"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-indigo-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={testimonialsVariants}
          className="text-center mb-12"
        >
          <motion.h2 variants={testimonialVariants} className="text-3xl font-bold text-slate-800 mb-4">
            What Our Users Say
          </motion.h2>
          <motion.p variants={testimonialVariants} className="text-lg text-slate-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our community has to say.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={testimonialsVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={testimonialVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm p-6 flex flex-col"
            >
              <div className="flex-grow">
                <svg className="w-8 h-8 text-indigo-100 mb-4" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-slate-600 italic mb-6">"{testimonial.quote}"</p>
              </div>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-medium text-slate-800">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
