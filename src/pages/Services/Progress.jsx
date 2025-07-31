import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './styles/Progress.css';

const Progress = () => {
  const data = [
    { value: 50, label: 'Лет опыта', text: '10' },
    { value: 78, label: 'Выигранных дел', text: '78%' },
    { value: 90, label: 'Довольных клиентов', text: '97%' },
  ];

  return (
    <div className='progress-circle-container'>
      <div className='progress-circles-group'>
        {data.map((item, index) => (
          <div key={index} className='progress-circle-item'>
            <CircularProgressbar
              value={item.value}
              text={item.text}
              styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: 'round',
                pathColor: 'red',
                trailColor: '#e5e7eb', 
                textColor: '#333',
                textSize: '24px',
              })}
            />
            <div className='progress-label'>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;