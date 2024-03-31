
echo "Running Gemini Private Server script..."
gnome-terminal -- bash -c "cd ./gem-private-server-py && echo Gemini Server && python3 -m venv venv &&  source ./venv/bin/activate && pip3 install -r requirements.txt &&  python -m uvicorn main:app --reload --port=9000; read -p 'Press Enter to exit'" &

echo "Running React script..."
gnome-terminal -- bash -c "cd ./client && npm i && echo React Server && npm start; read -p 'Press Enter to exit'" &

echo "All processes have been executed."