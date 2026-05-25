// frontend/src/pages/HelpCenter/HelpCenter.jsx
import "./HelpCenter.css";

const HelpCenter = () => {
  return (
    <div className="help-container">
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Help Center & FAQ</h2>
      
      <div className="faq-card">
        <h3 className="faq-question">How do I check my enquiry status?</h3>
        <p className="faq-answer">Navigate to the "Check Status" page using the top menu to see updates from the Admin.</p>
      </div>

      <div className="faq-card">
        <h3 className="faq-question">Can I reply to a closed ticket?</h3>
        <p className="faq-answer">No, once an Admin closes a ticket, the conversation is locked. You will need to submit a new enquiry form for further assistance.</p>
      </div>

      <div className="faq-card">
        <h3 className="faq-question">How do I change my password?</h3>
        <p className="faq-answer">Click on "⚙️ Settings" in the navbar. You can update your name and password securely from there.</p>
      </div>
    </div>
  );
};

export default HelpCenter;