import React,{useEffect,useRef} from 'react';

export default function About(){
 const section=useRef(null);
 useEffect(()=>{
  const elements=section.current.querySelectorAll('[data-about-reveal]');
  if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches){elements.forEach(el=>el.classList.add('revealed'));return;}
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -25px 0px'});
  elements.forEach(el=>observer.observe(el));return()=>observer.disconnect();
 },[]);
 return <section id="about" className="about-section" ref={section} aria-labelledby="about-title">
  <div className="about-photo-column" data-about-reveal>
   <figure className="about-portrait"><img src="/images/israel-about-orange.png" alt="Israel Olashore wearing a coral-orange polo and black trousers, standing in front of a softly blurred arched window" width="1254" height="1254" loading="lazy"/><figcaption><span>ISRAEL OLASHORE</span><span>FULL STACK DEVELOPER</span></figcaption></figure>
   <div className="portrait-caption"><span className="portrait-bracket" aria-hidden="true">{'{ }'}</span><p>A curious mind.<br/>A practical approach.</p><span className="portrait-plus" aria-hidden="true">+</span></div>
  </div>
  <div className="about-story" data-about-reveal>
   <p className="eyebrow"><span className="line"/> BEHIND THE CODE</p>
   <h2 id="about-title">It started<br/>with <span>curiosity.</span></h2>
   <p className="about-intro">I’m Israel, a full stack developer who enjoys finding practical solutions to real-world problems.</p>
   <p>I started coding in secondary school while looking for a hobby. What caught my attention was the possibility of using technology to solve everyday problems. That curiosity became a reason to keep learning and building.</p>
   <p>Today, I especially enjoy creating landing pages and multi-page websites that give businesses a clear, useful presence online.</p>
   <div className="about-values" aria-label="What you can expect when working with me">
    <div><span aria-hidden="true">+</span><p><strong>Transparency, from the start.</strong> Clear communication about the work, the process, and the price.</p></div>
    <div><span aria-hidden="true">+</span><p><strong>Someone you can rely on.</strong> Care, consistency, and a commitment to doing the work well.</p></div>
    <div><span aria-hidden="true">+</span><p><strong>Quality at a fair price.</strong> Affordable pricing with thoughtful service and attention to detail.</p></div>
   </div>
   <a className="about-work-link" href="#projects">Take a look at my work <span aria-hidden="true">+</span></a>
  </div>
 </section>
}
