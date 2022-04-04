# api
cd api

npm install -y

npx prisma generate
npx prisma migrate dev --name test_env

touch .env
echo "JWT_SECRET=testenvjwtkey" > .env
echo "DATABASE_URL=file:./dev.db" >> .env

# dashboard
cd ../frontend/dashboard

npm install -y