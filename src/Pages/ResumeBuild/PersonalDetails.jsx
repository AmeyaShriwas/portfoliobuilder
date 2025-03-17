import React from "react";
import { Button, Form } from "react-bootstrap";
import swal from "sweetalert";
import { useSelector } from "react-redux";

const PersonalDetails = ({
  image,
  personalData,
  personalDetails,
  handleDataChange,
  handleNextFuntion,
  setActiveForm,
}) => {
  const personalDetailsGet = useSelector((state) => state.resume.personalDetails);
  console.log('pre',personalDetailsGet)

  const validateAndProceed = () => {
    const requiredFields = ["fullName", "email", "number", "address"];
    const emptyFields = requiredFields.filter(
      (field) => !(personalData[field] || personalDetails[field])
    );

    if (emptyFields.length > 0) {
      swal("Error", `Please fill in the following fields: ${emptyFields.join(", ")}`);
      return;
    }
    handleNextFuntion("personal");
  };

  const moveToNext = () => {
    setActiveForm("educationalForm");
  };

  return (
    <Form className="p-4">
      <h4 className="text-center text-secondary mb-3">Enter Your Personal Details</h4>
      <div className="p-3 rounded shadow-sm bg-white">
        <div className="row p-3 border rounded shadow-sm mb-3 bg-light">
          {/* Upload Photo */}
        {/* Upload Photo */}
<Form.Group className="col-md-6 mb-3">
  <Form.Label className="fw-semibold">Upload your photo</Form.Label>
  <div style={{ background: "white", padding: "5px", borderRadius: "5px" }}>
    <small className="text-secondary">Please upload a clear and recent photo. White Background should be better</small>
  </div>
  <Form.Control formdetail="personal" type="file" name="photo" onChange={handleDataChange} />
  {image && (
    <div style={{ background: "white", padding: "10px", borderRadius: "5px" }}>
      <img src={image} alt="Preview" style={{ width: "200px" }} />
    </div>
  )}
</Form.Group>


          {/* Full Name */}
          <Form.Group className="col-md-6 mb-3">
            <Form.Label className="fw-semibold">Enter your full name</Form.Label>
            <Form.Control
              formdetail="personal"
              type="text"
              name="fullName"
              value={personalData?.fullName || personalDetails?.fullName || ""}
              onChange={handleDataChange}
              placeholder="John Doe"
            />
          </Form.Group>

          {/* Email */}
          <Form.Group className="col-md-6 mb-3">
            <Form.Label className="fw-semibold">Enter your email</Form.Label>
            <Form.Control
              formdetail="personal"
              type="email"
              name="email"
              value={personalData?.email || personalDetails?.email || ""}
              onChange={handleDataChange}
              placeholder="example@email.com"
            />
          </Form.Group>

          {/* Phone Number */}
          <Form.Group className="col-md-6 mb-3">
            <Form.Label className="fw-semibold">Enter your number</Form.Label>
            <Form.Control
              formdetail="personal"
              type="number"
              name="number"
              value={personalData?.number || personalDetails?.number || ""}
              onChange={handleDataChange}
              placeholder="1234567890"
            />
          </Form.Group>

          {/* Address */}
          <Form.Group className="col-md-12 mb-3">
            <Form.Label className="fw-semibold">Enter your address</Form.Label>
            <Form.Control
              formdetail="personal"
              type="text"
              name="address"
              value={personalData?.address || personalDetails?.address || ""}
              onChange={handleDataChange}
              placeholder="123 Main St, City, Country"
            />
          </Form.Group>

          {/* Buttons */}
          <div className="d-flex justify-content-end" style={{ gap: "10px" }}>
            <Button variant="primary" onClick={validateAndProceed}>
              Save →
            </Button>
            {personalDetailsGet !== null && personalDetailsGet !== undefined && Object?.keys(personalDetails).length > 0 &&
              Object?.values(personalDetailsGet)[0] !== "" && (
                <Button variant="primary" onClick={moveToNext}>
                  Next →
                </Button>
              )}
          </div>
        </div>
      </div>
      {/* Bottom Section */}
      <div className="text-center mt-4 p-3 bg-light rounded shadow-sm">
        <p className="text-secondary">Ensure all details are correct before proceeding.</p>
      </div>
    </Form>
  );
};

export default PersonalDetails;
