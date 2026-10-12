#!/bin/bash
# ============================================================
#  サイトを更新する（ダブルクリックで実行）
#  編集した内容を GitHub に送り、公開サイトに反映します。
# ============================================================

SITE_URL="https://1129kurakura.github.io/uandme/"
DATA_FILE="assets/js/site-data.js"

# 最後にウィンドウが勝手に閉じないよう、キー入力を待ってから終わる
finish() {
  echo ""
  read -n 1 -s -r -p "何かキーを押すと閉じます。"
  echo ""
  exit "$1"
}

# このファイルが置いてあるフォルダ（サイトのフォルダ）に移動する
cd "$(dirname "$0")" || { echo "サイトのフォルダに移動できませんでした。"; finish 1; }

echo "u&me 公式サイトを更新します。"
echo ""

# site-data.js の書き間違い（カンマや引用符の抜け）を、送る前に確かめる
if command -v node >/dev/null 2>&1; then
  if ! node --check "$DATA_FILE"; then
    echo ""
    echo "✗ $DATA_FILE に書き間違いがあります。"
    echo "  上に出ている行の近くで、カンマ（,）や引用符（' '）が抜けていないか確認してください。"
    echo "  サイトは更新していません。"
    finish 1
  fi
fi

# 変更がなければ何もしない
if [ -z "$(git status --porcelain)" ]; then
  echo "変更されたファイルはありません。サイトは最新の状態です。"
  finish 0
fi

echo "変更されたファイル："
git status --short
echo ""

read -r -p "何を変えたか、ひとこと（空のまま Enter でも大丈夫です）： " message
if [ -z "$message" ]; then
  message="サイトを更新（$(date '+%Y-%m-%d %H:%M')）"
fi

git add -A
if ! git commit -q -m "$message"; then
  echo ""
  echo "✗ 変更の記録に失敗しました。上のメッセージを確認してください。"
  finish 1
fi

# ほかの場所（GitHub の画面など）で直した分があれば、先に取り込む
if ! git pull -q --rebase origin main; then
  git rebase --abort >/dev/null 2>&1
  echo ""
  echo "✗ GitHub 側の変更と、手元の変更がぶつかりました。"
  echo "  手元の変更は記録済みで、消えていません。サイトはまだ更新されていません。"
  finish 1
fi

if ! git push -q origin main; then
  echo ""
  echo "✗ GitHub に送れませんでした。ネットにつながっているか確認して、もう一度実行してください。"
  echo "  手元の変更は記録済みで、消えていません。"
  finish 1
fi

echo ""
echo "✓ 送信しました。1〜2分ほどで公開サイトに反映されます。"
echo "  $SITE_URL"
echo "  （変わらないときは、ブラウザで Cmd + Shift + R を押して読み込み直してください）"
finish 0
