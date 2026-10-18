/* TOP LEVEL — language toggle (AR default / EN), mobile nav, tabs, booking form */
(function(){
  "use strict";
  var LANG_KEY = "toplevel-lang";

  function setLang(lang){
    if(lang !== "ar" && lang !== "en") lang = "ar";
    var html = document.documentElement;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

    document.querySelectorAll("[data-ar]").forEach(function(el){
      var v = lang === "ar" ? el.getAttribute("data-ar") : el.getAttribute("data-en");
      if(v !== null) el.textContent = v;
    });
    document.querySelectorAll("[data-ar-ph]").forEach(function(el){
      var v = lang === "ar" ? el.getAttribute("data-ar-ph") : el.getAttribute("data-en-ph");
      if(v !== null) el.setAttribute("placeholder", v);
    });

    document.title = lang === "ar"
      ? "توب ليفل — صالون حلاقة رجالي فاخر | الرياض"
      : "TOP LEVEL — Premium Barbershop | Riyadh";

    document.querySelectorAll(".lang-toggle").forEach(function(btn){
      btn.textContent = lang === "ar" ? "EN" : "عربي";
      btn.setAttribute("aria-label", lang === "ar" ? "Switch to English" : "التبديل إلى العربية");
    });

    try{ localStorage.setItem(LANG_KEY, lang); }catch(e){}
  }

  function initLang(){
    var saved = "ar";
    try{ saved = localStorage.getItem(LANG_KEY) || "ar"; }catch(e){}
    setLang(saved);
    document.querySelectorAll(".lang-toggle").forEach(function(btn){
      btn.addEventListener("click", function(){
        var cur = document.documentElement.getAttribute("lang") === "en" ? "en" : "ar";
        setLang(cur === "ar" ? "en" : "ar");
      });
    });
  }

  function initNav(){
    var burger = document.querySelector(".hamburger");
    var nav = document.querySelector(".main-nav");
    if(!burger || !nav) return;
    burger.addEventListener("click", function(){
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      var icon = burger.querySelector("i");
      if(icon){ icon.className = open ? "bi bi-x-lg" : "bi bi-list"; }
    });
    nav.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){
        nav.classList.remove("open");
        var icon = burger.querySelector("i");
        if(icon) icon.className = "bi bi-list";
        burger.setAttribute("aria-expanded","false");
      });
    });
  }

  function initTabs(){
    var btns = document.querySelectorAll(".tab-btn");
    if(!btns.length) return;
    btns.forEach(function(btn){
      btn.addEventListener("click", function(){
        var target = btn.getAttribute("data-tab");
        btns.forEach(function(b){
          b.classList.toggle("active", b === btn);
          b.setAttribute("aria-selected", b === btn ? "true" : "false");
        });
        document.querySelectorAll(".tab-panel").forEach(function(p){
          p.classList.toggle("active", p.getAttribute("data-panel") === target);
        });
      });
    });
  }

  function initForm(){
    var form = document.getElementById("bookForm");
    if(!form) return;
    form.addEventListener("submit", function(ev){
      ev.preventDefault();
      var ok = document.getElementById("formOk");
      if(ok) ok.classList.add("show");
      form.querySelectorAll("input,textarea").forEach(function(f){ f.value = ""; });
      if(ok) ok.scrollIntoView({behavior:"smooth", block:"nearest"});
    });
  }

  document.addEventListener("DOMContentLoaded", function(){
    initLang(); initNav(); initTabs(); initForm();
  });
})();
