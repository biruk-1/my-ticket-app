import axios from 'axios';

const CHAPA_SECRET_KEY = 'CHASECK_TEST-pFF0D6704eBF8yhokG41QGBbCFttKXcP'; // Replace with your actual secret key

const initializePayment = async (paymentDetails) => {
  const url = 'https://api.chapa.co/v1/transaction/initialize';

  const headers = {
    Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
    'Content-Type': 'application/json',
  };

  const payload = {
    amount: parseFloat(paymentDetails.amount).toFixed(2), // Ensure amount is formatted correctly
    currency: 'ETB', // Correct currency
    email: paymentDetails.email, // Valid email
    first_name: paymentDetails.first_name, // Customer first name
    last_name: paymentDetails.last_name, // Customer last name
    phone_number: paymentDetails.phone_number, // Ensure phone number is valid
    tx_ref: paymentDetails.tx_ref, // Unique transaction reference
    callback_url: paymentDetails.callback_url, // Your callback URL
    return_url: paymentDetails.return_url, // URL where the user will be redirected after payment
    customization: {
      title: 'Pay Merchant', // Ensure title is ≤16 characters
      description: 'I love online payments', // Optional description
    },
  };

  try {
    console.log('Initializing payment with payload:', payload); // Log payload for debugging

    const response = await axios.post(url, payload, { headers });

    if (response.status === 200) {
      console.log('Payment initialized successfully:', response.data); // Log the response
      return response.data.data.checkout_url; // Return the checkout URL
    } else {
      console.error('Unexpected response status:', response.status, response.data);
      throw new Error('Failed to initialize payment');
    }
  } catch (error) {
    console.error('Payment initialization failed:', error.response?.data || error.message);
    throw error;
  }
};

export { initializePayment };
