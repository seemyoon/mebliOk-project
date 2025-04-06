import { v4 as uuidv4 } from 'uuid';

const generateDeviceId = () => {
  const deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    const newDeviceId = uuidv4();
    localStorage.setItem('deviceId', newDeviceId);
    return newDeviceId;
  }
  return deviceId;
};

const removeDeviceId = () => {
  localStorage.removeItem('deviceId');
};

export { generateDeviceId, removeDeviceId };