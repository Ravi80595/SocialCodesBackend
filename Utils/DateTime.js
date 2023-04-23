const GetCurrentDate = () => {
    const Data = new Date();
    const getDate = Data.getDate();
    const getMonth = Data.toLocaleString('default', { month: 'long' });
    const getyear = Data.getFullYear();
    return getMonth + " " + getDate + " " + getyear;
  };
  
  const GetCurrentTime = () => {
    const Data = new Date();
    const hours = Data.getHours() % 12 || 12;
    const minuts = Data.getMinutes();
    return hours + ":" + minuts;
  };
  
export {GetCurrentDate, GetCurrentTime};