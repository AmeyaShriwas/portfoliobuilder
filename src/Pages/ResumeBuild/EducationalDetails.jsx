import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import swal from "sweetalert";

const EducationalDetails = ({
  educationalData,
  educationalDetailsGet,
  handleDataChange,
  handleAddMoreEducation,
  handleRemoveEducation,
  setActiveForm,
  handleNextFuntion,
  setEducationalData
}) => {
  
    useEffect(()=> {
      console.log('educ', educationalDetailsGet)
      if(educationalDetailsGet.length > 0){
      if(educationalDetailsGet.map((data)=> Object.keys(data).length> 0 && Object.values(data).length > 0)){
        setEducationalData(educationalDetailsGet)

      }
      }
     
      }, [educationalDetailsGet])

      console.log('edu', educationalData)
      console.log('edu red', educationalDetailsGet)


  if (!educationalData || educationalData.length === 0) {
    console.log('ed', educationalData)
    return <p className="text-center text-muted">No data found</p>;
  }

  console.log('edu', educationalDetailsGet)

 

  const validateAndProceed = () => {
    const requiredFields = ["university_school", "degree_class", "from", "to"];
    const emptyFields = educationalData.some((data) =>
      requiredFields.some((field) => !data[field] && !educationalDetailsGet[field])
    );

    if (emptyFields) {
      swal("Error", "Please fill in all educational details before proceeding.");
      return;
    }

    handleNextFuntion("educational");
  };

  const moveToNext = ()=> {
    setActiveForm('trainig_experience')
  }

  return (
    <div className="container">
      <h5 className="text-center text-secondary my-3">Enter Your Educational Details</h5>

      {educationalData.map((data, index) => (
        <Form key={index} className="p-3 border rounded shadow-sm mb-3 bg-light">
          <div className="row g-3">
            {/* University/School */}
            <Form.Group className="col-md-6">
              <Form.Label>University/School</Form.Label>
              <Form.Control
                formdetail="educational"
                type="text"
                name="university_school"
                value={data.university_school || educationalDetailsGet.university_school || ""}
                onChange={(e) => handleDataChange(e, index)}
                placeholder="Enter university or school"
              />
            </Form.Group>

            {/* Degree/Class */}
            <Form.Group className="col-md-6">
              <Form.Label>Degree/Class</Form.Label>
              <Form.Control
                formdetail="educational"
                name="degree_class"
                type="text"
                value={data.degree_class || educationalDetailsGet.degree_class || ""}
                onChange={(e) => handleDataChange(e, index)}
                placeholder="Enter degree or class"
              />
            </Form.Group>

            {/* From Date */}
            <Form.Group className="col-md-6">
              <Form.Label>From</Form.Label>
              <Form.Control
                formdetail="educational"
                name="from"
                type="date"
                value={data.from || educationalDetailsGet.from || ""}
                onChange={(e) => handleDataChange(e, index)}
              />
            </Form.Group>

            {/* To Date */}
            <Form.Group className="col-md-6">
              <Form.Label>To</Form.Label>
              <Form.Control
                formdetail="educational"
                name="to"
                type="date"
                value={data.to || educationalDetailsGet.to || ""}
                onChange={(e) => handleDataChange(e, index)}
              />
            </Form.Group>
          </div>

          {/* Add/Remove Buttons */}
          <div className="d-flex justify-content-between mt-3">
            <Button variant="outline-primary" onClick={handleAddMoreEducation}>
              ➕ Add More
            </Button>
            {index > 0 && (
              <Button variant="outline-danger" onClick={() => handleRemoveEducation(index)}>
                ❌ Remove
              </Button>
            )}
          </div>
        </Form>
      ))}

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mt-4">
        <Button variant="secondary" onClick={() => setActiveForm("personalDetails")}>
          ⬅ Prev
        </Button>


    
            <Button variant="primary" onClick={validateAndProceed}>
              Save ➡
            </Button>
          

{educationalDetailsGet !== null && educationalDetailsGet !== undefined && Object.keys(educationalDetailsGet).length > 0 &&
          Object.values(educationalDetailsGet)[0] !== "" && (
            <Button variant="primary" onClick={moveToNext}>
              Next ➡
            </Button>
          )}
      </div>
    </div>
  );
};

export default EducationalDetails;
