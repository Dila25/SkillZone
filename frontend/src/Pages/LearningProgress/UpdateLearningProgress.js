import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SideBar from '../../Components/NavBar/NavBar';

function UpdateLearningProgress() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    skillTitle: '',
    description: '',
    field: '',
    startDate: '',
    endDate: '',
    postOwnerID: '',
    postOwnerName: ''
  });

  useEffect(() => {
    fetch(`http://localhost:8080/learningProgress/${id}`)
      .then((response) => response.json())
      .then((data) => setFormData(data))
      .catch((error) => console.error('Error fetching learning progress data:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/learningProgress/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Learning Progress updated successfully!');
        window.location.href = '/allLearningProgress';
      } else {
        alert('Failed to update Learning Progress.');
      }
    } catch (error) {
      console.error('Error updating learning progress:', error);
    }
  };

  return (
    <div>
      <div> <SideBar /></div>
      <div className='continer'>
        <div className='continSection'>
          <div className="from_continer">
            <p className="Auth_heading">Update Learning Progress</p>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
                setFormData({
                  skillTitle: '',
                  description: '',
                  field: '',
                  startDate: '',
                  endDate: '',
                  level: '',
                  postOwnerID: formData.postOwnerID,
                  postOwnerName: formData.postOwnerName,
                });
              }}
              className='from_data'
            >
              <div className="Auth_formGroup">
                <label className="Auth_label">Title</label>
                <input
                  className="Auth_input"
                  name="skillTitle"
                  placeholder="Skill Title"
                  value={formData.skillTitle}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="Auth_formGroup">
                <label className="Auth_label">Field</label>
                <select
                  className="Auth_input"
                  name="field"
                  value={formData.field}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Field</option>
                  <option value="Frontend Development">Frontend Development</option>
                  <option value="Programming Language">Programming Language</option>
                  <option value="Backend Development">Backend Development</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="Quality Assurance">Quality Assurance</option>
                </select>
              </div>
              <div className='two_fels_row'>
                <div className="Auth_formGroup">
                  <label className="Auth_label">Start Date</label>
                  <input
                    className="Auth_input"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="Auth_formGroup">
                  <label className="Auth_label">End Date</label>
                  <input
                    className="Auth_input"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      if (new Date(value) < new Date(formData.startDate)) {
                        alert("End date cannot be earlier than start date.");
                        return;
                      }
                      handleChange(e);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="Auth_formGroup">
                <label className="Auth_label">Description</label>
                <textarea
                  className="Auth_input"
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                />
              </div>

              <button type="submit" className="Auth_button">Update</button>
            </form >
          </div >
        </div >
      </div >
    </div>
  );
}

export default UpdateLearningProgress;
