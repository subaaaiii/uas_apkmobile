# Run App Guide

git clone https://github.com/subaaaiii/uas_apkmobile.git
cd uas_apkmobile
buat file .env di server dengan contoh env.example

cd server:
yarn install
make database uas_apkmobile
sequelize db:migrate
sequelize db:seed:all
yarn start

cd client:
yarn install
yarn android
