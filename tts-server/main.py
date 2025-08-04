from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/")
def return_status():    
    status_data = {
        "status": "ok"
    }
    return jsonify(status_data)

@app.route("/transcribe", methods=["POST"])
def transcribe():
    if "audio_file" not in request.files:
        return {"error": "Please provide a file as audio_file"}
    
    file = request.files["audio_file"]
    file.save(f'./uploads/loaded_{file.filename}')
    print("File saved!")
    return "<h1>OK</h1>"



app.run(host="0.0.0.0", port=3000, debug=True)