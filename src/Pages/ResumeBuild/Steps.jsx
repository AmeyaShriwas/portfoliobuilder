import React, { useEffect, useState } from 'react'

const Steps = ({steps, isMobile, activeForm}) => {

    console.log('steps', steps)
    console.log('active', activeForm)
    const [selectedStep, setSelectedStep] = useState()
    useEffect(()=> {
        if(activeForm === 'personalDetails'){
            setSelectedStep('Personal Details')
        }
        if(activeForm === 'educationalForm'){
            setSelectedStep('Educational Details')
        }
        if(activeForm === 'trainig_experience'){
            setSelectedStep('Training and Experience Details')
        }
        if(activeForm === 'skillData'){
            setSelectedStep('Skills Details')
        }
        if(activeForm === 'bio'){
            setSelectedStep('Add Bio')
        }
    }, [activeForm])
  return (
    <div>
      {!isMobile ? (
                          <div className="" style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '2rem',
                              position: 'relative'
                          }}>
                              {steps.map((data, index) => (
                                  <React.Fragment key={index}>
                                      {index > 0 && <div style={{
                                          flexGrow: 1,
                                          height: '2px',
                                          backgroundColor: 'gray',
                                          margin: '0 10px'
                                      }} />}
                                      <div style={{
                                          display: 'flex',
                                          flexDirection: 'column',
                                          alignItems: 'center',
                                          textAlign: 'center',
                                          position: 'relative'
                                      }}>
                                          <div style={{
                                              width: '30px',
                                              height: '30px',
                                              borderRadius: '50%',
                                              backgroundColor: data === selectedStep? 'blue' : 'gray',
                                              color: 'white',
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              fontWeight: 'bold',
                                              marginBottom: '5px'
                                          }}>{index + 1}</div>
                                          <span style={{
                                              fontWeight: data === selectedStep ? 'bold' : 'normal',
                                              color: data === selectedStep ? 'blue' : 'black'
                                          }}>{data}</span>
                                      </div>
                                  </React.Fragment>
                              ))}
                          </div>
                      ) : (
                          <div className="border" style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '1rem'
                          }}>
                              {steps.map((data, index) => (
                                  <React.Fragment key={index}>
                                      {index > 0 && <div style={{
                                          width: '2px',
                                          height: '20px',
                                          backgroundColor: 'gray',
                                          margin: '5px 0'
                                      }} />}
                                      <div style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          textAlign: 'center',
                                          gap: '10px'
                                      }}>
                                          <div style={{
                                              width: '25px',
                                              height: '25px',
                                              borderRadius: '50%',
                                              backgroundColor: data === selectedStep ? 'blue' : 'gray',
                                              color: 'white',
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              fontWeight: 'bold'
                                          }}>{index + 1}</div>
                                          <span style={{
                                              fontSize: '12px',
                                              fontWeight:data === selectedStep ? 'bold' : 'normal',
                                              color: data === selectedStep ? 'blue' : 'black'
                                          }}>{data}</span>
                                      </div>
                                  </React.Fragment>
                              ))}
                          </div>
                      )}
    </div>
  )
}

export default Steps
