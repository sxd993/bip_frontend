import { useState, useEffect, useContext } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ChatMessages from '../../components/Deal/ChatMessages';
import ChatInput from '../../components/Deal/ChatInput';
import './Deal.css';

const Deal = () => {
  const { dealId } = useParams();
  const { auth } = useContext(AuthContext);
  const [deal, setDeal] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const loadData = async () => {
    try {
      setLoading(true);
      const [dealResponse, activitiesResponse] = await Promise.all([
        axios.post(
          'http://localhost:8000/get-deal',
          { deal_id: String(dealId) },
          { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
        ),
        axios.post(
          'http://localhost:8000/get-activities',
          { deal_id: String(dealId) },
          { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
        ),
      ]);
      setDeal(dealResponse.data);
      const sortedActivities = activitiesResponse.data.sort((a, b) => new Date(a.CREATED) - new Date(b.CREATED));
      setActivities(sortedActivities);
    } catch (err) {
      const errorMessage = err.response?.data?.detail || `Ошибка загрузки: ${err.message}`;
      setError(errorMessage);
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [dealId]);

  const handleActivityAdded = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/get-activities',
        { deal_id: String(dealId) },
        { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
      );
      const sortedActivities = response.data.sort((a, b) => new Date(a.CREATED) - new Date(b.CREATED));
      setActivities(sortedActivities);
      setSnackbar({ open: true, message: 'Сообщение отправлено', severity: 'success' });
    } catch (err) {
      const errorMessage = err.response?.data?.detail || `Ошибка загрузки активностей: ${err.message}`;
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
    }
  };

  const handleError = (message) => {
    setSnackbar({ open: true, message, severity: 'error' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="deal">
      <NavLink to="/personal-account" className="back-button">
        Назад в личный кабинет
      </NavLink>
      {loading ? (
        <p className="status-message">Загрузка...</p>
      ) : error ? (
        <p className="error-message">Ошибка: {error}</p>
      ) : !deal ? (
        <p className="status-message">Сделка не найдена</p>
      ) : (
        <>
          <div className="deal-header">
            <h2>Сделка: {deal.TITLE}</h2>
            <div className="deal-info">
              <p><strong>ID:</strong> {deal.ID}</p>
              <p><strong>Статус:</strong> {deal.STAGE_NAME}</p>
              <p><strong>Дата создания:</strong> {new Date(deal.DATE_CREATE).toLocaleDateString()}</p>
            </div>
          </div>
          <h3>Переписка</h3>
          <ChatMessages activities={activities} auth={auth} />
          <ChatInput
            dealId={dealId}
            auth={auth}
            onActivityAdded={handleActivityAdded}
            onError={handleError}
          />
        </>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Deal;