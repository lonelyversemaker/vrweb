/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var vrView;

// All the scenes for the experience
var scenes = {
  dolphins: {
    image: 'img/bedroom_VR0000.jpg',
    preview: 'img/bedroom_VR0000.jpg',
    hotspots: {
//      whaleRight: {
//        pitch: 0,
//        yaw: 110,
//        radius: 0.05,
//        distance: 1
//      },
//      whaleLeft: {
//        pitch: 0,
//        yaw: 150,
//        radius: 0.05,
//        distance: 1
//      },
      walrus: {
        pitch: 0,
        yaw: 100,
        radius: 0.05,
        distance: 1
      }
    }
  },
  whaleLeft: {
    image: 'img/whale-left.jpg',
    preview: 'img/whale-left-preview.jpg',
    hotspots: {
      whaleRight: {
        pitch: 0,
        yaw: 125,
        radius: 0.05,
        distance: 1
      },
      dolphins: {
        pitch: 0,
        yaw: 110,
        radius: 0.05,
        distance: 1
      },
      walrus: {
        pitch: 0,
        yaw: 30,
        radius: 0.05,
        distance: 1
      }
    }
  },
  whaleRight: {
    image: 'img/whale-right.jpg',
    preview: 'img/whale-right-preview.jpg',
    hotspots: {
      dolphins: {
        pitch: 0,
        yaw: 305,
        radius: 0.05,
        distance: 1
      },
      whaleLeft: {
        pitch: 0,
        yaw: 180,
        radius: 0.05,
        distance: 1
      },
      walrus: {
        pitch: 0,
        yaw: 210,
        radius: 0.05,
        distance: 1
      }
    }
  },
  walrus: {
    image: 'img/cam_2_v2.png',
    preview: 'img/cam_2_v2.png',
    hotspots: {
//      whaleLeft: {
//        pitch: 0,
//        yaw: 20,
//        radius: 0.05,
//        distance: 1
//      },
//      whaleRight: {
//        pitch: 0,
//        yaw: 340,
//        radius: 0.05,
//        distance: 1
//      },
      dolphins: {
        pitch: 0,
        yaw: 210,
        radius: 0.05,
        distance: 1
      }
    }
  }
};

function onLoad() {
  vrView = new VRView.Player('#vrview', {
    image: 'img/cam_2_v2.png',
    preview: 'img/cam_2_v2.png',
    is_stereo: false,
    is_autopan_off: true
  });

  vrView.on('ready', onVRViewReady);
  vrView.on('modechange', onModeChange);
  vrView.on('click', onHotspotClick);
  vrView.on('error', onVRViewError);
  vrView.on('getposition', onGetPosition);
}

function onVRViewReady(e) {
  console.log('onVRViewReady');
  loadScene('walrus');
}

function onModeChange(e) {
  console.log('onModeChange', e.mode);
}

function onGetPosition(e) {
  console.log(e);

}

function onHotspotClick(e) {
  vrView.getPosition()
  console.log('onHotspotClick', e.id);
  if (e.id) {
    loadScene(e.id);
  }
}

function loadScene(id) {
  console.log('loadScene', id);

  // Set the image
  vrView.setContent({
    image: scenes[id].image,
    preview: scenes[id].preview,
    is_stereo: false,
    is_autopan_off: true,
	is_debug: true
  });

  // Add all the hotspots for the scene
  var newScene = scenes[id];
  var sceneHotspots = Object.keys(newScene.hotspots);
  for (var i = 0; i < sceneHotspots.length; i++) {
    var hotspotKey = sceneHotspots[i];
    var hotspot = newScene.hotspots[hotspotKey];

    vrView.addHotspot(hotspotKey, {
      pitch: hotspot.pitch,
      yaw: hotspot.yaw,
      radius: hotspot.radius,
      distance: hotspot.distance
    });
  }
}

function onVRViewError(e) {
  console.log('Error! %s', e.message);
}

window.addEventListener('load', onLoad);
