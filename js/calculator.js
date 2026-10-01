(() => {
  const WALKWAY_INCLUDED_FEET = 30; // Change this number to adjust the included walkway footage.
  const recipient = String(window.ILLUMINATED_CONFIG?.formRecipient || 'illuminatedforms@neuronaut.live');
  const apiBase = String(window.ILLUMINATED_CONFIG?.leadsApiBaseUrl || '').replace(/\/+$/, '');
  const state = { roofline: 0, peak: 0, trunk: 0, tree: 0, wreath: 0, walkway: 0, window: 0, shrub: 0 };
  const items = { roofline:{label:'Extra roofline',unit:70,increment:10,suffix:' ft'},peak:{label:'Simple peak',unit:95,increment:1,suffix:''},trunk:{label:'Tree trunk',unit:95,increment:1,suffix:''},tree:{label:'Tree with limbs',unit:195,increment:1,suffix:''},wreath:{label:'36-inch wreath',unit:95,increment:1,suffix:''},walkway:{label:'Walkway lighting',unit:95,increment:1,suffix:''},window:{label:'Lit window',unit:45,increment:1,suffix:''},shrub:{label:'Shrub accent',unit:65,increment:1,suffix:''} };
  const money = n => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
  const packageChoice = () => document.querySelector('input[name="package"]:checked');
  const colorChoice = () => document.querySelector('input[name="color"]:checked').value;
  function summary() {
    const pkg=packageChoice(); const extras=Object.entries(state).filter(([,n])=>n>0);
    const extrasTotal=extras.reduce((sum,[key,n])=>sum+(n/items[key].increment)*items[key].unit,0);
    return { pkg, extras, total:Number(pkg.value)+extrasTotal, color:colorChoice() };
  }
  function render() {
    const {pkg,extras,total,color}=summary();
    document.querySelector('#package-name').textContent=pkg.dataset.label;
    document.querySelector('#package-price').textContent=money(Number(pkg.value));
    document.querySelector('#color-name').textContent=color;
    document.querySelector('#total').textContent=money(total);
    document.querySelector('#addon-lines').innerHTML=extras.length?extras.map(([key,n])=>'<div><span>'+items[key].label+' <small>'+(items[key].suffix? n+items[key].suffix:'× '+n)+'</small></span><b>'+money((n/items[key].increment)*items[key].unit)+'</b></div>').join(''):'<p>No add-ons yet.</p>';
    document.querySelectorAll('[data-output]').forEach(o=>{const key=o.dataset.output;o.textContent=state[key]+items[key].suffix;});
    document.querySelectorAll('.package-option').forEach(el=>el.classList.toggle('is-selected',el.querySelector('input').checked));
    document.querySelectorAll('[data-walkway-feet]').forEach(el=>el.textContent=WALKWAY_INCLUDED_FEET);
    document.querySelector('#walkway-note').textContent='Flat charge · includes up to '+WALKWAY_INCLUDED_FEET+' ft';
  }
  document.querySelectorAll('[data-change]').forEach(btn=>btn.addEventListener('click',()=>{const key=btn.dataset.change;state[key]=Math.max(0,state[key]+Number(btn.dataset.delta));render();}));
  document.querySelectorAll('input[name="package"],input[name="color"]').forEach(input=>input.addEventListener('change',render));
  const dialog=document.querySelector('#request-dialog'); const requestForm=document.querySelector('#estimate-request-form'); const msg=document.querySelector('#request-message');
  document.querySelector('#continue').addEventListener('click',()=>{const x=summary(); const selection=[x.pkg.dataset.label+' ('+money(Number(x.pkg.value))+')',x.color,...x.extras.map(([key,n])=>items[key].label+': '+(items[key].suffix?n+items[key].suffix:n))].join('; '); requestForm.querySelector('#selection-summary').value=selection; dialog.showModal();});
  document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  requestForm.addEventListener('submit',async e=>{e.preventDefault();if(!requestForm.reportValidity())return;const data=new FormData(requestForm);const x=summary();const payload={name:String(data.get('name')).trim(),phone:String(data.get('phone')).trim(),email:String(data.get('email')).trim(),address:String(data.get('address')).trim(),service:'Holiday lighting calculator estimate',timing:'Calculator request',contactMethod:'Email',notes:'Calculator selection: '+String(data.get('selection-summary'))+'; Customer notes: '+String(data.get('notes')||'').trim(),contactConsent:true,company:'',notificationEmail:recipient,calculatorEstimate:money(x.total)};msg.textContent='Sending your request…';msg.className='request-message';try{if(!apiBase)throw new Error('No form endpoint');const response=await fetch(apiBase+'/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});if(!response.ok)throw new Error('Request failed');msg.textContent='Thank you — your estimate request was received.';msg.className='request-message is-success';requestForm.reset();}catch(error){const subject=encodeURIComponent('Holiday lighting calculator estimate');const body=encodeURIComponent('Please send me an estimate.\n\n'+payload.notes+'\n\nName: '+payload.name+'\nPhone: '+payload.phone+'\nEmail: '+payload.email+'\nAddress: '+payload.address);msg.innerHTML='We could not submit online. <a href="mailto:'+recipient+'?subject='+subject+'&body='+body+'">Email this estimate instead</a>.';msg.className='request-message is-error';}});
  render();
})();