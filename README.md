[![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/deskbtm?style=social)](https://twitter.com/intent/follow?screen_name=deskbtm)

Forked [capacitor-community/tauri](https://github.com/capacitor-community/tauri/)
<p align="center">
  <img src="https://user-images.githubusercontent.com/20338451/129942856-bac5a858-a846-4a9f-b10e-10c423917471.png" width="560" /><br />
</p>

<p align="center">
Bring your Capacitor ⚡ apps to the desktop with Tauri! 🖥
</p>

## ⚠ Nota Bene
- Please follow your operating systems guide to setup your environment for Tauri development [here](https://tauri.app/v1/guides/getting-started/setup)
- You will need `@capacitor/core` version `>= 5.0.0`.

## ⏳ Quick start (Functioning on: Windows, MacOS, Linux)
1. Create or open a Capacitor initialized web app project. [CAPACITOR DOCS](https://capacitorjs.com/docs/getting-started)
2. `npm i capacitor-tauri`
3. `npx cap add capacitor-tauri`
4. Add path `tauri` to package manager workspace  then `npm i`
5. Start web app dev server, you can change the **devPath**  in `tauri/src-tauri/tauri.conf.json`  , 
6. `npx cap open capacitor-tauri` - _This can take several minutes the first time you run it._
9. You now have your web app running in tauri, right click and select `inspect` to bring up dev tools. 

## 🚧 Building release

1. Build web app. Note the output path and `tauri.conf.json` **distDir** 
2. `cd tauri && npm run build`

 For more [details](https://tauri.app/v1/guides/building/)

## 🎉 More info

- Check out Tauri on its [website](https://tauri.studio/) or on [github](https://github.com/tauri-apps/tauri)


## ✨ Contributors 
<table>
  <tr>
    <td align="center"><a href="https://github.com/IT-MikeS"><img src="https://avatars0.githubusercontent.com/u/20338451?v=4?s=75" width="75px;" alt=""/><br /><sub><b>Mike Summerfeldt</b></sub></a><br /><a href="https://github.com/capacitor-community/tauri/commits?author=IT-MikeS" title="Code">💻</a> <a href="https://github.com/capacitor-community/tauri/commits?author=IT-MikeS" title="Documentation">📖</a></td>
  </tr>
</table>
