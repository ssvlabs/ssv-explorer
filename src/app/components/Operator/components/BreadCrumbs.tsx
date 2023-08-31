import React from 'react';
import config from '~app/common/config';
import { BreadCrumb, BreadCrumbDivider } from '~app/common/components/Breadcrumbs';

const BreadCrumbs = ({ id }: { id: any }) => {
  return (
    <>
      <div>
        <BreadCrumb href={config.routes.HOME}>Overview</BreadCrumb>
        <BreadCrumbDivider />
        <BreadCrumb href={config.routes.OPERATORS.HOME}>Operators</BreadCrumb>
        <BreadCrumbDivider />
        <BreadCrumb href={`${config.routes.OPERATORS.HOME}/${id}`}>
          {id}
        </BreadCrumb>
      </div>
    </>
  );
};

export default BreadCrumbs;
