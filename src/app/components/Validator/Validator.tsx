import React, { useEffect, useState } from 'react';
import _ from 'underscore';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import config from '~app/common/config';
import SsvNetwork from '~lib/api/SsvNetwork';
import Status from '~app/common/components/Status';
import Layout from '~app/common/components/Layout';
import { useStyles } from '~app/components/Styles';
import { longStringShorten } from '~lib/utils/strings';
import { Heading } from '~app/common/components/Headings';
import NotFoundScreen from '~app/common/components/NotFoundScreen';
import ContentContainer from '~app/common/components/ContentContainer';
import IsValidBadge from '~app/common/components/IsValidBadge/IsValidBadge';
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
      <BreadCrumb href={config.routes.HOME}>Overview</BreadCrumb>
      <BreadCrumbDivider />
      <BreadCrumb href={config.routes.VALIDATORS.HOME}>Validators</BreadCrumb>
      <BreadCrumbDivider />
      <BreadCrumb href={`${config.routes.VALIDATORS.HOME}/${address}`}>
        0x{longStringShorten(address, 4)}
      </BreadCrumb>
    </BreadCrumbsContainer>
  );
};

const Validator = () => {
  const classes = useStyles({});
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
    <Grid>
      <Grid item container className={classes.WhiteSection}>
        <BreadCrumbs address={params.address} />
        <Grid item xs={12} md={12}>
          <Grid container spacing={1}>
            <Grid item>
              <StatsBlock>
                <Heading variant="h1" style={{ padding: 0, marginBottom: 6 }}>
                  Validator
                </Heading>
              </StatsBlock>
            </Grid>
            <Grid item>
              {!_.isEmpty(validator) && <Status size="big" entry={validator} />}
            </Grid>
            <Grid item>
              {!_.isEmpty(validator) && <IsValidBadge size="big" entry={validator} />}
            </Grid>
          </Grid>
          {!notFound && (
            <Grid container>
              <Grid item>
                <Typography noWrap>
                  <Typography noWrap>
                    <Box component="div" display={{ xs: 'none', sm: 'block', md: 'none', lg: 'none' }}>
                      0x{longStringShorten(params.address, 30)}
                    </Box> 
                    <Box component="div" display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
                      <Grid>0x{params.address}</Grid>
                    </Box>
                    <Box component="div" display={{ xs: 'block', sm: 'none', md: 'none', lg: 'none' }}>
                      0x{longStringShorten(params.address, 4)}
                    </Box>
                  </Typography>
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
      <Layout>
        <ContentContainer>
          <NotFoundScreen notFound={notFound}>
            <Grid container className={classes.SingleValidatorWrapper} spacing={3} xl={12}>
              <ValidatorOperators
                validator={validator}
                defaultPerformance={defaultPerformance}
              />
              <ValidatorDuties validator={validator} />
            </Grid>
          </NotFoundScreen>
        </ContentContainer>
      </Layout>
    </Grid>
  );
};
export default observer(Validator);
