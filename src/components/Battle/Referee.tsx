import { useTranslation } from 'react-i18next';

const Referee = () => {
  const { t } = useTranslation();

  return (
    <div className="referee">
      <div className="referee-body">
        <div className="head"></div>
        <div className="torso"></div>
        <div className="legs"></div>
      </div>
    </div>
  );
};

export default Referee; 