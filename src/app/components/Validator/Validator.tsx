import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import config from '~app/common/config';
import SsvNetwork from '~lib/api/SsvNetwork';
import IsValid from '~app/common/components/IsValid/IsValid';
import Status from '~app/common/components/Status';
import Layout from '~app/common/components/Layout';
import { longStringShorten } from '~lib/utils/strings';
import { Heading } from '~app/common/components/Headings';
// import { Incentivized } from '~app/common/components/Incentivized';
import NotFoundScreen from '~app/common/components/NotFoundScreen';
import ContentContainer from '~app/common/components/ContentContainer';
import EmptyPlaceholder from '~app/common/components/EmptyPlaceholder';
import CopyToClipboardIcon from '~app/common/components/CopyToClipboardIcon';
import BeaconchaLink from '~app/common/components/BeaconchaLink/BeaconchaLink';
import ValidatorDuties from '~app/components/Validator/components/ValidatorDuties';
import ValidatorOperators from '~app/components/Validator/components/ValidatorOperators';
import { BreadCrumb, BreadCrumbDivider, BreadCrumbsContainer } from '~app/common/components/Breadcrumbs';

const StatsBlock = styled.div<({ maxWidth?: any })>`
  max-width: ${({ maxWidth }) => `${Number.isNaN(maxWidth ?? 200) ? (maxWidth) : `${(maxWidth ?? 200)}px`}`};
`;

const BreadCrumbs = ({ address }: { address: string }) => {
  return (
    <BreadCrumbsContainer>
      <BreadCrumb href={config.routes.HOME}>overview</BreadCrumb>
      <BreadCrumbDivider />
      <BreadCrumb href={config.routes.VALIDATORS.HOME}>validators</BreadCrumb>
      <BreadCrumbDivider />
      <BreadCrumb href={`${config.routes.VALIDATORS.HOME}/${address}`}>
        0x{longStringShorten(address, 4)}
      </BreadCrumb>
    </BreadCrumbsContainer>
  );
};

const Validator = () =>
{
  const defaultPerformance = '24h';
  const params: Record<string, any> = useParams();
  const defaultValidator: Record<string, any> = {};
  const [notFound, setNotFound] = useState(false);
  const [validator, setValidator] = useState(defaultValidator);
  const [loadingValidator, setLoadingValidator] = useState(false);

  /**
   * Fetch one operator by it's address
   * @param address
   */
  const loadValidator = (address: string) => {
    setLoadingValidator(true);
    return SsvNetwork.getInstance().fetchValidator(address).then((result: any) => {
      if (result.status === 404) {
        setNotFound(true);
        setLoadingValidator(false);
      } else {
        setValidator(result.data);
        setLoadingValidator(false);
      }
    });
  };

  useEffect(() => {
    if (!validator?.public_key && !loadingValidator) {
      loadValidator(params.address);
    }
  });

  return (
    <Layout>
      <ContentContainer>
        <EmptyPlaceholder height={10} />

        <NotFoundScreen notFound={notFound}>
          {/* <Banner /> */}
          <BreadCrumbs address={params.address} />
          <EmptyPlaceholder height={20} />

          <Grid container alignContent="center" alignItems="center">
            <Grid item xs={12} md={8}>
              <Grid container spacing={1} style={{ alignItems: 'center', marginTop: 22 }}>
                <Grid item>
                  <StatsBlock>
                    <Heading variant="h1" style={{ padding: 0, marginBottom: 6 }}>
                      Validator
                    </Heading>
                  </StatsBlock>
                </Grid>
                <Grid item>
                  <Status size="big" entry={validator} />
                </Grid>
                <Grid item>
                  <IsValid size="big" entry={validator} />
                </Grid>
              </Grid>
              {!notFound && (
                <Grid container style={{ alignItems: 'center' }}>
                  <Grid item>
                    <Typography noWrap>
                      0x{longStringShorten(params.address, 4)}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <CopyToClipboardIcon data={params.address} style={{ marginLeft: 15, width: 22, height: 22 }} />
                    <BeaconchaLink height={22} width={22} address={`validator/${params.address}`} />
                  </Grid>
                </Grid>
                )}
            </Grid>
          </Grid>

          <EmptyPlaceholder height={40} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <ValidatorOperators
                validator={validator}
                defaultPerformance={defaultPerformance}
              />
              {/* <Incentivized validator={params.address} /> */}
            </Grid>
            <ValidatorDuties validator={validator} />
          </Grid>
        </NotFoundScreen>
      </ContentContainer>
    </Layout>
  );
};
export default observer(Validator);
