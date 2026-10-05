export type Lead = { fullName:string; company:string; email:string; phone:string; location:string; industry:string; role:string; machines:string; message:string; consent:true; source:'revuptime.com'; submittedAt:string } | { fullName:string; company:string; email:string; consent:true; source:'revuptime.com'; submittedAt:string; leadType:'whitepaper-download'; resource:'industrial-reliability-guide' };
export function validateLead(value:unknown): {lead?:Lead; error?:string; spam?:boolean} {
 if(!value||typeof value!=='object'||Array.isArray(value))return {error:'Please check your details and try again.'};
 const d=value as Record<string,unknown>;
 if(typeof d.website==='string'&&d.website.trim())return {spam:true};
 if(d.type==='whitepaper'){
  const fullName=typeof d.fullName==='string'?d.fullName.trim():'';
  const company=typeof d.company==='string'?d.company.trim():'';
  const email=typeof d.email==='string'?d.email.trim():'';
  if(!fullName||fullName.length>120||!company||company.length>160||!email||email.length>254)return {error:'Please enter your name, company and work email.'};
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return {error:'Please enter a valid work email address.'};
  if(d.consent!==true&&d.consent!=='on')return {error:'Please confirm consent so we can send the resource and respond to your request.'};
  return {lead:{fullName,company,email,consent:true,source:'revuptime.com',submittedAt:new Date().toISOString(),leadType:'whitepaper-download',resource:'industrial-reliability-guide'}};
 }
 const limits:Record<string,number>={fullName:120,company:160,email:254,phone:30,location:160,industry:100,role:100,machines:100,message:3000};
 const fields:Record<string,string>={};
 for(const [key,max] of Object.entries(limits)){const v=d[key];if(key==='message'&&(v===undefined||v==='')){fields[key]='';continue;}if(typeof v!=='string'||!v.trim()||v.length>max)return {error:'Please complete all required fields with valid details.'};fields[key]=v.trim();}
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))return {error:'Please enter a valid work email address.'};
 if(!/^[+0-9 ()-]{7,30}$/.test(fields.phone))return {error:'Please enter a valid phone number.'};
 if(d.consent!=='on'&&d.consent!==true)return {error:'Please confirm your consent so we can respond to your enquiry.'};
 return {lead:{...fields,consent:true,source:'revuptime.com',submittedAt:new Date().toISOString()} as Lead};
}
// Swap this adapter for Supabase, Zoho CRM, or another lead store without changing the form.
export async function deliverLead(lead:Lead):Promise<boolean>{
 const endpoint=process.env.LEAD_WEBHOOK_URL;
 if(!endpoint)throw new Error('LEAD_WEBHOOK_URL is not configured.');
 const url=new URL(endpoint);if(url.protocol!=='https:')throw new Error('Lead destination must use HTTPS.');
 const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json',...(process.env.LEAD_WEBHOOK_TOKEN?{Authorization:`Bearer ${process.env.LEAD_WEBHOOK_TOKEN}`}:{})},body:JSON.stringify(lead),signal:AbortSignal.timeout(10000),redirect:'error'});
 return response.ok;
}
