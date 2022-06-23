export const formatQuantity = quantity => {
  return Number(quantity).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const formatDate = dateInput => {
  const newDate = new Date(dateInput);
  const options = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  };
  return newDate.toLocaleDateString('en-US', options);
};

export const generateID = () => {
  const random = Math.random().toString(36).substring(2, 11);
  const date = Date.now().toString(36);
  return random + date;
};

export const icons = {
  bills: require('../img/billsIcon.png'),
  food: require('../img/foodIcon.png'),
  health: require('../img/healthIcon.png'),
  house: require('../img/houseIcon.png'),
  leisure: require('../img/leisureIcon.png'),
  saving: require('../img/savingIcon.png'),
  subscriptions: require('../img/subscriptionsIcon.png'),
};

export const titleColor = {
  bills: '#34D399',
  food: '#DB2777',
  health: '#EF4444',
  house: '#4F46E5',
  leisure: '#FBBF24',
  saving: '#3B82F6',
  subscriptions: '#7C3AED',
};
