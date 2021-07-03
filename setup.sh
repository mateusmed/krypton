cd rigBrain/
npm install
cd src/

pm2 ls
pm2 delete -s krypton || :
pm2 start index.js --name krypton -f
pm2 save

cd ..
cd ..
cd rig-brain-front/
npm install

pm2 ls
pm2 delete -s krypton-frontend || :
pm2 start npm --name krypton-frontend -f -- run dev
pm2 save