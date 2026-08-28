window.addEventListener('load',()=>document.documentElement.classList.add('portfolio-loaded'));
document.documentElement.dataset.portfolioVersion='V5.1';
const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const progress=$('#progress');
addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(scrollY/Math.max(h,1)*100)+'%';$('.nav-wrap').classList.toggle('scrolled',scrollY>30)}, {passive:true});
const menu=$('#menuToggle'),nav=$('#navLinks');menu.addEventListener('click',()=>nav.classList.toggle('open'));$$('#navLinks a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});$$('.reveal').forEach(el=>observer.observe(el));
// Lightweight 3D starfield: no library or external dependency.
const canvas=$('#space'),ctx=canvas.getContext('2d');let W,H,dpr,stars=[];function resize(){dpr=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;canvas.width=W*dpr;canvas.height=H*dpr;canvas.style.width=W+'px';canvas.style.height=H+'px';ctx.setTransform(dpr,0,0,dpr,0,0);stars=Array.from({length:Math.min(150,Math.floor(W/8))},()=>({x:Math.random()*W,y:Math.random()*H,z:Math.random()*1+.2,r:Math.random()*1.4+.2,v:Math.random()*.18+.04}))}resize();addEventListener('resize',resize);
let mx=0,my=0;addEventListener('pointermove',e=>{mx=(e.clientX/W-.5);my=(e.clientY/H-.5)});function draw(){ctx.clearRect(0,0,W,H);for(const s of stars){s.y+=s.v;if(s.y>H+5)s.y=-5;s.x+=mx*s.z*.12;ctx.beginPath();ctx.fillStyle=`rgba(85,190,255,${.12+s.z*.5})`;ctx.arc(s.x,s.y,s.r*s.z,0,Math.PI*2);ctx.fill()}requestAnimationFrame(draw)}draw();
// Mouse parallax on selected 3D cards.
$$('[data-tilt]').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5,deg=Number(el.dataset.tilt)||6;el.style.transform=`rotateX(${-y*deg}deg) rotateY(${x*deg}deg) translateZ(8px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
const projectData={
 challan:{title:'Subdealer Challan Dispatch System',type:'Automobile · Full-Stack Salesforce Application',img:'assets/project-challan.png',desc:'A production-style Experience Cloud application for vehicle dispatch, challans, returns and complete vehicle movement history across a Honda two-wheeler sub-dealer network.',features:['Lean 4-object data model: Subdealer, Vehicle, Challan, Challan Vehicle','12+ Lightning Web Components backed by dedicated Apex controllers and test classes','PDF challan generation with Visualforce renderAs="pdf" letterhead','Dynamic QR-code verification and Indian-currency amount-in-words conversion','Cancel & Re-issue workflow preserves historical audit records','Public QR-code challan verification page'],repo:'https://github.com/techabhishek108/Automobile-Sub-dealer-Dispatch-System-'},
 college:{title:'College Management System',type:'Education · Full-Stack Salesforce Application',img:'assets/project-college.png',desc:'An end-to-end CRM application designed to replace manual college administration and manage student and academic workflows.',features:['Custom Student, Subject, Admission and Examination data model','LWC student search, academic dashboard and admission tracker','Apex triggers for roll-number generation and marks computation','Visualforce PDF templates for admission letters and examination slips','Multi-step Screen Flows for staff-facing academic and admission workflows','Public student portal via Salesforce Sites'],repo:'https://github.com/techabhishek108'},
 restaurant:{title:'Restaurant E-Management System',type:'Hospitality · Full-Stack Salesforce Application',img:'assets/project-restaurant.png',desc:'An end-to-end restaurant operations platform covering ordering, kitchen workflow, billing, table management, inventory and guest reservations.',features:['Custom restaurant data model with 7 core custom objects','8+ Lightning Web Components including menu/cart, chef board and waiter board','Color-coded table management and order payments desk','Public Experience Cloud LWR site for guest self-ordering and reservations','Live 4-stage order status tracking with guest security configuration','Packaged as a Salesforce Unlocked Package'],repo:'https://github.com/techabhishek108/restaurant-management-system'}
};
const modal=$('#projectModal'),modalContent=$('#modalContent');function openProject(key){const p=projectData[key];modalContent.innerHTML=`<div class="modal-content-grid"><img src="${p.img}" alt="${p.title}"><div class="modal-copy"><div class="eyebrow"><span></span>${p.type}</div><h3>${p.title}</h3><p>${p.desc}</p><div class="feature-list">${p.features.map(f=>`<div>${f}</div>`).join('')}</div><div class="modal-links"><a class="btn primary" href="${p.repo}" target="_blank" rel="noreferrer">View GitHub <svg><use href="assets/icons.svg#i-arrow"/></svg></a><button class="btn ghost" onclick="closeProject()">Close</button></div></div></div>`;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}function closeProject(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}$$('.project-open').forEach(b=>b.addEventListener('click',()=>openProject(b.dataset.project)));$('#modalClose').addEventListener('click',closeProject);$('.modal-backdrop').addEventListener('click',closeProject);addEventListener('keydown',e=>{if(e.key==='Escape')closeProject()});
$('#contactForm').addEventListener('submit',e=>{e.preventDefault();const name=$('#name').value.trim(),email=$('#email').value.trim(),subject=$('#subject').value.trim(),message=$('#message').value.trim();const body=`Hello Abhishek,%0D%0A%0D%0AName: ${encodeURIComponent(name)}%0D%0AEmail: ${encodeURIComponent(email)}%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0ASent from your portfolio.`;location.href=`mailto:tech.abhishek.kr@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`});
$('#year').textContent=new Date().getFullYear();


/* =========================================================
   V3 HERO — POINTER-DRIVEN PARALLAX
   ========================================================= */
(() => {
  const scene = document.getElementById('hero3D');
  if (!scene) return;
  const nodes = [...scene.querySelectorAll('.scene-node')];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let rx = 0, ry = 0, targetX = 0, targetY = 0;

  scene.addEventListener('pointermove', (event) => {
    if (reduced) return;
    const rect = scene.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    targetX = x * 9;
    targetY = y * -8;
    nodes.forEach(node => {
      const depth = Number(node.dataset.depth || 1);
      node.style.transform =
        `translate3d(${x * depth * 14}px, ${y * depth * -12}px, ${55 + depth * 10}px)`;
    });
  });

  scene.addEventListener('pointerleave', () => {
    targetX = targetY = 0;
    nodes.forEach(node => node.style.transform = '');
  });

  const frame = () => {
    rx += (targetX - rx) * .08;
    ry += (targetY - ry) * .08;
    scene.style.transform = `rotateY(${rx}deg) rotateX(${ry}deg)`;
    requestAnimationFrame(frame);
  };
  frame();
})();




/* =========================================================
   V4.2 — SMOOTH HERO CAMERA PARALLAX
   ========================================================= */
(() => {
  const scene = document.getElementById('hero3D');
  if (!scene) return;
  const layers = [...scene.querySelectorAll('[data-depth]')];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let tx=0, ty=0, rx=0, ry=0;

  scene.addEventListener('pointermove', e => {
    if (reduced) return;
    const r=scene.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    tx=x*6.5; ty=y*-5.5;
    layers.forEach(el=>{
      const d=Number(el.dataset.depth||1);
      el.style.marginLeft = '';
      el.style.transform = `translate3d(${x*d*13}px,${y*d*-10}px,${55+d*18}px)`;
    });
  });
  scene.addEventListener('pointerleave',()=>{
    tx=ty=0;
    layers.forEach(el=>el.style.transform='');
  });
  const loop=()=>{
    rx+=(tx-rx)*.075; ry+=(ty-ry)*.075;
    scene.style.transform=`rotateY(${rx}deg) rotateX(${ry}deg)`;
    requestAnimationFrame(loop);
  };
  loop();
})();


/* =========================================================
   V5 — PROJECT 3D TILT + CASE STUDY MODALS
   ========================================================= */
(() => {
  const cards = [...document.querySelectorAll('.project-card-v5')];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  cards.forEach(card => {
    if (!reduced) {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX-r.left)/r.width-.5;
        const y = (e.clientY-r.top)/r.height-.5;
        card.style.transform = `perspective(900px) rotateX(${y*-4.5}deg) rotateY(${x*5.5}deg) translateY(-5px)`;
      });
      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    }
  });

  const data = {
    challan: {
      kicker:'PROJECT 01 / SALESFORCE APPLICATION',
      title:'Subdealer Challan Dispatch System',
      summary:'A complete solution for challan generation, dispatch management and delivery tracking for Honda two-wheeler subdealers.',
      role:'Salesforce Developer',
      platform:'Salesforce + Experience Cloud',
      focus:'Challan & Dispatch',
      problems:['Manual challan generation and tracking','Dispatch visibility across subdealers','Consistent challan numbering and PDF handling'],
      features:['Apex business logic and sequence handling','LWC interfaces for operational workflows','SOQL data retrieval and reporting','Experience Cloud access for users'],
      stack:['Apex','LWC','SOQL','Experience Cloud','JavaScript','PDF']
    },
    college: {
      kicker:'PROJECT 02 / EDUCATION MANAGEMENT',
      title:'Bhagalpur City College Management System',
      summary:'A comprehensive digital solution to manage academic, administrative and student activities efficiently.',
      role:'Salesforce Developer',
      platform:'Salesforce',
      focus:'College Operations',
      problems:['Scattered academic and administrative workflows','Student, faculty and course management','Attendance, fees, examinations and notices'],
      features:['Student and faculty management','Course, attendance and examination workflows','Fee and library management','Reports, notices and system administration'],
      stack:['Salesforce','Flow','Apex','LWC','SOQL','Reports']
    },
    restaurant: {
      kicker:'PROJECT 03 / RESTAURANT OPERATIONS',
      title:'Restaurant E-Management System',
      summary:'An end-to-end restaurant management solution covering orders, menu, tables, reservations, billing, kitchen and staff.',
      role:'Salesforce Developer',
      platform:'Salesforce',
      focus:'Restaurant Operations',
      problems:['Order and kitchen coordination','Table and reservation management','Billing, customers and staff workflows'],
      features:['Order and menu management','Kitchen/KOT operational flow','Tables and reservations','Billing, customers, staff and reports'],
      stack:['Salesforce','Apex','LWC','SOQL','Flow','JavaScript']
    }
  };

  const modal=document.getElementById('projectModal');
  if(!modal) return;
  const $=id=>document.getElementById(id);
  const fillList=(el,items)=>{el.innerHTML=items.map(x=>`<li>${x}</li>`).join('')};
  const fillStack=(el,items)=>{el.innerHTML=items.map(x=>`<span>${x}</span>`).join('')};

  function open(key){
    const p=data[key]; if(!p) return;
    $('modalKicker').textContent=p.kicker;
    $('modalTitle').textContent=p.title;
    $('modalSummary').textContent=p.summary;
    $('modalRole').textContent=p.role;
    $('modalPlatform').textContent=p.platform;
    $('modalFocus').textContent=p.focus;
    fillList($('modalProblems'),p.problems);
    fillList($('modalFeatures'),p.features);
    fillStack($('modalStack'),p.stack);
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-lock');
    $('modalTitle').focus?.();
  }
  function close(){
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-lock');
  }
  document.querySelectorAll('[data-open-project]').forEach(btn=>btn.addEventListener('click',()=>open(btn.dataset.openProject)));
  modal.querySelectorAll('[data-close-project]').forEach(el=>el.addEventListener('click',close));
  document.addEventListener('keydown',e=>{if(e.key==='Escape' && modal.classList.contains('is-open')) close()});
})();


/* V6 — subtle magnetic hover for skill rows */
(() => {
  document.querySelectorAll('.skill-row-v6').forEach(row => {
    row.addEventListener('pointermove', e => {
      const r=row.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      row.style.transform=`perspective(700px) rotateY(${x*2.5}deg) rotateX(${y*-2}deg) translateX(4px)`;
    });
    row.addEventListener('pointerleave',()=>row.style.transform='');
  });
})();


/* V7 — journey scroll emphasis */
(() => {
  const items=[...document.querySelectorAll('.journey-item')];
  if(!items.length || !('IntersectionObserver' in window)) return;
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('journey-seen');
    });
  },{threshold:.22});
  items.forEach(i=>io.observe(i));
})();


/* V8 — animate resume bars only when the section enters the viewport */
(()=>{const sec=document.querySelector('.v8-resume');if(!sec||!('IntersectionObserver' in window))return;const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){sec.classList.add('resume-active');obs.disconnect()}}),{threshold:.18});obs.observe(sec)})();


/* V9 — contact form: build a mailto safely in the browser */
(()=>{const f=document.getElementById('contactForm');if(!f)return;f.addEventListener('submit',e=>{e.preventDefault();const n=document.getElementById('name').value.trim(),em=document.getElementById('email').value.trim(),s=document.getElementById('subject').value.trim(),msg=document.getElementById('message').value.trim();const body=`Name: ${n}\nEmail: ${em}\n\n${msg}`;window.location.href=`mailto:tech.abhishek.kr@gmail.com?subject=${encodeURIComponent(s)}&body=${encodeURIComponent(body)}`;});})();

/* =========================================================
   V10 — NAVIGATION / INTERACTION QA
   ========================================================= */
(() => {
  const nav = document.getElementById('navLinks');
  const menu = document.getElementById('menuToggle');
  const links = [...document.querySelectorAll('#navLinks a[href^="#"]')];
  const sections = links
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const setActive = id => {
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, {rootMargin:'-35% 0px -55% 0px', threshold:[0,.15,.4,.7]});
    sections.forEach(s => io.observe(s));
  }

  links.forEach(a => a.addEventListener('click', () => {
    setActive(a.getAttribute('href').slice(1));
    if (nav) nav.classList.remove('open');
    if (menu) menu.setAttribute('aria-expanded','false');
  }));

  if (menu) {
    menu.setAttribute('aria-expanded','false');
    menu.addEventListener('click', () => {
      const open = nav && nav.classList.contains('open');
      menu.setAttribute('aria-expanded', String(!open));
    });
  }

  addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav && nav.classList.contains('open')) {
      nav.classList.remove('open');
      if (menu) menu.setAttribute('aria-expanded','false');
      menu?.focus();
    }
  });
})();

/* Contact form: validate explicitly before opening mail client. */
(() => {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('invalid', e => e.target.classList.add('field-error'), true);
  form.addEventListener('input', e => e.target.classList.remove('field-error'));

  form.addEventListener('submit', e => {
    const fields = ['name','email','subject','message']
      .map(id => document.getElementById(id))
      .filter(Boolean);
    const invalid = fields.find(field => !field.checkValidity());
    if (invalid) {
      e.preventDefault();
      invalid.focus();
    }
  });
})();


/* =========================================================
   V11 — PRODUCTION RUNTIME GUARD
   ========================================================= */
(() => {
  document.documentElement.dataset.portfolioReady = 'true';

  // Keep external links safe if any are injected dynamically.
  document.querySelectorAll('a[target="_blank"]').forEach(a => {
    const rel = new Set((a.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
    rel.add('noopener'); rel.add('noreferrer');
    a.setAttribute('rel', [...rel].join(' '));
  });

  // Avoid trapping keyboard focus in hidden mobile navigation.
  const nav = document.getElementById('navLinks');
  if (nav && window.matchMedia) {
    const mq = matchMedia('(min-width: 701px)');
    const sync = () => { if (mq.matches) nav.classList.remove('open'); };
    mq.addEventListener?.('change', sync);
  }
})();
