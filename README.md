# react-native-rk-pull-to-refresh（ios/android）
a react native pull to refresh Component for both android and ios and use the same api
## Installation
npm install react-native-rk-pull-to-refresh --save
react-native link react-native-rk-pull-to-refresh
## Installation Android
1.In android/settings.gradle
```
...
include ':react-native-rk-pull-to-refresh'
project(':react-native-rk-pull-to-refresh').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-rk-pull-to-refresh/android')
```
2.In android/app/build.gradle
```
...
dependencies {
    ...
    // From node_modules
     compile project(':react-native-rk-pull-to-refresh')
}
```
3.In MainApplication.java
```
...
import com.pulltorefresh.PullToRefreshPackage;    //import package
...
 @Override
 protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
             new MainReactPackage(),
             new PullToRefreshPackage()
    );
 }
...

```

