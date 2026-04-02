export const isUserAdmin = (user: any) => user?.role === 'admin';

export const isUserManager = (user: any) => user?.role === 'manager';

export const isUserRegular = (user: any) => user?.role === 'user';

export const formatPrice = (price: number) => {
  return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
