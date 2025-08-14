
import products from '../data/products.json';

export default function Page(){
  const handleBuy = async (priceEnv) => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceEnv })
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert(data.error || 'Checkout failed');
  };

  return (
    <main>
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1 style={{color:'#22d3ee'}}>AI Prompt Store</h1>
        <div style={{color:'#94a3b8'}}>Next.js App Router • Stripe Checkout</div>
      </header>

      <p style={{marginTop:8, color:'#9aa4b2'}}>Three curated AI prompt tiers. Pay once, get instant confirmation.</p>

      <section style={{marginTop:20, display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px,1fr))', gap:'1rem'}}>
        {products.map((p) => (
          <div key={p.id} style={{border:'1px solid #1e293b', borderRadius:12, padding:'1rem', background:'#0f172a'}}>
            <h2 style={{color:'#f0f9ff'}}>{p.name}</h2>
            <p style={{color:'#94a3b8'}}>{p.description}</p>
            <div style={{marginTop:8, fontWeight:'bold', color:'#22d3ee'}}>{p.price}</div>
            <button onClick={() => handleBuy(p.priceEnv)} style={{marginTop:12, background:'#22d3ee', color:'#0f172a', border:'none', borderRadius:6, padding:'0.5rem 1rem', cursor:'pointer'}}>
              Buy Now
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}
