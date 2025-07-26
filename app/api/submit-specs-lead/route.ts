import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';

// The external API endpoint (same as other CRM integrations)
const CRM_API_URL = 'https://lmmta.legendholding.com/CRM_IS/rest/RESTAPIDealerShip/RESTAPI_WEB';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    
    console.log("Received specs lead request body:", body);

    // First save to our database using Contact model
    try {
      await connectDB();
      await Contact.create({
        name: body.fullName,
        email: body.email,
        phone: body.phone,
        subject: "PDF Specifications Request",
        message: "User requested access to Skywell ET5 full specifications PDF",
        enquiryType: "sales",
        status: "new",
      });
      console.log("Saved specs lead to local database successfully");
    } catch (dbError) {
      console.error("Error saving specs lead to local database:", dbError);
      // Continue with CRM submission even if local save fails
    }

    // Prepare CRM payload with required parameters
    const crmPayload = {
      'LeadSourceId': "Website PDF Request",
      'CompanyID': "Skywell-01",
      'CustomerName': body.fullName,
      'MobileNumber': body.phone,
      'CarModal': "Skywell ET5",
      'CompanyCode': "Skywell",
      'DearlerShipId': "6807da3c6c9a35dad0d98355",
      'Email': body.email,
      'CampaignName': "PDF Specifications",
      'AdditionalInformation': `Lead Type: PDF Specifications Request | Source: Website Specs Section`,
    };

    // Format phone number if needed
    if (crmPayload.MobileNumber) {
      crmPayload.MobileNumber = crmPayload.MobileNumber.replace(/\s+/g, '');
      if (!crmPayload.MobileNumber.startsWith('+')) {
        crmPayload.MobileNumber = '+' + crmPayload.MobileNumber.replace(/^\+/, '');
      }
      console.log(`Formatted phone number: ${crmPayload.MobileNumber}`);
    }

    // Create headers for CRM API
    const apiHeaders: Record<string, string> = {};

    // Add all fields as headers
    Object.entries(crmPayload).forEach(([key, value]) => {
      if (value) {
        const headerValue = typeof value === 'string' ? 
          value.replace(/[\r\n]/g, ' ') : 
          String(value);
        apiHeaders[key] = headerValue;
      }
    });

    console.log("Making CRM API call with headers:", apiHeaders);

    // Make API call to CRM
    const response = await fetch(CRM_API_URL, {
      method: 'POST',
      headers: apiHeaders
    });

    if (response.ok) {
      console.log("CRM API call successful!");
      const responseText = await response.text();
      console.log("CRM API Response:", responseText);
      
      return NextResponse.json({
        success: true,
        message: "Lead captured successfully",
        data: responseText
      });
    } else {
      const errorText = await response.text();
      console.error("CRM API error:", response.status, errorText);
      // Still return success since we saved locally
      return NextResponse.json({
        success: true,
        message: "Lead captured locally (CRM sync pending)",
        error: `CRM API error: ${errorText}`
      });
    }
  } catch (error) {
    console.error('Error in specs lead submission:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error capturing lead', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
} 