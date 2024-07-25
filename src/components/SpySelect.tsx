
import { Radio, RadioGroup } from "@nextui-org/radio";
import React from "react";
import { GiSpy } from "react-icons/gi";

type Props = {
    spy:string,
    setSpy : (spy:string)=>void
};

const SpySelect = ({spy,setSpy}: Props) => {
  return (
    <div className="flex flex-col gap-3">
        <RadioGroup value={spy} onValueChange={setSpy}>
            <div className="flex flex-row justify-center items-center">
            <Radio value="1"><GiSpy /></Radio>
            <Radio value="2"><GiSpy /><GiSpy /></Radio>
            </div>
        </RadioGroup>
        <p className="text-lg">selected spies: {parseInt(spy)}</p>
    </div>
  )
};

export default SpySelect;
