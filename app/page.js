"use client"
import React, { useState } from 'react'

const page = () => {
  const [title, settitle] = useState("")
  const [desc, setdesc] = useState("")
  const [maintask, setmaintask] = useState([])
  const [active, setactive] = useState(null)
  const SubmitHandler = (e) => {
    e.preventDefault();
    // console.log(title);
    // console.log(desc);
    setmaintask([...maintask, {title, desc}])
    settitle("");
    setdesc("");
    console.log(maintask);
  }
  const deletehandler = (i) => {
    let copytask = [...maintask]
    copytask.splice(i,1)
    setmaintask(copytask)
  }
  const updatehandler = (i) => {
      setactive(i);
      console.log(maintask[i]);
      settitle(maintask[i].title);
      setdesc(maintask[i].desc);
      console.log(i);
  }
  const updatetask = (e) => {
    e.preventDefault()
    let copytasks = [...maintask];
    let updateddata = { title,desc};
     copytasks[active] = updateddata;
    setmaintask(copytasks)
    setactive(null)
    settitle("")
    setdesc("") 
  };
  const titlechange = (e) => {
    settitle(e.target.value);
  };
  const descchange = (e) => {
    setdesc(e.target.value);
  };
  let renderTask = <h2>No Task Available</h2>
  if(maintask.length > 0){
    renderTask = maintask.map((t, i) => {
      return (
        <li key={i} className="flex items-center mb-5 justify-around">
          <div className=" mb-5 w-2/3">
            <h5 className="text-2xl font-medium">Title: {t.title}</h5>
            <h6 className="text-lg font-medium">Description: {t.desc}</h6>
          </div>
          <button
            onClick={() => {
              updatehandler(i);
            }}
            className="bg-green-600 rounded text-white px-4 py-2 font-medium"
          >
            Update
          </button>
          <button
            onClick={() => {
              deletehandler(i);
            }}
            className="bg-red-600 rounded text-white px-4 py-2 font-medium"
          >
            Delete
          </button>
        </li>
      );
    });
  }
  return (
    <>
      <h1 className="bg-black text-white p-5 text-5 font-light text-center text-2xl">
        TODO LIST
      </h1>
      <form>
        <input
          type="text"
          className="text-2xl border-zinc-800 border-2 m-8 px-4 py-2"
          placeholder="Enter Task Here"
          value={title}
          onChange={titlechange}
          name='title'
        />
        <input
          type="text"
          className="text-2xl border-zinc-800 border-2 m-8 px-4 py-2"
          placeholder="Enter Description Here"
          value={desc}
          name='desc'
          onChange={descchange}
        />
        {active !== null ? (
          <button onClick={updatetask} className="bg-green-600 text-white px-4 py-3 text-2xl font-medium rounded m-5">
            Update Task
          </button>
        ) : (
          <button onClick={SubmitHandler} className="bg-black text-white px-4 py-3 text-2xl font-medium rounded m-5">
            Add Task
          </button>
        )}
      </form>
      <hr />
      <div className="p-8 bg-slate-200">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
}

export default page