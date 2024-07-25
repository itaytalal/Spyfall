import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React, { ChangeEvent } from 'react'
import { GiSpy } from 'react-icons/gi';

type Props = {
    spy:string,
    setSpy : (spy:string)=>void
};

const SpyRadio = ({spy,setSpy }:Props) => {
  return (
    <FormControl className='flex flex-col items-center'>
        <FormLabel id="spy-radio">Spys</FormLabel>
        <RadioGroup row aria-labelledby='spy-radio' name='spy-radio' value={spy} onChange={(e)=>setSpy(e.target.value)} >
            <FormControlLabel value="1" control={<Radio/>} label={<GiSpy />}/>
            <FormControlLabel value="2" control={<Radio/>} label={<div className=' flex flex-row'><GiSpy /><GiSpy/></div>}/>
        </RadioGroup>
    </FormControl>
  )
}

export default SpyRadio