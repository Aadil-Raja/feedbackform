import React, { useState,useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBIcon,
  MDBRadio,
  MDBInput,
  MDBInputGroup,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import "./Feedback.css"; // <-- Your styling

// StarRating component (unchanged)
const StarRating = ({ rating, onRatingChange, readOnly = false }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <MDBIcon
          key={star}
          icon="star"
          fas
          size="lg"
          style={{
            cursor: readOnly ? "default" : "pointer",
            color: star <= rating ? "#ffc107" : "#e4e5e9",
          }}
          onClick={() => !readOnly && onRatingChange && onRatingChange(star)}
        />
      ))}
    </div>
  );
};

function Feedback() {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [modalOpen, setModalOpen] = useState(false); 
  const [modalMessage, setModalMessage] = useState("");
  const [theme, setTheme] = useState("light");
  // Same initialFormData as before
  const initialFormData = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    shoppingAmbiance:0,
    staffFriendliness:0,
    shoppingVariety:"",

  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);


const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };
  const [formData, setFormData] = useState(initialFormData);

  // Event handlers (unchanged)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (field, newRating) => {
    setFormData({ ...formData, [field]: newRating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phonePattern = /^\d{11}$/; // Regex for exactly 11 digits
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (formData.phone !="" && !phonePattern.test(formData.phone)) {
      setModalMessage("Phone number must be exactly 11 digits.");
     
      setModalOpen(true);
      return;
    }
    if (formData.email !="" && !emailRegex.test(formData.email)) {
      setModalMessage("Invalid Email.");
     
      setModalOpen(true);
      return;
    }
    try {
      console.log(formData);
      const response = await fetch(`${BASE_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setModalMessage("Thank you for your valuable feedback");
        setFormData(initialFormData);
      } else {
        setModalMessage("Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setModalMessage("An error occurred while submitting feedback.");
    }
    setModalOpen(true);
  };

  // Layout changed: now split into left image + right form
  return (
    <>
 
    
    <MDBContainer fluid className="feedback-container">
     
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol>
          {/* Card with two columns: left image, right form */}
          <MDBCard className="my-4 feedback-card">
            <MDBRow className="g-0">
              {/* Left Column: image */}
              
              <MDBCol 
    xs="12" 
    md="6" 
    className="order-1 order-md-1"
  >
                <MDBCardImage
                  src="headerimg.webp"
                  alt="Shopping Header"
                  className="header-image"
                  fluid
                />
               <h2 className="feedback-heading">WIGWAM</h2>
               <h5 className="feedback-subtitle">Your Fashion Choice</h5>

              </MDBCol>
              

              {/* Right Column: form */}
              <MDBCol 
    xs="12" 
    md="6" 
    className="order-2 order-md-2"
  >
                <MDBCardBody className="feedback-card-body">
                 
                  <p className="feedback-subtitle">
                    Please share your feedback to help us improve your shopping
                    experience.
                  </p>

                  <form onSubmit={handleSubmit} className="feedback-form">
                    <MDBRow>
                      <MDBCol>
                        <MDBInputGroup
                          textBefore={<MDBIcon fas icon="user" />}
                          className="feedback-input-group"
                        >
                          <MDBInput
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="feedback-input"
                          />
                        </MDBInputGroup>
                      </MDBCol>

                      <MDBCol>
                        <MDBInputGroup
                          textBefore={<MDBIcon fas icon="user" />}
                          className="feedback-input-group"
                        >
                          <MDBInput
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="feedback-input"
                          />
                        </MDBInputGroup>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow>
                      <MDBInputGroup
                        textBefore={<MDBIcon fas icon="mobile-screen" />}
                        className="feedback-input-group"
                      >
                        <MDBInput
                          label="Phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="feedback-input"
                        />
                      </MDBInputGroup>

                      <MDBInputGroup
                        textBefore={<MDBIcon fas icon="envelope" />}
                        className="feedback-input-group"
                      >
                        <MDBInput
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                     
                          className="feedback-input"
                        />
                      </MDBInputGroup>
                    </MDBRow>

                    {/* Example rating field */}
                    <div className="feedback-rating-group">
                      <label className="feedback-label">Shopping Ambiance</label>
                      <StarRating
                        rating={formData.shoppingAmbiance}
                        onRatingChange={(rating) =>
                          handleRatingChange("shoppingAmbiance", rating)
                        }
                      />
                    </div>

                    <div className="feedback-rating-group">
                      <label className="feedback-label">Staff Friendliness</label>
                      <StarRating
                        rating={formData.staffFriendliness}
                        onRatingChange={(rating) =>
                          handleRatingChange("staffFriendliness", rating)
                        }
                      />
                    </div>

                    {/* Example radio group */}
                    <label className="feedback-label">Shopping Variety</label>
                    <div className="feedback-radio-group">
                      <MDBRadio
                        name="shoppingVariety"
                        value="Excellent"
                        label="Excellent"
                        checked={formData.shoppingVariety === "Excellent"}
                        onChange={handleChange}
                      />
                      <MDBRadio
                        name="shoppingVariety"
                        value="Good"
                        label="Good"
                        checked={formData.shoppingVariety === "Good"}
                        onChange={handleChange}
                      />
                      <MDBRadio
                        name="shoppingVariety"
                        value="Average"
                        label="Average"
                        checked={formData.shoppingVariety === "Average"}
                        onChange={handleChange}
                      />
                      <MDBRadio
                        name="shoppingVariety"
                        value="Poor"
                        label="Poor"
                        checked={formData.shoppingVariety === "Poor"}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Submit + Reset */}
                    <div className="feedback-submit-container">
                      <MDBBtn
                        type="submit"
                        color="success"
                        className="feedback-submit-btn"
                      >
                        Submit Feedback
                      </MDBBtn>
                      <MDBBtn
                        type="button"
                        color="danger"
                        className="feedback-reset-btn"
                        onClick={() => setFormData(initialFormData)}
                      >
                        Reset All
                      </MDBBtn>
                    </div>
                  </form>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    <MDBModal open={modalOpen} setShow={setModalOpen} className="custom-modal">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <h5 className="modal-title">Feedback Submission</h5>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setModalOpen(false)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>{modalMessage}</MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={() => setModalOpen(false)}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

export default Feedback;
