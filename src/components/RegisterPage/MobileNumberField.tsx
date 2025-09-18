import { useEffect, useState } from "react";
import { customList } from "country-codes-list";
import "./components.scss";

type Props = {
    value: string;
    onChange: (phone: string) => void;
};

type CountryItem = {
    countryNameEn: string;
    countryCode: string;
    countryCallingCode: string;
};

const MobileNumberField = ({ onChange }: Props) => {
    const [countries, setCountries] = useState<CountryItem[]>([]);
    const [selectedCode, setSelectedCode] = useState("91");
    const [localNumber, setLocalNumber] = useState("");

    useEffect(() => {
        const countryArray: CountryItem[] = Object.values(
            customList("countryCode", "{countryNameEn}||{countryCode}||{countryCallingCode}")
        ).map((item) => {
            const [name, code, callingCode] = item.split("||");
            return { countryNameEn: name, countryCode: code, countryCallingCode: callingCode };
        });

        setCountries(countryArray);
    }, []);

    const handleCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const code = e.target.value;
        setSelectedCode(code);
        onChange(`+${code}${localNumber}`);
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const number = e.target.value;
        setLocalNumber(number);
        onChange(`+${selectedCode}${number}`);
    };

    return (
        <div className="input_field" >
            <label htmlFor="">Number</label>
            <div className="mobile_number_field">
                <select value={selectedCode} onChange={handleCodeChange}>
                    {countries.map((country) => (
                        <option key={country.countryNameEn} value={country.countryCallingCode}>
                            (+{country.countryCallingCode})
                        </option>
                    ))}
                </select>
                <input
                    type="tel"
                    placeholder="Enter your number"
                    value={localNumber}
                    onChange={handleNumberChange}
                />
            </div>
        </div>
    );
};

export default MobileNumberField;


// type Props = {
//     value: string;
//     onChange: (phone: string) => void;
// };

// import { useEffect, useState } from "react";
// import { customList } from "country-codes-list";
// import "./components.scss";

// type CountryItem = {
//     countryNameEn: string;
//     countryCode: string;
//     countryCallingCode: string;
// };

// const MobileNumberField = ({ value, onChange }: Props) => {
//     const [countries, setCountries] = useState<CountryItem[]>([]);
//     const [selectedCode, setSelectedCode] = useState("91");
//     const [localNumber, setLocalNumber] = useState("");

//     useEffect(() => {
//         const countryArray: CountryItem[] = Object.values(
//             customList("countryCode", "{countryCallingCode}")
//         ).map((item) => {
//             const [name, code, callingCode] = item.split("||");
//             return { countryNameEn: name, countryCode: code, countryCallingCode: callingCode };
//         });

//         setCountries(countryArray);
//     }, [countries]);

//     useEffect(() => {
//         onChange(`+${selectedCode}${localNumber}`);
//     }, [selectedCode, localNumber, onChange]);

//     return (
//         <div className="mobile_number_field">
//             <select value={selectedCode} onChange={(e) => setSelectedCode(e.target.value)}>
//                 {countries.map((country) => (
//                     <option key={country.countryCallingCode} value={country.countryCallingCode}>
//                         (+{country.countryCallingCode})
//                     </option>
//                 ))}
//             </select>
//             <input
//                 type="tel"
//                 placeholder="Enter your number"
//                 value={localNumber}
//                 onChange={(e) => setLocalNumber(e.target.value)}
//             />
//         </div>
//     );
// };

// export default MobileNumberField;