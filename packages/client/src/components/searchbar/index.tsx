import React from 'react';
import { StyledSearchbar, StyledSearchbarContainer } from './styles';
import { useOnClickOutside } from '../../hooks/use-on-click-outside';

export const Searchbar: React.FC = () => {
  const [clickedSearchbar, setClickedSearchbar] = React.useState(false);
  const searchbarRef = React.useRef<HTMLInputElement>(null);

  useOnClickOutside(searchbarRef, () => {
    setClickedSearchbar(false);
  });

  return (
    <StyledSearchbarContainer active={clickedSearchbar}>
      <svg
        width='15'
        height='15'
        viewBox='0 0 14 14'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M13.0272 13.2881C12.9911 13.3235 12.9482 13.3517 12.901 13.3709C12.8537 13.3901 12.8031 13.4 12.7519 13.4C12.7008 13.4 12.6502 13.3901 12.6029 13.3709C12.5557 13.3517 12.5128 13.3235 12.4767 13.2881L8.83534 9.72219C7.90512 10.5092 6.70777 11.0021 5.38163 11.0021C4.33117 11.0021 3.30431 10.6971 2.43089 10.1256C1.55747 9.55406 0.876719 8.74177 0.474727 7.7914C0.0727358 6.84103 -0.0324434 5.79527 0.17249 4.78636C0.377423 3.77745 0.883265 2.85071 1.62605 2.12333C2.36883 1.39595 3.3152 0.900599 4.34546 0.699915C5.37573 0.499231 6.44364 0.602229 7.41413 0.995885C8.38462 1.38954 9.21412 2.05617 9.79772 2.91148C10.3813 3.76679 10.6928 4.77237 10.6928 5.80104C10.6928 7.09968 10.1894 8.27221 9.38581 9.18313L13.0272 12.749C13.1 12.8206 13.1409 12.9175 13.1409 13.0185C13.1409 13.1196 13.1 13.2165 13.0272 13.2881V13.2881ZM9.8752 5.80032C9.8751 4.63307 9.4015 3.51366 8.55859 2.68836C7.71567 1.86306 6.57249 1.39946 5.38052 1.39956C4.18856 1.39965 3.04545 1.86343 2.20267 2.68887C1.3599 3.51431 0.886483 4.63379 0.886581 5.80104C0.886581 6.96829 1.36009 8.08773 2.20293 8.9131C3.04578 9.73847 4.18893 10.2022 5.38089 10.2022C6.57286 10.2022 7.716 9.73847 8.55885 8.9131C9.40169 8.08773 9.8752 6.96829 9.8752 5.80104V5.80032Z'
          fill='#ADADAD'
        />
      </svg>

      <StyledSearchbar
        active={clickedSearchbar}
        onClick={() => setClickedSearchbar(true)}
        placeholder='Search or jump to...'
        ref={searchbarRef}
      />
    </StyledSearchbarContainer>
  );
};
