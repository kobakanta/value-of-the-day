# Value of the Day - itch.io アップロードガイド

このドキュメントは、「Value of the Day」をitch.ioにアップロードする手順を説明します。

## 📦 パッケージ内容

`itch-build/` ディレクトリには、itch.ioで動作する完全な静的HTMLアプリケーションが含まれています：

```
itch-build/
├── index.html              # メインページ（エントリーポイント）
├── calendar/               # カレンダーページ
│   └── index.html
├── post/                   # レビュー投稿ページ
│   └── index.html
├── review/                 # レビュー表示ページ
│   └── index.html
├── thanks/                 # サンクスページ
│   └── index.html
├── _next/                  # Next.jsの最適化されたJS/CSSバンドル
│   ├── static/
│   └── ...
├── icon.jpg                # アプリアイコン
├── opengraph-image.png     # OGP画像
└── *.svg                   # その他の静的アセット
```

## 🚀 itch.ioへのアップロード手順

### 1. itch.ioアカウントとプロジェクトの準備

1. [itch.io](https://itch.io/)にログイン
2. ダッシュボードから「新しいプロジェクトを作成」をクリック

### 2. プロジェクト設定

#### 基本情報
- **タイトル**: Value of the Day
- **プロジェクトURL**: 任意のURL（例：`yourname.itch.io/value-of-the-day`）
- **種類**: HTML を選択

#### アップロード
1. 「アップロード」セクションで「ファイルをアップロード」をクリック
2. `itch-build/` ディレクトリ内の **すべてのファイルとフォルダ** を選択してアップロード
   - または、`itch-build`ディレクトリをZIPファイルに圧縮してアップロード
3. アップロード後、「このファイルはブラウザで再生される」にチェック
4. **インデックスファイル** を `index.html` に設定

#### 表示設定
- **埋め込みオプション**:
  - 「フルスクリーンボタンを表示」: ✅ 推奨
  - 「自動開始」: ✅ 推奨
  - **ビューポートサイズ**: 
    - 幅: `1200px`（推奨）
    - 高さ: `800px`（推奨）
    - または「ページに合わせる」を選択

### 3. その他の設定

#### カバー画像
- `opengraph-image.png` をカバー画像として使用できます

#### 説明文（例）
```
How many stars are you giving today?

This site lets you rate each day with stars and a short review.
The calendar shows the average star rating for each date.
Click on the date to see the review details.
The average rating and shared reflections together define the value of the day.

あなたの今日は星いくつですか？
このサイトは、1日を星評価とレビューで評価する場です。
```

#### カテゴリとタグ
- **ジャンル**: Tool, Interactive
- **タグ**: `daily-log`, `journal`, `rating`, `calendar`, `web`

### 4. 公開

1. すべての設定が完了したら、ページ下部の「保存」をクリック
2. 公開範囲を設定（「公開」または「限定公開」）
3. 「プロジェクトを表示」でプレビューを確認
4. 問題なければ公開完了！

## ⚠️ 重要な注意事項

### Firebase連携について
このアプリはFirebaseを使用してデータを保存しています。itch.io版でも同じFirebaseプロジェクトに接続するため：

- **データは共有されます**: Web版（Vercel/Firebase Hosting）とitch.io版で同じデータベースを使用
- **セキュリティ**: Firebaseのセキュリティルールが適用されます
- **クロスオリジン**: itch.ioのドメインからのアクセスも許可する必要があるかもしれません

### Firebaseセキュリティルールの確認
itch.ioのドメインからアクセスできるよう、Firebase Consoleでセキュリティルールを確認してください：

1. [Firebase Console](https://console.firebase.google.com/)にアクセス
2. Firestoreのセキュリティルールを確認
3. 必要に応じてitch.ioのドメインを許可リストに追加

## 🔄 アップデートの方法

アプリを更新した場合：

1. プロジェクトディレクトリで `npm run build` を実行
2. `itch-build/` ディレクトリを削除
3. `mkdir itch-build && cp -r out/* itch-build/` を実行
4. `rm -f itch-build/*.txt itch-build/.DS_Store` を実行
5. itch.ioのプロジェクトページから新しいファイルをアップロード

## 📝 よくある質問

### Q: ZIPファイルでアップロードする方法は？

A: 以下のコマンドでZIPファイルを作成できます：
```bash
cd itch-build
zip -r ../value-of-the-day-itch.zip .
```

その後、itch.ioで `value-of-the-day-itch.zip` をアップロードしてください。

### Q: アプリが正しく動作しない

A: 以下を確認してください：
- インデックスファイルが `index.html` に設定されているか
- 「このファイルはブラウザで再生される」にチェックが入っているか
- ブラウザのコンソールでエラーが出ていないか

### Q: Web版との違いは？

A: 機能的には全く同じです。違いは：
- **Web版**: Vercel/Firebase Hostingでホスト
- **itch.io版**: itch.ioのプラットフォームでホスト
- 両方とも同じFirebaseデータベースを使用

## 🎉 完了

これでitch.ioでの公開は完了です！プロジェクトページを共有して、多くの人に利用してもらいましょう。
