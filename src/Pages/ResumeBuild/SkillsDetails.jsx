import React, { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import swal from "sweetalert";


const SkillsDetails = ({skillData, setSkillData, skillsDetailsGet, handleDataChange, handleAddMoreSkill, handleRemoveSkill, setActiveForm, handleNextFuntion }) => {
   
    useEffect(()=> {
        if(skillsDetailsGet.length > 0){
            if(skillsDetailsGet.map((data)=> Object.keys(data).length> 0 && Object.values(data).length> 0)){
                setSkillData(skillsDetailsGet)

            }
        }
    }, [skillsDetailsGet])

    if (!skillData || skillData.length === 0) {
        return <p className="text-center text-muted">No data found</p>;
    }

    const validateAndProceed = () => {
        const requiredFields = ["skill"];
        const emptyFields = skillData.some((data) =>
          requiredFields.some((field) => !data[field] && !skillsDetailsGet[field])
        );
    
        if (emptyFields) {
          swal("Error", "Please fill in all educational details before proceeding.");
          return;
        }
    
        handleNextFuntion("skill");
      };
    
      const moveToNext = ()=> {
        setActiveForm('bio')
      }

    return (
        <div className="container p-4">
            <h4 className="text-center text-secondary mb-3">Enter Your Skill Details</h4>

            {skillData.map((data, index) => (
                <Form key={index} className="mb-3">
                    <div className="row border rounded p-3 mx-auto shadow-sm" style={{ maxWidth: "600px" }}>
                        <Form.Group className="col-12">
                            <Form.Label className="fw-bold">Skill Name</Form.Label>
                            <Form.Control
                                formdetail="skill"
                                name="skill"
                                value={data.skill || skillsDetailsGet.skill}
                                onChange={(e) => handleDataChange(e, index)}
                                type="text"
                                placeholder="Enter skill name"
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end mt-3 gap-2">
                            <Button variant="success" onClick={handleAddMoreSkill}>
                                + Add More
                            </Button>
                            {index > 0 && (
                                <Button variant="danger" onClick={() => handleRemoveSkill(index)}>
                                    - Remove
                                </Button>
                            )}
                        </div>
                    </div>
                </Form>
            ))}

            {/* Navigation Buttons */}
            <div className="d-flex justify-content-between mt-4">
                <Button variant="secondary" onClick={() => setActiveForm("trainig_experience")}>
                    Prev
                </Button>
                <Button variant="primary" onClick={validateAndProceed}>
                    Save
                </Button>
                {skillsDetailsGet !== null && skillsDetailsGet !== undefined && Object.keys(skillsDetailsGet).length > 0 &&
                          Object.values(skillsDetailsGet)[0] !== "" && (
                            <Button variant="primary" onClick={moveToNext}>
                              Next ➡
                            </Button>
                          )}
            </div>
        </div>
    );
}

export default SkillsDetails
