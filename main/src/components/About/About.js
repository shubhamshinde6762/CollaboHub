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
        question: "What is CollaboHub?",
        answer:
          "CollaboHub is a comprehensive project management platform designed to streamline project workflows, enhance collaboration, and optimize resource allocation. It includes features such as task tracking, team collaboration, Gantt charts, time tracking, document management, encrypted chats, and daily work schedules.",
      },
      {
        question: "Who can benefit from using CollaboHub?",
        answer:
          "CollaboHub is ideal for businesses of all sizes, including startups, SMEs, and enterprises, as well as freelancers and individual project managers. It caters to teams who require efficient project management tools and secure communication channels.",
      },
    ],
  },
  {
    name: "Account and Billing",
    questions: [
      {
        question: "How do I create an account?",
        answer:
          "To create an account, simply visit the CollaboHub website and click on the 'Sign Up' button. Follow the prompts to complete the registration process.",
      },
      {
        question: "Is CollaboHub free to use?",
        answer:
          "Yes, CollaboHub offers a free plan with essential project management features. You can sign up for free and start managing your projects immediately.",
      },
      // {
      //   question: "What payment methods do you accept for premium plans?",
      //   answer:
      //     "For premium plans, we accept major credit cards (Visa, Mastercard, American Express) and PayPal for subscription payments. You can choose a plan that suits your team's needs and budget.",
      // },
    ],
  },

  {
    name: "Features and Functionality",
    questions: [
      {
        question: "What project management features does CollaboHub offer?",
        answer:
          "CollaboHub offers a wide range of features, including task tracking, team collaboration, Gantt charts, time tracking, document management, encrypted chats, daily work schedules, and progress bars. These features are designed to streamline project workflows and boost team productivity.",
      },
      {
        question:
          "Is CollaboHub customizable to suit my specific project management needs?",
        answer:
          "Yes, CollaboHub is highly customizable, allowing you to tailor workflows, project templates, and permissions to fit your unique requirements. You can configure the platform according to your team's workflow and project management methodologies.",
      },
    ],
  },
  {
    name: "Security and Data Privacy",
    questions: [
      {
        question: "How do you ensure the security of my data?",
        answer:
          "We employ industry-standard security protocols and encryption methods to safeguard your data on CollaboHub. Additionally, our platform undergoes regular security audits to ensure compliance with data protection standards.",
      },
      {
        question: "What is your data privacy policy?",
        answer:
          "We are committed to protecting your privacy on CollaboHub. Please refer to our Privacy Policy for detailed information on how we collect, use, and protect your personal data. We adhere to strict privacy guidelines to safeguard your sensitive information.",
      },
    ],
  },
  {
    name: "Support and Assistance",
    questions: [
      {
        question: "How can I contact customer support?",
        answer:
          "You can reach our customer support team via email at support@collabohub.com or through the live chat feature available on the CollaboHub website. Our support team is available to assist you with any inquiries or issues you may have.",
      },
      {
        question:
          "Do you offer training or onboarding assistance for new users?",
        answer:
          "Yes, we provide comprehensive training resources, including tutorials, user guides, and webinars, to help onboard new users and maximize their use of CollaboHub. Our goal is to ensure that you and your team are equipped with the knowledge to effectively utilize the platform.",
      },
    ],
  },
  {
    name: "Free Offering",
    questions: [
      {
        question:
          "What features are included in the free version of CollaboHub?",
        answer:
          "The free version of CollaboHub includes essential project management features such as task tracking, team collaboration, basic reporting, document management, encrypted chats, daily work schedules, and progress bars. It allows unlimited users and projects, enabling teams to collaborate effectively without restrictions.",
      },
      {
        question: "How long can I use the free version of CollaboHub?",
        answer:
          "There is no time limit on using the free version of CollaboHub. It is free forever, with the option to upgrade to a paid plan for access to advanced features and premium support. You can continue to use the free version as long as you like.",
      },
      {
        question: "What are the benefits of upgrading to a paid plan?",
        answer:
          "Upgrading to a paid plan unlocks additional features such as advanced reporting, priority support, integrations with third-party tools, enhanced customization options, and more. Paid plans are tailored to meet the needs of growing teams and provide enhanced functionality to optimize project management workflows.",
      },
      {
        question:
          "Do I need to provide payment information to use the free version?",
        answer:
          "No, payment information is not required to sign up for the free version of CollaboHub. Simply create an account and start using the platform immediately. We believe in providing accessible project management tools for teams of all sizes, without any upfront payment obligations.",
      },
    ],
  },
];
