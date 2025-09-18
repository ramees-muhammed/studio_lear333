const DateInBg = () => {
    const date = new Date();

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    };

    const formattedDate = date.toLocaleDateString('en-IN', options);

    return (
        <p className="date_in_bg">{formattedDate}</p>
    );
};

export default DateInBg;


// const DateInBg = () => {
//     return (
//         <p className="date_in_bg" >Friday, 20 June</p>
//     )
// }

// export default DateInBg;