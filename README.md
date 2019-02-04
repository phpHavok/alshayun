# Alshayun

A mobile mathematics education application.

## Building

To build Alshayun, you will need Ionic, Cordova, and the Android SDK with all of
their dependencies. A Singularity container is provided for convenience.

First, install [Singularity
3.0](https://www.sylabs.io/guides/3.0/user-guide/installation.html) or greater.
Next, obtain a copy of the Ionic Singularity container. You can pull the
container from the Sylabs Cloud with the following command.

    singularity pull library://phphavok/default/ionic:4.10.1

If that fails for some reason in the future, a copy of the recipe is provided in
this repository, and you can manually build the container with the following
command.

    sudo singularity build ionic_4.10.1.sif Singularity

Once you have the container in hand, run the following commands.

    mkdir -p sdk/build-tools sdk/platforms
    singularity exec -B sdk/build-tools:/usr/local/android/build-tools \
                     -B sdk/platforms:/usr/local/android/platforms \
                     ionic_4.10.1.sif \
                     sdkmanager 'platforms;android-27' 'build-tools;27.0.3' 
    singularity exec -B sdk/build-tools:/usr/local/android/build-tools \
                     -B sdk/platforms:/usr/local/android/platforms \
                     ionic_4.10.1.sif \
                     ionic cordova build android

Out pops an APK file that you can install on a compatible Android phone. You can
also have Ionic install the APK for you by using the following command.

    ionic cordova run android
