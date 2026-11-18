import React,{useEffect,useState} from 'react';
export function useTheme(){
 const [theme,setTheme]=useState(()=>document.documentElement.dataset.theme==='dark'?'dark':'light');
 useEffect(()=>{
  document.documentElement.dataset.theme=theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='dark'?'#15171a':'#f16c3c');
  try{localStorage.setItem('israel-portfolio-theme',theme)}catch{}
 },[theme]);
 return {theme,toggleTheme:()=>setTheme(current=>current==='dark'?'light':'dark')};
}
export function ThemeToggle({theme,toggleTheme}){
 const dark=theme==='dark';
 return <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${dark?'light':'dark'} mode`} title={`Switch to ${dark?'light':'dark'} mode`} aria-pressed={dark}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{dark?<><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5"/></>:<path d="M20 14a8.5 8.5 0 0 1-10-10A8.5 8.5 0 1 0 20 14Z"/>}</svg></button>
}
