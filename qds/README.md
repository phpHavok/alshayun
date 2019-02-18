# Quick-n-Dirty Server (QDS)

## Building

First, install [Singularity
3.0](https://www.sylabs.io/guides/3.0/user-guide/installation.html) or greater.
Next, build the QDS container as root.

    sudo make

## Running

Once you've built the QDS container, run it as your normal user.

    make run

A Flask server will start on port 5000. You must have this port open if you want
Alshayun to communicate with the QDS. When finished with the server, press
CTRL+C to kill it.

### Daemon

If you prefer, you may start the QDS as a daemon.

    make daemon-start

At any time, you may stop the daemon as well.

    make daemon-stop
