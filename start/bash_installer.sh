#! /bin/bash

cd ../

if [ "$1" == "INSTALL" ]; then
    # install api dependencies and create necessary directories
    cd api
    echo "installing api..."
    npm install -y

    echo "creating necessary files and directories for api"
    mkdir -p src/exec/service/runtime/out
    mkdir -p src/exec/service/runtime/code

    # create .env file
    touch .env
    echo "DATABASE_URL=\"file:./dev.db\"" >> .env

    echo -n "Your API port (default: 3000): "
    read API_PORT
    if [ "$API_PORT" == "" ]; then
        API_PORT="3000"
    fi
    echo "API_PORT=$API_PORT" >> .env

    echo -n "Your API url (default: empty): "
    read API_URL
    echo "URL=\"$API_URL\"" >> .env

    echo -n "Your secret key (default: random): "
    read JWT_SECRET
    if [ "$JWT_SECRET" == "" ]; then
        # generate random secret
        JWT_SECRET=$(head -c 40 /dev/random | base64)
    fi
    echo "JWT_SECRET=\"$JWT_SECRET\"" >> .env

    # TODO: remove this and change its functionality be dependent of a problem
    echo "TIMEOUT=5" >> .env


    # install frontend dependencies
    cd ../frontend
    echo "installing frontend..."

    # install dashboard
    cd dashboard
    echo "installing dashboard..."
    npm install -y
    echo "building dashboard"
    npm run build

    # go back to main directory and print message
    cd ../../

    echo "======================< INSTALLATION COMPLETE >======================"
    echo "Your xContest install should now be fully functional!"
    echo "To start use \"./cli.sh start\" and \"./cli.sh stop\" to stop it."
    echo "====================================================================="

elif [ "$1" == "START" ]; then
    echo "Starting API..."

    SESSION= cat session.data
    
    if [ "$SESSION" == "" ]; then
	    # start api in background
	    cd api
	    npm run start &> api_logs.log &
	    API_PID=$!
	    echo "started API with PID $API_PID"
	    cd ..

	    # start dashboard in background
	    cd frontend/dashboard
	    npm run start &> dashboard_logs.log &
	    DASH_PID=$!
	    echo "started DASHBOARD with PID $DASH_PID"
	    cd ../..
	    
	    # save PIDs to the file
	    echo $API_PID > session.data
	    echo $DASH_PID >> session.data
    fi

elif [ "$1" == "STOP" ]; then
    SESSION=$(cat session.data)
    
    if [ "$SESSION" != "" ]; then
    	   echo "Killing all xContent related processes"
    	   
	   # get PIDs
	   API_PID=$(sed -n '1p' session.data)
	   DASH_PID=$(sed -n '2p' session.data)
	   
	   kill $API_PID
	   if test $? -eq 0; then
	   	echo "API killed successfully"
	   else
	   	exit
	   fi
	   kill $DASH_PID
	   if test $? -eq 0; then
	   	echo "DASHBOARD killed successfully"
	   else
	   	exit
	   fi
	   
	   echo "" > session.data
    else
    	   echo "xContest is not running"
    fi
else
    echo "Please use options: INSTALL, START or STOP"
fi