# Weather Friends

天気予報を楽しく確認できることをコンセプトに制作した天気アプリです。
一人暮らしの方や主婦の方が日常的に使うことを想定し、天候に応じて背景や動物キャラクターが変化する演出を取り入れ、見るたびに和める体験を目指しました。

## Demo

https://momota015.github.io/weather-friends/

## Screenshot

<img width="1673" height="900" alt="トップ画面" src="https://github.com/user-attachments/assets/f78e611d-7bba-4ae7-9515-014f73679f00" />
<img width="1591" height="843" alt="検索結果画面" src="https://github.com/user-attachments/assets/eee8680e-bc0a-4c25-b3ad-97ae3c1c1c47" />

## Features

- 都市名による天気検索機能
- 気温・湿度・天候アイコンの表示
- 天候に応じた背景デザインと動物キャラクターの切り替え
- 検索回数に応じたダミー広告の表示

## Challenges
- API連携が初めての挑戦だったため、調べながら`fetch`を使った天気データの取得と画面表示を実装
- 2種類のAPIを組み合わせて表示内容を充実させるため、現在の天気を取得するAPIと予報を取得するAPIを連続で呼び出し、降水確率や最高・最低気温まで表示する処理を実装
- 天候とキャラクターを連動させる関数を実装し、APIから取得した天候(Clear / Clouds / Rain)に応じて、背景クラスと動物画像を切り替える処理を作成
- ユーザー体験を考えた広告表示の制御として、初回表示後に閉じた広告は、再度すぐ表示されると体験を損なうため、3回検索後に再表示される仕組みをJavaScriptで実装
- PC・スマホ両対応のレスポンシブデザインを実装

## What I Learned
- `fetch`を使ったAPI連携と、取得したデータを画面に表示するまでの流れ
- 機能を作るだけでなく、「ユーザーがどう感じるか」を考えて実装内容を判断する視点

## Technologies

- HTML
- CSS
- JavaScript
- OpenWeather API

