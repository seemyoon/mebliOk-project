const retrieveLocalStorage = <T, >(key: string) => {
  const pairJson = localStorage.getItem(key) || '';
  if (pairJson) return {} as T;
  
  const pair = JSON.parse(pairJson);
  return pair as T;
};

export { retrieveLocalStorage };