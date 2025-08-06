from flask import Flask, jsonify, request
from vosk import Model, KaldiRecognizer
import wave
import json

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
    filePath = f'./uploads/loaded_{file.filename}'

    file.save(filePath)

    recognizedText = doTranscription(filePath)

    return {"recognized": recognizedText}


def doTranscription(path):
    wf = wave.open(path, "rb")
    model = Model("./model/vosk-model-small-de-0.15")
    rec = KaldiRecognizer(model, wf.getframerate())
    
    transcription = []

    while True:
        data = wf.readframes(4000)
        if len(data) == 0:
            break
        if rec.AcceptWaveform(data):
            result_dict = json.loads(rec.Result())
            transcription.append(result_dict.get("text", ""))

    final_result = json.loads(rec.FinalResult())
    transcription.append(final_result.get("text", ""))
    transcription_text = ' '.join(transcription)
    return transcription_text