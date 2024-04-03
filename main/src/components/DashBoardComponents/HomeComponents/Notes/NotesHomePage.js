import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import NotesEditPage from "./NotesEditPage";
import axios from "axios";

const NotesHomePage = ({ user }) => {
  const [newNoteComponent, setNewNoteComponent] = useState(false);
  const [viewNote, setViewNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        let unsortedNotes = [];
        const response = await axios.post(
          "https://collabo-hub-ten.vercel.app/api/v1/fetchnote",
          {
            notesArray: user.data.notes,
          }
        );
        unsortedNotes = response.data.data;
        unsortedNotes.reverse();
        setNotes(unsortedNotes);
      } catch (err) {
        console.log("Error fetching notes:", err);
      }
    };

    fetchNotes();
  }, [user]);

  return (
    <motion.div
      className="min-w-[260px] bg-[#fcf8ff] mx-[2.5%] h-full min-h-[37vh] w-[95%] rounded-lg shadow font-poppins"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {newNoteComponent && (
        <NotesEditPage
          className="w-full"
          user={user}
          setNewNoteComponent={setNewNoteComponent}
          isNew={true}
          setNotes={setNotes}
        />
      )}
      {viewNote && (
        <NotesEditPage
          user={user}
          setNewNoteComponent={setViewNote}
          isNew={false}
          currentNote={currentNote}
          setNotes={setNotes}
        />
      )}
      {!newNoteComponent && !viewNote && (
        <div className="flex flex-col p-3 max-h-[40vh] ">
          <div className="flex flex-col gap-y-1 relative items-center w-full text-center">
            <motion.div
              onClick={() => setNewNoteComponent(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-2 top-[0.15rem] group-hover:spin-once bg-green-500 p-1 text-2xl rounded-full text-white"
            >
              <FaPlus className="scale-100 text-base" />
            </motion.div>
            <div className="w-full text-lg font-bold">Notes</div>
            <div className="w-[98%] bg-slate-300 h-[2px]" />
          </div>
          <div className="flex flex-col gap-y-2 overflow-y-scroll custom-scrollbar">
            {notes.length > 0 ? (
              notes.map((note) => (
                <motion.div
                  key={note._id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentNote(note);
                    setViewNote(true);
                  }}
                  className="flex flex-col shadow cursor-pointer hover:bg-slate-50 rounded-lg transition-all duration-300 px-4 py-1"
                >
                  <div className="font-bold overflow-ellipsis overflow-hidden whitespace-nowrap">
                    {note.title || "title"}
                  </div>
                  <div className="overflow-x-clip overflow-ellipsis overflow-hidden whitespace-nowrap">
                    {note.description}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="w-full text-center text-gray-500 my-2">
                Create new notes..
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default NotesHomePage;
