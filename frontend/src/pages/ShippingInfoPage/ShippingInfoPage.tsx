import { useEffect, useState } from 'react';
import { IShoppingInfo } from '../../interfaces/IShoppingInfo';
import { apiService } from '../../services/api.service';

const ShippingInfoPage = () => {
  const [state, setState] = useState<IShoppingInfo>({
    id: '',
    title: '',
    photos: [],
    description: '',
    body: '',
    createdAt: '',
    updatedAt: '',
  });
  useEffect(() => {
    const getShippingInfo = async () => {
      const response = await apiService.getShippingInfo();
      setState(response)
    };
    getShippingInfo()
  }, []);
  return (
    <div>
      <h2>{state.title}</h2>
    </div>
  );
};

export default ShippingInfoPage;