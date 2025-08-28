import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Progress = () => {
  const data = [
    { value: 95, text: '95%', label: 'Успешных дел' },
    { value: 10, text: '10+', label: 'Лет опыта' },
    { value: 500, text: '500+', label: 'Довольных клиентов' },
    { value: 24, text: '24/7', label: 'Поддержка' }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Наши достижения</h2>
          <p className="text-lg text-gray-600">Цифры, которые говорят о качестве наших услуг</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-4 gap-8">
          {data.map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 mx-auto mb-6">
                <CircularProgressbar
                  value={item.value}
                  text={item.text}
                  styles={buildStyles({
                    rotation: 0.25,
                    strokeLinecap: 'round',
                    pathColor: '#dc2626',
                    trailColor: '#e5e7eb',
                    textColor: '#111827',
                    textSize: '20px',
                  })}
                />
              </div>
              <div className="text-lg font-semibold text-gray-900">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;