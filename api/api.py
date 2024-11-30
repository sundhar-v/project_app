from flask import Flask

app = Flask(__name__)

@app.route('/text')
def get_text():
    return {'text': "Simultaneous Delivery and Pickup with Time Windows by Ira and Sundhar"}