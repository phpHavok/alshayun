from flask import Flask, send_from_directory
app = Flask(__name__)

@app.route('/articles/<path:filename>')
def get_article(filename):
    return send_from_directory('articles/', filename)
