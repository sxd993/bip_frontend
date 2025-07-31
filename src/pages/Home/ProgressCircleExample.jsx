
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './styles/ProgressCircleExample.css';

const ProgressCircleExample = () => {
  const percentage = 86;

  return (
    <div className='circle-container'>
      <div className="progress-circle-wrapper" style={{ '--progress-value': `${percentage}%` }}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            rotation: 0.25, // Начало с 12 часов для движения по часовой стрелке
            strokeLinecap: 'round', // Закруглённые концы линии
          })}
        />
      </div>
      <div className="bar-chart">
        <div className="bar red"></div>
        <div className="bar gray-light"></div>
        <div className="bar black"></div>
        <div className="bar gray-dark"></div>
      </div>
    </div>
  );
};

export default ProgressCircleExample;