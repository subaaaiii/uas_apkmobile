# Run App Guide
<p>git clone https://github.com/subaaaiii/uas_apkmobile.git</p>
<p>cd uas_apkmobile</p>
<br>
<p>cd server:</p>
<p>yarn install</p>
<p>cp env.example .env (buat file .env di server dengan contoh env.example)</p>
<p>make database uas_apkmobile</p>
<p>sequelize db:migrate</p>
<p>sequelize db:seed:all</p>
<p>yarn start</p>
<br>
<p>cd client:</p>
<p>yarn install</p>
<p>yarn android</p>
