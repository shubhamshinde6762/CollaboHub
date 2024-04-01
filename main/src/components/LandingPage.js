import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer"; // Import useInView hook
import LandPageIntro from "./LandingPage/LandPageIntro";
import Footer from "./LandingPage/Footer";

const LandingPage = () => {
  const [refFinance, inViewFinance] = useInView(); // useInView hook for finance section
  const [refCommu, inViewCommu] = useInView(); // useInView hook for commu section
  const [refDND, inViewDND] = useInView(); // useInView hook for DND section
  const [refGraph, inViewGraph] = useInView(); // useInView hook for graph section
  const [refNotification, inViewNotification] = useInView(); // useInView hook for notification section

  return (
    <div className="flex z-30 absolute overflow-x-hidden top-0 left-0 items-center flex-col w-full">
      <LandPageIntro />

      <div className="w-full p-4 flex flex-col gap-14 justify-center items-center bg-gradient-to-t from-violet-500 to-purple-600">
        <motion.div
          className="max-w-[800px] flex flex-col my-4 gap-2 items-center text-white p-4 rounded-xl bg-blue-700 bg-opacity-35"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="font-bold font-poppins text-center text-pretty text-2xl">
            Streamline Workflows. Enhance Collaboration
          </p>
          <p className="font-poppins text-pretty text-center">
            This statement remains relevant, highlighting the core purpose of an
            ERP system in optimizing business processes and fostering
            collaboration.
          </p>
        </motion.div>
        <div className="min-w-[280px] gap-[5%] w-[70%] flex sx:flex-wrap items-center justify-center">
          <img src={"https://res.cloudinary.com/dd6sontgf/image/upload/v1711955151/finance-accounting_qobkpq.svg"} className="max-w-[500px] min-w-[260px] w-[30%]" ref={refFinance} />
          <motion.div
            ref={refFinance}
            className="font-poppins text-xl xs:text-base text-pretty text-center p-4 bg-indigo-700 bg-opacity-45 rounded-xl text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={inViewFinance ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1 }}
          >
            Collabohub centralizes operations with finance, HR, and inventory
            modules, while also tracking team progress. Streamline tasks and
            enhance collaboration—all in one platform. With Collabohub,
            businesses boost productivity and profitability.
          </motion.div>
        </div>
        <div className="min-w-[280px] gap-[5%] w-[70%] flex sx:flex-wrap-reverse items-center justify-center">
          <motion.div
            ref={refCommu}
            className="font-poppins text-xl xs:text-base text-pretty text-center p-4 bg-indigo-700 bg-opacity-45 rounded-xl text-white"
            initial={{ opacity: 0, x: 50 }}
            animate={inViewCommu ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 1 }}
          >
            Access actionable analytics with Collabohub. Stay ahead with
            up-to-the-minute project progress and performance data. Make quick,
            effective decisions using intuitive tools. Gain a competitive edge
            with real-time insights for strategic planning.
          </motion.div>
          <img src={"https://res.cloudinary.com/dd6sontgf/image/upload/v1711955137/commu_jqyped.png"} className="max-w-[500px] min-w-[260px] w-[30%]" ref={refCommu} />
        </div>
      </div>
      <div className="w-screen bg-gradient-to-b from-violet-500 -z-10 gap-10 to-indigo-500 flex justify-center p-[5%]  items-center flex-wrap relative overflow-x-hidden">
        <div className="flex flex-col min-w-[260px] flex-grow w-[45%] justify-center gap-10 items-center">
          <motion.img
            ref={refDND}
            className="max-w-[500px] rounded-3xl shadow-2xl min-w-[260px] w-full"
            src={"https://res.cloudinary.com/dd6sontgf/image/upload/v1711955137/DND_su1koc.gif"}
            initial={{ opacity: 0, y: 50 }}
            animate={inViewDND ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1 }}
          />
          <motion.div
            ref={refDND}
            className="font-poppins text-xl xs:text-base text-pretty text-center p-4 bg-indigo-700 bg-opacity-45 rounded-xl text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={inViewDND ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1 }}
          >
            Access actionable analytics with Collabohub. Stay ahead with
            up-to-the-minute project progress and performance data. Make quick,
            effective decisions using intuitive tools. Gain a competitive edge
            with real-time insights for strategic planning.
          </motion.div>
        </div>
        <div className="flex flex-col min-w-[260px] flex-grow w-[45%] justify-center gap-10 items-center">
          <motion.img
            ref={refGraph}
            className="max-w-[500px] rounded-3xl shadow-2xl min-w-[260px] w-full"
            src={"https://res.cloudinary.com/dd6sontgf/image/upload/v1711955151/graph_n3udlo.webp "}
            initial={{ opacity: 0, y: 50 }}
            animate={inViewGraph ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1 }}
          />
          <motion.div
            ref={refGraph}
            className="font-poppins text-xl xs:text-base text-pretty text-center p-4 bg-indigo-700 bg-opacity-45 rounded-xl text-white"
            initial={{ opacity: 0, x: 50 }}
            animate={inViewGraph ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 1 }}
          >
            Gain insights into project performance with intuitive graphs. Track
            milestones and key metrics, enabling informed decision-making. Stay
            ahead with visual data representation.
          </motion.div>
        </div>
        <div className="h-1 bg-indigo-700 w-full rounded-full" />
        <div className="flex  min-w-[260px]  flex-wrap   justify-center gap-5 items-center ">
          <motion.img
            ref={refNotification}
            className="max-w-[500px] xs:max-w-[90%] rounded-full flex-grow shadow-2xl min-w-[260px] "
            src={"https://res.cloudinary.com/dd6sontgf/image/upload/v1711955588/Notification_q4i0oc.gif"}
            initial={{ opacity: 0, y: 50 }}
            animate={inViewNotification ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1 }}
          />
          <motion.div
            ref={refNotification}
            className="font-poppins text-xl w-[45%] min-w-[260px] flex-grow xs:text-base text-pretty text-center p-4 bg-indigo-700 bg-opacity-45 rounded-xl text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={inViewNotification ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1 }}
          >
            Benefit from adaptive alerting, ensuring you're always in the loop.
            Receive timely notifications, keeping you informed about deadlines
            and critical information. Stay on top of tasks and ahead of the
            competition
          </motion.div>
        </div>
        <motion.div
          className="bg-stone-900 max-w-[70%] xs:max-w-[95%] p-4 rounded-2xl gap-4 text-white font-poppins flex flex-col justify-center items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-5xl sx:text-2xl font-bold text-center">
            How Collabohub Stands Out ?
          </p>
          <p className="text-center text-xl sx:text-lg">
            Positioned above conventional ERP solutions, Collabohub excels with
            its intuitive user interface, seamless real-time communication
            channels, cutting-edge analytics capabilities, user-friendly
            drag-and-drop functionality, dynamic real-time updates, stringent
            access control mechanisms, and integrated chat solutions for
            enhanced collaboration
          </p>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
