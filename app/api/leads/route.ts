import { NextRequest,NextResponse } from 'next/server';
import { validateLead,deliverLead } from '@/lib/leads';
export const runtime='nodejs';
export async function POST(request:NextRequest){
 const origin=request.headers.get('origin');let originMatches=true;try{originMatches=!origin||new URL(origin).host===request.headers.get('host');}catch{originMatches=false;}if(!originMatches)return NextResponse.json({message:'Please submit this form from the RevUptime website.'},{status:403});
 if(!request.headers.get('content-type')?.includes('application/json'))return NextResponse.json({message:'Unsupported request format.'},{status:415});
 if(Number(request.headers.get('content-length')||0)>16000)return NextResponse.json({message:'This request is too large.'},{status:413});
 try{const body=await request.text();if(body.length>16000)return NextResponse.json({message:'This request is too large.'},{status:413});const result=validateLead(JSON.parse(body));if(result.spam)return NextResponse.json({message:'Unable to process this request.'},{status:400});if(result.error)return NextResponse.json({message:result.error},{status:400});if(!process.env.LEAD_WEBHOOK_URL)return NextResponse.json({message:'Online enquiries are temporarily unavailable. Your details have not been sent. Please save a copy and try again later.'},{status:503});if(!await deliverLead(result.lead!))return NextResponse.json({message:'We could not deliver your enquiry. Your details are still here; please try again.'},{status:502});return NextResponse.json({message:'Thank you. A RevUptime team member will contact you to understand your plant and pilot requirements.'},{status:201});}catch{return NextResponse.json({message:'We could not process your enquiry. Please check your details and try again.'},{status:400});}
}
