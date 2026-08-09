// OTP service — placeholder
export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const verifyOtp = (storedOtp, inputOtp) => {
  return storedOtp === inputOtp;
};
