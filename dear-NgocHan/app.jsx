import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const letter = `Hân thân mến,

Tặng Hân món quà nhỏ do chính tay bun tỉ mẩn làm. Thấy Hân nhận nó bun rất vui, nhưng vì sợ lúc đưa không diễn tả hết được ý nghĩa nên bun viết vài dòng này gửi Hân.

Hân thấy đấy, trung tâm của món đồ này là hình ảnh "cô gái cưỡi cá voi" giữa đại dương. Chú cá voi xanh tượng trưng cho sự mạnh mẽ, vững chãi và bình yên. Còn cô gái nhỏ bé nhưng đầy dũng cảm, tự do tự tại đó, trong mắt bun, chính là Hân.

Xung quanh là vô vàn những chú cá nhỏ rực rỡ sắc màu, giống như những niềm vui, những điều may mắn và những người yêu thương sẽ luôn vây quanh cuộc sống của Hân.

bun mong rằng, dù biển đời ngoài kia có rộng lớn đến đâu, Hân vẫn luôn giữ được sự tự do và nụ cười. Hãy cứ dũng cảm tiến về phía trước, vì sẽ luôn có sức mạnh nâng đỡ Hân.

Chúc Hân luôn bình an và rực rỡ nhé!`;

const fishColors = [
  "#ff8a3d",
  "#ffd84d",
  "#48d597",
  "#4fd5ff",
  "#4f8dff",
  "#9d6bff",
  "#ff5da8",
  "#ff5d5d",
  "#32d3c6",
  "#c15cff",
  "#ffae42",
  "#95e044",
];

const FISH_COUNT = 28;
const BUBBLE_COUNT = 44;

function runSelfTests() {
  const tests = [
    {
      name: "letter is addressed to Han",
      pass:
        letter.includes("Hân thân mến") &&
        letter.includes("Chúc Hân luôn bình an"),
    },
    {
      name: "letter keeps the whale and ocean theme",
      pass:
        letter.includes("cô gái cưỡi cá voi") &&
        letter.includes("cá voi xanh") &&
        letter.includes("đại dương"),
    },
    {
      name: "3d fish scene is configured",
      pass: FISH_COUNT >= 20 && BUBBLE_COUNT >= 40 && fishColors.length >= 10,
    },
  ];

  tests.forEach((test) => {
    if (!test.pass) throw new Error(`Self-test failed: ${test.name}`);
  });
}

runSelfTests();

function BodyScales() {
  return (
    <>
      <span className="scale top front" />
      <span className="scale top back" />
      <span className="scale bottom front" />
      <span className="scale bottom back" />
    </>
  );
}

function Fish3D({ index, color }) {
  const depth = -70 - (index % 7) * 34;
  const orbitDuration = 12 + (index % 8) * 1.2;
  const orbitDelay = -index * 0.72;
  const width = 190 + (index % 6) * 24;
  const size = 0.22 + (index % 5) * 0.035;
  const yOffset = -86 + (index % 9) * 22;

  return (
    <div
      className="swim"
      style={{
        "--depth": `${depth}px`,
        "--duration": `${orbitDuration}s`,
        "--delay": `${orbitDelay}s`,
        "--orbit": `${width}px`,
        "--size": size,
        "--fish-color": color,
        "--y": `${yOffset}px`,
      }}
    >
      <div className="depth">
        <div className="rotate">
          <div className="fish-component">
            <div className="fish-shadow" />
            <div className="fish">
              <div className="fish-body">
                <div className="half left">
                  <BodyScales />
                </div>
                <div className="half right">
                  <BodyScales />
                </div>
              </div>

              <div className="fish-tail">
                <span className="tail-scale top" />
                <span className="tail-scale bottom" />
              </div>

              <div className="fish-eye" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Whale3D() {
  return (
    <div className="whale-wrap">
      <div className="whale-shadow" />
      <div className="whale-tail top" />
      <div className="whale-tail bottom" />
      <div className="whale-fin left" />
      <div className="whale-fin right" />

      <div className="whale-body-3d">
        <div className="whale-belly" />
        <div className="whale-eye" />
        <div className="whale-smile" />

        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className="whale-dot"
            style={{
              left: `${35 + ((i * 11) % 47)}%`,
              top: `${15 + ((i * 17) % 27)}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Girl3D() {
  return (
    <div className="girl-wrap">
      <div className="hair hair-main" />
      <div className="hair hair-wave-1" />
      <div className="hair hair-wave-2" />

      <div className="girl-head">
        <span className="girl-eye left" />
        <span className="girl-eye right" />
        <span className="girl-smile" />
      </div>

      <div className="girl-neck" />
      <div className="girl-body" />
      <div className="girl-arm left" />
      <div className="girl-arm right" />
      <div className="girl-skirt" />
      <div className="girl-leg left" />
      <div className="girl-leg right" />
    </div>
  );
}

function HangingMobile() {
  return (
    <div className="mobile-shadow" aria-hidden="true">
      <div className="mobile-string center" />
      <div className="mobile-string left" />
      <div className="mobile-string right" />
      <div className="mobile-ring" />
      <div className="mobile-ring inner" />
      <span className="mobile-fish one" />
      <span className="mobile-fish two" />
      <span className="mobile-fish three" />
    </div>
  );
}

function UnderSea3D() {
  const bubbles = useMemo(
    () =>
      Array.from({ length: BUBBLE_COUNT }).map((_, i) => ({
        id: i,
        left: -160 + ((i * 37) % 320),
        size: 8 + (i % 16),
        delay: -(i * 0.37),
        duration: 5 + (i % 8) * 0.62,
      })),
    []
  );

  const fish = useMemo(
    () =>
      Array.from({ length: FISH_COUNT }).map((_, i) => ({
        id: i,
        color: fishColors[i % fishColors.length],
      })),
    []
  );

  return (
    <section
      className="ocean-stage"
      aria-label="Cảnh 3D dưới biển: cô gái tóc nâu cưỡi cá voi xanh, đàn cá nhỏ bơi vòng quanh"
    >
      <HangingMobile />

      <div className="camera x">
        <div className="camera y">
          <div className="camera z">
            <div className="under-sea">
              <div className="blowing-bubbles">
                {bubbles.map((bubble) => (
                  <span
                    key={bubble.id}
                    className="bubble"
                    style={{
                      left: bubble.left,
                      width: bubble.size,
                      height: bubble.size,
                      animationDelay: `${bubble.delay}s`,
                      animationDuration: `${bubble.duration}s`,
                    }}
                  />
                ))}
              </div>

              <div className="center-subject">
                <Whale3D />
                <Girl3D />
              </div>

              <div className="swiming-fishes">
                {fish.map((item, index) => (
                  <Fish3D key={item.id} index={index} color={item.color} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Shell({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 80 70" fill="none" aria-hidden="true">
      <path
        d="M10 58C14 30 29 11 43 11C58 11 72 30 75 58H10Z"
        fill="#f7a6a9"
        stroke="#b85f6a"
        strokeWidth="2"
      />
      <path
        d="M43 13v44M27 20l16 38M59 21L43 58M16 41l27 17M70 42L43 58"
        stroke="#b85f6a"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Starfish({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 70 70" fill="none" aria-hidden="true">
      <path
        d="M35 4l7.5 21.5L65 26l-18 13 6.5 22L35 48 16.5 61 23 39 5 26l22.5-.5L35 4z"
        fill="#76cfc7"
        stroke="#317d7a"
        strokeWidth="2"
      />
      <circle cx="35" cy="31" r="2" fill="#317d7a" opacity="0.45" />
      <circle cx="27" cy="38" r="2" fill="#317d7a" opacity="0.35" />
      <circle cx="43" cy="39" r="2" fill="#317d7a" opacity="0.35" />
    </svg>
  );
}

function LetterPaper({ onClose }) {
  return (
    <motion.div
      key="open-paper"
      initial={{ opacity: 0, y: 60, rotateX: -78, scaleY: 0.2 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scaleY: 1 }}
      exit={{ opacity: 0, y: 42, rotateX: -68, scaleY: 0.3 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto max-w-[500px] origin-top rounded-sm bg-[#ead3ac] px-7 py-7 text-[#2f2116] shadow-[0_18px_35px_rgba(91,61,31,0.28)] sm:px-9 sm:py-8"
      style={{
        backgroundImage:
          "radial-gradient(circle at 14% 18%, rgba(255,255,255,0.38), transparent 18%), radial-gradient(circle at 85% 78%, rgba(122,86,44,0.12), transparent 22%), linear-gradient(90deg, rgba(117,76,36,0.13) 0 1px, transparent 1px), linear-gradient(#efdab8, #e7cca0)",
        clipPath:
          "polygon(1% 1%, 99% 0%, 98.5% 7%, 100% 14%, 98.8% 22%, 100% 31%, 98.7% 39%, 100% 48%, 98.7% 56%, 100% 66%, 98.5% 74%, 100% 84%, 98.6% 98%, 89% 99%, 77% 98.4%, 67% 100%, 56% 98.8%, 45% 100%, 35% 98.5%, 24% 100%, 12% 98.7%, 1% 99%, 2.2% 89%, 0% 80%, 1.8% 70%, 0% 60%, 1.6% 50%, 0% 41%, 1.4% 31%, 0% 22%, 1.8% 12%)",
      }}
    >
      <div className="absolute inset-0 rounded-sm shadow-[inset_0_0_28px_rgba(90,55,23,0.16)]" />

      <div className="letter-text relative whitespace-pre-line text-[17px] leading-7 sm:text-[18px] sm:leading-8">
        {letter}
      </div>

      <div className="relative mt-8 flex items-end justify-between gap-4">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-[#9f7a4a]/30 bg-white/25 px-4 py-2 text-sm font-semibold text-[#6f4b22] transition hover:bg-white/45"
        >
          Gấp thư lại
        </button>

        <p className="signature-text text-right text-xl italic leading-6 text-[#2f2116]">
          Thân gửi,<br />Bun
        </p>
      </div>
    </motion.div>
  );
}

function ClosedLetter({ onOpen }) {
  return (
    <motion.button
      key="closed-letter"
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 18, scale: 0.96 }}
      transition={{ duration: 0.45 }}
      className="group relative mx-auto block w-full max-w-[500px] rounded-sm bg-[#ead3ac] px-7 py-8 text-left text-[#3b2a1c] shadow-[0_18px_35px_rgba(91,61,31,0.28)] transition hover:-translate-y-1 hover:shadow-[0_22px_42px_rgba(91,61,31,0.33)]"
      style={{
        backgroundImage: "linear-gradient(#efdab8, #e7cca0)",
        clipPath:
          "polygon(1% 2%, 98% 0%, 100% 14%, 98% 26%, 100% 39%, 98% 52%, 100% 66%, 98% 82%, 100% 98%, 82% 99%, 67% 98%, 51% 100%, 35% 98%, 18% 100%, 0% 98%, 2% 82%, 0% 66%, 2% 52%, 0% 38%, 2% 25%, 0% 12%)",
      }}
      aria-label="Mở lá thư tặng Hân"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.42),transparent_22%),radial-gradient(circle_at_78%_82%,rgba(132,87,43,0.15),transparent_28%)]" />
      <div className="absolute inset-x-0 top-0 h-24 origin-top rounded-sm bg-[#e2c291] opacity-75 [clip-path:polygon(0_0,100%_0,50%_100%)] transition duration-500 group-hover:rotate-x-12" />

      <div className="relative flex min-h-[190px] flex-col items-center justify-center gap-4 border border-[#9f7a4a]/20 bg-white/10 px-4 py-8 text-center">
        <span className="rounded-full bg-[#d66b7d] px-4 py-2 text-sm font-bold text-white shadow-md">
          Bun gửi Hân
        </span>

        <h2 className="text-3xl font-bold">Có một lá thư nhỏ</h2>

        <p className="max-w-xs text-sm leading-6 text-[#6f4b22]">
          Nhấn vào tờ giấy để mở lời chúc, giống như mở món quà nhỏ giữa đại dương.
        </p>

        <span className="mt-1 rounded-full border border-[#9f7a4a]/25 bg-white/25 px-4 py-2 text-sm font-semibold transition group-hover:bg-white/45">
          Mở thư
        </span>
      </div>
    </motion.button>
  );
}

function LetterSection() {
  const [opened, setOpened] = useState(false);

  return (
    <section className="relative mx-auto -mt-1 w-full max-w-[560px] px-4 pb-14">
      <AnimatePresence mode="wait">
        {opened ? (
          <LetterPaper onClose={() => setOpened(false)} />
        ) : (
          <ClosedLetter onOpen={() => setOpened(true)} />
        )}
      </AnimatePresence>

      <Starfish className="pointer-events-none absolute -bottom-1 left-1 h-14 w-14 sm:-left-2 sm:h-16 sm:w-16" />
      <Shell className="pointer-events-none absolute -bottom-1 right-2 h-14 w-14 sm:right-0 sm:h-16 sm:w-16" />

      <svg
        className="pointer-events-none absolute bottom-5 left-20 h-7 w-7 rotate-[-18deg]"
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M18 3l3.7 10.5 11 .3-8.7 6.5 3.1 10.7L18 24.7 8.9 31l3.1-10.7-8.7-6.5 11-.3L18 3z"
          fill="#ffd37a"
          stroke="#b77738"
          strokeWidth="1.5"
        />
      </svg>
    </section>
  );
}

function SceneStyles() {
  return (
    <style>{`
      .vietnamese-font,
      .vietnamese-font * {
        font-family: "Segoe UI", "Arial", "Helvetica Neue", "Roboto", "Noto Sans", sans-serif !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
      }

      .letter-text,
      .signature-text {
        font-family: "Times New Roman", "Noto Serif", "DejaVu Serif", serif !important;
        letter-spacing: 0;
        word-spacing: 0.02em;
      }

      .letter-text {
        line-height: 1.72 !important;
      }

      .ocean-stage, .ocean-stage * { transform-style: preserve-3d; }

      .ocean-stage {
        position: relative;
        width: min(560px, 100%);
        height: 430px;
        margin: 0 auto;
        perspective: 760px;
        overflow: hidden;
      }

      .camera {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .camera.x { transform: rotateX(-22deg); }
      .camera.y { animation: cameraDrift 18s ease-in-out infinite; }
      .camera.z { transform: translateZ(0); }

      .under-sea {
        position: relative;
        width: 1px;
        height: 1px;
        transform: translateY(34px) scale3d(0.78, 0.78, 0.78);
      }

      .center-subject {
        position: absolute;
        left: 0;
        top: 0;
        transform: translate3d(-158px, -92px, 0) rotateX(12deg);
        animation: subjectFloat 5.8s ease-in-out infinite;
      }

      .blowing-bubbles, .swiming-fishes {
        position: absolute;
        inset: 0;
      }

      .bubble {
        position: absolute;
        bottom: -260px;
        border: 1px solid rgba(15, 118, 140, 0.24);
        border-top-color: rgba(255, 255, 255, 0.86);
        border-radius: 999px;
        background: radial-gradient(circle at 32% 28%, rgba(255,255,255,.78), rgba(255,255,255,.16) 30%, rgba(14,165,190,.12) 72%);
        animation-name: bubbleRise;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }

      .swim {
        position: absolute;
        left: 0;
        top: 0;
      }

      .depth {
        position: absolute;
        transform: translateY(var(--depth));
      }

      .rotate {
        position: absolute;
        width: var(--orbit);
        height: 1px;
        transform-origin: 0 0;
        animation: rotateYOrbit var(--duration) linear infinite;
        animation-delay: var(--delay);
      }

      .fish-component {
        position: absolute;
        right: 0;
        top: var(--y);
        transform: rotateY(90deg) translateX(-90px) scale(var(--size));
      }

      .fish {
        position: absolute;
        width: 190px;
        height: 92px;
        transform-origin: 96px 46px;
        animation: fishWiggle 540ms cubic-bezier(.45,.05,.55,.95) infinite alternate;
        filter: drop-shadow(0 12px 12px rgba(13, 75, 112, .12));
      }

      .fish-body {
        position: absolute;
        inset: 0;
        transform: scale(.78, .68);
      }

      .half {
        position: absolute;
        left: 24px;
        top: 0;
        width: 180px;
        height: 100px;
        display: flex;
        flex-wrap: wrap;
      }

      .half.left { transform: translateZ(-1px); }
      .half.right { transform: scaleZ(-1) translateZ(-1px); }

      .scale {
        position: static;
        display: block;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 0 45px 90px;
        border-color: transparent transparent var(--fish-color) transparent;
        filter: brightness(1.08);
        animation: fishScaleShine 1.3s linear infinite alternate;
      }

      .scale.top.front { transform: scale(1, 1) skewX(4.5deg) rotateY(-12deg) rotateX(23deg) translate(1px, 2px); }
      .scale.top.back { transform: scale(-1, 1) skewX(4.5deg) rotateY(-12deg) rotateX(23deg) translate(1px, 2px); filter: brightness(.88); }
      .scale.bottom.front { transform: scale(1, -1) skewX(4.5deg) rotateY(-12deg) rotateX(23deg) translate(1px, 2px); filter: brightness(.96); }
      .scale.bottom.back { transform: scale(-1, -1) skewX(4.5deg) rotateY(-12deg) rotateX(23deg) translate(1px, 2px); filter: brightness(.76); }

      .fish-tail {
        position: absolute;
        top: 9px;
        left: 1px;
        transform-origin: 100% 50%;
        animation: tailWag 450ms cubic-bezier(.45,.05,.55,.95) infinite alternate;
      }

      .tail-scale {
        position: static;
        display: block;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 0 36px 35px;
        border-color: transparent transparent var(--fish-color) transparent;
      }

      .tail-scale.top { transform: scale(-1, 1); filter: brightness(.94); }
      .tail-scale.bottom { transform: scale(-1, -1); filter: brightness(.75); }

      .fish-eye {
        position: absolute;
        right: 36px;
        top: 31px;
        width: 10px;
        height: 10px;
        border-radius: 999px;
        background: #0f172a;
        box-shadow: 2px -2px 0 0 rgba(255,255,255,.78) inset;
        transform: translateZ(12px);
      }

      .fish-shadow {
        position: absolute;
        width: 260px;
        height: 130px;
        transform: translate(-68px, 118px) rotateX(90deg);
        background: radial-gradient(ellipse at center, rgba(25, 44, 84, .16) 10%, rgba(14, 71, 145, 0) 62%);
      }

      .whale-wrap {
        position: absolute;
        left: 0;
        top: 54px;
        width: 330px;
        height: 166px;
        transform: translateZ(16px);
      }

      .whale-body-3d {
        position: absolute;
        left: 20px;
        top: 34px;
        width: 255px;
        height: 118px;
        border-radius: 62% 50% 48% 58% / 54% 52% 54% 58%;
        background: radial-gradient(circle at 30% 24%, #bdf5ff 0 12%, transparent 13%), linear-gradient(145deg, #8fe8f7 0%, #3cb8e5 43%, #1168aa 100%);
        box-shadow: inset 0 -22px 0 rgba(10, 90, 154, .24), inset 24px 18px 28px rgba(255,255,255,.32), 0 25px 36px rgba(18, 94, 139, .22);
        transform: rotateZ(-2deg) rotateY(-5deg);
      }

      .whale-belly {
        position: absolute;
        left: 19px;
        bottom: 8px;
        width: 150px;
        height: 44px;
        border-radius: 50%;
        background: #e9fbff;
        transform: rotate(-8deg);
        box-shadow: 26px 13px 0 rgba(255,255,255,.78);
      }

      .whale-eye {
        position: absolute;
        left: 57px;
        top: 42px;
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: #0f172a;
        box-shadow: 2px -2px 0 rgba(255,255,255,.85) inset;
      }

      .whale-smile {
        position: absolute;
        left: 66px;
        top: 55px;
        width: 34px;
        height: 16px;
        border-bottom: 3px solid rgba(15, 67, 113, .35);
        border-radius: 50%;
      }

      .whale-dot {
        position: absolute;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: rgba(255,255,255,.48);
      }

      .whale-tail {
        position: absolute;
        right: 5px;
        width: 96px;
        height: 70px;
        background: linear-gradient(135deg, #23a2dc, #0e66ad);
        border-radius: 12% 88% 20% 80% / 22% 80% 20% 78%;
        transform-origin: left center;
        animation: whaleTail 1.8s ease-in-out infinite alternate;
      }

      .whale-tail.top { top: 39px; transform: rotate(-28deg) rotateY(15deg); }
      .whale-tail.bottom { top: 75px; transform: rotate(24deg) rotateY(-12deg); filter: brightness(.84); }

      .whale-fin {
        position: absolute;
        width: 92px;
        height: 34px;
        border-radius: 80% 8% 80% 20%;
        background: linear-gradient(135deg, #2ab0df, #0a69ad);
      }

      .whale-fin.left {
        left: 95px;
        top: 136px;
        transform: rotate(-28deg) translateZ(10px);
      }

      .whale-fin.right {
        left: 195px;
        top: 126px;
        transform: rotate(-8deg) translateZ(-22px);
        filter: brightness(.78);
        opacity: .92;
      }

      .whale-shadow {
        position: absolute;
        left: 30px;
        bottom: -14px;
        width: 245px;
        height: 64px;
        border-radius: 50%;
        background: radial-gradient(ellipse at center, rgba(20,91,132,.18), transparent 68%);
        transform: rotateX(82deg) translateZ(-50px);
      }

      .girl-wrap {
        position: absolute;
        left: 142px;
        top: 1px;
        width: 120px;
        height: 170px;
        transform: translateZ(78px) rotateX(-7deg) rotateZ(2deg);
        animation: girlFloat 4.6s ease-in-out infinite;
      }

      .girl-head {
        position: absolute;
        left: 38px;
        top: 34px;
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background: #ffd4ad;
        box-shadow: inset -5px -8px 0 rgba(228, 134, 88, .12);
        z-index: 4;
      }

      .hair {
        position: absolute;
        background: #7a3f25;
        z-index: 3;
      }

      .hair-main {
        left: 52px;
        top: 25px;
        width: 86px;
        height: 48px;
        border-radius: 55% 10% 72% 30%;
        transform: rotate(-8deg);
        box-shadow: inset 12px 8px 0 rgba(164, 91, 54, .55);
      }

      .hair-wave-1 {
        left: 76px;
        top: 14px;
        width: 78px;
        height: 34px;
        border-radius: 65% 8% 70% 30%;
        transform: rotate(12deg);
        background: #8a4a2c;
      }

      .hair-wave-2 {
        left: 29px;
        top: 25px;
        width: 43px;
        height: 40px;
        border-radius: 64% 36% 45% 55%;
        transform: rotate(-18deg);
        background: #67341f;
      }

      .girl-eye {
        position: absolute;
        top: 19px;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #1f2937;
      }

      .girl-eye.left { left: 15px; }
      .girl-eye.right { left: 29px; }

      .girl-smile {
        position: absolute;
        left: 18px;
        top: 27px;
        width: 15px;
        height: 7px;
        border-bottom: 2px solid #ef6f86;
        border-radius: 50%;
      }

      .girl-neck {
        position: absolute;
        left: 55px;
        top: 75px;
        width: 12px;
        height: 15px;
        border-radius: 8px;
        background: #ffd4ad;
        z-index: 2;
      }

      .girl-body {
        position: absolute;
        left: 41px;
        top: 86px;
        width: 42px;
        height: 54px;
        border-radius: 20px 20px 15px 15px;
        background: #fff2df;
        box-shadow: inset -7px -10px 0 rgba(230,183,143,.18);
        z-index: 2;
      }

      .girl-skirt {
        position: absolute;
        left: 34px;
        top: 123px;
        width: 58px;
        height: 30px;
        border-radius: 10px 10px 28px 28px;
        background: linear-gradient(135deg, #9bd8ff, #4cb9ee);
        z-index: 2;
      }

      .girl-arm, .girl-leg {
        position: absolute;
        border-radius: 999px;
        background: #ffd4ad;
        z-index: 1;
      }

      .girl-arm.left {
        left: 23px;
        top: 93px;
        width: 13px;
        height: 58px;
        transform: rotate(38deg);
      }

      .girl-arm.right {
        left: 81px;
        top: 94px;
        width: 13px;
        height: 63px;
        transform: rotate(-42deg);
      }

      .girl-leg.left {
        left: 40px;
        top: 145px;
        width: 14px;
        height: 62px;
        transform: rotate(35deg);
      }

      .girl-leg.right {
        left: 74px;
        top: 143px;
        width: 14px;
        height: 63px;
        transform: rotate(-61deg);
      }

      .mobile-shadow {
        position: absolute;
        left: 42px;
        top: 32px;
        width: 140px;
        height: 140px;
        opacity: .28;
        z-index: 2;
      }

      .mobile-ring {
        position: absolute;
        left: 23px;
        top: 38px;
        width: 94px;
        height: 31px;
        border: 5px solid #2b9fbd;
        border-radius: 50%;
      }

      .mobile-ring.inner {
        left: 42px;
        top: 46px;
        width: 54px;
        height: 15px;
        border-width: 3px;
      }

      .mobile-string {
        position: absolute;
        width: 2px;
        height: 56px;
        background: #2b9fbd;
        top: -4px;
      }

      .mobile-string.center { left: 70px; height: 72px; }
      .mobile-string.left { left: 41px; transform: rotate(35deg); transform-origin: top; }
      .mobile-string.right { left: 99px; transform: rotate(-35deg); transform-origin: top; }

      .mobile-fish {
        position: absolute;
        width: 28px;
        height: 12px;
        border-radius: 50%;
        background: #2b9fbd;
      }

      .mobile-fish::after {
        content: "";
        position: absolute;
        right: -7px;
        top: 2px;
        width: 0;
        height: 0;
        border-left: 8px solid #2b9fbd;
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
      }

      .mobile-fish.one { left: 15px; top: 112px; transform: rotate(-16deg); }
      .mobile-fish.two { left: 61px; top: 128px; transform: rotate(8deg); }
      .mobile-fish.three { left: 102px; top: 121px; transform: rotate(-7deg); }

      @keyframes rotateYOrbit {
        from { transform: rotateY(0deg); }
        to { transform: rotateY(360deg); }
      }

      @keyframes bubbleRise {
        from { transform: translateY(360px) translateZ(-160px); opacity: 0; }
        10% { opacity: .8; }
        to { transform: translateY(-760px) translateZ(120px); opacity: 0; }
      }

      @keyframes fishWiggle {
        from { transform: rotateY(18deg); }
        to { transform: rotateY(-18deg); }
      }

      @keyframes tailWag {
        from { transform: rotateY(28deg); }
        to { transform: rotateY(-28deg); }
      }

      @keyframes fishScaleShine {
        from { filter: brightness(.88); }
        to { filter: brightness(1.18); }
      }

      @keyframes whaleTail {
        from { margin-top: -3px; }
        to { margin-top: 4px; }
      }

      @keyframes subjectFloat {
        0%, 100% {
          transform: translate3d(-158px, -92px, 0) rotateX(12deg) translateY(0);
        }
        50% {
          transform: translate3d(-158px, -92px, 0) rotateX(12deg) translateY(-10px);
        }
      }

      @keyframes girlFloat {
        0%, 100% { margin-top: 0; }
        50% { margin-top: -5px; }
      }

      @keyframes cameraDrift {
        0%, 100% { transform: rotateY(-10deg) rotateZ(-1deg); }
        50% { transform: rotateY(10deg) rotateZ(1deg); }
      }

      @media (max-width: 520px) {
        .ocean-stage { height: 365px; }
        .under-sea { transform: translateY(26px) scale3d(.62, .62, .62); }
        .mobile-shadow { transform: scale(.8); left: 18px; top: 20px; }
      }
    `}</style>
  );
}

export default function WhaleLetterForHan() {
  return (
    <main className="vietnamese-font relative min-h-screen overflow-hidden bg-[#8edff0] px-3 py-6 text-slate-800 sm:px-6">
      <SceneStyles />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,0.72),transparent_28%),radial-gradient(circle_at_18%_72%,rgba(20,184,166,0.28),transparent_26%),linear-gradient(180deg,#b9f3ff_0%,#55c7e6_54%,#0f8eb8_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:42px_42px] opacity-35" />

      <div className="relative z-10 mx-auto min-h-[92vh] w-full max-w-[640px] overflow-hidden rounded-[2rem] border border-cyan-100/70 bg-white/24 shadow-[0_22px_70px_rgba(5,78,105,0.28)] backdrop-blur-sm">
        <header className="px-6 pt-7 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.38em] text-cyan-800/75">
            Một đại dương nhỏ
          </p>

          <h1 className="mt-3 text-3xl font-bold text-cyan-950 sm:text-4xl">
            Gửi Hân
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-cyan-950/70">
            Cô gái tóc nâu cưỡi cá voi xanh, giữa vòng cá nhỏ 3D rực rỡ sắc màu.
          </p>
        </header>

        <UnderSea3D />
        <LetterSection />
      </div>
    </main>
  );
}