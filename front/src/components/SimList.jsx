import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

const SimList = ({ affectations }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Number of items to display per page

  // Change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = affectations.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="">
      {!affectations ? (
        <div>Loading...</div>
      ) : (
        <>
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>Date</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Qte</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((affectation, index) => (
                <tr key={index}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{new Date(affectation.createdAt).toLocaleString()}</td>
                  <td>{affectation?.sender?.name}</td>
                  <td>{affectation?.receiver?.name}</td>
                  <td>{affectation.quantite}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={affectations.length}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default SimList;
