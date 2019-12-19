[![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/xLeDocteurx/png5)](https://www.npmjs.com/package/png5)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/xLeDocteurx/png5/pulls)
[![GitHub](https://img.shields.io/github/license/xLeDocteurx/png5)](https://github.com/xLeDocteurx/png5/pulls)

# A noise generator inspired by the P5.js noise engine
png5 stands for perlin noise generator but it does not provide only perlin noise !

- Undetermined random
- Determined random
- White noise
- ~~Pink noise~~
- Perlin noise
- ~~Brownian noise~~
- ~~Cellular noise~~

## Features
 - Light weight
 - Easy to use

## Installation
```
npm install png5 --save
```

## Usage

- Using the generator with Node :
```javascript
// Import
const NoiseGenerator = require('png5')

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

// Get a 1D noise at index x
const noise1D = myNoiseMachine.getPerlinNoise(x)

// Get a 2D noise at x,y coordinates
const noise2D = myNoiseMachine.getPerlinNoise(x,y)

// Get a 3D noise at x,y,z coordinates
const noise3D = myNoiseMachine.getPerlinNoise(x,y,z)
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
random([x])
```
    x / Number: x-coordinate in noise space (Optional)
    If no parameter is passed to the function it return an undetermined random number

```javascript
getWhiteNoise(x, [y], [z])
```
    x / Number: x-coordinate in noise space
    y / Number: y-coordinate in noise space (Optional)
    z / Number: z-coordinate in noise space (Optional)

```javascript
getPerlinNoise(x, [y], [z])
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
