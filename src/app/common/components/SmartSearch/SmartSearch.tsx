import React, { useState } from 'react';
import throttle from 'lodash/throttle';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AutocompleteRenderInputParams } from '@material-ui/lab/Autocomplete/Autocomplete';
import config from '~app/common/config';
import SsvNetwork from '~lib/api/SsvNetwork';
import { useStyles } from '~app/components/Styles';
import SearchInput from '~app/common/components/SmartSearch/components/SearchInput';
import SearchButton from '~app/common/components/SmartSearch/components/SearchButton';

type SmartSearchProps = {
  placeholder?: string;
};

const SmartSearch = (props: SmartSearchProps) => {
  const { placeholder } = props;
  const classes = useStyles();
  const [, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults]: [any[], any] = useState([]);
  let searchTimeout: any;
  const SEARCH_TIMEOUT_DELAY = 700;

  const fetch = React.useMemo(
    () => throttle((request: { input: string }, callback: any) => {
        setLoading(true);
        SsvNetwork.getInstance().search(request.input).then((results: any) => {
          const convolutedResults: any[] = results.validators.map((validator: any) => {
            return {
              type: 'Validators',
              publicKey: validator.publicKey,
            };
          });
          results.operators.map((operator: any) => {
            const op = {
              type: 'Operators',
              name: operator.name,
              address: operator.address,
            };
            convolutedResults.push(op);
            return op;
          });
          callback(convolutedResults);
        });
      }, 200),
    [],
  );

  const onInputChange = (event: any, newInputValue: string) => {
    searchTimeout && clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setQuery(newInputValue);
      fetch({ input: newInputValue }, (results: any) => {
        setSearchResults(results);
        setLoading(false);
      });
    }, SEARCH_TIMEOUT_DELAY);
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
      autoComplete
      fullWidth
      clearOnEscape
      selectOnFocus
      clearOnBlur
      filterSelectedOptions
      filterOptions={(options) => options}
      onChange={(event, newValue) => {
        setSearchResults(newValue ? [newValue, ...searchResults] : searchResults);
      }}
      onInputChange={onInputChange}
      value=""
      renderOption={(option: any) => (
        <>
          {option.type === 'Validators' && (
            <Link
              href={`${config.routes.VALIDATORS.HOME}/${option.publicKey}`}
              className={classes.Link}
              style={{ width: '100%' }}
            >
              <Typography noWrap>
                {option.publicKey}
              </Typography>
            </Link>
          )}
          {option.type === 'Operators' && (
            <Link
              href={`${config.routes.OPERATORS.HOME}/${option.address}`}
              className={classes.Link}
              style={{ width: '100%' }}
            >
              <Grid container style={{ width: '100%' }}>
                <Grid item xs={5} md={5}>
                  <Typography noWrap style={{ width: '100%' }} component="div">
                    {option.name}
                  </Typography>
                </Grid>
                <Grid item xs={7} md={7}>
                  <Typography noWrap style={{ width: '100%' }} component="div">
                    {option.address}
                  </Typography>
                </Grid>
              </Grid>
            </Link>
          )}
        </>
      )}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <SearchInput
          {...params}
          data-testid="smart-search"
          placeholder={placeholder || 'Search for validators and operators...'}
          variant="outlined"
          value=""
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputAdornment position="end">
                {loading && <CircularProgress color="inherit" size={20} />}
                {!loading && (
                  <SearchButton edge="end">
                    <SearchIcon />
                  </SearchButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default SmartSearch;
