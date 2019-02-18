from flask import Flask, send_from_directory, request, abort
from flask_cors import CORS
import sys
import json
import os
app = Flask(__name__)
CORS(app)

def checkout_serial():
    f = open('serial', 'r+')
    serial = int(f.read())
    f.seek(0)
    f.write(str(serial + 1))
    f.close()
    return serial

def read_manifest():
    f = open('articles/manifest.json', 'r')
    manifest = json.loads(f.read())
    f.close()
    return manifest

def write_manifest(manifest):
    f = open('articles/manifest.json', 'w')
    f.write(json.dumps(manifest, indent = 4))
    f.close()

@app.route('/article', methods = ['POST'])
def create_article():
    if (not request.json) or \
            (not 'title' in request.json) or \
            (not 'excerpt' in request.json) or \
            (not 'tags' in request.json) or \
            (not 'text' in request.json):
                abort(400)
    # Create article object
    article = {}
    article['id'] = checkout_serial()
    article['title'] = str(request.json['title'])
    article['excerpt'] = str(request.json['excerpt'])
    article['tags'] = request.json['tags']
    # Write article file to disk
    f = open('articles/article.' + str(article['id']) + '.md', 'w')
    f.write(request.json['text'])
    f.close()
    # Add article object to manifest
    manifest = read_manifest()
    manifest.append(article)
    write_manifest(manifest)
    # Return status
    ret = {}
    ret['message'] = 'Success'
    return json.dumps(ret)

@app.route('/article', methods = ['DELETE'])
def delete_article():
    if (not request.json) or \
            (not 'id' in request.json):
                abort(400)
    aid = int(request.json['id'])
    # Remove article from manifest.
    manifest = read_manifest()
    index = -1
    for i in range(0, len(manifest)):
        if manifest[i]['id'] == aid:
            index = i
    if index == -1:
        abort(400)
    del manifest[index]
    write_manifest(manifest)
    # Remove article from disk.
    os.remove('articles/article.' + str(aid) + '.md')
    # Return status
    ret = {}
    ret['message'] = 'Success'
    return json.dumps(ret)

@app.route('/articles/<path:filename>')
def get_article(filename):
    return send_from_directory('articles/', filename)

@app.after_request
def add_header(response):
    response.cache_control.max_age = 0
    response.cache_control.public = True
    return response
