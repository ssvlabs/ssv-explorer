import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Skeleton } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import { infoIconStyle } from '~root/theme';
import { longStringShorten } from '~lib/utils/strings';
import InfoTooltip from '~app/common/components/InfoTooltip';
import ShowMoreText from '~app/common/components/ShowMoreText';
import OperatorType from '~app/components/Operator/components/OperatorType';
import { useStylesOperator } from '~app/components/Operator/Operator.styles';
import CopyToClipboardIcon from '~app/common/components/CopyToClipboardIcon';
import { DEVELOPER_FLAGS, getLocalStorageFlagValue } from '~lib/utils/DeveloperHelper';

const socialNetworks = [
  {
    name: 'website_url',
    image: '/images/web_icon.png',
  },
  {
    name: 'twitter_url',
    image: '/images/twitter_icon.png',
  },
  {
    name: 'linkedin_url',
    image: '/images/linkedin_icon.png',
  },
];

const subDashboardFields = [
  {
    name: 'location',
    hint: false,
    displayName: 'Location',
  },
  {
    name: 'setup_provider',
    hint: false,
    displayName: 'Cloud Provider',
  },
  {
    name: 'eth1_node_client',
    hint: false,
    displayName: 'ETH1 node client',
  },
  {
    name: 'eth2_node_client',
    hint: false,
    displayName: 'ETH2 node client',
  },
];

type OperatorProps = {
  operator: any,
  // eslint-disable-next-line react/no-unused-prop-types
  params?: any,
  // eslint-disable-next-line react/no-unused-prop-types
  isLoading?: boolean,
};

export const OperatorSocialNetworks = (props: OperatorProps) => {
  const { operator } = props;
  const operatorClasses = useStylesOperator();

  const openInTab = (url: string) => {
    if (url.indexOf('http://') === -1 || url.indexOf('https://') === -1) {
      // eslint-disable-next-line no-param-reassign
      url = `https://${url}`;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Grid item className={operatorClasses.OperatorsSocialNetworks}>
      {socialNetworks.map((socialNetwork, index) => {
        const operatorSocialNetwork = operator[socialNetwork.name];
        return (
          operatorSocialNetwork ? (
            <div
              tabIndex={0}
              role="button"
              onKeyDown={() => {
                openInTab(operator[socialNetwork.name]);
              }}
              onClick={() => {
                openInTab(operator[socialNetwork.name]);
              }}
              className={operatorClasses.SocialNetwork} key={index}
            >
              <img className={operatorClasses.SocialNetworkImage} src={socialNetwork.image} />
            </div>
          ) : ''
        );
      })}
    </Grid>
  );
};

export const OperatorDescription = (props: OperatorProps) => {
  const { operator } = props;
  const operatorClasses = useStylesOperator();

  if (!operator?.description) {
    return <></>;
  }

  return (
    <Grid item className={operatorClasses.OperatorsDescription}>
      <ShowMoreText text={operator.description} />
    </Grid>
  );
};

export const OperatorMetadata = (props: OperatorProps) => {
  const { operator } = props;
  const operatorClasses = useStylesOperator();

  if (!operator?.description) {
    return <></>;
  }

  return (
    <Grid container className={operatorClasses.SubDashboardFields} spacing={2}>
      {subDashboardFields.map((field, index) => {
        const operatorDashboardField = operator[field.name];
        return (
          operatorDashboardField ? (
            <Grid item xs={12} md={'auto'} key={index}>
              <div>
                <span className={`${operatorClasses.OperatorFieldsHeader}`}>{operator[field.name]}</span>
                <Grid container alignItems={'center'}>
                  <Grid item>
                    <span className={operatorClasses.OperatorFieldsSubHeader}>{field.displayName}</span>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          ) : ''
        );
      })}
    </Grid>
  );
};

const getDashboardFields = () => {
  const dashboardFields: any[] = [];

  dashboardFields.push({
    name: 'validatorsCount',
    hint: false,
    displayName: 'Validators',
    toolTipText: null,
  });

  if (getLocalStorageFlagValue(DEVELOPER_FLAGS.SHOW_OPERATOR_PERFORMANCE)) {
    dashboardFields.push({
      name: 'performance',
      hint: true,
      displayName: 'Performance',
      toolTipText: 'Operators technical scoring metric - calculated by the percentage of attended duties across all of their managed validators.',
    });
  }

  dashboardFields.push({
    name: 'status',
    hint: true,
    displayName: 'Status',
    toolTipText: 'Monitoring indication whether the operator is performing his network duties for the majority of his validators (per the last 2 epochs).',
  });

  return dashboardFields;
};

export const OperatorInfo = (props: OperatorProps) => {
  const { operator, isLoading } = props;
  const operatorClasses = useStylesOperator();

  return (
    <Grid item xs={12} lg={5}>
      <Grid container className={operatorClasses.DashboardFields}>
        {getDashboardFields().map((field, index) => {
          console.debug(`OperatorInfo: ${field.name}: ${JSON.stringify(field)}. Operator: ${JSON.stringify(operator)}`);
          const FieldValue = field.name === 'performance' ? `${parseFloat(String(operator[field.name]?.all || 0)).toFixed(2)}%` : operator[field.name];
          const shouldBeGreen = field.name === 'status';

          return (
            <Grid xs={field.name === 'performance' ? 4 : 3} md={'auto'} item key={index}>
              <div>
                <Typography
                  variant="h1"
                  style={{ color: shouldBeGreen ? '#08c858' : '' }}
                  className={`${operatorClasses.OperatorFieldsHeader} mainHeader`}
                >
                  {isLoading ? <Skeleton /> : FieldValue}
                </Typography>
                <Grid container alignItems={'center'}>
                  <Grid item>
                    <span className={`${operatorClasses.OperatorFieldsSubHeader} mainSubHeader`}>{field.displayName}</span>
                  </Grid>
                  {field.hint && (
                    <Grid item>
                      <InfoTooltip style={{ ...infoIconStyle, verticalAlign: 'middle' }} message={field.toolTipText} />
                    </Grid>
                  )}
                </Grid>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export const OperatorName = (props: OperatorProps) => {
  const { operator, params } = props;
  const operatorClasses = useStylesOperator();

  const operatorImage = {
    backgroundImage: `url(${operator.logo})`,
  };

  return (
    <Grid style={{ marginBottom: '20px' }} container spacing={1}>
      {operator.logo && (
        <Grid item md="auto" xs={12}>
          <div className={operatorClasses.OperatorLogo} style={operatorImage} />
        </Grid>
      )}
      <Grid item>
        <Typography
          variant="h1"
        >
          {operator.name}
        </Typography>

        <span className={operatorClasses.OperatorAddress}>
          0x{longStringShorten(params.address, 4)}
          &nbsp;
          <CopyToClipboardIcon
            data={params.address}
            style={{
            marginLeft: 5,
            width: 22,
            height: 22,
            verticalAlign: 'middle',
          }} />
        </span>
      </Grid>
      <Grid item style={{ justifyContent: 'center', display: 'flex' }}>
        <OperatorType operator={operator} />
      </Grid>
    </Grid>
  );
};
