document.addEventListener('DOMContentLoaded',()=>{
  const navbar=document.querySelector('.navbar');
  const backTop=document.querySelector('.back-top');
  const sections=[...document.querySelectorAll('main section[id]')];
  const navLinks=[...document.querySelectorAll('.navbar .nav-link[href^="#"]')];
  const navCollapse=document.getElementById('mainNav');
  const onScroll=()=>{
    navbar.classList.toggle('scrolled',window.scrollY>30);
    backTop.classList.toggle('show',window.scrollY>500);
    let current='home';
    sections.forEach(section=>{if(window.scrollY>=section.offsetTop-140)current=section.id});
    navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${current}`));
  };
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  document.querySelector('.navbar-toggler').addEventListener('click',()=>navbar.classList.toggle('menu-open'));
  document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',e=>{
    const target=document.querySelector(link.getAttribute('href'));if(!target)return;
    e.preventDefault();target.scrollIntoView({behavior:'smooth'});
    if(navCollapse.classList.contains('show'))bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
  }));
  backTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  const serviceSelect=document.getElementById('service');
  document.querySelectorAll('[data-service]').forEach(btn=>btn.addEventListener('click',()=>{
    if(serviceSelect)serviceSelect.value=btn.dataset.service;
    document.getElementById('contact').scrollIntoView({behavior:'smooth'});
    setTimeout(()=>{const target=document.querySelector('.contact-image');if(serviceSelect)serviceSelect.focus();if(target)target.animate([{boxShadow:'0 0 0 0 rgba(0,188,212,.7)'},{boxShadow:'0 0 0 16px rgba(0,188,212,0)'}],{duration:850})},550);
  }));
  const projectData={
    faturacao:{title:'Software e Plataforma de Faturação',icon:'bi-receipt-cutoff',description:'Uma solução centralizada para gerir documentos, clientes, produtos, pagamentos e indicadores financeiros.',features:['Emissão de documentos','Gestão de clientes','Produtos e serviços','Controlo de pagamentos','Relatórios financeiros'],service:'Plataforma Web'},
    imoveis:{title:'Plataforma de Imóveis',icon:'bi-buildings',description:'Experiência digital completa para publicar, pesquisar e gerir anúncios de imóveis com facilidade.',features:['Publicação de imóveis','Pesquisa avançada','Filtros por localização','Gestão de anúncios','Contacto com anunciantes'],service:'Plataforma Web'},
    automoveis:{title:'Plataforma de Venda de Automóveis',icon:'bi-car-front',description:'Uma montra digital para concessionários e vendedores apresentarem e gerirem os seus automóveis.',features:['Publicação de viaturas','Pesquisa e filtros','Gestão de anúncios','Galeria de imagens','Contacto com vendedores'],service:'Plataforma Web'},
    empregos:{title:'Plataforma de Vagas de Emprego',icon:'bi-briefcase',description:'Uma plataforma orientada à aproximação entre empresas, oportunidades e candidatos.',features:['Publicação de vagas','Pesquisa de oportunidades','Perfis de candidatos','Gestão de candidaturas','Área de empresas'],service:'Plataforma Web'}
  };
  const projectModal=document.getElementById('projectModal');
  projectModal.addEventListener('show.bs.modal',event=>{
    const data=projectData[event.relatedTarget.dataset.project];
    projectModal.querySelector('.modal-title').innerHTML=`<i class="bi ${data.icon} text-cyan me-2"></i>${data.title}`;
    projectModal.querySelector('.project-description').textContent=data.description;
    projectModal.querySelector('.modal-features').innerHTML=data.features.map(x=>`<li><i class="bi bi-check-circle-fill text-cyan me-2"></i>${x}</li>`).join('');
    projectModal.querySelector('[data-service]').dataset.service=data.service;
  });
  projectModal.querySelector('[data-service]').addEventListener('click',e=>{
    bootstrap.Modal.getInstance(projectModal).hide();if(serviceSelect)serviceSelect.value=e.currentTarget.dataset.service;
    setTimeout(()=>document.getElementById('contact').scrollIntoView({behavior:'smooth'}),250);
  });
});
