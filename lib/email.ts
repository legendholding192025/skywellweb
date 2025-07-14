import nodemailer from 'nodemailer';

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface TestDriveNotification {
  name: string;
  email: string;
  phone: string;
  model: string;
  location: string;
  preferredDate: Date;
  preferredTime: string;
  additionalInfo?: string;
  campaignName?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
}

export interface ServiceBookingNotification {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceType: string;
  preferredDate: Date;
  preferredTime: string;
  message?: string;
}

export async function sendTestDriveNotification(data: TestDriveNotification) {
  const adminEmail = 'skywell@legendmotorsuae.com';
  
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #4a9cd6; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">🚗 New Test Drive Request</h1>
        <p style="margin: 10px 0 0 0;">Skywell ET5 Test Drive Booking</p>
      </div>
      
      <div style="padding: 20px; background-color: #f8f9fa;">
        <h2 style="color: #333; margin-top: 0;">Customer Information</h2>
        
        <div style="background-color: white; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
        </div>
        
        <h2 style="color: #333;">Test Drive Details</h2>
        
        <div style="background-color: white; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
          <p><strong>Vehicle Model:</strong> ${data.model}</p>
          <p><strong>Location:</strong> ${data.location}</p>
          <p><strong>Preferred Date:</strong> ${new Date(data.preferredDate).toLocaleDateString()}</p>
          <p><strong>Preferred Time:</strong> ${data.preferredTime}</p>
          ${data.additionalInfo ? `<p><strong>Additional Information:</strong> ${data.additionalInfo}</p>` : ''}
        </div>
        
        ${data.campaignName || data.utmSource ? `
        <h2 style="color: #333;">Marketing Information</h2>
        <div style="background-color: white; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
          ${data.campaignName ? `<p><strong>Campaign:</strong> ${data.campaignName}</p>` : ''}
          ${data.utmSource ? `<p><strong>UTM Source:</strong> ${data.utmSource}</p>` : ''}
          ${data.utmMedium ? `<p><strong>UTM Medium:</strong> ${data.utmMedium}</p>` : ''}
          ${data.utmCampaign ? `<p><strong>UTM Campaign:</strong> ${data.utmCampaign}</p>` : ''}
          ${data.utmContent ? `<p><strong>UTM Content:</strong> ${data.utmContent}</p>` : ''}
        </div>
        ` : ''}
        
        <div style="background-color: #e6f3fc; padding: 15px; border-radius: 5px; border-left: 4px solid #4a9cd6;">
          <p style="margin: 0;"><strong>⏰ Action Required:</strong> Please contact the customer within 24 hours to confirm the test drive appointment.</p>
        </div>
      </div>
      
      <div style="background-color: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
        <p style="margin: 0;">This notification was generated automatically by the Skywell website.</p>
        <p style="margin: 5px 0 0 0;">Request submitted on: ${new Date().toLocaleString()}</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: adminEmail,
    subject: `🚗 New Test Drive Request - ${data.name} (${data.model})`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Test drive notification email sent successfully');
  } catch (error) {
    console.error('Error sending test drive notification email:', error);
    throw error;
  }
}

export async function sendServiceBookingNotification(data: ServiceBookingNotification) {
  const adminEmail = 'skywell@legendmotorsuae.com';
  
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #4a9cd6; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">🔧 New Service Booking Request</h1>
        <p style="margin: 10px 0 0 0;">Skywell Service Center Booking</p>
      </div>
      
      <div style="padding: 20px; background-color: #f8f9fa;">
        <h2 style="color: #333; margin-top: 0;">Customer Information</h2>
        
        <div style="background-color: white; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
        </div>
        
        <h2 style="color: #333;">Service Details</h2>
        
        <div style="background-color: white; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
          <p><strong>Service Type:</strong> ${data.serviceType}</p>
          <p><strong>Preferred Date:</strong> ${new Date(data.preferredDate).toLocaleDateString()}</p>
          <p><strong>Preferred Time:</strong> ${data.preferredTime}</p>
          ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
        </div>
        
        <div style="background-color: #e6f3fc; padding: 15px; border-radius: 5px; border-left: 4px solid #4a9cd6;">
          <p style="margin: 0;"><strong>⏰ Action Required:</strong> Please contact the customer within 24 hours to confirm the service appointment.</p>
        </div>
      </div>
      
      <div style="background-color: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
        <p style="margin: 0;">This notification was generated automatically by the Skywell website.</p>
        <p style="margin: 5px 0 0 0;">Request submitted on: ${new Date().toLocaleString()}</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: adminEmail,
    subject: `🔧 New Service Booking - ${data.firstName} ${data.lastName} (${data.serviceType})`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Service booking notification email sent successfully');
  } catch (error) {
    console.error('Error sending service booking notification email:', error);
    throw error;
  }
}

export async function testEmailConnection() {
  try {
    await transporter.verify();
    console.log('Email server connection successful');
    return true;
  } catch (error) {
    console.error('Email server connection failed:', error);
    return false;
  }
} 