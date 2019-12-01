[![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/xLeDocteurx/ng5/pulls)
[![GitHub](https://img.shields.io/github/license/xLeDocteurx/ng5)](https://github.com/xLeDocteurx/ng5/pulls)

# A noise generator inspired by the P5.js noise engine

## Features
 - Light weight
 - Easy to use

## Installation
```
npm install ng5 --save (not on npm yet)
```

## Usage

- Using the generator with Node :
```javascript
// Import
const NoiseGenerator = require('ng5')

// Initialize and config at the same time
const myNoiseMachine = new NoiseGenerator({
    lod: 2,
    falloff: 0.25
    seed: 'seed'
})

// Initialize and config later
const myNoiseMachine = new NoiseGenerator()
myNoiseMachine.setNoiseDetail(2, 0.25)
myNoiseMachine.setSeed('seed')

// By default the noise generator noise detail lod is set to 4 and falloff to  0.5
// If no seed is provided, the generator will use a random string

// Get a 1D noise
const noise1D = myNoiseMachine.getNoise(x)

// Get a 2D noise
const noise2D = myNoiseMachine.getNoise(x,y)

// Get a 3D noise
const noise3D = myNoiseMachine.getNoise(x,y,z)
```
<!-- 
- Using the generator without Node :
```

```

- Using the generator with React :
```

```

- Using the generator with Vue.js :
```

``` -->

## Methods of the noise generator class

```javascript
getNoise(x, [y], [z])
```
    x / Number: x-coordinate in noise space
    y / Number: y-coordinate in noise space (Optional)
    z / Number: z-coordinate in noise space (Optional)

```javascript
setNoiseDetail(lod, falloff)
```
    lod / Number: number of octaves to be used by the noise
    falloff / Number: falloff factor for each octave

```javascript
setNoiseSeed(seed)
```
    seed / Number: the seed value
