interface CardProps {
  user: string;
  onAcceptClick: () => void;
  onDeclineClick: () => void;
}

const Card: React.FC<CardProps> = ({ user, onAcceptClick, onDeclineClick }) => {
  return (
    <>
      <div className="text-sm">{user} challenged you!</div>
      <button onClick={onAcceptClick} className="btn">
        Accept
      </button>
      <button onClick={onDeclineClick} className="btn">
        Deny
      </button>
    </>
  );
};

export default Card;
