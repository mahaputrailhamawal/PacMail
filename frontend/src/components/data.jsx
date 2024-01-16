import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DataTable = ({ data }) => {
  const columns = ['Timestamp', 'Sender Email', 'Subject', 'Body'];
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  const handleRowClick = (email) => {
    setSelectedEmail({
      ...email,
      body: email.body.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      )),
    });
    setModalTitle(email.subject);
  };

  const handleReplyClick = () => {
    alert('Replying to email: ' + selectedEmail.body);
    setSelectedEmail(null);
    setModalTitle('');
  };

  return (
    <div className="container-fluid mt-6">
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} onClick={() => handleRowClick(row)}>
                <td>{row.timestamp}</td>
                <td>{row.senderEmail}</td>
                <td>{row.subject}</td>
                <td>{row.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for displaying email content and reply button */}
      {selectedEmail && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setSelectedEmail(null);
                    setModalTitle('');
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                {selectedEmail.body}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handleReplyClick()}
                >
                  Reply
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={() => {
                    setSelectedEmail(null);
                    setModalTitle('');
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
