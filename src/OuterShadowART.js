import React from 'react';
import { ShadowARTType } from './types';
import { StyleSheet } from 'react-native';
// import { Surface, Shape, Group } from '@react-native-community/art';
import Svg, { Path, G, RadialGradient,Defs, Stop } from 'react-native-svg';
import { getPathWithRadius, transformShadowPropsForAndroid } from './helpers';

export default class OuterShadowART extends React.PureComponent {
  render() {
    const {
      width = 0,
      height = 0,
      borderRadius,
      shadowRadius,
      shadowOffset,
      fillOpacity,
      color,
      stopColor,//渐变结束的颜色
      startColor,//渐变开始的颜色
      fill
    } = this.props;

    const shadowProps = transformShadowPropsForAndroid({
      fillOpacity,
      shadowOffset,
      shadowRadius,
      color,
    });

    const path = getPathWithRadius(width, height, borderRadius);
    const absOffsetX = Math.abs(shadowOffset.x);
    const absOffsetY = Math.abs(shadowOffset.y);

    return (
      <Svg
        height={height + shadowRadius * 2 + absOffsetY * 2}
        width={width + shadowRadius * 2 + absOffsetX * 2}
        style={[
          styles.surface,
          { top: -shadowRadius - absOffsetY, left: -shadowRadius - absOffsetX },
        ]}>
        <Defs>
          <RadialGradient id="grad"  cx="50%" cy="50%" rx="50%" ry="50%">
            <Stop offset="0" stopColor={startColor} stopOpacity="1" />
            <Stop offset="1" stopColor={stopColor} stopOpacity="1" />
          </RadialGradient>
        </Defs>
        <G x={shadowRadius + absOffsetX} y={shadowRadius + absOffsetY}>
          <Path d={path} fill="url(#grad)" {...shadowProps} />
        </G>
      </Svg>
    );
  }
}

const styles = StyleSheet.create({
  surface: {
    backgroundColor: 'transparent',
    position: 'absolute',
  },
});

OuterShadowART.propTypes = ShadowARTType;