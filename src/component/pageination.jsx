import { useState, useEffect } from "react";
import axios from "axios";

export default function Pagination() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage]= useState(1);
  const [itemsPerPage]= useState(10);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage-1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex+itemsPerPage);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        setData(response.data);
      } catch (err) {
        console.error("Error in fetching data:", err);
      }
    };
    fetchApi();
  }, []);



  return (
    <div>
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((info) => (
            <tr key={info.id}>
              <td>{info.id}</td>
              <td>{info.name}</td>
              <td>{info.email}</td>
              <td>{info.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button
      onClick={()=>setCurrentPage(currentPage-1)}
      disabled={currentPage === 1}> Previous </button>
      <span>{currentPage}</span>
      <button
      onClick={()=>setCurrentPage(currentPage+1)}
      disabled={currentPage === totalPages}> Next </button>
      </div>
    </div>
  );
}
