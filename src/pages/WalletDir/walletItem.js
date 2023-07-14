import React from "react";

export default function WalletItem({
       id,
       person,
       price
    })
{
    return(
        <div>
            {id}
            {person}
            {price}
            <div className="hr"></div>
        </div>
    );
}