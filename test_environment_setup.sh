# main directory
npm install -y

# api
cd api

npm i -g prisma@latest
npm i @prisma/client@latest 
npm install -y

touch .env
echo "JWT_SECRET=testenvjwtkey" > .env
echo "DATABASE_URL=file:./dev.db" >> .env

npx prisma generate
npx prisma migrate dev --name test_env

# dashboard
cd ../frontend/dashboard

npm install -y

cd ../..