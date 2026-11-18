import React, {useEffect, useRef, useState} from 'react';

export const projects = [
 {id:'ibk-farm',name:"IBK’s Farm",short:'IBK’S FARM',category:'Agriculture',color:'#b8f36a',icon:'leaf',image:'ibk-farm',url:'https://www.ibkfarm.com/',tagline:'Fresh from the farm. Built for the web.',description:'A website for a crop and livestock farm in Motunde, Oyo State. It introduces the farm’s produce, palm oil and livestock operations, and gives visitors a direct route to product enquiries.',features:['Crop and livestock catalogue','Featured palm oil section','Product-specific WhatsApp enquiries','Location map and directions'],focus:'A clear journey from discovering the farm to asking about availability.'},
 {id:'bussin-grills',name:'Bussin Grills & Desserts',short:'BUSSIN GRILLS',category:'Food & hospitality',color:'#ffc45e',icon:'burger',image:'bussin',url:'https://bussingrillsdesserts.vercel.app/',tagline:'Big flavour. An appetite for interaction.',description:'An interactive restaurant website for Bussin Grills & Desserts in Ajah, Lagos. Visitors can explore burgers, grills and sandwiches, build an order and continue the conversation on WhatsApp.',features:['Searchable, category-filtered menu','Food options and an order basket','Food gallery and featured-food carousel','WhatsApp ordering and location directions'],focus:'Turning an image-led menu into a practical path from browsing to ordering.'},
 {id:'iwga',name:'International Women’s Global Academy',short:'IWGA',category:'Education & community',color:'#cbabff',icon:'globe',image:'iwga',url:'https://internationalwomensglobalacademy.com/',tagline:'A digital home for an unstoppable community.',description:'A website introducing a global academy for women’s mindset transformation, leadership, practical skills and wealth education. It brings the academy’s mission, leaders and learning pathways together.',features:['Mission, vision and core learning pillars','Programmes and course introductions','Expandable founder biographies','Academy registration link'],focus:'Organising a broad mission into clear programmes and an accessible next step.'},
 {id:'liberated-resources',name:'Liberated Resources',short:'LIBERATED RESOURCES',category:'Advisory & personal brand',color:'#6ccaff',icon:'building',image:'liberated',url:'https://liberatedresources.vercel.app/',tagline:'Strategy, credibility and a clearer next step.',description:'A professional website for a wealth and real estate advisory brand. It presents the founder’s background, consulting and coaching expertise, investment education and opportunities to connect.',features:['Founder profile and experience timeline','Advisory and coaching service pillars','Searchable, filterable investment video library','Consultation calls to action and enquiry form'],focus:'Bringing professional experience, educational content and enquiry pathways into one cohesive presence.'},
 {id:'life-reset',name:'Life Reset Coaching',short:'LIFE RESET',category:'Coaching & digital resources',color:'#f0a7cd',icon:'renew',image:'life-reset',url:'https://life-reset-coaching.vercel.app/',tagline:'A little room to breathe. A clearer way forward.',description:'A coaching website for Life Reset with Ericka, offering faith-rooted support for women seeking clarity and purposeful change. It introduces coaching options alongside a collection of journals and digital resources.',features:['Free reset-call and coaching introductions','Searchable, filterable resource collection','Prayer journal and digital product details','Frequently asked questions'],focus:'Creating a calm, welcoming journey from exploration to choosing a first step.'},
 {id:'aura-interiors',name:'Aura Interiors',short:'AURA INTERIORS',category:'Interior design',color:'#edb991',icon:'sofa',image:'aura',url:'https://aura-interiors-five.vercel.app/',tagline:'A considered space for considered spaces.',description:'A multi-page website presenting an interior design studio’s residential, commercial and office design services. Project imagery, service information and consultation links guide visitors through the studio’s offering.',features:['Dedicated portfolio, service and studio pages','Project imagery across homes and commercial spaces','Light and dark appearance toggle','Consultation links and client-story carousel'],focus:'Letting interiors lead visually while keeping services and consultation routes easy to find.'},
];

export function ProjectIcon({kind}) {
 const shapes={
  leaf:<><path d="M20 76C17 38 43 19 82 18c1 39-16 68-53 61"/><path d="M16 87 68 37M39 63V42M52 51h20"/></>,
  burger:<><path d="M18 45C20 10 80 10 82 45Z"/><path d="M16 55h68M22 65l12 7 15-7 17 7 13-7M19 79h62v8H19Z"/><path d="m37 31 2-3m21 2 2 3m-13 4 2-3"/></>,
  globe:<><circle cx="50" cy="50" r="34"/><ellipse cx="50" cy="50" rx="16" ry="34"/><path d="M17 50h66M23 30h54M23 70h54"/></>,
  building:<><path d="M17 86h68M24 86V34h28v52M52 86V16h25v70M33 45h10M33 57h10M33 69h10M61 28h7M61 40h7M61 52h7M61 64h7M61 76h7"/></>,
  renew:<><path d="M22 42a30 30 0 0 1 51-15l8 8M81 16v20H61M78 58a30 30 0 0 1-51 15l-8-8M19 84V64h20"/><path d="M50 38v24M38 50h24"/></>,
  sofa:<><path d="M27 55V30c0-8 46-8 46 0v25M19 50c-7 0-10 5-10 11v18h82V61c0-12-18-16-18-2v8H27v-8c0-6-3-9-8-9ZM19 79v9M81 79v9M50 26v29"/></>
 };
 return <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="round" aria-hidden="true">{shapes[kind]}</svg>;
}

export function Projects({selected,setSelected}) {
 const touch=useRef(null),dragged=useRef(false),sectionRef=useRef(null);
 useEffect(()=>{
  const section=sectionRef.current;
  let accumulated=0,lastEvent=0,lastStep=0;
  const onWheel=e=>{
   if(e.ctrlKey)return;
   const horizontal=e.shiftKey&&Math.abs(e.deltaX)<1?e.deltaY:e.deltaX;
   if(!horizontal||(!e.shiftKey&&Math.abs(horizontal)<=Math.abs(e.deltaY)))return;
   e.preventDefault();
   const now=performance.now();
   if(now-lastEvent>180||Math.sign(horizontal)!==Math.sign(accumulated))accumulated=0;
   lastEvent=now;
   accumulated+=horizontal*(e.deltaMode===1?16:e.deltaMode===2?section.clientWidth:1);
   if(Math.abs(accumulated)>=45&&now-lastStep>500){
    const direction=accumulated>0?1:-1;
    setSelected(i=>Math.max(0,Math.min(projects.length-1,i+direction)));
    accumulated=0;lastStep=now;
   }
  };
  section.addEventListener('wheel',onWheel,{passive:false});
  return()=>section.removeEventListener('wheel',onWheel);
 },[setSelected]);
 const current=projects[selected];
 const move=dir=>setSelected(i=>Math.max(0,Math.min(projects.length-1,i+dir)));
 return <section ref={sectionRef} id="projects" className="projects-section" aria-labelledby="projects-title">
  <div className="projects-intro"><div><p className="eyebrow"><span className="line"/> SELECTED WORK</p><h2 id="projects-title">Choose your<br/><span>next destination.</span></h2></div><p>Different businesses. Different challenges.<br/>Explore the worlds I’ve built.</p></div>
  <div className="project-menu" style={{'--project-color':current.color}}>
   <div className="menu-grid" aria-hidden="true"/><div className="menu-haze" aria-hidden="true"/>
   <div className="menu-topline"><span>PROJECT SELECT</span><span>WEB EXPERIENCES / SIX WORLDS</span></div>
   <div className="carousel-stage" role="region" aria-roledescription="carousel" aria-label="Project selector" tabIndex={0}
    onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();move(1)}if(e.key==='ArrowLeft'){e.preventDefault();move(-1)}}}
    onTouchStart={e=>{touch.current={x:e.touches[0].clientX,y:e.touches[0].clientY};dragged.current=false}}
    onTouchEnd={e=>{if(touch.current===null)return;const delta=e.changedTouches[0].clientX-touch.current.x;const vertical=e.changedTouches[0].clientY-touch.current.y;if(Math.abs(delta)>40&&Math.abs(delta)>Math.abs(vertical)){dragged.current=true;move(delta<0?1:-1)}touch.current=null;}}>
    <div className="selector-reticle" aria-hidden="true"><i/><i/><i/><i/></div>
    {projects.map((p,i)=>{const offset=i-selected;return <a key={p.id} href={`#/projects/${p.id}`} className={`project-tile ${offset===0?'selected':''}`} style={{'--offset':offset,'--tile-color':p.color}} tabIndex={Math.abs(offset)>1?-1:0} aria-hidden={Math.abs(offset)>1?true:undefined} aria-label={`View ${p.name} project`} aria-current={offset===0?'true':undefined} onClick={e=>{if(dragged.current){e.preventDefault();dragged.current=false}else{setSelected(i)}}}>
     <span className="icon-shell"><ProjectIcon kind={p.icon}/><span className="icon-reflection" aria-hidden="true"><ProjectIcon kind={p.icon}/></span></span>
     <span className="tile-name">{p.short}</span><span className="tile-category">{p.category}</span>
    </a>})}
   </div>
   <div className="selection-summary" aria-live="polite" aria-atomic="true" key={current.id}><span className="selection-category">{current.category}</span><h3>{current.name}</h3><p>{current.tagline}</p></div>
   <div className="carousel-controls"><button onClick={()=>move(-1)} disabled={selected===0} aria-label="Previous project">PREV</button><div className="project-dots" aria-label="Choose a project">{projects.map((p,i)=><button key={p.id} className={selected===i?'chosen':''} onClick={()=>setSelected(i)} aria-label={`Select ${p.name}`} aria-pressed={selected===i}><span/></button>)}</div><button onClick={()=>move(1)} disabled={selected===projects.length-1} aria-label="Next project">NEXT</button></div>
   <div className="menu-bottomline"><span>SWIPE · TWO-FINGER SCROLL · SELECT</span><span>SELECT AN ICON TO ENTER</span></div>
  </div>
 </section>
}

export function ProjectDetail({project:p,themeControl}) {
 useEffect(()=>{document.title=`${p.name} | Israel Olashore`;window.scrollTo({top:0,behavior:'instant'});return()=>{document.title='Israel Olashore | Full Stack Developer'}},[p.id]);
 return <div className="project-page" style={{'--project-color':p.color}}>
  <header className="detail-header"><a className="wordmark" href="#projects">israel<span>.</span></a><div className="detail-header-actions"><a className="back-home" href="#projects">Back to home</a>{themeControl}</div></header>
  <main className="detail-main" id="project-main"><div className="detail-title"><p className="eyebrow">SELECTED WORK / {p.category}</p><h1>{p.name}</h1><p>{p.tagline}</p><a className="primary" href={p.url} target="_blank" rel="noopener noreferrer">Visit live website</a></div>
   <figure className="website-capture"><div className="capture-top"><span className="capture-dots"><i/><i/><i/></span><span>{new URL(p.url).hostname}</span><span>WEBSITE PREVIEW</span></div><img src={`/projects/${p.image}.jpg`} alt={`${p.name} website homepage screenshot`} width="1363" height="936"/><figcaption>Homepage capture · <a href={p.url} target="_blank" rel="noopener noreferrer">Explore the live website</a></figcaption></figure>
   <div className="detail-info"><section><p className="eyebrow">THE PROJECT</p><h2>What it’s about.</h2><p>{p.description}</p><p className="project-focus">{p.focus}</p></section><section><p className="eyebrow">INSIDE THE EXPERIENCE</p><h2>A closer look.</h2><ul>{p.features.map(f=><li key={f}><span>+</span>{f}</li>)}</ul></section></div>
   <nav className="detail-footer" aria-label="Project navigation"><a href="#projects">Back to all projects</a><a href={`#/projects/${projects[(projects.indexOf(p)+1)%projects.length].id}`}>Explore next project</a></nav>
  </main><footer className="footer"><span>ISRAEL OLASHORE</span><span>Full stack developer / Creative problem solver</span></footer>
 </div>
}

export function useProjectRoute(){
 const [hash,setHash]=useState(window.location.hash);
 useEffect(()=>{const update=()=>{setHash(window.location.hash);if(['#projects','#skills','#about','#services','#contact'].includes(window.location.hash))requestAnimationFrame(()=>document.getElementById(window.location.hash.slice(1))?.scrollIntoView({block:'start'}))};window.addEventListener('hashchange',update);update();return()=>window.removeEventListener('hashchange',update)},[]);
 return hash.startsWith('#/projects/')?projects.find(p=>p.id===hash.slice(11)):null;
}
