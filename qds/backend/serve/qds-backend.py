from flask import Flask, send_from_directory, request, abort
import sys
import json
app = Flask(__name__)

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
    f.write(json.dumps(manifest))
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

#@app.route('/article', methods = ['DELETE'])
#def delete_article():
#    manifest = read_manifest()
#    print('Length of manifest is: ' + str(len(manifest)), file=sys.stderr)
#    return 'Serial number is: ' + str(checkout_serial())

@app.route('/articles/<path:filename>')
def get_article(filename):
    return send_from_directory('articles/', filename)
