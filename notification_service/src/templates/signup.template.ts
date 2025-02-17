interface SignupData {
  email: string;
  otp: string;
}

export const SignupTemplate = (data: SignupData) => {
  return `<!DOCTYPE html>
<html>
<head>
    <title>Signup Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .header {
            background: #007bff;
            color: #ffffff;
            padding: 15px;
            font-size: 24px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
            margin: 20px 0;
        }
        .footer {
            font-size: 12px;
            color: #666;
            margin-top: 20px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Signup Verification</div>
        <p>Hello,</p>
        <p>Thank you for signing up! Please use the following OTP to verify your email address: ${data.email}</p>
        <div class="otp">${data.otp}</div>
        <p>This OTP will expire in 10 minutes. If you didn’t request this, please ignore this email.</p>
        <p><a href="#" class="button">Verify Email</a></p>
        <div class="footer">© 2025 Your Company. All rights reserved.</div>
    </div>
</body>
</html>
`;
};
