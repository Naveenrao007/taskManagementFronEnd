import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const TaskDetails = () => {
  const location = useLocation();
  const [taskData, setTaskData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = new URLSearchParams(location.search);
  const dashboardId = searchParams.get('dashboardId');
  const taskId = searchParams.get('taskId');
  const fromArray = searchParams.get('fromArray');

  useEffect(() => {
    const fetchTaskData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:3000/dashboard/getTask', {
          params: { dashboardId, taskId, fromArray }
        });
        setTaskData(response.data.data);
      } catch (error) {
        console.error('Error fetching task data:', error);
        setError("Failed to load task details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    if (dashboardId && taskId && fromArray) {
      fetchTaskData();
    } else {
      setError("Missing required query parameters.");
      setLoading(false);
    }
  }, [dashboardId, taskId, fromArray]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Task Details</h1>
      {taskData ? (
        <div>
          <h2>{taskData.title}</h2>
          <p>Priority: {taskData.priority}</p>
          <ul>
            {taskData.checkList?.map((item, index) => (
                <ul key={index}>
                    <li> {item.title} </li>
                </ul>
            ))}
          </ul>
        </div>
      ) : (
        <p>No task details available.</p>
      )}
    </div>
  );
};

export default TaskDetails;
