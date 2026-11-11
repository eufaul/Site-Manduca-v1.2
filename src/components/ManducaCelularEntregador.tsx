import React from "react";

/**
 * Mockup animado — 1 celular flutuando (Manduca — App do Entregador)
 * - Mesma estrutura de palco, brush, sombra, chassi de iPhone realista e animação CSS (transform/opacity)
 * - Sem JS de animação; respeita prefers-reduced-motion
 * - Palco com proporção fixa: escala inteira no mobile, nunca estoura as laterais
 */
const SCREEN_IMG = "/assets/aistudio/Captura_de_tela_2026-11-05_185808_8792bffc.png";

const PHONE = {
  key: "entregador-unico",
  left: "17%",
  top: "2.2%",
  width: "66%",
  w: 447,
  h: 907,
  delay: "-1.5s",
  z: 1,
  alt: "App do Entregador Manduca com rota multi-paradas otimizada no Google Maps, Waze e WhatsApp",
};

const SHADOW = {
  left: "23%",
  top: "93%",
  width: "54%",
  height: "4.8%",
  delay: "-1.5s",
};

const css = `
.mdcent-stage{position:relative;width:100%;max-width:560px;margin:0 auto;aspect-ratio:640/1040}
.mdcent-brush{position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(ellipse 58% 48% at 50% 48%,
    rgba(21,24,38,.22) 0%,rgba(21,24,38,.12) 40%,rgba(21,24,38,.04) 72%,rgba(21,24,38,0) 100%)}
.mdcent-shadow{position:absolute;pointer-events:none;
  background:radial-gradient(closest-side,rgba(11,13,20,.42),rgba(11,13,20,.16) 55%,rgba(11,13,20,0));
  animation:mdcent-shadow 3s cubic-bezier(.37,0,.63,1) infinite alternate;will-change:transform,opacity}
.mdcent-phone{position:absolute;height:auto;display:block;user-select:none;-webkit-user-drag:none;
  animation:mdcent-float 3s cubic-bezier(.37,0,.63,1) infinite alternate;will-change:transform}
.mdcent-chassis{
  position:relative;
  width:100%;
  border-radius:13.5% / 6.4%;
  padding:3.2%;
  background:linear-gradient(145deg,#3a3f4d 0%,#181b24 38%,#0f1118 70%,#2c313d 100%);
  box-shadow:
    inset 0 0 0 1.5px rgba(255,255,255,.22),
    0 22px 44px -12px rgba(11,13,20,.45);
}
.mdcent-screen{
  position:relative;
  width:100%;
  border-radius:11.2% / 5.3%;
  overflow:hidden;
  background:#020618;
}
.mdcent-statusbar{
  position:relative;
  width:100%;
  background:#020618;
  padding:4.2% 7.5% 2%;
  display:flex;
  align-items:center;
  justify-content:space-between;
  color:#ffffff;
  font-family:-apple-system,BlinkMacSystemFont,"Plus Jakarta Sans",sans-serif;
  font-weight:600;
  font-size:clamp(9px,1.8vw,12px);
  letter-spacing:-0.01em;
  pointer-events:none;
}
.mdcent-island{
  position:absolute;
  left:50%;
  top:52%;
  transform:translate(-50%,-50%);
  width:29%;
  height:58%;
  background:#000000;
  border-radius:999px;
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.08);
  display:flex;
  align-items:center;
  justify-content:flex-end;
  padding-right:3%;
}
.mdcent-island::after{
  content:"";
  width:22%;
  aspect-ratio:1/1;
  border-radius:999px;
  background:radial-gradient(circle at 35% 35%,#25355a 0%,#0d1322 65%,#05070c 100%);
}
.mdcent-homebar{
  width:100%;
  background:#0f172a;
  padding:2.4% 0 2.8%;
  display:flex;
  justify-content:center;
  align-items:center;
}
.mdcent-homepill{
  width:36%;
  height:4px;
  border-radius:999px;
  background:rgba(255,255,255,.85);
}
@keyframes mdcent-float{from{transform:translate3d(0,1.4%,0)}to{transform:translate3d(0,-1.4%,0)}}
@keyframes mdcent-shadow{from{transform:scale(1.08);opacity:1}to{transform:scale(.9);opacity:.55}}
@media (prefers-reduced-motion:reduce){.mdcent-phone,.mdcent-shadow{animation:none}}
`;

export default function ManducaCelularEntregador() {
  const frac = parseFloat(PHONE.width) / 100;

  return (
    <div className="mdcent-stage">
      <style>{css}</style>
      <div className="mdcent-brush" />
      <div
        className="mdcent-shadow"
        style={{
          left: SHADOW.left,
          top: SHADOW.top,
          width: SHADOW.width,
          height: SHADOW.height,
          animationDelay: SHADOW.delay,
        }}
      />
      <div
        className="mdcent-phone"
        style={{
          left: PHONE.left,
          top: PHONE.top,
          width: PHONE.width,
          zIndex: PHONE.z,
          animationDelay: PHONE.delay,
        }}
      >
        <div className="mdcent-chassis">
          <div className="mdcent-screen">
            <div className="mdcent-statusbar" aria-hidden="true">
              <span>9:41</span>
              <div className="mdcent-island" />
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <svg width="13" height="9" viewBox="0 0 13 9" fill="currentColor">
                  <rect x="0" y="6" width="2" height="3" rx="0.6" />
                  <rect x="3.2" y="4.2" width="2" height="4.8" rx="0.6" />
                  <rect x="6.4" y="2.2" width="2" height="6.8" rx="0.6" />
                  <rect x="9.6" y="0" width="2" height="9" rx="0.6" />
                </svg>
                <svg width="18" height="9" viewBox="0 0 18 9" fill="none">
                  <rect x="0.5" y="0.75" width="14" height="7.5" rx="2" stroke="currentColor" strokeOpacity="0.85" />
                  <rect x="2" y="2.25" width="11" height="4.5" rx="1" fill="currentColor" />
                  <path d="M16 3V6C16.8 5.7 16.8 3.3 16 3Z" fill="currentColor" fillOpacity="0.75" />
                </svg>
              </span>
            </div>

            <img
              src={SCREEN_IMG}
              sizes={`min(calc(100vw * ${frac}), ${Math.round(640 * frac)}px)`}
              width={PHONE.w}
              height={PHONE.h}
              alt={PHONE.alt}
              decoding="async"
              draggable={false}
              style={{ width: "100%", height: "auto", display: "block" }}
            />

            <div className="mdcent-homebar" aria-hidden="true">
              <div className="mdcent-homepill" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
