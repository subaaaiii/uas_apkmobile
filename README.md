# Run App Guide

git clone https://github.com/subaaaiii/uas_apkmobile.git \n
cd uas_apkmobile\n
buat file .env di server dengan contoh env.example\n

cd server:\n
yarn install
make database uas_apkmobile
sequelize db:migrate
sequelize db:seed:all
yarn start

cd client:
yarn install
yarn android
