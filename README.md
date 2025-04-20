# EventFlow
# instruction for using the application

git clone https://github.com/yourusername/eventflow.git
cd eventflow/backend

npm install


DB_NAME=eventflow_db
DB_USER=root
DB_PASSWORD=yourpassword
DB_HOST=localhost
JWT_SECRET=your_jwt_secret_key
PORT=5000


mysql -u root -p
CREATE DATABASE eventflow_db;
exit


cd ../frontend

npm install
# or
yarn install


REACT_APP_API_BASE_URL=http://localhost:5000/api