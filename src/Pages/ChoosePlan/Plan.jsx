import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import swal from 'sweetalert'

const Plan = ({ isMobile, setIsMobile }) => {
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [isProcessing, setIsProcessing] = useState(false);
  const {token, data} = useSelector(state=> state.user)
  console.log('data', data.plan)
 
  useEffect(()=> {
      if(data?.plan !== undefined && data?.plan !== null){
        setSelectedPlan(data?.plan?.planName)
      }
  }, [data])

  const handlePayment = async (amount, planName) => {
    if (isProcessing) return;
    setIsProcessing(true);
    setSelectedPlan(planName);
  
    try {
      const { data } = await axios.post(
        "https://api.resumeportfolio.ameyashriwas.in/payment/create-order",
        { amount, planName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!data.success) {
        // alert("Error creating order");
        swal('Error','Error creating order')
        setIsProcessing(false);
        return;
      }
  
      const options = {
        key: "rzp_test_nQ8V25WiDaW3lt",
        amount: data.order.amount,
        currency: "INR",
        name: "Resume Portfolio Builder",
        description: `Payment for ${planName} Plan`,
        order_id: data.order.id,
        handler: async (response) => {
          try {
            await axios.post(
              "https://api.resumeportfolio.ameyashriwas.in/payment/verify-payment",
              { ...response, planName },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            // alert("Payment Successful");
            swal('Success','Payment Successful')

          } catch (error) {
            // alert("Payment Verification Failed");
            swal('Error','Payment Verification Failed')

          }
        }
      };
  
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      // alert("Payment initiation failed");
      swal('Error','Payment initiation failed')

    } finally {
      setIsProcessing(false);
    }
  };
  
  const plans = [
    {
      id: "free",
      name: "Free Plan",
      amount: 0,
      features: ["✅ Unlimited resumes", "❌ No portfolio customization", "❌ No live portfolio"],
    },
    {
      id: "rs1",
      name: "Rs 1 Plan",
      amount: 1,
      features: ["✅ 10 free resumes", "✅ 1-month live portfolio"],
    },
    {
      id: "rs2",
      name: "Rs 2 Plan",
      amount: 2,
      features: ["✅ Unlimited resumes", "✅ 6-month live portfolio"],
    },
  ];

  return (
    <>
      <Header isMobile={isMobile} setIsMobile={setIsMobile} />
      <Container fluid className="d-flex flex-column justify-content-center align-items-center py-5" style={{ minHeight: "80vh", background: "white" }}>
        <h2 className="text-center mb-4 fw-bold" style={{ color: "#2d6a4f" }}>Choose Your Plan</h2>

        <Row className="justify-content-center w-100" style={{ maxWidth: "900px" }}>
          {plans.map((plan) => (
            <Col sm={4} className="mb-3" key={plan.id}>
              <Card
                className={`text-center p-3 shadow-sm border-2 ${
                  selectedPlan === plan.id ? "border-success" : "border-light"
                }`}
                style={{
                  background: selectedPlan === plan.id ? "#e9f5db" : "#ffffff",
                  transition: "0.3s",
                  borderRadius: "12px",
                }}
              >
                <Card.Body>
                  <Card.Title className="fw-bold fs-5 text-success">{plan.name}</Card.Title>
                  <Card.Text className="fs-6 text-muted">
                    {plan.features.map((feature, index) => (
                      <div key={index}>{feature}</div>
                    ))}
                  </Card.Text>
                  {plan.amount > 0 && (
                    <Button className="mt-3" variant="dark" onClick={() => handlePayment(plan.amount, plan.id)}>
                      💰 {data?.plan !== undefined && data?.plan !== null && selectedPlan === plan.id ? 'Selected Plan':'Select Plan'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
              <span>
  {data?.plan && selectedPlan === plan.id
    ? `Ends in ${new Date(data.plan.endDate).toLocaleDateString()}`
    : null}
</span>

            </Col>
          ))}
        </Row>
      </Container>
      <Footer isMobile={isMobile} setIsMobile={setIsMobile} />
    </>
  );
};

export default Plan;
