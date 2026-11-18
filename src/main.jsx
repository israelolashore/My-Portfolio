import React, {useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';
import Skills from './skills.jsx';
import About from './about.jsx';
import Services from './services.jsx';
import Contact from './contact.jsx';
import {useTheme,ThemeToggle} from './theme.jsx';
import {Projects,ProjectDetail,useProjectRoute,projects} from './projects.jsx';

function Spark({className=''}) {return <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true">{Array.from({length:12},(_,i)=><path key={i} d="M50 9V91" stroke="currentColor" strokeWidth="7" transform={`rotate(${i*15} 50 50)`}/>)}</svg>}
function App(){
 const themeControl=useTheme();
 const project=useProjectRoute();
 const [selected,setSelected]=useState(0);
 const [menu,setMenu]=useState(false);
 const [preview,setPreview]=useState(false);
 const [playing,setPlaying]=useState(true);
 const [activeSection,setActiveSection]=useState('home');
 const approachTrigger=useRef(null);
 useEffect(()=>{
  if(project){setSelected(projects.indexOf(project));return;}
  let frame;
  const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{
   let current='home';
   for(const name of ['projects','skills','about','services','contact']){
    const el=document.getElementById(name);
    if(el&&el.getBoundingClientRect().top<=window.innerHeight*.38)current=name;
   }
   setActiveSection(current);
  })};
  window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update();
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',update);window.removeEventListener('resize',update)};
 },[project]);
 useEffect(()=>{
  if(!preview)return;
  const overflow=document.body.style.overflow;document.body.style.overflow='hidden';
  return()=>{document.body.style.overflow=overflow;approachTrigger.current?.focus()};
 },[preview]);
 if(project)return <ProjectDetail key={project.id} project={project} themeControl={<ThemeToggle {...themeControl}/>}/>;
 return <div className={playing?'site':'site paused'}>
  <a className="skip" href="#home">Skip to content</a>
  <header className="header">
   <a className="wordmark" href="#home" aria-label="Israel Olashore home">israel<span>.</span></a>
   <button className="menu-toggle" aria-expanded={menu} aria-controls="navigation" onClick={()=>setMenu(!menu)}>{menu?'Close':'Menu'}<span>{menu?'−':'+'}</span></button>
   <nav id="navigation" className={menu?'nav open':'nav'} aria-label="Main navigation">
    {['Home','Projects','Skills','About','Services','Contact'].map(label=>{const id=label.toLowerCase();return <a key={id} className={activeSection===id?'active':undefined} aria-current={activeSection===id?'location':undefined} href={`#${id}`} onClick={()=>setMenu(false)}>{label}</a>})}
   </nav>
   <span className="nav-note">Thoughtful code. Real impact.</span>
   <ThemeToggle {...themeControl}/>
  </header>
  <main id="home">
   <section className="hero" aria-labelledby="hero-title">
    <div className="hero-copy">
     <p className="eyebrow"><span className="line"/> ISRAEL OLASHORE / FULL STACK DEVELOPER</p>
     <h1 id="hero-title" className="unified-heading"><span className="build-label">I build</span><span className="build-words" aria-hidden="true">{[['responsive','websites.'], ['scalable','web apps.'], ['business','websites.'], ['custom','dashboards.'], ['interactive','experiences.'], ['digital','experiences.']].map(([first,second],i)=><span key={first} style={{'--word-index':i}}>{first}<br/>{second}</span>)}</span><span className="sr-only">responsive websites, scalable web apps, business websites, custom dashboards, interactive experiences, and digital experiences.</span></h1>
     <p className="hero-description">Your idea, brought to life. Thoughtful design and full stack development, from the first sketch to the final line of code.</p>
     <div className="actions"><button ref={approachTrigger} className="primary" onClick={()=>setPreview(true)}>Explore my approach <span className="button-plus">+</span></button></div>
    </div>
    <div className="hero-art" role="img" aria-label="Abstract illustration of a website being crafted, combining design and code">
     <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
     <span className="art-label label-top">A LITTLE DESIGN. A LOT OF POSSIBILITY.</span>
     <Spark className="large-spark"/>
     <div className="browser-card">
      <div className="browser-bar"><div className="dots"><i/><i/><i/></div><span>an idea, brought to life</span><span className="browser-plus">+</span></div>
      <div className="mini-page"><span className="mini-logo">hello, world<span>.</span></span><div className="mini-menu"><i/><i/></div><p>Something<br/><em>worth building.</em></p><div className="mini-line"/><div className="mini-line shorter"/><div className="mini-cta"/><Spark className="mini-spark"/></div>
     </div>
     <div className="terminal-icon" aria-hidden="true"><svg viewBox="0 0 260 205" fill="none"><rect x="3" y="3" width="254" height="199" rx="20" fill="#171717"/><path d="M5 44H255" stroke="white" strokeWidth="6"/><path d="M24 23H34M46 23H56M68 23H78" stroke="white" strokeWidth="6" strokeLinecap="round"/><path d="M38 85L78 124L38 164M103 166H155" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
     <div className="handwritten">good design meets<br/><span>great development.</span></div>
     <span className="art-caption">CRAFTED WITH CURIOSITY & CARE</span>
    </div>
   </section>
   <div className="hero-footer"><p>Creative thinking.<span> Practical solutions.</span></p><button className="motion-toggle" onClick={()=>setPlaying(!playing)} aria-pressed={!playing}>{playing?'Pause':'Play'} motion <span>{playing?'Ⅱ':'▷'}</span></button></div>
   <Projects selected={selected} setSelected={setSelected}/>
   <Skills/>
   <About/>
   <Services/>
   <Contact/>
  </main>
  <footer className="footer"><span>© {new Date().getFullYear()} ISRAEL OLASHORE</span><span>Full stack developer / Creative problem solver</span><a className="footer-top-link" href="#home">BACK TO TOP</a><Spark/></footer>
  {preview&&<div className="modal-shade" onClick={()=>setPreview(false)}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={e=>e.stopPropagation()} onKeyDown={e=>{if(e.key==='Escape')setPreview(false); if(e.key==='Tab'){const buttons=e.currentTarget.querySelectorAll('button');const first=buttons[0],last=buttons[buttons.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}}}><button autoFocus className="close" onClick={()=>setPreview(false)} aria-label="Close approach">×</button><p className="eyebrow">THE APPROACH</p><h2 id="modal-title">Good work starts<br/>with <em>your idea.</em></h2><p>I start by understanding what you need your website to do. Then I bring the interface and the code together into one considered experience.</p><ul><li>Clear, purposeful interfaces</li><li>Responsive experiences across screens</li><li>Front end and back end working together</li></ul><button className="primary" onClick={()=>setPreview(false)}>Back to the introduction</button></section></div>}
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
