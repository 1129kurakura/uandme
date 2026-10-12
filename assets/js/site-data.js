/*
 * ============================================================
 *  サイトの中身（ここを書き換えると、全ページに反映されます）
 * ============================================================
 *  ・文字は必ず " " か ' ' で囲みます
 *  ・項目の最後の , （カンマ）を消さないように注意
 *  ・保存してブラウザを再読み込みすれば反映されます
 */
window.SITE = {
  name: 'u&me',

  /*
   * お問い合わせ先
   * 3つとも空（''）のあいだは、ボタンを押すと「準備中」と表示されます。
   * どれか1つでも入れると「準備中」は出なくなり、入れた連絡先のボタンに変わります。
   *   email : 'hello@example.com'
   *   x     : 'https://x.com/アカウント名'
   *   form  : 'https://forms.gle/xxxx'（Googleフォームなど）
   */
  contact: {
    email: '',
    x: '',
    form: '',
  },

  /*
   * プロダクト一覧（トップページの一覧と、各ページ下の「ほかのプロダクト」に出ます）
   * 増やすときは { ... } を1つコピーして下に足し、
   * products/ フォルダに同じ名前のページ（例：products/新しい名前.html）を作ります。
   *   tone : 'yume'（ピンク）/ 'furatto'（青むらさき）/ 'city3d'（緑）のどれか
   */
  products: [
    {
      id: 'yumelist',
      name: 'ゆめリス',
      latin: 'u&meList',
      catch: '「いつか行こうね」を、叶えて残す。ゆめをリストに。',
      summary: 'カップルやサークルのための、クローズドな夢リストアプリ。',
      status: 'デモ公開中',
      page: 'products/yumelist.html',
      tone: 'yume',
    },
    {
      id: 'furatto',
      name: 'ふらっと',
      latin: '仮称',
      catch: '空いた時間の行き先が、1分で決まる。おでかけの壁をふらっとに。',
      summary: 'その時間すいているお店をつないで、お出かけプランにするアプリ。',
      status: 'デモ公開中',
      page: 'products/furatto.html',
      tone: 'furatto',
    },
    {
      id: 'city3d',
      name: '都市3Dマップ',
      latin: 'Chofu / Shinjuku',
      catch: '駅の中を、立体のまま案内する。',
      summary: '駅と駅ビルを立体で表示し、道順を3Dで示す構内マップ。',
      status: '制作中',
      page: 'products/city3d.html',
      tone: 'city3d',
    },
  ],

  /*
   * 活動の記録（トップページの「活動」に、上から順に出ます）
   * 新しいものを上に足してください。
   *   link : 押したときの行き先。なければ ''
   */
  news: [
    {
      date: '2026.10',
      text: '「ふらっと」のデモを公開しました。',
      link: 'https://1129kurakura.github.io/furatto-mvp/',
    },
    {
      date: '2026.10',
      text: '「ゆめリス」の公開デモを公開しました。',
      link: 'https://1129kurakura.github.io/umelist-demo/',
    },
    {
      date: '2026.10',
      text: 'イチBizアワード2026への応募に向けて、調布駅・新宿駅の立体構内マップを制作しています。',
      link: 'products/city3d.html',
    },
    {
      date: '2026.08',
      text: '「ゆめリス」の最初のプロトタイプをつくりました。',
      link: '',
    },
  ],

  /*
   * メンバー（members.html に出ます）
   * 増やすときは { ... } を1つコピーして下に足します。
   *   photo : 顔写真。assets/img/ に画像を置いて 'assets/img/ファイル名.jpg' と書く。
   *           空（''）なら、名前の1文字目が丸の中に出ます。
   *   links : [{ label: 'X', url: 'https://...' }] の形で、いくつでも。なければ []
   */
  members: [
    {
      name: '志賀 蔵之介',
      latin: 'Kuranosuke Shiga',
      role: '代表',
      bio: 'u&meの代表。ゆめリス、ふらっと、都市3Dマップの企画と開発を担当しています。',
      photo: '',
      links: [],
    },
  ],
};
