(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&d(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function d(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const m="54253404-642d08b4e9274d1de4d38485e",p="https://pixabay.com/api/",f=document.getElementById("search-form"),a=document.querySelector(".gallery"),c=document.querySelector(".load-more");let i=1,l="";f.addEventListener("submit",async r=>{r.preventDefault(),l=r.target.elements.query.value.trim(),l&&(i=1,a.innerHTML="",await u())});c.addEventListener("click",async()=>{i+=1,await u()});async function u(){const r=`${p}?key=${m}&q=${encodeURIComponent(l)}&image_type=photo&orientation=horizontal&page=${i}&per_page=12`;try{const o=await fetch(r);if(!o.ok)throw new Error("Ошибка при запросе к Pixabay API");const t=await o.json();y(t.hits),t.hits.length===0||t.hits.length<12?c.style.display="none":c.style.display="block"}catch(o){console.error(o),alert("Произошла ошибка при загрузке изображений")}}function y(r){const o=r.map(t=>`
    <li>
      <div class="photo-card">
        <img src="${t.webformatURL}" alt="${t.tags}" />
        <div class="stats">
          <p class="stats-item">
            <i class="material-icons">thumb_up</i>${t.likes}
          </p>
          <p class="stats-item">
            <i class="material-icons">visibility</i>${t.views}
          </p>
          <p class="stats-item">
            <i class="material-icons">comment</i>${t.comments}
          </p>
          <p class="stats-item">
            <i class="material-icons">cloud_download</i>${t.downloads}
          </p>
        </div>
      </div>
    </li>
  `).join("");if(a.insertAdjacentHTML("beforeend",o),i>1){const{height:t}=a.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}}
