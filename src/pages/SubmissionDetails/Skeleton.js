import React from 'react';
import { Skeleton as SkeletonMui } from '@material-ui/lab';

const Skeleton = () => {
  return (
    <div>
      <SkeletonMui height={400} variant="rect" animation="wave" />
      <SkeletonMui height={40} width={150} animation="wave" />
      <SkeletonMui height={40} animation="wave" />
      <SkeletonMui height={40} animation="wave" />
      <SkeletonMui height={40} width={150} animation="wave" />
      <SkeletonMui height={40} animation="wave" />
      <SkeletonMui height={40} animation="wave" />
    </div>
  );
};

export default Skeleton;
