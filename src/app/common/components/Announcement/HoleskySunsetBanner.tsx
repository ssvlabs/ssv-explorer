import React from 'react';
import styled from 'styled-components';
import { useLocalStorage } from 'react-use';

const BannerContainer = styled.div`
  background-color: #e57c09;
  color: white;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BannerContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

export const HoleskySunsetBanner = () => {
  const [showHoleskyBanner, setShowHoleskyBanner] = useLocalStorage(
    'showHoleskyBanner',
    true,
  );

  if (!showHoleskyBanner) {
    return null;
  }

  return (
    <BannerContainer>
      <div
        style={{
          width: 24,
          minWidth: 24,
        }}
      />
      <Spacer />

      <BannerContent>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.8"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.34073 19.0406H9.99973L9.99997 0.961304L10.0002 19.0406H17.6592C19.4542 19.0406 20.5792 17.1016 19.6882 15.5436L12.0292 2.13955C11.5807 1.35398 10.7903 0.961225 9.99997 0.961304C9.20964 0.961225 8.41928 1.35398 7.97073 2.13955L0.311732 15.5436C-0.579268 17.1016 0.545732 19.0406 2.34073 19.0406Z"
            fill="#FDFEFE"
          />
          <path
            d="M9.99997 11.1199V7.37988"
            stroke="#E57C09"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.99897 14.4498C9.86097 14.4498 9.74897 14.5618 9.74997 14.6998C9.74997 14.8378 9.86197 14.9498 9.99997 14.9498C10.138 14.9498 10.25 14.8378 10.25 14.6998C10.25 14.5618 10.138 14.4498 9.99897 14.4498"
            stroke="#E57C09"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span>
          Holesky network support will be deprecated on April 21st, 2025. As of
          this date, the official testnet will shift to the Hoodi testnet.
        </span>
      </BannerContent>
      <Spacer />
      <CloseButton onClick={() => setShowHoleskyBanner(false)}>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.99975 9L0.999756 1"
            stroke="#FDFEFE"
            strokeWidth="1.62"
            strokeLinecap="round"
          />
          <path
            d="M0.999635 9L8.99963 1"
            stroke="#FDFEFE"
            strokeWidth="1.62"
            strokeLinecap="round"
          />
        </svg>
      </CloseButton>
    </BannerContainer>
  );
};
