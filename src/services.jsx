import React,{useEffect,useRef,useState} from 'react';

const services=[
 {id:'landing',title:'Landing pages',label:'ONE OFFER. ONE CLEAR NEXT STEP.',description:'A focused page that introduces your offer and guides visitors towards an enquiry, a booking, or another action that matters to your business.',features:['Responsive layouts','Clear calls to action','Design shaped around your brand'],fit:'Product launches, campaigns, personal brands, and small businesses getting started online.'},
 {id:'website',title:'Multi-page websites',label:'ROOM FOR YOUR WHOLE STORY.',description:'A connected website that gives your services, story, work, and contact details their own space. Clear structure helps visitors find what they need and understand what you offer.',features:['Thoughtful page structure','Consistent design across pages','Straightforward navigation'],fit:'Businesses and organisations with several services, a portfolio to showcase, or more to share.'},
 {id:'application',title:'Web applications',label:'BEYOND THE BROCHURE.',description:'A custom web experience for something visitors need to do, not just read. Bring an idea or a workflow, and we can define the screens, data, and interactions it needs.',features:['Interactive interfaces','Database integration','Features scoped to your workflow'],fit:'Dashboards, data-driven tools, and custom business workflows.'},
];
function ServiceIcon({kind}){
 return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true">{kind==='landing'?<><rect x="7" y="8" width="34" height="32" rx="2"/><path d="M7 15h34M12 11.5h2m3 0h2M13 22h14M13 27h20M13 32h10"/></>:kind==='website'?<><rect x="7" y="14" width="28" height="27" rx="2"/><path d="M14 14V8h27v27h-6M7 21h28M13 28h16M13 33h11"/></>:<><rect x="6" y="8" width="36" height="32" rx="2"/><path d="M6 16h36M18 16v24M24 23h12M24 29h5M32 29h4M24 35h12M11 23h2m-2 6h2m-2 6h2"/></>}</svg>
}
export default function Services(){
 const [open,setOpen]=useState('landing');
 const section=useRef(null);
 useEffect(()=>{
  const elements=section.current.querySelectorAll('[data-service-reveal]');
  if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches){elements.forEach(el=>el.classList.add('revealed'));return;}
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -25px 0px'});
  elements.forEach(el=>observer.observe(el));return()=>observer.disconnect();
 },[]);
 return <section className="services-section" id="services" ref={section} aria-labelledby="services-title">
  <div className="services-heading" data-service-reveal><p className="eyebrow"><span className="line"/> HOW I CAN HELP</p><h2 id="services-title">What can<br/>we <span>build?</span></h2><p>A first page, a bigger online presence, or something more interactive. Let’s find the right shape for your idea.</p><div className="services-note"><span aria-hidden="true">{'</>'}</span><p>Clear scope.<br/>Fair pricing.<br/>Thoughtful execution.</p></div></div>
  <div className="services-list">
   {services.map((service,index)=>{const active=open===service.id;return <div key={service.id} className="service-reveal" data-service-reveal style={{'--service-index':index}}><article className={`service-row ${active?'expanded':''}`}>
    <h3><button id={`service-toggle-${service.id}`} className="service-toggle" aria-expanded={active} aria-controls={`service-panel-${service.id}`} onClick={()=>setOpen(active?null:service.id)}><span className="service-symbol"><ServiceIcon kind={service.id}/></span><span className="service-name">{service.title}<span className="service-tagline">{service.label}</span></span><span className="service-expand" aria-hidden="true">{active?'−':'+'}</span></button></h3>
    <div className="service-panel" id={`service-panel-${service.id}`} role="region" aria-labelledby={`service-toggle-${service.id}`} aria-hidden={!active}><div className="service-panel-inner"><div className="service-content"><p>{service.description}</p><ul>{service.features.map(feature=><li key={feature}><span aria-hidden="true">+</span>{feature}</li>)}</ul><p className="service-fit"><strong>A good fit for</strong> {service.fit}</p></div></div></div>
   </article></div>})}
   <p className="services-closing">Every project starts with your goals and a clear, agreed scope.</p>
  </div>
 </section>
}
