import React from "react";

/**
 * Mockup animado (3 celulares flutuando) — Manduca
 * - 3 imagens WebP com fundo transparente + animação CSS (transform/opacity)
 * - Zero JS de animação, roda no compositor da GPU
 * - Respeita prefers-reduced-motion
 */

type Phone = {
  key: "esquerda" | "centro" | "direita";
  src: string;
  src1x: string;
  left: string;
  top: string;
  width: string;
  w: number; // largura real da imagem 2x
  h: number; // altura real da imagem 2x
  delay: string;
  alt: string;
};

const PHONES: Phone[] = [
  {
    key: "esquerda",
    src: "/assets/aistudio/manduca-celular-esquerda_a9b9fcc1.webp",
    src1x: "/assets/aistudio/manduca-celular-esquerda-1x_0367881f.webp",
    left: "14.306%",
    top: "15.222%",
    width: "27.5%",
    w: 792,
    h: 1260,
    delay: "-3.5s",
    alt: "Montador de marmita com tamanhos P, M e G no cardápio digital Manduca",
  },
  {
    key: "direita",
    src: "/assets/aistudio/manduca-celular-direita_16d77272.webp",
    src1x: "/assets/aistudio/manduca-celular-direita-1x_68e49b14.webp",
    left: "58.194%",
    top: "15.222%",
    width: "27.5%",
    w: 792,
    h: 1260,
    delay: "-5.5s",
    alt: "Detalhe de produto com observação e botão adicionar no cardápio digital Manduca",
  },
  {
    key: "centro",
    src: "/assets/aistudio/manduca-celular-centro_82c073f2.webp",
    src1x: "/assets/aistudio/manduca-celular-centro-1x_c484341b.webp",
    left: "38.403%",
    top: "9.611%",
    width: "23.194%",
    w: 668,
    h: 1334,
    delay: "-1.5s",
    alt: "Cardápio digital Manduca do restaurante Frango Real",
  },
];

const SHADOWS = [
  { left: "22.708%", top: "83.311%", width: "20.139%", height: "5.156%", delay: "-3.5s" },
  { left: "57.153%", top: "83.311%", width: "20.139%", height: "5.156%", delay: "-5.5s" },
  { left: "38.542%", top: "84.167%", width: "22.917%", height: "5.889%", delay: "-1.5s" },
];

const css = `
.mdc-wrap{width:100%;position:relative;overflow:hidden}
.mdc-stage{position:relative;width:140%;max-width:none;margin-left:-20%;margin-top:-6%;margin-bottom:-4%;aspect-ratio:1440/900}
@media (min-width:1024px){
  .mdc-wrap{overflow:visible}
  .mdc-stage{width:152%;margin-left:-26%;margin-top:-8%;margin-bottom:-6%}
}
.mdc-brush{position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(ellipse 45.1% 44.8% at 50% 52.2%,
    rgba(21,24,38,.34) 0%,rgba(21,24,38,.20) 35%,rgba(21,24,38,.06) 70%,rgba(21,24,38,0) 100%)}
.mdc-shadow{position:absolute;pointer-events:none;
  background:radial-gradient(closest-side,rgba(11,13,20,.45),rgba(11,13,20,.18) 55%,rgba(11,13,20,0));
  animation:mdc-shadow 3s cubic-bezier(.37,0,.63,1) infinite alternate;will-change:transform,opacity}
.mdc-phone{position:absolute;height:auto;display:block;user-select:none;-webkit-user-drag:none;
  animation:mdc-float 3s cubic-bezier(.37,0,.63,1) infinite alternate;will-change:transform}
@keyframes mdc-float{from{transform:translate3d(0,1.6%,0)}to{transform:translate3d(0,-1.6%,0)}}
@keyframes mdc-shadow{from{transform:scale(1.09);opacity:1}to{transform:scale(.91);opacity:.56}}
@media (prefers-reduced-motion:reduce){.mdc-phone,.mdc-shadow{animation:none}}
`;

export default function ManducaPhoneMockup() {
  return (
    <div className="mdc-wrap">
      <style>{css}</style>
      <div className="mdc-stage">
        <div className="mdc-brush" />
        {SHADOWS.map((s, i) => (
          <div key={i} className="mdc-shadow"
            style={{ left: s.left, top: s.top, width: s.width, height: s.height, animationDelay: s.delay }} />
        ))}
        {PHONES.map((p) => (
          <img
            key={p.key}
            className="mdc-phone"
            src={p.src}
            srcSet={`${p.src1x} ${p.w / 2}w, ${p.src} ${p.w}w`}
            sizes={`(max-width:640px) calc(140vw * ${parseFloat(p.width) / 100}), min(calc(100vw * ${parseFloat(p.width) / 100}), ${Math.round(960 * parseFloat(p.width) / 100)}px)`}
            width={p.w / 2}
            height={p.h / 2}
            alt={p.alt}
            decoding="async"
            draggable={false}
            style={{ left: p.left, top: p.top, width: p.width, animationDelay: p.delay }}
          />
        ))}
      </div>
    </div>
  );
}
