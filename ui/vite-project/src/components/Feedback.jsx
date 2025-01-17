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
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "./Feedback.css"; // <-- Your styling
import "react-phone-input-2/lib/style.css"
import PhoneInput from "react-phone-input-2"

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
  const [consentChecked, setConsentChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); 
  const [modalMessage, setModalMessage] = useState("");
  const [theme, setTheme] = useState("light");
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  // Same initialFormData as before
  const initialFormData = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    shoppingAmbiance:0,
    staffFriendliness:0,
    shoppingVariety:"",
    preferences: {
      email: false,
      whatsapp: false,
      sms: false,}

  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };
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
 // Handle change for checkboxes
 const handleCheckboxChange = (e) => {
  const { name, checked } = e.target;
  setFormData((prev) => ({
    ...prev,
    preferences: {
      ...prev.preferences,
      [name]: checked,
    },
  }));
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      consentChecked &&
      !(
        formData.preferences.email ||
        formData.preferences.whatsapp ||
        formData.preferences.sms
      )
    ) {
      setModalMessage("Please select at least one communication preference.");
      setModalOpen(true);
      return;
    }
    
    //const phonePattern = /^\d{11}$/; // Regex for exactly 11 digits
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // if (formData.phone !="" && !phonePattern.test(formData.phone)) {
    //   setModalMessage("Phone number must be exactly 11 digits.");
     
    //   setModalOpen(true);
    //   return;
    // }
    if (formData.email !="" && !emailRegex.test(formData.email)) {
      setModalMessage("Invalid Email.");
     
      setModalOpen(true);
      return;
    }

    if (formData.shoppingVariety === "") {
      setModalMessage("Please select a Shopping Variety.");
      setModalOpen(true);
      return;
    }
    
    if (formData.shoppingAmbiance === 0) {
      setModalMessage("Please rate the Shopping Ambiance.");
      setModalOpen(true);
      return;
    }
    
    if (formData.staffFriendliness === 0) {
      setModalMessage("Please rate the Staff Friendliness.");
      setModalOpen(true);
      return;
    }
    
    const updatedformData = {
      ...formData,
      consentChecked: consentChecked, // Add consentChecked explicitly
    };

    try {
      console.log(updatedformData);
      const response = await fetch(`${BASE_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedformData),
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
               <p className="feedback-subtitle">
                    Please share your feedback to help us improve your shopping
                    experience.
                  </p>

              </MDBCol>
              

              {/* Right Column: form */}
              <MDBCol 
    xs="12" 
    md="6" 
    className="order-2 order-md-2"
  >
                <MDBCardBody className="feedback-card-body">
                 
                 

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
  {/* Phone Number Input */}
  <div className="feedback-input-group">
    <PhoneInput
      country={"us"}
      value={formData.phone}
      onChange={(value) => setFormData({ ...formData, phone: value })}
      inputClass="feedback-phone-input"
      containerClass="feedback-phone-container"
    />
  </div>

  {/* Email Input */}
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

                   
                     
                      {/* <MDBInputGroup
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
                      </MDBInputGroup> */}

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

                    <div className="form-check my-3">
  <input
    type="checkbox"
    className="form-check-input"
    id="consentCheckbox"
    checked={consentChecked}
    onChange={() => {
      // Toggle consentChecked state
      const newConsentState = !consentChecked;
      setConsentChecked(newConsentState);
  
      // Reset preferences if consent is unchecked
      if (!newConsentState) {
        setFormData({
          ...formData,
          preferences: {
            ...formData.preferences,
            email: false,
            whatsapp: false,
            sms: false,
          },
        });
      }
    }}
  />
  <label className="form-check-label" htmlFor="consentCheckbox">
    By checking this box, I agree to receive promotional SMS, WhatsApp messages, and emails from Wig Wam. I have read and agree to Wig Wam's{" "}
    <span
      className="text-primary"
      style={{ cursor: "pointer", textDecoration: "underline" }}
      onClick={(e) => {
        e.preventDefault(); // Prevent any default behavior
        e.stopPropagation(); // Prevent the click from affecting the checkbox
        setPrivacyModalOpen(true); // Open the modal
      }}
    >
      Privacy Policy.
    </span>
  </label>
</div>

<div className="mt-3 feedback-checkbox-group">
                        
                        <MDBCheckbox
                          label="Email"
                          name="email"
                          disabled={!consentChecked}
                          checked={formData.preferences.email}
                          onChange={handleCheckboxChange}
                        />
                        <MDBCheckbox
                          label="WhatsApp"
                          name="whatsapp"
                          disabled={!consentChecked}
                          checked={formData.preferences.whatsapp}
                          onChange={handleCheckboxChange}
                        />
                        <MDBCheckbox
                          label="SMS"
                          name="sms"
                          disabled={!consentChecked}
                          checked={formData.preferences.sms}
                          onChange={handleCheckboxChange}
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
      <MDBModal  open={privacyModalOpen}  setShow={setPrivacyModalOpen} className="privacy-modal">
  <MDBModalDialog centered>
    <MDBModalContent className="privacy-modal-content">
      <MDBModalHeader>
      
        <MDBBtn
          className="btn-close"
          color="none"
          onClick={() => setPrivacyModalOpen(false)}
        ></MDBBtn>
      </MDBModalHeader>
      <MDBModalBody className="privacy-modal-body">
        <h3>*Privacy Policy*</h3>
        <p>
          <strong>1. Data Collection</strong>
          <br />
          We collect your name, phone number, and email address during the
          feedback process. This information is used for:
          <ul>
            <li>Sending promotional messages and updates.</li>
            <li>Providing exclusive offers and discounts.</li>
            <li>
              Sharing updates about our products, services, and events.
            </li>
          </ul>
        </p>
        <p>
          <strong>2. Data Usage</strong>
          <br />
          - Your personal information will only be used for the purposes
          mentioned above. <br />- You may opt out of receiving promotional
          messages at any time by contacting us or following the unsubscribe
          instructions in our communications.
        </p>
        <p>
          <strong>3. Data Security</strong>
          <br />
          - We are committed to keeping your data secure and confidential.{" "}
          <br />- Your personal information will not be shared, sold, or
          disclosed to any third party without your explicit consent, except as
          required by law.
        </p>
        <p>
          <strong>4. Data Retention</strong>
          <br />
          - We retain your data only for as long as necessary to fulfill the
          purposes for which it was collected.
        </p>
        <p>
          <strong>5. Your Rights</strong>
          <br />
          - You have the right to access, update, or delete your personal
          information. <br />- For any inquiries or requests regarding your
          data, you can contact us at [insert contact details].
        </p>
        <p>
          <strong>6. Consent</strong>
          <br />
          By providing your feedback, phone number, and email address, you
          consent to our privacy policy and the use of your data as outlined
          above.
        </p>
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="secondary" onClick={() => setPrivacyModalOpen(false)}>
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
