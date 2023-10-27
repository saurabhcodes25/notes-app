import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import './nav.css'

function EditNote() {
  const { id } = useParams();

  const [note, setNote] = useState({
    title: " ",
    content: " ",
    id: " ",
  });

  const history = useNavigate();

  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem("tokenStore");
      if (id) {
        const res = await axios.get(`/api/notes/${id}`, {
          headers: { Authorization: token },
        });
        setNote({
          title: res.data.title,
          content: res.data.content,
          id: res.data._id,
        });
      }
    };

    getNote();
  }, [id]);

  const onChaneInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const editNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { title, content, id } = note;
        const newNote = {
          title,
          content,
        };

        await axios.put(`/api/notes/${id}`, newNote, {
          headers: { Authorization: token },
        });

        return history.push("/");
      }
    } catch (err) {
      window.location.href = "/";
    }
  };

  return (
    <div className="create-note">
      <h2>Edit Note</h2>

      <form onSubmit={editNote} autoComplete="off">
        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={note.title}
            required
            onChange={onChaneInput}
          />
        </div>

        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea
            cols="30"
            rows="10"
            type="textarea"
            id="content"
            name="content"
            value={note.content}
            required
            onChange={onChaneInput}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditNote;
