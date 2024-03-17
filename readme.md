# Develop Note

Base project with **webpack5** and **ReactJS**

## Build

Initialize **Node.js** build environment.

```sh
npm install
```

Start developer server and launch browser to view output.

```sh
npm run start
```

Build for redistribution.

> Output directory **./dist**

```sh
npm run build
```

### Build for android

1. Install android-studio, and android SDK and gradle.

1. Refer cordova document to install supported android sdk components.

1. Complete build for redistribution.

1. Setup for cordova.

    ```sh
    npm install --global cordova
    cordova platform add android
    ```

1. Generate apk file.

    ```sh
    ANDROID_HOME=~/07_sw/android-sdk \
    JAVA_HOME=~/07_sw/android-studio/jbr \
    PATH=~/07_sw/android-sdk/platform-tools:$PATH \
    PATH=~/07_sw/android-sdk/cmdline-tools/latest/bin:$PATH \
    PATH=~/07_sw/android-sdk/build-tools:$PATH \
    PATH=~/07_sw/android-studio/jbr/bin:$PATH \
    PATH=~/07_sw/gradle/bin:$PATH \
    cordova build android
    ```

# Playground

Placeholder for temper.


|       h1 | h2    |
| -------: | :---- |
| messaage | messg |
|       mm | mm    |


