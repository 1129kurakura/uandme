// JavaScript が動くときだけ、スクロールで現れる演出を有効にする
document.documentElement.classList.add('js');

// オープニングを流すかどうかを、ページが描かれる前に決める。
// 流すのは：data-intro の付いたページを、ブラウザを開いてから最初に見たときだけ。
// 流さないのは：2回目以降、「動きを減らす」設定の人、ページ内の特定の場所（#products など）へ直接来たとき。
(() => {
  const root = document.documentElement;
  if (!root.hasAttribute('data-intro')) return;
  if (window.location.hash) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  try {
    if (window.sessionStorage.getItem('uandme-intro-seen')) return;
  } catch (error) {
    // 保存領域が使えないブラウザでは、毎回流す
  }
  root.classList.add('intro-on');
})();
