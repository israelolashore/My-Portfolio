import React, {useEffect, useRef} from 'react';

const skills=[
 {name:'HTML',file:'html5',type:'Front end',note:'Structure & semantics',color:'#e44d26'},
 {name:'CSS',file:'css3',type:'Front end',note:'Layouts & visual polish',color:'#1572b6'},
 {name:'JavaScript',file:'javascript',type:'Language',note:'Interaction & behaviour',color:'#c3a51c'},
 {name:'Vite',file:'vitejs',type:'Build tool',note:'A fast development workflow',color:'#8756eb'},
 {name:'TypeScript',file:'typescript',type:'Language',note:'Typed, organised code',color:'#3178c6'},
 {name:'Node.js',file:'nodejs',type:'Back end',note:'Server-side development',color:'#589c42'},
 {name:'Supabase',file:'supabase',type:'Back end',note:'Data & authentication',color:'#27956c'},
 {name:'PostgreSQL',file:'postgresql',type:'Database',note:'Relational data',color:'#336791'},
 {name:'Figma',file:'figma',type:'Design',note:'Interfaces & prototypes',color:'#a259ff'},
];

export default function Skills(){
 const section=useRef(null);
 useEffect(()=>{
  const elements=section.current.querySelectorAll('[data-skill-reveal]');
  if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches){elements.forEach(el=>el.classList.add('revealed'));return;}
  const observer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target);}
   });
  },{threshold:.16,rootMargin:'0px 0px -35px 0px'});
  elements.forEach(el=>observer.observe(el));
  return()=>observer.disconnect();
 },[]);
 return <section ref={section} className="skills-section" id="skills" aria-labelledby="skills-title">
  <div className="skills-heading" data-skill-reveal><div><p className="eyebrow"><span className="line"/> THE TOOLKIT</p><h2 id="skills-title">Good ideas.<br/><span>The right tools.</span></h2></div><p>From the first layout to the data behind it.<br/>The tools I use to bring a build together.</p></div>
  <ul className="skills-grid">
   {skills.map((skill,i)=><li className="skill-item" data-skill-reveal key={skill.name} style={{'--skill-index':i,'--skill-color':skill.color}}>
    <div className="skill-card" tabIndex={0} aria-label={`${skill.name}: ${skill.note}`}>
     <span className="skill-logo"><img src={`/skills/${skill.file}.svg`} alt="" width="52" height="52" loading="lazy"/></span>
     <div className="skill-copy"><h3>{skill.name}</h3><p className="skill-type">{skill.type}</p><p className="skill-note">{skill.note}</p></div>
     <span className="skill-corner" aria-hidden="true"/>
    </div>
   </li>)}
  </ul>
  <div className="skills-signoff" data-skill-reveal><span className="pixel-cross" aria-hidden="true">+</span><p>Design in mind. Development at heart.</p><span className="toolkit-label">BUILT TO WORK TOGETHER</span></div>
 </section>
}
