import React from 'react';
import config from '~app/common/config';
import EmptyPlaceholder from '~app/common/components/EmptyPlaceholder';
import { BreadCrumb, BreadCrumbDivider, BreadCrumbsContainer } from '~app/common/components/Breadcrumbs';

const BreadCrumbs = ({ id }: { id: any }) => {
  return (
    <>
      <BreadCrumbsContainer>
        <BreadCrumb href={config.routes.HOME}>overview</BreadCrumb>
        <BreadCrumbDivider />
        <BreadCrumb href={config.routes.OPERATORS.HOME}>operators</BreadCrumb>
        <BreadCrumbDivider />
        <BreadCrumb href={`${config.routes.OPERATORS.HOME}/${id}`}>
          {id}
        </BreadCrumb>
      </BreadCrumbsContainer>

      <EmptyPlaceholder height={20} />
    </>
  );
};

export default BreadCrumbs;
