file-grab-webhook
==================

A GitHub webhook that will copy a file from the Internet when triggered.

Installation
------------

Clone this repo.

Then, create a `config/config.js` file in the project root like this:

    module.exports = {
      port: 3489,
      fileURL: 'https://file.zone/goodfile.txt',
      fileDest: __dirname + '/data/goodfile.txt'
    };

Or with Docker:

    - Create a `config` directory containing the `config.js` file as above.

Usage
-----

    make start

With Docker:

    docker run -v $(HOMEDIR)/config:/usr/src/app/config \
        -v $(HOMEDIR)/data:/usr/src/app/data \
        jkang/file-grab-webhook

When a webhook payload is received, it will copy `fileURL` to `fileDest`.

License
-------

The MIT License (MIT)

Copyright (c) 2015 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
