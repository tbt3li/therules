(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const ed=$('#editor'),code=$('#code'),KEY='family-post-draft';
let saveT,range=null;
document.execCommand('styleWithCSS',false,true);
document.execCommand('defaultParagraphSeparator',false,'p');

/* ---------- toolbar config ---------- */
const sel=(id,opts,cb)=>({sel:id,opts,cb});
const T=[
 {c:'undo',l:'↶',t:'Undo (Ctrl+Z)'},{c:'redo',l:'↷',t:'Redo (Ctrl+Y)'},'|',
 sel('fmt',[['p','Paragraph'],['h1','Heading 1'],['h2','Heading 2'],['h3','Heading 3'],['h4','Heading 4'],['blockquote','Quote'],['pre','Code block']],v=>exec('formatBlock',v)),
 sel('font',[['','Font'],['Georgia,serif','Georgia'],['system-ui,sans-serif','System Sans'],['"Times New Roman",serif','Times'],['Arial,sans-serif','Arial'],['Verdana,sans-serif','Verdana'],['"Courier New",monospace','Courier'],['"Trebuchet MS",sans-serif','Trebuchet'],['Impact,sans-serif','Impact'],['"Comic Sans MS",cursive','Comic']],v=>v&&exec('fontName',v)),
 sel('size',[['','Size'],['12px','12'],['14px','14'],['16px','16'],['18px','18'],['24px','24'],['32px','32'],['48px','48'],['64px','64']],v=>v&&fontSize(v)),'|',
 {c:'bold',l:'<b>B</b>',t:'Bold (Ctrl+B)'},{c:'italic',l:'<i>I</i>',t:'Italic (Ctrl+I)'},{c:'underline',l:'<u>U</u>',t:'Underline (Ctrl+U)'},{c:'strikeThrough',l:'<s>S</s>',t:'Strikethrough'},
 {c:'subscript',l:'x₂',t:'Subscript'},{c:'superscript',l:'x²',t:'Superscript'},
 {color:'foreColor',t:'Text color'},{color:'hiliteColor',t:'Highlight color',v:'#fff59d'},'|',
 {c:'justifyLeft',l:'⇤',t:'Align left'},{c:'justifyCenter',l:'↔',t:'Center'},{c:'justifyRight',l:'⇥',t:'Align right'},{c:'justifyFull',l:'☰',t:'Justify'},'|',
 {c:'insertUnorderedList',l:'• List',t:'Bullet list'},{c:'insertOrderedList',l:'1. List',t:'Numbered list'},{a:'todo',l:'☑',t:'Checklist'},
 {c:'outdent',l:'⇠',t:'Outdent'},{c:'indent',l:'⇢',t:'Indent'},'|',
 {a:'link',l:'Link',t:'Insert link (Ctrl+K)'},{c:'unlink',l:'Unlink',t:'Remove link'},{a:'image',l:'Image',t:'Insert image'},{a:'video',l:'Video',t:'Embed YouTube / video'},
 {a:'table',l:'Table',t:'Insert table'},{a:'code',l:'&lt;/&gt;',t:'Inline code'},{a:'callout',l:'Callout',t:'Callout box'},{c:'insertHorizontalRule',l:'―',t:'Divider'},{a:'emoji',l:'😊',t:'Emoji'},'|',
 {a:'rowAdd',l:'+Row',t:'Add table row'},{a:'colAdd',l:'+Col',t:'Add table column'},{a:'rowDel',l:'−Row',t:'Delete row'},{a:'colDel',l:'−Col',t:'Delete column'},'|',
 {a:'find',l:'Find',t:'Find & replace'},{c:'removeFormat',l:'Tx',t:'Clear formatting'},{a:'upper',l:'Aa',t:'Toggle UPPERCASE'}
];
const tb=$('#toolbar');
T.forEach(i=>{
 if(i==='|'){tb.insertAdjacentHTML('beforeend','<span class="sep"></span>');return}
 if(i.sel){const s=document.createElement('select');s.id='s_'+i.sel;s.title=i.sel;i.opts.forEach(([v,n])=>s.add(new Option(n,v)));
  s.onchange=()=>{restore();i.cb(s.value);if(i.sel!=='fmt')s.value=''};s.onmousedown=save;tb.append(s);return}
 if(i.color){const c=document.createElement('input');c.type='color';c.title=i.t;c.value=i.v||'#d93025';c.onmousedown=save;
  c.oninput=()=>{restore();exec(i.color,c.value)};tb.append(c);return}
 const b=document.createElement('button');b.type='button';b.innerHTML=i.l;b.title=i.t;
 b.onmousedown=e=>e.preventDefault();
 b.onclick=()=>i.c?exec(i.c):A[i.a]();
 if(i.c)b.dataset.cmd=i.c;tb.append(b);
});

/* ---------- core helpers ---------- */
function save(){const s=getSelection();if(s.rangeCount&&ed.contains(s.anchorNode))range=s.getRangeAt(0).cloneRange()}
function restore(){ed.focus();if(range){const s=getSelection();s.removeAllRanges();s.addRange(range)}}
function exec(c,v=null){ed.focus();document.execCommand(c,false,v);changed()}
function html(h){restore();document.execCommand('insertHTML',false,h);changed()}
function fontSize(px){exec('fontSize',7);ed.querySelectorAll('font[size="7"]').forEach(f=>{const s=document.createElement('span');s.style.fontSize=px;s.innerHTML=f.innerHTML;f.replaceWith(s)});changed()}
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');setTimeout(()=>t.classList.remove('on'),1800)}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function ask(title,fields){save();return new Promise(res=>{
 const d=$('#dlg'),f=$('#dform');
 f.innerHTML=`<h3>${title}</h3>`+fields.map(x=>`<label>${x.l}</label>`+(x.type==='select'?`<select name="${x.n}">${x.o.map(o=>`<option>${o}</option>`).join('')}</select>`:`<input name="${x.n}" type="${x.type||'text'}" value="${esc(x.v||'')}" ${x.accept?`accept="${x.accept}"`:''}>`)).join('')+'<div class="row"><button value="x" type="button" id="dx">Cancel</button><button class="pri" value="ok">Insert</button></div>';
 $('#dx').onclick=()=>{d.close();res(null)};
 d.onclose=()=>{};f.onsubmit=async e=>{const o={};new FormData(f).forEach((v,k)=>o[k]=v);d.close();res(o)};
 d.showModal();f.querySelector('input,select')?.focus();
})}
const readFile=f=>new Promise(r=>{const x=new FileReader();x.onload=()=>r(x.result);x.readAsDataURL(f)});
function cell(){const n=getSelection().anchorNode;return n&&(n.nodeType===1?n:n.parentElement).closest('td,th')}

/* ---------- actions ---------- */
const A={
 async link(){const t=getSelection().toString();const o=await ask('Insert link',[{n:'u',l:'URL',v:'https://'},{n:'t',l:'Open in',type:'select',o:['Same tab','New tab']}]);if(!o||!o.u)return;restore();
  if(t){exec('createLink',o.u);if(o.t==='New tab')ed.querySelectorAll(`a[href="${o.u}"]`).forEach(a=>{a.target='_blank';a.rel='noopener'})}
  else html(`<a href="${esc(o.u)}"${o.t==='New tab'?' target="_blank" rel="noopener"':''}>${esc(o.u)}</a>`)},
 async image(){const o=await ask('Insert image',[{n:'u',l:'Image URL'},{n:'f',l:'…or upload from device',type:'file',accept:'image/*'},{n:'a',l:'Alt text (for SEO & accessibility)'},{n:'w',l:'Width (e.g. 100%, 400px)',v:'100%'}]);if(!o)return;
  let src=o.u;const file=$('#dform input[type=file]')?.files?.[0];if(file)src=await readFile(file);if(!src)return;
  html(`<figure style="margin:1em 0;text-align:center"><img src="${esc(src)}" alt="${esc(o.a||'')}" style="width:${esc(o.w||'100%')};max-width:100%" loading="lazy"><figcaption style="color:#777;font-size:.85em">&nbsp;</figcaption></figure><p><br></p>`)},
 async video(){const o=await ask('Embed video',[{n:'u',l:'YouTube / Vimeo / .mp4 URL'}]);if(!o||!o.u)return;const u=o.u;
  let m=u.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/),v=u.match(/vimeo\.com\/(\d+)/);
  const h=m?`<div class="video" style="position:relative;aspect-ratio:16/9"><iframe src="https://www.youtube-nocookie.com/embed/${m[1]}" style="position:absolute;inset:0;width:100%;height:100%;border:0" allowfullscreen loading="lazy"></iframe></div>`
   :v?`<div class="video" style="position:relative;aspect-ratio:16/9"><iframe src="https://player.vimeo.com/video/${v[1]}" style="position:absolute;inset:0;width:100%;height:100%;border:0" allowfullscreen loading="lazy"></iframe></div>`
   :`<video src="${esc(u)}" controls style="max-width:100%"></video>`;html(h+'<p><br></p>')},
 async table(){const o=await ask('Insert table',[{n:'r',l:'Rows',type:'number',v:3},{n:'c',l:'Columns',type:'number',v:3},{n:'h',l:'Header row',type:'select',o:['Yes','No']}]);if(!o)return;
  let h='<table style="border-collapse:collapse;width:100%">';for(let r=0;r<+o.r;r++){h+='<tr>';for(let c=0;c<+o.c;c++){const t=r===0&&o.h==='Yes'?'th':'td';h+=`<${t} style="border:1px solid #ccc;padding:8px">${t==='th'?'Header':'&nbsp;'}</${t}>`}h+='</tr>'}html(h+'</table><p><br></p>')},
 code(){const t=getSelection().toString();html(`<code>${esc(t||'code')}</code>&nbsp;`)},
 callout(){html('<div class="callout" style="border-left:5px solid #0b6e6e;background:#eef6f6;padding:12px 16px;border-radius:6px;margin:1em 0"><b>Note:</b> Write your highlighted message here.</div><p><br></p>')},
 todo(){html('<ul class="todo" style="list-style:none;padding-left:4px"><li><input type="checkbox"> Task item</li></ul>')},
 upper(){const t=getSelection().toString();if(t)exec('insertText',t===t.toUpperCase()?t.toLowerCase():t.toUpperCase())},
 emoji(){ask('Emoji',[]).then(()=>{});const g='😀😂😍🥰😎🤔😢😡👍👏🙏💪🎉🔥✨❤️🌟🏠👨‍👩‍👧‍👦📸🎂🍕☕🌍📌✅❌⚠️💡📅🎁'.match(/\p{Extended_Pictographic}(\u200d\p{Extended_Pictographic}|\ufe0f)*/gu);
  const f=$('#dform');f.innerHTML='<h3>Emoji</h3><div class="emo">'+g.map(e=>`<button type="button">${e}</button>`).join('')+'</div><div class="row"><button type="button" id="dx">Close</button></div>';
  f.querySelectorAll('.emo button').forEach(b=>b.onclick=()=>{$('#dlg').close();html(b.textContent)});$('#dx').onclick=()=>$('#dlg').close()},
 rowAdd(){const c=cell();if(!c)return toast('Click inside a table cell');const r=c.parentElement,n=r.cloneNode(true);n.querySelectorAll('th,td').forEach(x=>{x.innerHTML='&nbsp;'});r.after(n);changed()},
 rowDel(){const c=cell();if(!c)return toast('Click inside a table cell');const t=c.closest('table');c.parentElement.remove();if(!t.rows.length)t.remove();changed()},
 colAdd(){const c=cell();if(!c)return toast('Click inside a table cell');const i=c.cellIndex;c.closest('table').querySelectorAll('tr').forEach(r=>{const x=r.cells[i].cloneNode();x.innerHTML='&nbsp;';r.cells[i].after(x)});changed()},
 colDel(){const c=cell();if(!c)return toast('Click inside a table cell');const i=c.cellIndex,t=c.closest('table');t.querySelectorAll('tr').forEach(r=>r.cells[i]?.remove());if(!t.rows[0]?.cells.length)t.remove();changed()},
 async find(){const o=await ask('Find & replace',[{n:'f',l:'Find'},{n:'r',l:'Replace with'}]);if(!o||!o.f)return;
  const w=document.createTreeWalker(ed,NodeFilter.SHOW_TEXT);let n=0,x;const re=new RegExp(o.f.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi');
  while(x=w.nextNode()){if(re.test(x.nodeValue)){re.lastIndex=0;n+=(x.nodeValue.match(re)||[]).length;x.nodeValue=x.nodeValue.replace(re,o.r)}}toast(n+' replaced');changed()}
};

/* ---------- output / preview ---------- */
const BASE=`body{max-width:760px;margin:40px auto;padding:0 18px;font:18px/1.75 Georgia,serif;color:#1d2327}h1,h2,h3,h4{font-family:system-ui,sans-serif;line-height:1.25}img,video,iframe{max-width:100%;height:auto;border-radius:8px}blockquote{border-left:4px solid #0b6e6e;margin:1em 0;padding:.2em 1em;color:#555;font-style:italic}pre{background:#11171a;color:#e6edf0;padding:14px;border-radius:8px;overflow:auto}code{background:#eee;padding:1px 5px;border-radius:4px}pre code{background:none}table{border-collapse:collapse;width:100%}a{color:#0b6e6e}`;
function clean(){const c=ed.cloneNode(true);c.querySelectorAll('.sel').forEach(e=>e.classList.remove('sel'));
 c.querySelectorAll('[class=""]').forEach(e=>e.removeAttribute('class'));
 c.querySelectorAll('input[type=checkbox]').forEach(i=>i.setAttribute('disabled',''));return c.innerHTML.replace(/ contenteditable="[^"]*"/g,'').replace(/<font[^>]*>|<\/font>/g,'')}
function pretty(h){let d=0;const inline=/^(a|b|i|u|s|em|strong|span|code|sub|sup|mark|small|br|img|label|input|figcaption)$/i;
 return h.replace(/>\s*</g,'><').replace(/(<\/?)([a-z0-9]+)([^>]*>)/gi,(m,a,t,r)=>inline.test(t)?m:'\n'+m).split('\n').filter(Boolean).map(l=>{
  const m=l.match(/^<(\/?)([a-z0-9]+)/i);if(!m)return'  '.repeat(d)+l;const close=m[1],t=m[2];const void_=/^(hr|br|img|input)$/i.test(t),self=/<\/[a-z0-9]+>\s*$/i.test(l)&&!close;
  if(close)d=Math.max(0,d-1);const out='  '.repeat(d)+l;if(!close&&!void_&&!self)d++;return out}).join('\n')}
function output(){const mode=document.querySelector('[name=mode]:checked').value;let b=clean();if($('#pretty').checked)b=pretty(b);
 if(mode==='body')return b;const t=$('#title').value||'Untitled',d=$('#desc').value,cv=$('#cover').value;
 return `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>${esc(t)}</title>\n${d?`<meta name="description" content="${esc(d)}">\n<meta property="og:description" content="${esc(d)}">\n`:''}<meta property="og:title" content="${esc(t)}">\n${cv?`<meta property="og:image" content="${esc(cv)}">\n`:''}<style>${BASE}</style>\n</head>\n<body>\n<article>\n<h1>${esc(t)}</h1>\n${cv?`<img src="${esc(cv)}" alt="${esc(t)}">\n`:''}${b}\n</article>\n</body>\n</html>`}
function fullDoc(){const t=$('#title').value,cv=$('#cover').value;return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${BASE}</style></head><body>${t?`<h1>${esc(t)}</h1>`:''}${cv?`<img src="${esc(cv)}">`:''}${clean()}</body></html>`}

/* ---------- state ---------- */
function changed(){clearTimeout(saveT);saveT=setTimeout(persist,600);stats();syncTb()}
function stats(){const t=ed.innerText.trim(),w=t?t.split(/\s+/).length:0;$('#stat').textContent=`${w} words · ${t.length} chars · ${Math.max(1,Math.round(w/220))} min read`}
function syncTb(){$$('[data-cmd]').forEach(b=>{try{b.classList.toggle('on',document.queryCommandState(b.dataset.cmd))}catch(e){}})}
function persist(){try{localStorage.setItem(KEY,JSON.stringify({h:ed.innerHTML,t:$('#title').value,s:$('#slug').value,d:$('#desc').value,c:$('#cover').value}));$('#saved').textContent='Draft saved '+new Date().toLocaleTimeString()}catch(e){$('#saved').textContent='Autosave unavailable'}}
function load(){try{const d=JSON.parse(localStorage.getItem(KEY));if(d){ed.innerHTML=d.h;$('#title').value=d.t||'';$('#slug').value=d.s||'';$('#desc').value=d.d||'';$('#cover').value=d.c||''}}catch(e){}
 if(localStorage.theme==='dark')document.documentElement.dataset.theme='dark';stats()}
function tab(n){$$('.tab').forEach(b=>b.classList.toggle('on',b.dataset.tab===n));$$('.pane').forEach(p=>p.classList.toggle('on',p.id==='p-'+n));
 tb.style.display=n==='edit'?'':'none';if(n==='preview')$('#frame').srcdoc=fullDoc();if(n==='code')code.value=output()}
$$('.tab').forEach(b=>b.onclick=()=>tab(b.dataset.tab));
$$('.bar [data-w]').forEach(b=>b.onclick=()=>{$$('.bar [data-w]').forEach(x=>x.classList.remove('on'));b.classList.add('on');$('#frame').style.width=b.dataset.w});
$$('[name=mode],#pretty').forEach(i=>i.onchange=()=>code.value=output());

/* ---------- buttons ---------- */
$('#bCopy').onclick=async()=>{try{await navigator.clipboard.writeText(code.value)}catch(e){code.select();document.execCommand('copy')}toast('HTML copied')};
$('#bDown').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([code.value],{type:'text/html'}));a.download=($('#slug').value||$('#title').value||'post').toLowerCase().replace(/[^a-z0-9]+/g,'-')+'.html';a.click();toast('Downloaded')};
$('#bApply').onclick=()=>{const v=code.value,m=v.match(/<article[^>]*>([\s\S]*)<\/article>/i)||v.match(/<body[^>]*>([\s\S]*)<\/body>/i);ed.innerHTML=m?m[1].replace(/^\s*<h1>[\s\S]*?<\/h1>/i,''):v;changed();tab('edit');toast('Applied to editor')};
$('#bNew').onclick=()=>{if(confirm('Discard the current draft and start a new post?')){ed.innerHTML='';['title','slug','desc','cover'].forEach(i=>$('#'+i).value='');persist();stats()}};
$('#bImport').onclick=()=>$('#fileIn').click();
$('#fileIn').onchange=async e=>{const f=e.target.files[0];if(!f)return;const t=await f.text();const m=t.match(/<body[^>]*>([\s\S]*)<\/body>/i);ed.innerHTML=m?m[1]:t;const ti=t.match(/<title>([\s\S]*?)<\/title>/i);if(ti)$('#title').value=ti[1];changed();toast('Imported')};
$('#bTheme').onclick=()=>{const d=document.documentElement.dataset.theme==='dark';document.documentElement.dataset.theme=d?'':'dark';localStorage.theme=d?'light':'dark'};
$('#bFull').onclick=()=>document.body.classList.toggle('full');
$('#title').oninput=()=>{const s=$('#slug');if(!s.dataset.m)s.value=$('#title').value.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');changed()};
$('#slug').oninput=e=>{e.target.dataset.m=1;changed()};['desc','cover'].forEach(i=>$('#'+i).oninput=changed);

/* ---------- editor events ---------- */
ed.addEventListener('input',changed);
document.addEventListener('selectionchange',()=>{save();syncTb()});
ed.addEventListener('keydown',e=>{
 if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();A.link()}
 if((e.ctrlKey||e.metaKey)&&e.key==='s'){e.preventDefault();persist();toast('Draft saved')}
 if(e.key==='Tab'&&!e.shiftKey&&!cell()){e.preventDefault();exec('insertText','\u00a0\u00a0\u00a0\u00a0')}});
ed.addEventListener('click',e=>{ed.querySelectorAll('img.sel').forEach(i=>i.classList.remove('sel'));if(e.target.tagName==='IMG')e.target.classList.add('sel')});
ed.addEventListener('keydown',e=>{const i=ed.querySelector('img.sel');if(i&&(e.key==='Delete'||e.key==='Backspace')){e.preventDefault();(i.closest('figure')||i).remove();changed()}});
async function files(fl){for(const f of fl)if(f.type.startsWith('image/')){const s=await readFile(f);html(`<img src="${s}" alt="" style="max-width:100%">`)}}
ed.addEventListener('paste',e=>{const f=e.clipboardData.files;if(f.length){e.preventDefault();files(f)}});
ed.addEventListener('drop',e=>{if(e.dataTransfer.files.length){e.preventDefault();files(e.dataTransfer.files)}});
ed.addEventListener('change',()=>changed());
code.addEventListener('keydown',e=>{if(e.key==='Tab'){e.preventDefault();document.execCommand('insertText',false,'  ')}});
addEventListener('beforeunload',persist);
load();
})();
