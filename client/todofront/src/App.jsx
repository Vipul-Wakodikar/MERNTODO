import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const APP_BASE_URL = "http://localhost:8000/todo";
  const [input, setInput] = useState("");
  const [getData, setGetData] = useState([]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const addItem = async () => {
    try {
      const res = await fetch(APP_BASE_URL + "/new", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: input,
        }),
      });
  
      if (!res.ok) {
        throw new Error("Failed to add Task");
      }
  
      const newData = await res.json();
      console.log('first', newData.newTask)
      setGetData((prevData) => [...prevData, newData.newTask]);
      setInput("");
    } catch (error) {
      console.error(error);
    }
  };
  
  
  
  const fetchData = async () => {
    const api_url = await fetch(APP_BASE_URL);
    const json = await api_url.json();
    setGetData(json);
  };

  const deleteToDo = async (id) => {
    try {
      const res = await fetch(APP_BASE_URL + "/delete/" + id, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete Task");
      }
      const data = await res.json();
      setGetData((getData) => getData.filter((item) => item._id !== data._id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateToDo = async(id) => {
    try {
      const res = await fetch(APP_BASE_URL + "/update" + `/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: input }),
      })
      if (!res.ok) {
        throw new Error("Failed to update Task");
      }
      const updatedTask = await res.json()
      setGetData((getData) =>
      getData.map((item) => (item._id === updatedTask._id ? updatedTask : item))
    ); 
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="form">
        <input type="text" value={input} onChange={handleChange}></input>
        <button onClick={() => addItem()}>
          <span>ADD</span>
        </button>
      </div>
      <div>
        {getData.map((data) => (
          <>
            <span key={data._id}>
              <p>
                {data.name}
                <button onClick={() => updateToDo(data._id)}>Update Todo</button>
                <button onClick={() => deleteToDo(data._id)}>X</button>
              </p>
            </span>
          </>
        ))}
      </div>
    </>
  );
}

export default App;
