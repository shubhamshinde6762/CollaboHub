import React, { useState } from "react";
import { FaArrowLeft, FaBackward } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import axios from "axios";
const NotesEditPage = ({
  isNew,
  setNewNoteComponent,
  currentNote,
  user,
  setNotes,
}) => {
  const [notesEditForm, setNotesEditForm] = useState({
    title: isNew ? "" : currentNote.title,
    description: isNew ? "" : currentNote.description,
  });

  const [edit, setEdit] = useState(isNew);

  const formHandler = (event) => {
    const { value, id } = event.target;
    setNotesEditForm((pre) => {
      return {
        ...pre,
        [id]: value,
      };
    });
  };

  const deleteHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/deletenote",
        {
          _id: currentNote._id,
          userId: user.data._id,
          title: notesEditForm.title,
          description: notesEditForm.description,
        }
      );
      if (response) {
        setNewNoteComponent(false);

        setNotes((prev) => {
          prev = prev.filter((ele) => ele._id !== currentNote._id);
          return prev;
        });
      }
    } catch (err) {}
  };

  const submitHandler = async () => {
    if (isNew) {
      const response = await axios.post(
        "http://localhost:5000/api/v1/createnote",
        {
          userId: user.data._id,
          title: notesEditForm.title,
          description: notesEditForm.description,
        }
      );
      if (response) {
        setNewNoteComponent(false);
        setNotes((prev) => [response.data.newNote, ...prev]);
      }
    } else if (!isNew) {
      const response = await axios.post(
        "http://localhost:5000/api/v1/editnote",
        {
          userId: user.data._id,
          title: notesEditForm.title,
          description: notesEditForm.description,
          _id: currentNote._id,
        }
      );
      console.log("in Edit Note", response.data);
      if (response) {
        setNewNoteComponent(false);

        setNotes((prev) => {
          prev = prev.filter((ele) => ele._id !== currentNote._id);
          return [response.data.updatedNote, ...prev];
        });
      }
    }
  };
  return (
    <div className="relative flex flex-col gap-y-3 h-[40vh] p-3 justify-between items-center rounded-md select-none w-full">
      {!isNew && (
        <MdModeEdit
          onClick={() => setEdit(!edit)}
          className="text-white bg-blue-500 text-2xl rounded-full absolute right-0 -top-1 p-1"
        />
      )}

      <div className="flex w-full items-center justify-center gap-x-2">
        <FaArrowLeft
          onClick={() => setNewNoteComponent(false)}
          className="ml-2 text-lg"
        />
        <input
          id="title"
          placeholder="Title"
          className="p-2 px-3 shadow rounded-md break-all w-full"
          disabled={!edit}
          value={notesEditForm.title}
          onChange={formHandler}
          style={{ cursor: edit ? "text" : "not-allowed" }}
        />
      </div>

      <textarea
        id="description"
        placeholder="add content..."
        className="resize-none px-3  w-full flex-grow focus:outline-none p-2 shadow rounded-md custom-scrollbar"
        disabled={!edit}
        value={notesEditForm.description}
        onChange={formHandler}
        style={{ cursor: edit ? "text" : "not-allowed", height: "100%" }}
      ></textarea>
      {!isNew && currentNote && currentNote.lastEdited && (
        <div className="text-gray-500 font-bold w-full text-center">
          {currentNote.lastEdited}
        </div>
      )}
      <div className="flex items-center  justify-center gap-x-12 w-full">
        {!isNew && (
          <div
            onClick={deleteHandler}
            className="px-2 rounded-md p-1 bg-red-500 cursor-pointer text-white loginButton"
          >
            Delete
          </div>
        )}
        <div
          className="px-2 rounded-md p-1 cursor-pointer loginButton"
          onClick={submitHandler}
        >
          Done
        </div>
      </div>
    </div>
  );
};

export default NotesEditPage;
