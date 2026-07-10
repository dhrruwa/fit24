document.querySelectorAll('.acc-q').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const item=btn.parentElement, ans=item.querySelector('.acc-a'), open=item.classList.contains('open');
    document.querySelectorAll('.acc-item.open').forEach(i=>{
      i.classList.remove('open'); i.querySelector('.acc-a').style.maxHeight=null;
    });
    if(!open){ item.classList.add('open'); ans.style.maxHeight=ans.scrollHeight+'px'; }
  });
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- split hero headline into words for a reveal animation ---------- */
const heroH1 = document.querySelector('.hero h1');
if(heroH1){
  const words = heroH1.textContent.trim().split(/\s+/);
  heroH1.innerHTML = words
    .map(w => `<span class="word-mask"><span class="word">${w}</span></span>`)
    .join(' ');
}

if(window.gsap && !reduceMotion){
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- header ---------- */
  gsap.from('header', {y:-40, opacity:0, duration:.7, ease:'power2.out'});

  /* ---------- hero intro ---------- */

  const heroTl = gsap.timeline({defaults:{ease:'power3.out'}});
  heroTl
    .from('.hero .ghost', {opacity:0, scale:1.08, duration:1.2}, 0)
    .from('.hero h1 .word', {yPercent:130, opacity:0, duration:1, stagger:0.07, ease:'power4.out'}, 0.15)
    .from('.hero .sub', {y:30, opacity:0, duration:.8}, 0.55)
    .from('.hero-figure', {y:60, opacity:0, duration:1}, 0.5)
    .from('.float-card.coaches', {x:-50, opacity:0, duration:.8}, 0.7)
    .from('.float-card.rating', {x:50, opacity:0, duration:.8}, 0.7);

  /* ---------- animated counters ---------- */
  document.querySelectorAll('.stat b, .exp-badge b, .coaches .num, .rating .score, .score-row .n')
    .forEach(el=>{
      const m = el.textContent.trim().match(/^([\d.]+)(.*)$/);
      if(!m) return;
      const end = parseFloat(m[1]), suffix = m[2], decimals = (m[1].split('.')[1]||'').length;
      const obj = {val:0};
      gsap.to(obj, {
        val:end, duration:1.6, ease:'power2.out',
        scrollTrigger:{trigger:el, start:'top 85%'},
        onUpdate:()=>{ el.textContent = obj.val.toFixed(decimals)+suffix; }
      });
    });

  /* ---------- generic scroll reveal ---------- */
  const reveal = (selector, vars={})=>{
    document.querySelectorAll(selector).forEach(el=>{
      gsap.from(el, {
        y:40, opacity:0, duration:.9, ease:'power3.out',
        scrollTrigger:{trigger:el, start:'top 87%'},
        ...vars
      });
    });
  };

  const batchReveal = (selector, vars={})=>{
    ScrollTrigger.batch(selector, {
      start:'top 87%',
      onEnter: batch => gsap.from(batch, {
        y:50, opacity:0, duration:.8, ease:'power3.out', stagger:0.12, ...vars
      })
    });
  };

  reveal('.about-grid .exp-badge', {x:-40});
  reveal('.about-copy', {x:40});

  reveal('.sec-head h2');
  reveal('.sec-head p', {delay:.1});

  batchReveal('.svc-row');

  gsap.utils.toArray('.ph').forEach((el,i)=>{
    gsap.from(el, {
      y:70, opacity:0, duration:.9, ease:'power3.out', delay:i*.12,
      scrollTrigger:{trigger:'.more-imgs', start:'top 80%'}
    });
  });
  reveal('.more h2', {x:40});
  reveal('.more p', {x:40, delay:.1});
  reveal('.more .pill-btn', {x:40, delay:.2});

  batchReveal('.plan', {y:60, scale:.96});

  reveal('.ach-head h2', {x:-30});
  reveal('.ach-head p', {x:30});
  batchReveal('.ach-row');

  batchReveal('.quote');
  batchReveal('.logo-cell', {y:30, stagger:0.06});

  batchReveal('.acc-item');

  batchReveal('.post');

  gsap.from('.giant', {opacity:0, scale:.85, duration:1.2, ease:'power3.out',
    scrollTrigger:{trigger:'.giant', start:'top 90%'}});
}
