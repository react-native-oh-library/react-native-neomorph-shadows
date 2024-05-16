/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ShadowARTType } from './types';
// import { Surface, Shape, Group } from '@react-native-community/art';
import Svg,{ Path, G, RadialGradient,Defs, Stop } from 'react-native-svg';
import { getPathWithRadius, transformShadowPropsForAndroid } from './helpers';

export default class InnerShadowART extends React.PureComponent {
  render() {
    const {
      width = 0,
      height = 0,
      borderRadius,
      shadowRadius,
      shadowOffset,
      fillOpacity,
      stopColor,//渐变结束的颜色
      startColor,//渐变开始的颜色
      color,
      fill,
    } = this.props;

    const shadowProps = transformShadowPropsForAndroid({
      fillOpacity,
      shadowOffset,
      shadowRadius,
      color,
    });

    const absOffsetX = Math.abs(shadowOffset.x);
    const absOffsetY = Math.abs(shadowOffset.y);
    let stroke = 30;
    if (absOffsetX >= absOffsetY) {
      stroke += absOffsetX;
    } else {
      stroke += absOffsetY;
    }
    const path = getPathWithRadius(
      width + stroke + 2,
      height + stroke + 2,
      borderRadius + stroke / 2,
    );

    return (
      <Svg height={height} width={width} style={{ position: 'absolute' }}>
        <Defs>
          <RadialGradient id="grad"  cx="50%" cy="50%" rx="50%" ry="50%">
            <Stop offset="0" stopColor={startColor} stopOpacity="1" />
            <Stop offset="1" stopColor={stopColor} stopOpacity="1" />
          </RadialGradient>
        </Defs>
        <G x={-stroke / 2 - 1} y={-stroke / 2 - 1}>
          <Path
            d={path}
            fill="url(#grad)"
            strokeWidth={stroke}
            stroke={backgroundColor || 'white'}
            {...shadowProps}
          />
        </G>
      </Svg>
    );
  }
}

InnerShadowART.propTypes = ShadowARTType;
