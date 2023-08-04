import React, { useState } from "react";
import CategoryModal from "../components/CategoryModal";
// import axios from "axios";


export default function Category() {

const [category,setCategory] = useState([])

// useEffect (()=>{
// axios.get()
// .then((json) => console.log(json))
// .catch((error)=> console.log(error))
// },[])

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center bg-primary p-2 my-3 rounded">
        <span className="fs-4 fw-bold text-white">CATEGORIES</span>
        <CategoryModal />
      </div>

<div className="container">
  <table className="table">
<thead>
  <tr>
    <th scope='ID'></th>
    <th scope='Category Name'></th>
    <th scope='Category Image'></th>
  </tr>
</thead>
<tbody>
  {category.map((cat, index) => (
    <tr key={index}>
      <th scope='row'>{index+1}</th>
      <td>{cat.name}</td>
      <td><img src={cat.image} alt={cat.name}/></td>
    </tr>
  ))}
</tbody>

  </table>
</div>

    </div>
  );
}
