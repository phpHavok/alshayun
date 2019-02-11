Bootstrap: library
From: ubuntu:18.04

%labels
    MAINTAINER Jacob Chappell <chappellind@gmail.com>
    IONIC_VERSION 4.10.2
    CORDOVA_VERSION 8.1.2
    NODEJS_VERSION 10.15.1
    JDK_VERSION 8
    GRADLE_VERSION 5.1.1

%post
    # Install dependencies available as Ubuntu packages
    apt-get update
    apt-get install -y wget xz-utils unzip openjdk-8-jdk

    # Install Node.js
    TEMP=`mktemp`
    wget -O $TEMP \
        'https://nodejs.org/dist/v10.15.1/node-v10.15.1-linux-x64.tar.xz'
    mkdir -p /usr/local/node
    tar -C /usr/local/node -xf $TEMP
    rm -f $TEMP
    export PATH="/usr/local/node/node-v10.15.1-linux-x64/bin:$PATH"

    # Install Ionic
    npm install -g ionic cordova

    # Install Gradle
    TEMP=`mktemp`
    wget -O $TEMP \
        'https://services.gradle.org/distributions/gradle-5.1.1-bin.zip'
    mkdir -p /usr/local/gradle
    unzip -d /usr/local/gradle $TEMP
    rm -f $TEMP

    # Bootstrap Android CLI tools
    TEMP=`mktemp -d`
    wget -O $TEMP/tools.zip \
        'https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip'
    unzip -d $TEMP $TEMP/tools.zip
    mkdir -p /usr/local/android
    export PATH="$TEMP/tools/bin:$PATH"
    echo y | sdkmanager --sdk_root=/usr/local/android tools platform-tools
    rm -rf $TEMP

%environment
    # Java
    export JAVA_HOME="/usr/lib/jvm/java-8-openjdk-amd64"
    # Node.js
    export PATH="/usr/local/node/node-v10.15.1-linux-x64/bin:$PATH"
    # Gradle
    export PATH="/usr/local/gradle/gradle-5.1.1/bin:$PATH"
    # Android
    export ANDROID_HOME="/usr/local/android"
    export PATH="$ANDROID_HOME/tools/bin:$PATH"
    export PATH="$ANDROID_HOME/emulator:$PATH"
    export PATH="$ANDROID_HOME/platform-tools:$PATH"

%help
This container provides the latest version of the Ionic Framework and Cordova,
along with accompanying dependencies, as well as the Android SDK. The Android
SDK is installed under `/usr/local/android`. Note that only the generic SDK
tools are installed. You can use the container to install your own platforms
and build tools based on whatever Android API version you like. To do so, use
an overlay or a bind mount. Following is an example of installing a platform
using a bind mount.

    mkdir -p sdk/build-tools sdk/platforms
    singularity exec -B sdk/build-tools:/usr/local/android/build-tools \
                     -B sdk/platforms:/usr/local/android/platforms \
                     ionic.sif \
                     sdkmanager 'platforms;android-27' 'build-tools;27.0.3'

Be sure to bind mount the extra directories into the container anytime you want
to use them. The same technique can be used to create AVDs and what not.
