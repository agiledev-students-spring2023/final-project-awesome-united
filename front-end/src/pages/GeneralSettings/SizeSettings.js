import 'rc-slider/assets/index.css';

import React from 'react';
import Slider, { createSliderWithTooltip } from 'rc-slider';

const SizeSettings = props => {
    return (
        <div>
            <h1>
        Text Size Settings Page
      </h1>
      <Slider onChange={log} />
      <Range allowCross={false}  min={30}  max={600} defaultValue={[lowerBound, upperBound]}  
    value={Value} step={10}  onChange={val=>SetValue(val)}  />
        </div>
      
    )
  }
  
  export default SizeSettings