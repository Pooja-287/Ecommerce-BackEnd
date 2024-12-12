const Razorpay = require('razorpay');
const crypto = require('crypto');

const KEY_ID = 'rzp_test_EcY8gOOFJKNf63';  // Replace with your Razorpay Key ID
const SECRET_ID = 'KfVBkLHfAmumaLqcXjdVuI7g';  // Replace with your Razorpay Secret ID

exports.verifyPayment = (req, res) => {
  const { payment_id, order_id, signature } = req.body;

  // Ensure data exists
  if (!payment_id || !order_id || !signature) {
    return res.status(400).json({
      error: 'Missing required fields: payment_id, order_id, signature'
    });
  }

  const body = `${order_id}|${payment_id}`;
  console.log('Body String:', body);

  const expectedSignature = crypto
    .createHmac('sha256', SECRET_ID)
    .update(body)
    .digest('hex');

  console.log('Expected Signature:', expectedSignature);

  if (expectedSignature === signature) {
    return res.status(200).json({
      status: true,
      message: 'Payment verification successful'
    });
  } else {
    console.error('Payment verification failed');
    return res.status(400).json({
      status: false,
      message: 'Payment verification failed'
    });
  }
};
