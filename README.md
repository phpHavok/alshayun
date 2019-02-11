# Alshayun

A mobile mathematics education application.

## Building

To build Alshayun, you will need Ionic, Cordova, and the Android SDK with all of
their dependencies. A Singularity container is provided for convenience.

First, install [Singularity
3.0](https://www.sylabs.io/guides/3.0/user-guide/installation.html) or greater.
Next, obtain a copy of the Ionic Singularity container. You can pull the
container from the Sylabs Cloud with the following command.

    singularity pull ionic.sif library://phphavok/default/ionic:4.10.1

If that fails for some reason in the future, a copy of the recipe is provided in
this repository, and you can manually build the container with the following
command.

    sudo singularity build ionic.sif Singularity

Once you have the container in hand, run the following commands.

    mkdir -p sdk/build-tools sdk/platforms
    singularity shell -B sdk/build-tools:/usr/local/android/build-tools \
                      -B sdk/platforms:/usr/local/android/platforms \
                      -p ionic.sif
    sdkmanager 'platforms;android-27' 'build-tools;27.0.3'
    ionic cordova build android

Out pops an APK file that you can install on a compatible Android device. You
can also have Ionic install the APK for you by using the following command
within the container shell.

    ionic cordova run android

However, you'll need to have your Android device connected via USB with USB
debugging enabled for this to work. From within the Singularity shell, run `adb
devices` to see if your Android device shows up. If you don't have a physical
Android device on which to test, you can create an Android Virtual Device (AVD).

## Setting up an Android Virtual Device (AVD)

Create an additional SDK directory outside of the container.

    mkdir -p sdk/system-images

Be sure to mount in this additional directory when launching the Singularity
shell.

    singularity shell -B sdk/build-tools:/usr/local/android/build-tools \
                      -B sdk/platforms:/usr/local/android/platforms \
                      -B sdk/system-images:/usr/local/android/system-images \
                      -p ionic.sif

Pick a system image to use for your AVD and install it.

    sdkmanager 'system-images;android-27;google_apis;x86'

Choose a name for your AVD (e.g., `test`), and create it using the system image
installed in the previous step. Note that, by default, AVDs are installed under
`~/.android/avd`. If you want a different path, add `-p /path/to/avd` to the
`avdmanager` command.

    avdmanager create avd -n test \
                          -k 'system-images;android-27;google_apis;x86'

Launch the AVD in an emulator.

    /usr/local/android/emulator/emulator -avd test
