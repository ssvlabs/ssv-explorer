import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { CircularProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';
import { AutocompleteRenderInputParams } from '@material-ui/lab/Autocomplete/Autocomplete';
import SsvNetwork from '~lib/api/SsvNetwork';
import SearchInput from '~app/common/components/SmartSearch/components/SearchInput';
import SearchButton from '~app/common/components/SmartSearch/components/SearchButton';

type SmartSearchProps = {
  placeholder?: string;
};

const SmartSearch = (props: SmartSearchProps) => {
  const { placeholder } = props;
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults]: [any[], any] = useState([]);
  const WAIT_INTERVAL = 700;
  let timerID: any;

  const onChange = (event: any, newValue?: string) => {
    const queryString: string = event?.target?.value ?? newValue;
    setQuery(queryString);

    timerID && clearTimeout(timerID);

    if (queryString.length < 3) {
      return;
    }

    timerID = setTimeout(() => {
      setLoading(true);
      SsvNetwork.getInstance().search(queryString).then((results: any) => {
        const convolutedResults: any[] = results.operators.map((operator: any) => {
          return {
            type: 'Operators',
            name: operator.name,
            address: operator.address,
          };
        });
        results.validators.map((validator: any) => {
          convolutedResults.push({
            type: 'Validators',
            publicKey: validator.publicKey,
          });
          return validator;
        });

        setSearchResults(convolutedResults);
        setLoading(false);
      });
    }, WAIT_INTERVAL);
  };

  return (
    <Autocomplete
      data-testid="smart-search-autocomplete"
      options={searchResults}
      groupBy={(option: any) => option.type}
      getOptionLabel={(option: any) => {
        if (option.type === 'Validators') {
          return option.publicKey;
        }
        if (option.type === 'Operators') {
          return `${option.name} - ${option.address}`;
        }
        return '';
      }}
      loading={loading}
      filterOptions={(options) => options}
      onInputChange={onChange}
      filterSelectedOptions={false}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <SearchInput
          {...params}
          data-testid="smart-search"
          placeholder={placeholder || 'Search for validators and operators...'}
          value={query}
          endAdornment={(
            <InputAdornment position="end">
              {loading && <CircularProgress color="inherit" size={20} />}
              {!loading && (
                <SearchButton edge="end">
                  <SearchIcon />
                </SearchButton>
              )}
            </InputAdornment>
          )}
        />
      )}
    />
  );
};

export default SmartSearch;
