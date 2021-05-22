# Bad Apple Dataset
- `bad-apple.json` is an optimized dataset I generated myself in order to process each frame quickly. 
- This dataset contains `2191` frames which means you should render it at a maximum rate of `10 fps`.
- The dataset itself weighs arround `4.4MB`

```javascript
{
	// ...
	"data" : [frame1, frame2, ... ]
}
```
1. Each frame consists of an array of size `frame[i].length` 
2. Each value `frame[i][j]` contains something like this `frame[i][j] <- (map_index << 24) | repeat_count` (stored inside a 32 bits integer).

## 1st Case : `frame[i][j] >= 0`
```
color = value >> 24 // 0, 1 or 2
repeat_count = value & 16777215
```
- `map_index` tells us the color index : 0, 1 or 2 (this dataset contains 3 levels of color)
- `repeat_count` tells us how many times we should render the current color

## 2nd Case : `frame[i][j] < 0`
This means we should go to the next line and process the next value