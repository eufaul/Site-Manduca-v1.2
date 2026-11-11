import React from "react";

/**
 * Mockup animado — 2 celulares flutuando (Manduca)
 * - 2 imagens WebP transparentes (1x e 2x) + animação só com transform/opacity
 * - Sem JS de animação; respeita prefers-reduced-motion
 * - Palco com proporção fixa: escala inteira no mobile, nunca estoura as laterais
 *
 * Troque IMG_BASE pela URL onde as imagens estão hospedadas (sem barra no final).
 */
const IMG_MAP: Record<string, { src: string; src1x: string }> = {
  lista: {
    src: "/assets/aistudio/manduca-celular-lista_ad4c8206.webp",
    src1x: "/assets/aistudio/manduca-celular-lista-1x_95c3402e.webp",
  },
  marmita: {
    src: "/assets/aistudio/manduca-celular-marmita_4951ad72.webp",
    src1x: "/assets/aistudio/manduca-celular-marmita-1x_b8c55386.webp",
  },
};

const PHONES = [
  { key: "lista", left: "11.86%", top: "19.32%", width: "38.27%", w: 748, h: 1362, delay: "-1.5s", z: 1,
    alt: "Cardápio digital Manduca com marmitas, pratos executivos, bebidas e sobremesas" },
  { key: "marmita", left: "41.51%", top: "6.82%", width: "46.51%", w: 800, h: 1380, delay: "-4.5s", z: 2,
    alt: "Montador de marmita do Manduca com tamanhos P, M e G e escolha de proteínas" },
];

const SHADOWS = [
  { left: "16.86%", top: "84.6%", width: "32.56%", height: "5%", delay: "-1.5s" },
  { left: "43.02%", top: "83.6%", width: "34.88%", height: "5.45%", delay: "-4.5s" },
];

const css = `
.mdc2-stage{position:relative;width:100%;max-width:640px;margin:0 auto;aspect-ratio:860/880;overflow:hidden}
.mdc2-brush{position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(ellipse 50% 45.5% at 50% 53.4%,
    rgba(21,24,38,.22) 0%,rgba(21,24,38,.12) 40%,rgba(21,24,38,.04) 72%,rgba(21,24,38,0) 100%)}
.mdc2-shadow{position:absolute;pointer-events:none;
  background:radial-gradient(closest-side,rgba(11,13,20,.42),rgba(11,13,20,.16) 55%,rgba(11,13,20,0));
  animation:mdc2-shadow 3s cubic-bezier(.37,0,.63,1) infinite alternate;will-change:transform,opacity}
.mdc2-phone{position:absolute;height:auto;display:block;user-select:none;-webkit-user-drag:none;
  animation:mdc2-float 3s cubic-bezier(.37,0,.63,1) infinite alternate;will-change:transform}
@keyframes mdc2-float{from{transform:translate3d(0,1.4%,0)}to{transform:translate3d(0,-1.4%,0)}}
@keyframes mdc2-shadow{from{transform:scale(1.08);opacity:1}to{transform:scale(.9);opacity:.55}}
@media (prefers-reduced-motion:reduce){.mdc2-phone,.mdc2-shadow{animation:none}}
`;

export default function ManducaDoisCelulares() {
  return (
    <div className="mdc2-stage">
      <style>{css}</style>
      <div className="mdc2-brush" />
      {SHADOWS.map((s, i) => (
        <div key={i} className="mdc2-shadow"
          style={{ left: s.left, top: s.top, width: s.width, height: s.height, animationDelay: s.delay }} />
      ))}
      {PHONES.map((p) => {
        const frac = parseFloat(p.width) / 100;
        const img = IMG_MAP[p.key];
        return (
          <img
            key={p.key}
            className="mdc2-phone"
            src={img.src}
            srcSet={`${img.src1x} ${p.w / 2}w, ${img.src} ${p.w}w`}
            sizes={`min(calc(100vw * ${frac}), ${Math.round(640 * frac)}px)`}
            width={p.w / 2}
            height={p.h / 2}
            alt={p.alt}
            decoding="async"
            draggable={false}
            style={{ left: p.left, top: p.top, width: p.width, zIndex: p.z, animationDelay: p.delay }}
          />
        );
      })}
    </div>
  );
}
