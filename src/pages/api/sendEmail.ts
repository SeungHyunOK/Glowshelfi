import nodemailer from 'nodemailer'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email } = req.body
  if (!email) {
    return res.status(400).json({ message: 'Email is required' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    })

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: '🎉 Exclusive Discount Codes for You!',
      html: `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Template</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-image: url('https://glowshelfie.vercel.app/images/glowshelfe_background.webp');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center; color: #333;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; margin: 0; padding: 0;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #ff77a9; color: #ffffff; text-align: center; padding: 20px; font-size: 20px; font-weight: bold;">
              🎉 Hi Beautiful Souls 💓🥹
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 30px; text-align: center; font-size: 16px; line-height: 1.5; color: #333;">
              <h1 style="font-size: 24px; color: #333; margin-bottom: 20px;">Get Your Exclusive Discount Codes!</h1>
              <p>You can shop at the following trusted websites with our exclusive codes:</p>
              <ul style="list-style: none; padding: 0; margin: 20px 0;">
                <li style="margin-bottom: 15px;">
                  <a href="https://bit.ly/3T51R8y" target="_blank" style="color: #28a745; text-decoration: none; font-weight: bold;">Olive Young Global</a>
                  with code <span style="color: #d9534f; font-weight: bold;">GLOWSHELFIE1</span>
                </li>
                <li style="margin-bottom: 15px;">
                  <a href="https://bit.ly/4bM3ZJt" target="_blank" style="color: #28a745; text-decoration: none; font-weight: bold;">Yesstyle</a>
                  with code <span style="color: #d9534f; font-weight: bold;">GLOWSHELFIE0</span>
                </li>
                <li style="margin-bottom: 15px;">
                  <a href="https://www.stylevana.com/" target="_blank" style="color: #28a745; text-decoration: none; font-weight: bold;">Stylevana</a>
                  with code <span style="color: #d9534f; font-weight: bold;">INF10GSHELFIE</span>
                </li>
              </ul>
              <p style="margin-top: 20px;">Use these codes to unlock more discounts and save money 💓</p>
              <p style="margin-top: 20px;">Happy shopping 🛍</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; text-align: center; padding: 15px; font-size: 12px; color: #777; border-top: 1px solid #eee;">
              <p>This email was sent from <a href="https://glowshelfie.vercel.app/" target="_blank" style="color: #ff77a9; text-decoration: none;">Glowshelfie</a>.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>

      `.trim(),
    }

    await transporter.sendMail(mailOptions)
    res.status(200).json({ message: 'Email sent successfully!' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error sending email' })
  }
}
