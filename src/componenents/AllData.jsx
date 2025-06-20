import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ViewModal from "./View";
import EditModal from "./EditModal"; // Import EditModal component
// import 'bootstrap/dist/css/bootstrap.min.css';

const AllData = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [dark, setDark] = useState("");

  const [search, setSearch] = useState("");

  function getData() {
    axios
      .get("https://684fcb01e7c42cfd1795fa46.mockapi.io/api/v1/CRUD-2")
      .then((res) => setData(res.data));
  }

  function handleDelete(id) {
    axios
      .delete(`https://684fcb01e7c42cfd1795fa46.mockapi.io/api/v1/CRUD-2/${id}`)
      .then(() => getData());
  }

  const handleView = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowEditModal(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="d-flex justify-content-center mt-5">
      <div
        className="card shadow p-4"
        style={{ width: "100%", maxWidth: "800px" }}
      >
        <div className="d-flex justify-content-between">
          <h3 className="text-primary">All Data List</h3>
          <Link to="/" className="btn btn-secondary px-2">
            Add New
          </Link>
        </div>

        {/* toogler button */}
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            onClick={() => {
              if (dark === "table-dark") setDark("");
              else setDark("table-dark");
            }}
          />
        </div>
        <div className="mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table className={`table table-hover align-middle mt-4 ${dark}`}>
          <thead className="table-light">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>View</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            
            {data
              .filter(
                (value) =>
                  value.name.toLowerCase().includes(search.toLowerCase()) ||
                  value.email.toLowerCase().includes(search.toLowerCase())
              )
              .map((value) => (
                <tr key={value.id}>
                  <th>{value.id}</th>
                  <td>{value.name}</td>
                  <td>{value.email}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => handleView(value)}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleEdit(value)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(value.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* View Modal */}
        <ViewModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          user={selectedUser}
        />

        {/* Edit Modal */}
        <EditModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          user={editingUser}
          onUpdate={getData}
        />
      </div>
    </div>
  );
};

export default AllData;
