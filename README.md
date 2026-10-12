# u&me 公式サイト

学生団体 u&me の公式サイトです。

**公開URL：https://1129kurakura.github.io/uandme/**

HTML / CSS / JavaScript だけでできています。ビルドは不要で、ファイルを書き換えて `main` に push すれば、数分後に公開サイトへ反映されます。

## 手元で見る

```bash
python3 -m http.server 4196
```

→ http://localhost:4196/ を開く（止めるときは Ctrl+C）。

## ファイルの場所

```
index.html              トップページ
members.html            メンバー紹介
products/
  yumelist.html         ゆめリスの特設ページ
  furatto.html          ふらっとの特設ページ
  city3d.html           都市3Dマップの特設ページ
assets/
  js/site-data.js       ★ 連絡先・メンバー・活動・プロダクト一覧（よく直すのはここ）
  js/site.js            ヘッダー・フッターなど共通の動き（ふだんは触らない）
  css/base.css          色・文字・余白の決まり、共通の部品
  css/pages.css         ページごとの見た目
  img/                  画像
```

## よくある編集

### お問い合わせ先を入れる（「準備中」を消す）

`assets/js/site-data.js` の `contact` に、連絡先を1つ以上入れます。
3つとも空のあいだは、ボタンを押すと「準備中」と表示されます。

```js
contact: {
  email: 'hello@example.com',
  x: 'https://x.com/アカウント名',
  form: '',
},
```

### メンバーを増やす

`assets/js/site-data.js` の `members` に、`{ ... }` を1つコピーして足します。
写真は `assets/img/` に置き、`photo: 'assets/img/ファイル名.jpg'` と書きます（正方形がきれいに出ます）。

### 活動を足す

`assets/js/site-data.js` の `news` のいちばん上に1行足します。

### 文章を直す

各ページの `.html` を開いて、日本語の文をそのまま書き換えます。
プロダクトのページは「課題 → 解決案 → 仕組み → これからの展望」の順で、
それぞれ「結論 → 理由 → 具体例 → 結論」の短い段落で書いています。

### プロダクトを増やす

1. `products/furatto.html` をコピーして、新しい名前で保存する（例：`products/newapp.html`）
2. 中の文章・画像・`<main class="tone-furatto">`・`data-other-products="furatto"` を書き換える
3. `assets/js/site-data.js` の `products` に `{ ... }` を1つ足す（`page` に 1. のファイル名）

トップページの一覧、フッター、各ページ下の「ほかのプロダクト」に自動で出ます。

### 都市3Dマップのデモを公開したら

`products/city3d.html` の「デモは準備中」の近くにあるコメントの手順どおりに、ボタンを差し替えます。

### 色を変える

`assets/css/base.css` のいちばん上（`:root`）にある色の値を直します。

## 画像について

画面写真は WebP 形式です。差し替えるときは同じファイル名で上書きすれば、そのまま反映されます。
PNG から作る場合：

```bash
cwebp -q 82 元の画像.png -o assets/img/名前.webp
```

## 使っているもの

フォント：Noto Sans JP、Bricolage Grotesque（Google Fonts）

© 2026 u&me
