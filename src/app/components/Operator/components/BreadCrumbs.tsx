import React from 'react';
import config from '~app/common/config';
import { longStringShorten } from '~lib/utils/strings';
import { BreadCrumb, BreadCrumbDivider, BreadCrumbsContainer } from '~app/common/components/Breadcrumbs';

const BreadCrumbs = ({ address, isOperator }: { address: string, isOperator?: boolean }) => {
  return (
    <>
      <BreadCrumbsContainer>
        <BreadCrumb href={config.routes.HOME}>Overview</BreadCrumb>
        <BreadCrumbDivider />
        <BreadCrumb href={config.routes.OPERATORS.HOME}>Operators</BreadCrumb>
        <BreadCrumbDivider />
        <BreadCrumb href={`${config.routes.OPERATORS.HOME}/${address}`}>
          {isOperator ? address : longStringShorten(address, 4)}
        </BreadCrumb>
      </BreadCrumbsContainer>
    </>
  );
};

export default BreadCrumbs;
