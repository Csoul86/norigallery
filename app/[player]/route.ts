import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest, { params }: { params: Promise<{ player: string }> }) {
  const { player } = await params;
  const body = await request.json();

  const { ids, time } = body;

  if (!player || !Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const dateStr = new Date(time * 1000).toLocaleString('en-US', {
    month: 'numeric', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', second: '2-digit'
  });

  let cardsHTML = '';
  for (const id of ids) {
    const imageUrl = `https://tr.rbxcdn.com/180DAY-${id}/420/420/Image/Png/noFilter`;
    cardsHTML += `
      <div class="card">
        <div class="img-wrap">
          <img src="\( {imageUrl}" alt=" \){id}" loading="lazy">
        </div>
        <div class="card-footer">
          <span class="id">${id}</span>
          <button onclick="copyId('${id}', this)">COPY</button>
        </div>
      </div>`;
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${player} — Sticker Gallery</title>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    body{background:#080a0f;color:#e8eaf0;font-family:'Syne',sans-serif;min-height:100vh}
    .root{min-height:100vh;padding:0 0 60px;position:relative;overflow:hidden}
    header{position:relative;z-index:1;display:flex;align-items:center;gap:20px;padding:36px 40px 28px;border-bottom:1px solid rgba(255,255,255,0.06);background:linear-gradient(180deg,rgba(255,255,255,0.03) 0%,transparent 100%)}
    .badge{font-size:10px;font-weight:800;letter-spacing:0.2em;color:#080a0f;background:#c8ff00;padding:4px 10px;border-radius:4px;flex-shrink:0}
    .meta{flex:1}
    h1{font-size:clamp(20px,3vw,32px);font-weight:800;letter-spacing:-0.02em;color:#fff;line-height:1}
    .date{font-family:'DM Mono',monospace;font-size:11px;color:rgba(255,255,255,0.3);margin-top:4px;display:block}
    .count{font-family:'DM Mono',monospace;font-size:11px;color:#c8ff00;background:rgba(200,255,0,0.08);border:1px solid rgba(200,255,0,0.2);padding:6px 14px;border-radius:20px;flex-shrink:0}
    .grid{position:relative;z-index:1;display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px;padding:36px 40px}
    .card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:14px;overflow:hidden;animation:fadeUp 0.4s ease both;transition:border-color 0.2s,transform 0.2s}
    .card:hover{border-color:rgba(200,255,0,0.3);transform:translateY(-3px)}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    .img-wrap{aspect-ratio:1;background:rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;overflow:hidden}
    .img-wrap img{width:100%;height:100%;object-fit:contain;padding:10px;transition:transform 0.3s}
    .card:hover .img-wrap img{transform:scale(1.06)}
    .card-footer{padding:10px 12px;display:flex;align-items:center;justify-content:space-between;gap:8px;border-top:1px solid rgba(255,255,255,0.05)}
    .id{font-family:'DM Mono',monospace;font-size:10px;color:rgba(255,255,255,0.35);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1}
    button{font-family:'Syne',sans-serif;font-size:9px;font-weight:700;letter-spacing:0.1em;color:#080a0f;background:#c8ff00;border:none;border-radius:6px;padding:4px 9px;cursor:pointer;transition:background 0.15s,transform 0.1s;flex-shrink:0}
    button:hover{background:#d4ff33;transform:scale(1.05)}
    button.copied{background:#00ff88}
    footer{position:relative;z-index:1;text-align:center;font-family:'DM Mono',monospace;font-size:11px;color:rgba(255,255,255,0.15);padding-top:20px}
    @media(max-width:600px){header{padding:24px 20px;flex-wrap:wrap}.grid{padding:24px 20px;gap:12px;grid-template-columns:repeat(auto-fill,minmax(140px,1fr))}}
  </style>
</head>
<body>
  <div class="root">
    <header>
      <div class="badge">Nori</div>
      <div class="meta">
        <h1>${player}</h1>
        <span class="date">${dateStr}</span>
      </div>
      <div class="count">${ids.length} stickers</div>
    </header>
    <div class="grid">
      ${cardsHTML}
    </div>
    <footer>Nori Sticker Gallery</footer>
  </div>
  <script>
    function copyId(id, btn) {
      navigator.clipboard.writeText(id);
      btn.textContent = '✓';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'COPY'; btn.classList.remove('copied'); }, 1200);
    }
  </script>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
    }
