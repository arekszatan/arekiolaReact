import React, {useState} from "react";
import WalletItem from "./WalletDir/walletItem";

const adress = "http://arektest.atthost24.pl";

const test = [
    {
        id : 1,
        person : "Ola",
        price : 20.43
    },
    {
        id : 2,
        person : "Arek",
        price : 129.92
    },
    {
        id : 3,
        person : "Ola",
        price : 5.82
    },
    {
        id : 4,
        person : "Arek",
        price : 32.43
    }
]
export default function WalletPage() {
    const [walletList, setWalletList] = useState(test);

    return (
        <>
            {walletList.map(wallet => (
                <WalletItem
                    id={wallet.id}
                    person={wallet.person}
                    price={wallet.price}
                />
            ))}
        </>

    );
}