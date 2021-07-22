import React, { useEffect, useRef, useState } from "react";
import "./dropdown.scss";

<<<<<<< HEAD
function Dropdown({ title, items = [], provinsiValue, test }) {
=======
function Dropdown({ title, items = [], dropdownValue }) {
>>>>>>> abb1e1a52a08959d4448f26c868eab98ae24f0c0
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState(title);
  const [data, setData] = useState([]);
  const node = useRef();

  useEffect(() => {
    if (open) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  function handleData(item) {
    dropdownValue(item);
    setSelection(item);
    setData(item);
  }

  useEffect(() => {
    //provinsiValue(data);
    console.log('dropdown value (child): '+data);
    console.log(items)
    // provinsiValue(selection);
  }, [selection]);

  const handleClickOutside = (e) => {
    if (node && node.current && node.current.contains(e.target)) {
      // inside click
      setOpen(!open);
    }
    // outside click
    setOpen(false);
  };

  return (
    <div className="dropdown-wrapper">
      <div className="dd-header" role="button" onClick={() => setOpen(!open)}>
        {selection}
        <i
          className={`fas fa-chevron-down ${open ? "arrow-u" : "arrow-d"}`}
        ></i>
      </div>
      <ul className={`dd-list ${open ? "open" : ""}`} ref={node}>
        {items.map((item) => (
          <li
            className="dd-item"
            key={item.id}
            onClick={() => handleData(item.value)}
          >
            <span className="item-value"></span>
            {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;
