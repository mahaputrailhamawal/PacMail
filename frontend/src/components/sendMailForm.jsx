import React, { useState } from 'react';
import Navbar from '../components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Sendmail.css';

const SendEmail = () => {
  const [from, setSenderEmail] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSenderEmailChange = (e) => {
    setSenderEmail(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
        sender_email: from,
        recepient_email: email,
        subject: subject,
        body: body
    };

    try {
        const response = await fetch(`${apiUrl}/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('Server response:', responseData);
        } else {
            console.error('Failed to send data to the server.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };


  return (
    <div>
      <Navbar />
      <div className="sendmail-container">
        <h2>Send Email</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-label">
            <label htmlFor="sender-email" className="form-label">
              Your Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="sender-email"
              value={from}
              onChange={handleSenderEmailChange}
              required
            />
          </div>
          <div className="form-label">
            <label htmlFor="email" className="form-label">
              To :
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-label">
            <label htmlFor="subject" className="form-label">
              Subject:
            </label>
            <input
              type="text"
              className="form-control"
              id="subject"
              value={subject}
              onChange={handleSubjectChange}
              required
            />
          </div>
          <div className="form-label">
            <label htmlFor="body" className="form-label">
              Body:
            </label>
            <textarea
              className="form-control"
              id="body"
              value={body}
              onChange={handleBodyChange}
              style={{ height: '200px' }}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ fontSize: '1.1em' }}>
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendEmail;
