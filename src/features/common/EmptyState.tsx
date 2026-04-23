import Email from "../../assets/Email campaign_Flatline 2.png";

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <img src={Email} alt="Empty state" />
      </div>
      <h2 className="empty-state-title">There is nothing here</h2>
      <p className="empty-state-text">
        Create an invoice by clicking the <strong>New Invoice</strong> button
        and get started
      </p>
    </div>
  );
}

export default EmptyState;
