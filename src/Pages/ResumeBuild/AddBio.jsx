import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const AddBio = ({ bio, setBio, setActiveForm, handleDataChange, handleNextFunction, bioDetails }) => {
 
    useEffect(()=> {
        setBio(bioDetails);
    }, [bioDetails]);

    const navigate = useNavigate();

    const validateAndProceed = () => {
        const requiredFields = ["bio"];
        const emptyFields = requiredFields.filter(
            (field) => !(bio[field] || bioDetails[field])
        );

        if (emptyFields.length > 0) {
            swal("Error", `Please fill in the following fields: ${emptyFields.join(", ")}`, "error");
            return;
        }

        if ((bio.bio || bioDetails.bio || "").length < 400) {
            swal("Error", "Your bio must be at least 400 characters long.", "error");
            return;
        }

        handleNextFunction("bio");
    };

    const moveToNext = () => {
        navigate("/selectResume");
    };

    return (
        <Form className="p-3">
            <h4 className="text-center text-secondary mb-3">Enter Your Bio</h4>

            <div className="p-3 rounded shadow-sm bg-white">
                <div className="row p-3 border rounded shadow-sm mb-3 bg-light">
                    {/* Bio Input */}
                    <Form.Group className="col-12 mb-3">
                        <Form.Label className="fw-semibold">Enter your full name</Form.Label>
                        <Form.Control
                            formdetail="bio"
                            as="textarea"
                            name="bio"
                            value={bio.bio || bioDetails?.bio || ""}
                            onChange={handleDataChange}
                            placeholder="Enter your bio (Minimum 400 characters)"
                            className="w-100"
                            maxLength={550}
                            style={{ minHeight: "120px", maxWidth: "100%", resize: "none" }} // Responsive text area
                        />
                    </Form.Group>

                    {/* Navigation Buttons */}
                    <div className="d-flex justify-content-between mt-3">
                        <Button variant="secondary" onClick={() => setActiveForm("skillData")}>
                            ⬅ Prev
                        </Button>
                        <Button variant="primary" onClick={validateAndProceed}>
                            Save ➡
                        </Button>
                        {bioDetails !== null && bioDetails !== undefined && Object.keys(bioDetails).length > 0 && Object.values(bioDetails)[0] !== '' && (
                            <Button variant="primary" onClick={moveToNext}>
                                Next →
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </Form>
    );
};

export default AddBio;
