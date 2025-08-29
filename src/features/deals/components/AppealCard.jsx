const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }) + ' в ' + date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const AppealCard = ({ appeal }) => {
    const getStatusColor = () => {
      const colorMap = {
        'green': 'bg-green-100 text-green-800',
        'yellow': 'bg-yellow-100 text-yellow-800',
        'red': 'bg-red-100 text-red-800',
        'blue': 'bg-blue-100 text-blue-800'
      };
      return colorMap[appeal.status_color] || 'bg-gray-100 text-gray-800';
    };
  
    return (
      <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-red-200 transition-colors duration-200">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">{appeal.title}</h4>
            <div className="flex flex-wrap gap-3 text-sm text-gray-500">
              <span className="bg-gray-100 px-3 py-1 rounded-lg">#{appeal.id}</span>
              <span>{formatDate(appeal.created_at)}</span>
            </div>
          </div>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
            {appeal.status_icon && <span className="mr-2">{appeal.status_icon}</span>}
            <span>{appeal.stage_name}</span>
          </div>
        </div>
  
        {appeal.opportunity && Number(appeal.opportunity) > 0 && (
          <div className="mt-6 pt-4 border-t-2 border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Сумма сделки:</span>
              <span className="text-lg font-bold text-green-600">
                {Number(appeal.opportunity).toLocaleString('ru-RU')} ₽
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default AppealCard;