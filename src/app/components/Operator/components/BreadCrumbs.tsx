import React from 'react';
import config from '~app/common/config';
import { longStringShorten } from '~lib/utils/strings';
import EmptyPlaceholder from '~app/common/components/EmptyPlaceholder';
import { BreadCrumb, BreadCrumbDivider, BreadCrumbsContainer } from '~app/common/components/Breadcrumbs';

const BreadCrumbs = ({ address }: { address: string }) => {
  return (
    <>
      <BreadCrumbsContainer>
        <BreadCrumb href={config.routes.HOME}>overview</BreadCrumb>
        <BreadCrumbDivider />
        <BreadCrumb href={config.routes.OPERATORS.HOME}>operators</BreadCrumb>
        <BreadCrumbDivider />
        <BreadCrumb href={`${config.routes.OPERATORS.HOME}/${address}`}>
          {longStringShorten(address, 4)}
        </BreadCrumb>
      </BreadCrumbsContainer>

      <EmptyPlaceholder height={20} />
    </>
  );
};

export default BreadCrumbs;
