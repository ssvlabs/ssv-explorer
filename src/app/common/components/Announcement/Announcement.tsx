import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import config from '~app/common/config';

const AnnouncementContainer = styled.div`
  margin: auto;
  position: relative;
  background-color: #FFC647;
  border: 0;
  box-shadow: none;
  min-height: 64px;
  color: black;
  top: 0;
  width: 100%;
  display: flex;
  z-index: 9999!important;
  box-sizing: border-box;
  flex-shrink: 0;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
`;

const Announcement = () => {
  if (!config.FEATURE.ANNOUNCEMENT) {
    return null;
  }
  return <AnnouncementContainer>{config.FEATURE.ANNOUNCEMENT}</AnnouncementContainer>;
};

export default observer(Announcement);
