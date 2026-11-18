import React,{useEffect,useRef,useState} from 'react';
import {contactDetails,makeEnquiryLinks} from './contact-links.js';

function ContactIcon({kind}){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{kind==='mail'?<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>:<><path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.5-4.8a8.5 8.5 0 1 1 16-4.2Z"/><path d="M8.5 7.5c-2 2 3 7 5 6l1-1-2-1-1 1-2-2 1-1-1-2Z"/></>}</svg>}
export default function Contact(){
 const section=useRef(null);
 const [channel,setChannel]=useState('whatsapp');
 const [notice,setNotice]=useState('');
 const [copyStatus,setCopyStatus]=useState('');
 const [prepared,setPrepared]=useState(null);
 useEffect(()=>{
  const elements=section.current.querySelectorAll('[data-contact-reveal]');
  if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches){elements.forEach(el=>el.classList.add('revealed'));return;}
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target)}}),{threshold:.1});
  elements.forEach(el=>observer.observe(el));return()=>observer.disconnect();
 },[]);
 async function copyEmail(){try{await navigator.clipboard.writeText(contactDetails.email);setCopyStatus('Email address copied.')}catch{setCopyStatus(`You can copy this address: ${contactDetails.email}`)}}
 function submit(e){
  e.preventDefault();
  const form=new FormData(e.currentTarget);
  const name=String(form.get('name')||'').trim(),message=String(form.get('message')||'').trim();
  if(!name||!message){setNotice('Please add your name and a short project description.');return;}
  const links=makeEnquiryLinks({name,message,email:String(form.get('email')||''),type:String(form.get('type')||'Not sure yet')});
  setPrepared({href:links[channel],channel});
  if(channel==='whatsapp'){window.open(links.whatsapp,'_blank','noopener,noreferrer');setNotice('Your message is ready to review in WhatsApp. Send it there when you’re ready.');}
  else{window.location.href=links.email;setNotice('Your email draft is ready to review in your email app. Send it there when you’re ready.');}
 }
 return <section id="contact" className="contact-section" ref={section} aria-labelledby="contact-title">
  <div className="contact-copy" data-contact-reveal>
   <p className="eyebrow"><span className="line"/> LET’S TALK</p><h2 id="contact-title">Have an idea?<br/>Let’s <span>build it.</span></h2><p className="contact-intro">Tell me what you have in mind. A rough idea is a good place to start.</p>
   <div className="contact-methods"><div className="contact-method"><span className="contact-method-icon"><ContactIcon kind="mail"/></span><div><span className="contact-label">EMAIL ME</span><a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a><button className="copy-email" type="button" onClick={copyEmail}>Copy email address</button><span className="contact-copy-status" role="status">{copyStatus}</span></div></div>
   <div className="contact-method"><span className="contact-method-icon"><ContactIcon kind="chat"/></span><div><span className="contact-label">CHAT ON WHATSAPP</span><a href={`https://wa.me/${contactDetails.whatsapp}`} target="_blank" rel="noopener noreferrer">{contactDetails.phone}</a></div></div></div>
   <nav className="contact-socials" aria-label="Social profiles"><a href={contactDetails.github} target="_blank" rel="noopener noreferrer"><span className="social-monogram">GH</span>GitHub</a><a href={contactDetails.linkedin} target="_blank" rel="noopener noreferrer"><span className="social-monogram linkedin-monogram">in</span>LinkedIn</a></nav>
  </div>
  <div className="contact-form-column" data-contact-reveal><p className="enquiry-title">YOUR NEXT PROJECT STARTS HERE</p><form onSubmit={submit} className="contact-form">
   <div className="contact-form-row"><div><label htmlFor="enquiry-name">Your name <span aria-hidden="true">*</span></label><input id="enquiry-name" name="name" autoComplete="name" placeholder="What should I call you?" maxLength={100} required/></div><div><label htmlFor="enquiry-email">Email <span className="optional">(optional)</span></label><input id="enquiry-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254}/></div></div>
   <div><label htmlFor="enquiry-type">What are we building?</label><div className="contact-select"><select id="enquiry-type" name="type" defaultValue="Not sure yet"><option>Not sure yet</option><option>Landing page</option><option>Multi-page website</option><option>Web application</option><option>Something else</option></select><span aria-hidden="true"/></div></div>
   <div><label htmlFor="enquiry-message">Tell me about your idea <span aria-hidden="true">*</span></label><textarea id="enquiry-message" name="message" placeholder="What do you need, who is it for, and what would you like it to do?" rows={4} maxLength={2000} required/></div>
   <fieldset className="contact-channel"><legend>Continue the conversation on</legend><div><label className={channel==='whatsapp'?'chosen':''}><input type="radio" name="channel" value="whatsapp" checked={channel==='whatsapp'} onChange={()=>{setChannel('whatsapp');setPrepared(null);setNotice('')}}/>WhatsApp</label><label className={channel==='email'?'chosen':''}><input type="radio" name="channel" value="email" checked={channel==='email'} onChange={()=>{setChannel('email');setPrepared(null);setNotice('')}}/>Email</label></div></fieldset>
   <button type="submit" className="contact-submit">Continue {channel==='whatsapp'?'on WhatsApp':'by email'} <span aria-hidden="true">+</span></button><p className="contact-handoff-note">Opens {channel==='whatsapp'?'WhatsApp':'your email app'} with your message ready to review and send.</p>
   <div className="contact-notice" role="status">{notice}{prepared&&<a href={prepared.href} target={prepared.channel==='whatsapp'?'_blank':undefined} rel="noopener noreferrer">{prepared.channel==='whatsapp'?'Open WhatsApp again':'Open email draft again'}</a>}</div>
  </form></div>
 </section>
}
