import React from "react";
import FaqShow from "./FaqShow";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="flex z-30 absolute overflow-x-hidden top-0 left-0 items-center flex-col w-full bg-gradient-to-b pt-16 via-violet-600 from-purple-700 to-indigo-600">
      <div className="min-w-[250px] max-w-[1000px] p-4 overflow-x-hidden flex flex-col gap-5 my-5">
        {FaqData.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 1 }}
          >
            <p className=" text-2xl xs:text-xl text-white font-poppins font-bold">
              {section.name}
            </p>
            {section.questions.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index + i * 0.2 }}
              >
                <FaqShow question={faq.question} answer={faq.answer} />
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;

let FaqData = [
  {
    name: "General Questions",
    questions: [
      {
        question: "What is [Your ERP Platform]?",
        answer:
          "[Your ERP Platform] is a comprehensive project management ERP solution designed to streamline project workflows, enhance collaboration, and optimize resource allocation.",
      },
      {
        question: "Who can benefit from using [Your ERP Platform]?",
        answer:
          "[Your ERP Platform] is ideal for businesses of all sizes, including startups, SMEs, and enterprises, as well as freelancers and individual project managers.",
      },
    ],
  },
  {
    name: "Account and Billing",
    questions: [
      {
        question: "How do I create an account?",
        answer:
          "To create an account, simply click on the 'Sign Up' button on the homepage and follow the prompts to complete the registration process.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept major credit cards (Visa, Mastercard, American Express) and PayPal for subscription payments.",
      },
    ],
  },
  {
    name: "Features and Functionality",
    questions: [
      {
        question:
          "What project management features does [Your ERP Platform] offer?",
        answer:
          "[Your ERP Platform] offers a wide range of features, including task tracking, team collaboration, Gantt charts, time tracking, document management, and more.",
      },
      {
        question:
          "Is [Your ERP Platform] customizable to suit my specific project management needs?",
        answer:
          "Yes, [Your ERP Platform] is highly customizable, allowing you to tailor workflows, project templates, and permissions to fit your unique requirements.",
      },
    ],
  },
  {
    name: "Security and Data Privacy",
    questions: [
      {
        question: "How do you ensure the security of my data?",
        answer:
          "We employ industry-standard security protocols and encryption methods to safeguard your data. Additionally, our platform is regularly audited for security compliance.",
      },
      {
        question: "What is your data privacy policy?",
        answer:
          "We are committed to protecting your privacy. Please refer to our Privacy Policy for detailed information on how we collect, use, and protect your personal data.",
      },
    ],
  },
  {
    name: "Support and Assistance",
    questions: [
      {
        question: "How can I contact customer support?",
        answer:
          "You can reach our customer support team via email at support@example.com or through the live chat feature available on our website.",
      },
      {
        question:
          "Do you offer training or onboarding assistance for new users?",
        answer:
          "Yes, we provide comprehensive training resources, including tutorials, user guides, and webinars, to help onboard new users and maximize their use of the platform.",
      },
    ],
  },
  {
    name: "Free Offering",
    questions: [
      {
        question:
          "What features are included in the free version of [Your ERP Platform]?",
        answer:
          "The free version of [Your ERP Platform] includes essential project management features such as task tracking, team collaboration, basic reporting, and document management.",
      },
      {
        question:
          "Is the free version limited in terms of the number of users or projects?",
        answer:
          "No, the free version allows unlimited users and projects, enabling teams of any size to collaborate effectively without restrictions.",
      },
      {
        question: "How long can I use the free version of [Your ERP Platform]?",
        answer:
          "There is no time limit on using the free version of [Your ERP Platform]. It is free forever, with the option to upgrade to a paid plan for access to advanced features and support.",
      },
      {
        question: "What are the benefits of upgrading to a paid plan?",
        answer:
          "Upgrading to a paid plan unlocks additional features such as advanced reporting, priority support, integrations with third-party tools, and enhanced customization options.",
      },
      {
        question:
          "Do I need to provide payment information to use the free version?",
        answer:
          "No, payment information is not required to sign up for the free version of [Your ERP Platform]. Simply create an account and start using the platform immediately.",
      },
    ],
  },
];
