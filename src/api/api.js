import axios from "axios";

export const getData = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/notes");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const deleteNote = async (id) => {
  try {
    await axios.delete(`http://localhost:8000/api/notes/${id}`);
    getData();
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};

export const addNote = async (note) => {
  try {
    await axios.post("http://localhost:8000/api/notes", note);
    return await getData();
  } catch (error) {
    console.error("Error adding note:", error);
  }
};

export const updateNote = async (id, note) => {
  try {
    await axios.patch(`http://localhost:8000/api/notes/${id}`, note);
    return await getData();
  } catch (error) {
    console.error("Error updating note:", error);
  }
};
