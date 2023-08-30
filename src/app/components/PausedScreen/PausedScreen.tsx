import React from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Layout from '~app/common/components/Layout';
import { useStyles } from '~app/components/Styles';
import Typography from '@material-ui/core/Typography';
import Paper from '~app/components/Overview/components/Paper';
import Column from '~app/components/Overview/components/Column';
import Header from '~app/components/Overview/components/Header';
import Container from '~app/components/Overview/components/Container';

const Paragraph = (props: Record<string, any>) => {
  const paragraphStyle = {
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.62,
  };
  return <Typography variant="body2" paragraph style={paragraphStyle}>{props.children}</Typography>;
};

const PausedScreen = () => {
  const classes = useStyles({});
  const tableContainerStyle = {
    border: '1px solid transparent',
    width: '100%',
    maxWidth: '648px',
    margin: 'auto',
  };
  const headerStyle = {
    fontSize: 20,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.4,
    color: '#0b2a3c',
  };

  return (
    <Layout>
      <Grid container wrap="nowrap" spacing={0} className={classes.gridContainer}>
        <Container container spacing={5}>
          <Column item xs={12} md={8} style={{ margin: 'auto' }}>
            <Paper style={tableContainerStyle}>
              <Header style={headerStyle}>Shifu Testnet Reset</Header>
              <Paragraph>
                The SSV webapp and explorer interfaces will be down between <b>February 02 and February 15th</b>, in support of our upcoming testnet reset.
              </Paragraph>
              <Paragraph>
                The purpose of this pause is to allow the operators of our network to update their node software to the latest version (<a href={'https://docs.ssv.network/run-a-node/operator-node/installation#update-ssv-node-image'} target="_blank">instructions</a>).
              </Paragraph>
              <Paragraph>
                Please note that as a staker, there is no action required on your part other than keeping track of your validators&apos; performance after the testnet has reset.
              </Paragraph>
              <Paragraph>
                In the event that one of your managing operators did not take part in the update and remains inactive, they may be replaced with an active operator once the platform resumes its operation (<a href={'https://docs.ssv.network/learn/stakers/update-operators'} target="_blank">instructions</a>).
              </Paragraph>
              <Paragraph>
                We apologize for any inconvenience this may cause and appreciate your understanding as we work to improve the overall performance of our network. Thank you for your continued support.
              </Paragraph>
              <Paragraph>
                For more details, visit the official <a href={'https://ssv.network/uncategorized/get-ready-for-shifu-v2-multi-duty-feb-2023/'} target="_blank">release post</a>.
              </Paragraph>
            </Paper>
          </Column>
        </Container>
      </Grid>
    </Layout>
  );
};

export default observer(PausedScreen);
