import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressCircleExample = () => {
  const percentage = 86;

  return (
    <div className='text-center'>
      <div className="w-32 h-32 mx-auto mb-6">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            rotation: 0.25,
            strokeLinecap: 'round',
            pathColor: '#dc2626',
            trailColor: '#e5e7eb',
            textColor: '#111827',
            textSize: '24px',
          })}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-red-100 h-20 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">10</div>
            <div className="text-sm text-gray-600">Лет опыта</div>
          </div>
        </div>
        <div className="bg-gray-100 h-20 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-700">97%</div>
            <div className="text-sm text-gray-600">Успешных дел</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressCircleExample;