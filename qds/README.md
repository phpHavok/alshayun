# Quick-n-Dirty Server (QDS)

A Web server is needed to create and serve articles. A Quick-n-Dirty (QDS)
development server is provided, which consists of two components: a frontend and
a backend. Both components are containerized. However, we will speak of the QDS
as a single unit.

## Building

First, install [Singularity
3.0](https://www.sylabs.io/guides/3.0/user-guide/installation.html) or greater.
Next, build the QDS.

    make

## Running

Once you've built the QDS, run it.

    make start

The QDS will launch and run in the background. You may stop it at anytime.

    make stop

The QDS will make use of ports 8080 and 5000. Access the frontend in a Web
browser at (http://127.0.0.1:8080/).
