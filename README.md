# lp_gulp_base
スタイル関連、画像圧縮、browsersyncのgulpタスクを含むリポジトリです

# 注意点
* gulp4系のため、既存のプロジェクトに含まれるgulpfileの記述とは違います。
* npxを利用しているため、npxのインストールが必要です
https://co.bsnws.net/article/275
```
npm install -g npx
```

# ディレクトリ説明
src…圧縮、コンパイル前のソース等  
public…公開したいもの  

# 初期にやること
package.json内をインストール
```
npm i
```

# コマンド
* ディレクトリ内にターミナルまたはコマンドプロンプトで移動
* 下記コマンドでgulp起動
```
npx gulp develop
```
* http://localhost:3000/　のサーバーが立ち上がる
* 止めるときは ctrl + c で Y を選択