export const validateEmail = (email) => {
  const allowedDomains = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
  return allowedDomains.some(domain => email.toLowerCase().endsWith(domain));
};

export const validateRUN = (run) => {
  const cleanRUN = run.replace(/[.-]/g, '');
  if (cleanRUN.length < 8 || cleanRUN.length > 9) return false;

  const body = cleanRUN.slice(0, -1);
  const dv = cleanRUN.slice(-1).toUpperCase();

  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const expectedDV = 11 - (sum % 11);
  let calculatedDV;

  if (expectedDV === 11) calculatedDV = '0';
  else if (expectedDV === 10) calculatedDV = 'K';
  else calculatedDV = expectedDV.toString();

  return dv === calculatedDV;
};

export const formatRUN = (run) => {
  const cleanRUN = run.replace(/[.-]/g, '');
  if (cleanRUN.length < 2) return cleanRUN;

  const body = cleanRUN.slice(0, -1);
  const dv = cleanRUN.slice(-1);

  return `${body.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}-${dv}`;
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0
  }).format(price);
};

export const showNotification = (message, type = 'info', duration = 3000) => {
  // Esta función será implementada en el componente de notificaciones
  console.log(`[${type.toUpperCase()}]:`, message);
};
