import React, { useEffect, useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [fav, setFav] = useState(false);

  const [allUsers, setAllUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(allUsers));
  }, [allUsers]);
  
  const clickHandler = (e) => {
    e.preventDefault();
    const newArr = [...allUsers, { name, company, phone, fav: fav }];
    setAllUsers(newArr);
    // console.log(newArr);
    setName("");
    setCompany("");
    setPhone("");
    setFav(false);
  };

  const deleterHandler = (e, i) => {
    const deleteArr = [...allUsers.filter((user) => user != e)];

    setAllUsers(deleteArr);
  };

  return (
    <div className="w-full h-screen bg-white flex justify-between items-center px-[1vw]">
      <div className="w-[50%] h-[95%] flex flex-col justify-between p-[2vw] shadow-lg bg-indigo-100 backdrop-blur-md border-[2px] border-solid border-black rounded-lg">
        <form
          onSubmit={(e) => {
            clickHandler(e);
          }}
          className="flex flex-col justify-evenly h-full"
        >
          <h1 className="text-2xl font-semibold">Add Contact</h1>
          <h4 className="text-xl">Name*</h4>
          <input
            className="p-[.5vw] w-full"
            value={name}
            onChange={(e) => setName(e.target.value.toUpperCase())}
            type="text"
            placeholder="Enter your name"
          />
          <h4>Company</h4>
          <input
            className="p-[.5vw] w-full"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            type="text"
            placeholder="Enter company"
          />
          <h4>Phone*</h4>
          <input
            className="p-[.5vw] w-full"
            value={phone}
            type="phone"
            onChange={(e) => {
              setPhone(e.target.value), e.preventDefault();
            }}
            placeholder="Enter phone number"
          />
          <div className="flex items-center gap-[1vw]">
            <input
              type="checkbox"
              checked={fav}
              onChange={(e) => setFav(e.target.checked)}
            />
            Favorite
          </div>
          <button className="w-full px-4 py-2 rounded-xl bg-blue-500">
            Add Contact
          </button>
        </form>
      </div>
      <div className="contact-list w-[50%] h-[95%] px-[1vw]  overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-[1vw]">Contact List</h1>
        {allUsers.map((elem, index) => (
          <div key={index} className="flex flex-col gap-[2vw]">
            <div className="relative card shadow-md mb-[.7vw] w-[90%] h-[14vw] mx-auto rounded-lg bg-blue-400 flex flex-col gap-[1vw] justify-center p-[2vw]">
              <i
                onClick={() => {
                  deleterHandler(elem, index);
                }}
                class="ri-delete-bin-6-line absolute top-[8%] cursor-pointer text-2xl right-[5%]"
              ></i>
              <h1 className="text-2xl font-bold">{elem.name}</h1>
              <h2 className="text-xl">
                <span className="font-semibold">Company:</span> {elem.company}
              </h2>
              <h2 className="text-xl">
                <span className="font-semibold">Phone: </span>
                {elem.phone}
              </h2>
              {elem.fav && (
                <h3 className="favourate-button px-4 py-2 bg-yellow-200 w-fit rounded-xl">
                  Favorites
                </h3>
              )}
            </div>
          </div>
        ))}
        {allUsers.length === 0 && ( <p className="text-3xl pl-[3vw] mt-[3vw]">No contacts added yet...</p>)}
      </div>
    </div>
  );
};

export default App;
