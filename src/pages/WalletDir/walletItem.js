import React from "react";
import {Stack} from "react-bootstrap";
export default function WalletItem({
    colorText,
    female,
    person,
    price
    })
{
    return(
        <div>

            {female ?
                <Stack direction="horizontal" gap={2} className="">
                    <div className="p-3">
                        <span style={{color:colorText[1].textColor}}>{person}</span>
                    </div>
                    <div className="p-3 ms-auto">
                        <span style={{color:colorText[1].textColor}}>{price}</span>
                    </div>
                </Stack>
            :
                <Stack direction="horizontal" gap={2}>
                    <div className="p-3">
                        <span style={{color:colorText[0].textColor}}>{person}</span>
                    </div>
                    <div className="p-3 ms-auto">
                        <span style={{color:colorText[0].textColor}}>{price}</span>
                    </div>
                </Stack>
            }
            <div className="hr"></div>
        </div>
    );
}