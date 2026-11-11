import React from "react";

/**
 * Mockup animado — 1 celular flutuando (Manduca — Montador de Marmita)
 * - Mesma estrutura de palco, brush, sombra e animação CSS (transform/opacity) de ManducaDoisCelulares
 * - Sem JS de animação; respeita prefers-reduced-motion
 * - Palco com proporção fixa: escala inteira no mobile, nunca estoura as laterais
 */
const SCREEN_IMG = "/assets/aistudio/Captura_de_tela_2026-11-05_000803_29a31ac9.png";

const PHONE = {
  key: "marmita-unica",
  left: "28%",
  top: "3.5%",
  width: "44%",
  w: 446,
  h: 909,
  delay: "-1.5s",
  z: 1,
  alt: "Montador de marmita do Manduca com escolha de proteínas e adicionais pagos",
};

const SHADOW = {
  left: "32.56%",
  top: "89%",
  width: "34.88%",
  height: "5%",
  delay: "-1.5s",
};

const css = `
.mdc1-stage{position:relative;width:100%;max-width:640px;margin:0 auto;aspect-ratio:860/980}
.mdc1-brush{position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(ellipse 50% 45.5% at 50% 50%,
    rgba(21,24,38,.22) 0%,rgba(21,24,38,.12) 40%,rgba(21,24,38,.04) 72%,rgba(21,24,38,0) 100%)}
.mdc1-shadow{position:absolute;pointer-events:none;
  background:radial-gradient(closest-side,rgba(11,13,20,.42),rgba(11,13,20,.16) 55%,rgba(11,13,20,0));
  animation:mdc1-shadow 3s cubic-bezier(.37,0,.63,1) infinite alternate;will-change:transform,opacity}
.mdc1-phone{position:absolute;height:auto;display:block;user-select:none;-webkit-user-drag:none;
  animation:mdc1-float 3s cubic-bezier(.37,0,.63,1) infinite alternate;will-change:transform}
.mdc1-chassis{
  position:relative;
  width:100%;
  border-radius:13.5% / 6.6%;
  padding:3.2%;
  background:linear-gradient(145deg,#3a3f4d 0%,#181b24 38%,#0f1118 70%,#2c313d 100%);
  box-shadow:
    inset 0 0 0 1.5px rgba(255,255,255,.22),
    0 22px 44px -12px rgba(11,13,20,.45);
}
.mdc1-screen{
  position:relative;
  width:100%;
  border-radius:11.2% / 5.5%;
  overflow:hidden;
  background:#ffffff;
}
.mdc1-statusbar{
  position:absolute;
  top:0;
  left:0;
  right:0;
  height:5.2%;
  z-index:3;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 7.5%;
  color:#ffffff;
  font-family:-apple-system,BlinkMacSystemFont,"Plus Jakarta Sans",sans-serif;
  font-weight:600;
  font-size:clamp(9px,1.8vw,12px);
  letter-spacing:-0.01em;
  pointer-events:none;
}
.mdc1-island{
  position:absolute;
  left:50%;
  top:22%;
  transform:translateX(-50%);
  width:29%;
  height:58%;
  background:#07080c;
  border-radius:999px;
  display:flex;
  align-items:center;
  justify-content:flex-end;
  padding-right:3%;
}
.mdc1-island::after{
  content:"";
  width:22%;
  aspect-ratio:1/1;
  border-radius:999px;
  background:radial-gradient(circle at 35% 35%,#25355a 0%,#0d1322 65%,#05070c 100%);
}
.mdc1-homebar{
  width:100%;
  background:#ffffff;
  padding:2.2% 0 2.6%;
  display:flex;
  justify-content:center;
  align-items:center;
}
.mdc1-homepill{
  width:36%;
  height:4px;
  border-radius:999px;
  background:#171717;
}
@keyframes mdc1-float{from{transform:translate3d(0,1.4%,0)}to{transform:translate3d(0,-1.4%,0)}}
@keyframes mdc1-shadow{from{transform:scale(1.08);opacity:1}to{transform:scale(.9);opacity:.55}}
@media (prefers-reduced-motion:reduce){.mdc1-phone,.mdc1-shadow{animation:none}}
`;

export default function ManducaUmCelular() {
  const frac = parseFloat(PHONE.width) / 100;

  return (
    <div className="mdc1-stage">
      <style>{css}</style>
      <div className="mdc1-brush" />
      <div
        className="mdc1-shadow"
        style={{
          left: SHADOW.left,
          top: SHADOW.top,
          width: SHADOW.width,
          height: SHADOW.height,
          animationDelay: SHADOW.delay,
        }}
      />
      <div
        className="mdc1-phone"
        style={{
          left: PHONE.left,
          top: PHONE.top,
          width: PHONE.width,
          zIndex: PHONE.z,
          animationDelay: PHONE.delay,
        }}
      >
        <div className="mdc1-chassis">
          <div className="mdc1-screen">
            <div className="mdc1-statusbar" aria-hidden="true">
              <span>9:41</span>
              <div className="mdc1-island" />
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

            <div className="mdc1-homebar" aria-hidden="true">
              <div className="mdc1-homepill" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
