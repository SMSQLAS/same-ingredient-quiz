# 同一成分の落とし穴クイズ（調剤事務スタッフ向け）

以前の「自家製剤加算クイズ 実践編」の `index.html`、`script.js`、`style.css` をもとに、**画面と動作をほぼそのまま残して問題だけ置き換えた**バージョンです。

## できること

- 全10問、○×2択、1問ずつ出題。
- **回答直後に**「⭕正解／❌不正解」と短い解説を表示。
- 「次の問題へ」を押すまで進まない。最終問の後に点数を表示。
- 店舗名・名前・難易度（簡単／ちょうどいい／難しい）を入力して送信。
- 送信処理が完了するまで「もう一度する」は押せない。
- スマートフォン対応、元の紫色テーマを維持。

## 設置方法（前回と同じ）

1. ZIPを解凍する。
2. `index.html`、`script.js`、`style.css` を、前回のクイズと同じようにGitHub Pagesなどへアップロードする。**元のクイズを残すなら新しいリポジトリ／フォルダで公開**する。
3. `script.js` 冒頭の `WEB_APP_URL` は、添付してもらった**前回のファイルに入っていたURLを引き継いでいます**。このままなら原則として以前のApps Scriptの送信先へPOSTします。
4. 別のスプレッドシートに集計したい場合は、そのシートに対応したApps Scriptの `/exec` URLに置き換える。
5. 公開したページで最後まで回答し、テスト送信後にスプレッドシートの行が増えたか**必ず確認**する。

## スプレッドシートへ送る項目（前回と同じ）

`timestamp` / `quizTitle` / `storeName` / `name` / `difficulty` / `score` / `answers`

- `quizTitle` ：同一成分の落とし穴クイズ（調剤事務向け）
- `score` ：例 `8/10`
- `answers` ：間違えた問題番号（例 `問題1、問題4`）／全問正解なら `なし`

※送信の動作・項目名は添付されていた既存コードに合わせています。

**注意：** 元の実装と同じく `fetch(..., { mode: "no-cors" })` を使っています。ブラウザ側では送信先の正常受理を判定できないため、「送信処理完了」は**シートへの保存成功を保証しません**。実運用前に、実際のスプレッドシートへの反映をテストしてください。厳密な成功確認が必要なら、バックエンドを含めた送信方法の変更が必要です。

## クイズの教育目的

「同一成分の薬品は全部変更不可」ではなく、**「処方薬と異なる製剤を調剤事務の独断で選んで確定しない。薬剤師が判断した薬を正しく入力する」**ことを目的にしています。変更調剤の適否や疑義照会の要否などの最終判断は、薬剤師・薬局の運用基準に従ってください。

## 主な参照先（製剤の違い）

- [PMDA ニフェジピンL](https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2171014G1267_1?user=1)
- [PMDA デパケン錠](https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1139004F1096_2?user=1)／[デパケンR錠](https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1139004G1040_2?user=1)
- [PMDA グリコラン錠](https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/3962002F1071_1?user=1)
- [PMDA ペンタサ錠](https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2399009F1149_3?user=1)／[アサコール錠](https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2399009F3028_1?user=1)
- [PMDA ヘルベッサー錠](https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2171006F1224_1?user=1)／[ヘルベッサーRカプセル](https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/2171006N1105_1?user=1)
- [PMDA セレニカR](https://www.pmda.go.jp/PmdaSearch/rdSearch/02/1139004G2039?user=1)
- [PMDA トラマールOD](https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1149038F1024_1?user=1)／[ワントラム](https://www.pmda.go.jp/PmdaSearch/rdDetail/iyaku/1149038G1020_1?user=1)

作成日：2026年10月23日。実運用前に各薬剤の電子添文・薬品マスタ・変更調剤ルールも確認してください。
