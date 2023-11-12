import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Algorithms } from '../types/algorithm-result';
import { FC } from 'react';
import { AppStates } from '../types/app-state-types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const algorithms: Algorithms[] = [
  'Breadth First Search',
  'Depth First Search',
  'Best First Search',
];

function getStyles(name: string, algorithmsToRun: readonly string[], theme: Theme) {
  return {
    fontWeight:
      algorithmsToRun.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface MultipleSelectChipProps {
  algorithmsToRun: Algorithms[];
  setAlgorithmsToRun: React.Dispatch<React.SetStateAction<Algorithms[]>>;
  appState: AppStates;
}

const MultipleSelectChip: FC<MultipleSelectChipProps> = ({
  algorithmsToRun,
  setAlgorithmsToRun,
  appState,
}) => {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof algorithmsToRun>) => {
    const {
      target: { value },
    } = event;
    setAlgorithmsToRun(
      // On autofill we get a stringified value.
      typeof value === 'string' ? (value.split(',') as Algorithms[]) : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel
          id="demo-multiple-chip-label"
          sx={{ color: 'white' }}
        >
          Select Algorithms
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={algorithmsToRun}
          onChange={handleChange}
          disabled={appState !== 'draw'}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label="Select Algorithms"
              sx={{ borderColor: 'white' }}
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  sx={{
                    color: 'white',
                  }}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {algorithms.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, algorithmsToRun, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelectChip;
