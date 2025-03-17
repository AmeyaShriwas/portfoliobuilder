import React, { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import swal from "sweetalert";


const Training_ExperienceDetails = ({training_experience, settraining_experienceData, trainig_ExperienceDetails, handleDataChange, handleAddMoreTraining_Experience, handleRemoveTraining_Experience, setActiveForm, handleNextFuntion }) => {

    useEffect(()=> {
        if(trainig_ExperienceDetails.length > 0){
            if(trainig_ExperienceDetails.map((data)=> Object.keys(data).length > 0 && Object.values(data).length> 0)){
                settraining_experienceData(trainig_ExperienceDetails)

            }
        }
    }, [trainig_ExperienceDetails])

    if (!training_experience || training_experience.length === 0) {
        return <p className="text-center text-muted">No data found</p>;
    }
    const validateAndProceed = () => {
        const requiredFields = ["training_company", "course_job", "from", "to", "description"];
    
        const emptyFields = training_experience.some((data) =>
            requiredFields.some((field) => !data[field] && !trainig_ExperienceDetails[field])
        );
    
        const shortDescription = training_experience.some((data) => 
            data.description.length < 200
        );
    
        if (emptyFields) {
            swal("Error", "Please fill in all training/experience details before proceeding.");
            return;
        }
    
        if (shortDescription) {
            swal("Error", "The description should be at least 300 characters long.");
            return;
        }
    
        handleNextFuntion('training_experience');
    };
    
    
      const moveToNext = ()=> {
        setActiveForm('skillData')
      }

    return (
        <div className="container py-3">
            <h4 className="text-center text-secondary mb-3">
                🏫 Enter Your Training/Experience Details
            </h4>

            {training_experience.map((data, index) => (
                <Form key={index} className="border rounded p-4 mb-3 shadow-sm bg-light">
                    <div className="row">
                        <Form.Group className="col-md-6 mb-3">
                            <Form.Label>Training Institute / Company Name</Form.Label>
                            <Form.Control
                                formdetail="training_experience"
                                name="training_company"
                                value={data.training_company || trainig_ExperienceDetails.training_company}
                                onChange={(e) => handleDataChange(e, index)}
                                type="text"
                                placeholder="Enter company name"
                            />
                        </Form.Group>

                        <Form.Group className="col-md-6 mb-3">
                            <Form.Label>Course Name / Job Position</Form.Label>
                            <Form.Control
                                formdetail="training_experience"
                                name="course_job"
                                value={data.course_job || trainig_ExperienceDetails.course_job}
                                onChange={(e) => handleDataChange(e, index)}
                                type="text"
                                placeholder="Enter course or job position"
                            />
                        </Form.Group>

                        <Form.Group className="col-md-6 mb-3">
                            <Form.Label>From</Form.Label>
                            <Form.Control
                                formdetail="training_experience"
                                name="from"
                                value={data.from || trainig_ExperienceDetails.from}
                                onChange={(e) => handleDataChange(e, index)}
                                type="date"
                            />
                        </Form.Group>

                        <Form.Group className="col-md-6 mb-3">
                            <Form.Label>To</Form.Label>
                            <Form.Control
                                formdetail="training_experience"
                                name="to"
                                value={data.to || trainig_ExperienceDetails.to}
                                onChange={(e) => handleDataChange(e, index)}
                                type="date"
                            />
                        </Form.Group>

                        <Form.Group className="col-12 mb-3">
                            <Form.Label>Short Description</Form.Label>
                            <Form.Control
                                formdetail="training_experience"
                                name="description"
                                value={data.description || trainig_ExperienceDetails.description}
                                onChange={(e) => handleDataChange(e, index)}
                                as="textarea"
                                rows={3}
                                maxLength={300}
                                placeholder="Describe your training or experience"
                            />
                        </Form.Group>
                    </div>

                    <div className="d-flex justify-content-between">
                        <Button variant="outline-primary" onClick={handleAddMoreTraining_Experience}>➕ Add More</Button>
                        {index > 0 && (
                            <Button variant="outline-danger" onClick={() => handleRemoveTraining_Experience(index)}>❌ Remove</Button>
                        )}
                    </div>
                </Form>
            ))}

            <div className="d-flex justify-content-between mt-4">
                <Button variant="secondary" onClick={() => setActiveForm("educationalForm")}>⬅ Prev</Button>
                <Button variant="primary" onClick={validateAndProceed}>Save ➡</Button>
                {trainig_ExperienceDetails !== null && trainig_ExperienceDetails !== undefined && Object.keys(trainig_ExperienceDetails).length > 0 &&
                          Object.values(trainig_ExperienceDetails)[0] !== "" && (
                            <Button variant="primary" onClick={moveToNext}>
                              Next ➡
                            </Button>
                          )}
            </div>
        </div>
    );
}

export default Training_ExperienceDetails
