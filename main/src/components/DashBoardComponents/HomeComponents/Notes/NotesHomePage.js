import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import NotesEditPage from "./NotesEditPage";
import axios from "axios";

const NotesHomePage = ({ user }) => {
  const [newNoteComponent, setNewNoteComponent] = useState(false);
  const [viewNote, setViewNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        // console.log(user , 123 )
        let unsortednotes = [];
        const response = await axios.post(
          "http://13.210.25.126:5000/api/v1/fetchnote",
          {
            notesArray: user.data.notes,
          }
        );
        unsortednotes = response.data.data;
        unsortednotes.reverse();
        setNotes(unsortednotes);
        // console.log(response);
      } catch (err) {}
    };

    fetch();
  }, [user]);

  return (
    <div className="min-w-[260px] bg-[#fcf8ff] mx-[2.5%]  h-full min-h-[37vh] w-[95%]  rounded-lg shadow font-poppins">
      {newNoteComponent ? (
        <NotesEditPage
          className="w-full"
          user={user}
          setNewNoteComponent={setNewNoteComponent}
          isNew={true}
          setNotes={setNotes}

        />
      ) : viewNote ? (
        <NotesEditPage 
          user={user}
          setNewNoteComponent={setViewNote}
          isNew={false}
          currentNote={currentNote}
          setNotes={setNotes}
        />
      ) : (
        <div />
      )}

      {newNoteComponent == false && viewNote == false && (
        <div className="flex flex-col p-3 max-h-[40vh] ">
          <div className="flex flex-col gap-y-1 relative items-center w-full text-center">
            <FaPlus
              onClick={() => setNewNoteComponent(true)}
              className=" absolute left-2 top-[0.15rem] spin-once-hover spin-once-unhover group-hover:spin-once bg-green-500 p-1 text-2xl rounded-full text-white"
            />
            <div className="w-full text-lg font-bold">Notes</div>
            <div className="w-[98%] bg-slate-300 h-[2px] " />
          </div>
          <div className="flex flex-col gap-y-2 overflow-y-scroll custom-scrollbar  ">
              {notes &&
                notes.length !== 0 &&
                notes.map((ele) => (
                  <div onClick={() => {
                    setCurrentNote(ele);
                    setViewNote(true);
                  }} className="flex flex-col shadow cursor-pointer hover:bg-slate-50 rounded-lg transition-all duration-300 px-4 py-1  ">
                    <div className="font-bold overflow-ellipsis overflow-hidden whitespace-nowrap">{ele.title || "title"}</div>
                    <div className="overflow-x-clip font-sans  overflow-ellipsis overflow-hidden whitespace-nowrap">{ele.description}</div>
                  </div>
                ))}
                {
                  notes &&
                notes.length === 0&&
                (<div className="w-full text-center text-gray-500 my-2">
                  Create new notes..
                </div>)
                }
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesHomePage;
