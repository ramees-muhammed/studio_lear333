import PrimaryBtn from "./PrimaryBtn";

const OTPField = () => {
    return (
        <div style={{ width: "fit-content" }} >
            <div className="flex gap-[50px] mb-[50px]" >
                <input type="number" className="otp_field" maxLength={1} data-index="0" inputMode="numeric" pattern="[0-9]*" autoComplete="off"></input>
                <input type="number" className="otp_field" maxLength={1} data-index="0" inputMode="numeric" pattern="[0-9]*" autoComplete="off"></input>
                <input type="number" className="otp_field" maxLength={1} data-index="0" inputMode="numeric" pattern="[0-9]*" autoComplete="off"></input>
                <input type="number" className="otp_field" maxLength={1} data-index="0" inputMode="numeric" pattern="[0-9]*" autoComplete="off"></input>

            </div>
            <PrimaryBtn title='Resend' />
        </div>
    )
}

export default OTPField;