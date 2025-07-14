import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import TestDrive from '@/models/TestDrive';
import { sendTestDriveNotification } from '@/lib/email';

// The external API endpoint
const CRM_API_URL = 'https://lmmta.legendholding.com/CRM_IS/rest/RESTAPIDealerShip/RESTAPI_WEB';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    
    console.log("Received request body:", body);

    // First save to our database
    try {
      await connectDB();
      const testDriveData = {
        name: body.CustomerName,
        email: body.Email,
        phone: body.MobileNumber,
        model: body.CarModal,
        location: body.Location.toLowerCase().includes('dubai') ? 'dubai' : 'abudhabi',
        preferredDate: body.Date,
        preferredTime: body.Time,
        additionalInfo: body.AdditionalInformation,
        campaignName: body.CampaignName,
        utmSource: body.LeadSourceId,
        utmMedium: body.AdditionalInformation?.match(/UTM Medium: ([^\s]+)/)?.[1] || null,
        utmCampaign: body.AdditionalInformation?.match(/UTM Campaign: ([^\s]+)/)?.[1] || null,
        utmContent: body.AdditionalInformation?.match(/UTM Content: ([^\s]+)/)?.[1] || null,
      };
      
      await TestDrive.create(testDriveData);
      console.log("Saved to local database successfully");
      
      // Send email notification to admin
      try {
        await sendTestDriveNotification(testDriveData);
        console.log("Test drive notification email sent successfully");
      } catch (emailError) {
        console.error("Error sending test drive notification email:", emailError);
        // Continue with CRM submission even if email fails
      }
    } catch (dbError) {
      console.error("Error saving to local database:", dbError);
      // Continue with CRM submission even if local save fails
    }

    // Required parameters (marked with * in docs)
    const requiredParams = [
      'LeadSourceId',
      'CompanyID',
      'CustomerName',
      'MobileNumber',
      'CarModal',
      'CompanyCode',
      'DearlerShipId'  // API has a typo in parameter name
    ];

    // Check for required parameters
    const missingParams = requiredParams.filter(param => !body[param]);
    if (missingParams.length > 0) {
      console.error('Missing required parameters:', missingParams);
      return NextResponse.json(
        { error: `Missing required parameters: ${missingParams.join(', ')}` },
        { status: 400 }
      );
    }

    // Format phone number if needed
    if (body.MobileNumber) {
      body.MobileNumber = body.MobileNumber.replace(/\s+/g, '');
      if (!body.MobileNumber.startsWith('+')) {
        body.MobileNumber = '+' + body.MobileNumber.replace(/^\+/, '');
      }
      console.log(`Formatted phone number: ${body.MobileNumber}`);
    }

    // Create headers for CRM API
    const apiHeaders: Record<string, string> = {};

    // Add all fields as headers
    Object.entries(body).forEach(([key, value]) => {
      if (value) {
        // Convert all values to strings and handle special characters
        const headerValue = typeof value === 'string' ? 
          value.replace(/[\r\n]/g, ' ') : // Replace newlines with spaces
          String(value);
        apiHeaders[key] = headerValue;
      }
    });

    console.log("Making API call with headers:", apiHeaders);

    // Make API call to CRM with all parameters as headers
    const response = await fetch(CRM_API_URL, {
      method: 'POST',
      headers: apiHeaders
    });

    if (response.ok) {
      console.log("API call successful!");
      const responseText = await response.text();
      console.log("API Response:", responseText);
      
      return NextResponse.json({
        success: true,
        data: responseText
      });
    } else {
      const errorText = await response.text();
      console.error("API error:", response.status, errorText);
      throw new Error(`CRM API error: ${errorText}`);
    }
  } catch (error) {
    console.error('Error in test drive submission:', error);
    return NextResponse.json(
      { message: 'Error submitting test drive request', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Function to store form data locally for later retry
function storeFormDataLocally(formData: any) {
  try {
    // This would normally store to a database, but we'll log it for now
    console.log("Storing form data for later submission:", formData);
    
    // You could implement storage to a database or file here
    // For example, saving to a local JSON file, or a database like MongoDB
    
    console.log("Form data stored for future retry");
  } catch (error) {
    console.error("Error storing form data:", error);
  }
}

// Function to simulate a successful response for testing
function simulateSuccessResponse(formData: any) {
  // Generate a random reference number
  const referenceNumber = `TD-${Math.floor(Math.random() * 100000).toString().padStart(6, '0')}`;
  
  // Store the form data for possible future submission
  storeFormDataLocally(formData);
  
  return NextResponse.json({
    success: true,
    simulated: true,
    reference: referenceNumber,
    message: "Your test drive request has been received. Our team will contact you shortly.",
    formData: formData // Return the form data for verification
  });
}

// Add OPTIONS handler for preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  });
} 