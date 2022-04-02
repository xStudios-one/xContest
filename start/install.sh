if [ "$1" == "i" ]; then
    echo "Installing required dependencies..."
    npm i
    echo "Installation finished!"
    clear
    node index.js
else
    node .
fi
