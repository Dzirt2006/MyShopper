/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./service-worker.js",['./workbox-176fe0b1'], (function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "back.jpg",
    "revision": "716566935dcfe69f8fc5927a686a4594"
  }, {
    "url": "bundle.js",
    "revision": "c448e8878156b29f50d2c79fa8949ae2"
  }, {
    "url": "favicon.gif",
    "revision": "3dbdb19ab4c4c6edf1ec72754c3f4c5d"
  }, {
    "url": "img/back.jpg",
    "revision": "716566935dcfe69f8fc5927a686a4594"
  }, {
    "url": "img/logo192x192.png",
    "revision": "d42a961f523bc220b6028d7da6226c8b"
  }, {
    "url": "img/logo512x512.png",
    "revision": "a2e0d236564d42d86a22669787ecb4a3"
  }, {
    "url": "img/slidng window.jpg",
    "revision": "1d9150a88cf4b3cda8ef53ca7dce19b0"
  }, {
    "url": "index.html",
    "revision": "b04d791663a1b3a192d3e649edfef372"
  }, {
    "url": "manifest.json",
    "revision": "07d4ee64fafc8d1971cfdae93854af77"
  }, {
    "url": "styles.css",
    "revision": "f43ff3d9e682eef5a61fe023a272b8df"
  }, {
    "url": "workbox-3b8b670f.js",
    "revision": "f7fcfe20e6b444f50e1ec4ba5b7e1bc9"
  }, {
    "url": "workbox-64f1e998.js",
    "revision": "fcf52f58e5047497a2999f50965ba3b3"
  }], {});

}));
