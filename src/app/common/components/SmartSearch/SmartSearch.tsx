import React, { useState } from 'react';
import throttle from 'lodash/throttle';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AutocompleteRenderInputParams } from '@material-ui/lab/Autocomplete/Autocomplete';
import config from '~app/common/config';
import SsvNetwork from '~lib/api/SsvNetwork';
import { useStyles } from '~app/components/Styles';
import OperatorType from '~app/common/components/OperatorType';
import SearchInput from '~app/common/components/SmartSearch/components/SearchInput';
import SearchButton from '~app/common/components/SmartSearch/components/SearchButton';

type SmartSearchProps = {
  placeholder?: string;
  inAppBar?: boolean;
  closeSearch?: any,
  supportSmallScreen?: boolean,
};

const SmartSearch = (props: SmartSearchProps) => {
  const { placeholder, inAppBar, supportSmallScreen, closeSearch } = props;
  const classes = useStyles();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults]: [any[], any] = useState([]);
  let searchTimeout: any;
  const SEARCH_TIMEOUT_DELAY = 700;

  const fetch = React.useMemo(
    () => throttle((request: { input: string }, callback: any) => {
      setLoading(true);
      SsvNetwork.getInstance().search(request.input).then((results: any) => {
        const convolutedResults: any[] = (results.data?.validators || []).map((validator: any) => {
          return {
            type: 'VALIDATORS',
            public_key: validator.public_key,
          };
        });
        (results.data?.operators || []).map((operator: any) => {
          const op = {
            id: operator.id,
            type: 'OPERATORS',
            name: operator.name,
            address: operator.address,
            operatorType: operator.type,
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
    if (newInputValue.length < 1) {
      return;
    }
    searchTimeout && clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      setQuery(newInputValue);
      fetch({ input: newInputValue }, (results: any) => {
        setSearchResults(results);
        setLoading(false);
      });
    }, SEARCH_TIMEOUT_DELAY);
  };

  /**
   * When the search results changes
   * @param event
   * @param newValue
   */
  const onListChange = (event: any, newValue: any) => {
    setSearchResults(newValue ? [newValue, ...searchResults] : searchResults);
    if (newValue) {
      let url = '';
      switch (newValue.type) {
        case 'OPERATORS':
          url = `${config.routes.OPERATORS.HOME}/${newValue.address}`;
          break;
        case 'VALIDATORS':
          url = `${config.routes.VALIDATORS.HOME}/${newValue.public_key}`;
          break;
      }
      if (url) {
        window.location.href = url;
      }
    }
  };

  /**
   * Redirect user to the search results page when user wants to do it immediatelly
   * instead of selecting existing suggestions.
   * @param currentValue
   */
  const redirectUserToSearchPage = (currentValue: string) => {
    if (loading) {
      return;
    }
    let queryString = currentValue;
    let startsWith0x = false;
    if (queryString.startsWith('0x')) {
      queryString = queryString.substr(2);
      startsWith0x = true;
    }
    if (searchResults?.length > 0 && queryString) {
      let url = '';

      // Search for exact match in operators
      const operatorsList = searchResults.filter((entry: any) => {
        return entry.type === 'OPERATORS';
      });
      for (let i = 0; i < operatorsList.length; i += 1) {
        const operator = operatorsList[i];
        if (queryString === operator.name || (startsWith0x && `0x${queryString}` === operator.name) || queryString === operator.address) {
          url = `${config.routes.OPERATORS.HOME}/${operator.address}`;
          break;
        }
      }
      if (!url) {
        const validatorsList = searchResults.filter((entry: any) => {
          return entry.type === 'VALIDATORS';
        });
        for (let i = 0; i < validatorsList.length; i += 1) {
          const validator = validatorsList[i];
          if (queryString === validator.public_key) {
            url = `${config.routes.VALIDATORS.HOME}/${validator.public_key}`;
            break;
          }
        }
      }
      if (url) {
        window.location.href = url;
      }
    }
  };

  /**
   * When user presses Enter key in the input we should react.
   * @param event
   */
  const onKeyDown = (event: any) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      redirectUserToSearchPage(event.target.value);
    }
  };

  /**
   * React on click on search icon addon in the query input.
   */
  const onSearchButtonClicked = () => {
    setTimeout(() => {
      redirectUserToSearchPage(query);
    }, 10);
  };

  /**
   * Rendering option of the search results
   * @param option
   */
  const onRenderOption = (option: any) => {
    return (
      <>
        {option.type === 'VALIDATORS' && (
          <Link
            href={`${config.routes.VALIDATORS.HOME}/${option.public_key}`}
            className={classes.Link}
            style={{ width: '100%' }}
          >
            <Grid item className={classes.BlackText}>
              0x{option.public_key}
            </Grid>
          </Link>
          )}
        {option.type === 'OPERATORS' && (
          <Link
            href={`${config.routes.OPERATORS.HOME}/${option.id}`}
            className={classes.Link}
            style={{ width: '100%', marginBottom: 12 }}
          >
            <Grid container style={{ width: '100%' }} justify={'space-between'}>
              <Grid item container xs>
                <Grid item className={classes.BlackText} style={{ marginRight: '5px' }}>
                  {option.name}
                </Grid>
                <OperatorType type={option.operatorType} />
              </Grid>
              <Grid item className={classes.BlackText}>
                {/* {newLongStringShorten(option.address)} */}
                ID: {option.id}
              </Grid>
            </Grid>
          </Link>
          )}
      </>
    );
  };

  /**
   * Search input rendering component
   * @param params
   */
  const onRenderSearchInput = (params: AutocompleteRenderInputParams) => (
    <SearchInput
      {...params}
      value=""
      variant="outlined"
      data-testid="smart-search"
      placeholder={placeholder || 'Search for validators and operators...'}
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <InputAdornment position="end">
            {loading && <CircularProgress color="inherit" size={20} />}
            {!loading && !supportSmallScreen && (
              <SearchButton edge="end" onClick={onSearchButtonClicked}>
                <SearchIcon />
              </SearchButton>
            )}
            {(supportSmallScreen && (
            <SearchButton edge="end" onClick={closeSearch}>
              <CloseIcon />
            </SearchButton>
            ))}
          </InputAdornment>
        ),
      }}
      onKeyDown={onKeyDown}
      onChange={(event) => {
        if (!event.target.value) {
          setSearchResults([]);
        }
      }}
    />
  );

  return (
    <Autocomplete
      value=""
      fullWidth
      clearOnBlur
      autoComplete
      clearOnEscape
      selectOnFocus
      loading={loading}
      filterSelectedOptions
      options={searchResults}
      onChange={onListChange}
      onInputChange={onInputChange}
      renderOption={onRenderOption}
      renderInput={onRenderSearchInput}
      noOptionsText="No matching results"
      data-testid="smart-search-autocomplete"
      groupBy={(option: any) => option.type}
      onBlur={() => { setSearchResults([]); }}
      filterOptions={(options) => options}
      getOptionLabel={(option: any) => option.address || option.public_key || ''}
      className={`${classes.overviewSearch} ${(inAppBar ? classes.appBarSearch : '')}`}
    />
  );
};

export default SmartSearch;
